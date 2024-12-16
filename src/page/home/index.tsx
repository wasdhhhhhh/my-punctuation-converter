import React from 'react';
import { TextInput } from './components/TextInput';
import { Preview } from './components/Preview';
import { Toolbar } from './components/Toolbar';
import { StatusBar } from './components/StatusBar';
import './style.css';
import { useShortcuts } from './hooks/useShortcuts';
import { ErrorMessage } from './components/ErrorMessage';
import { useTextWorker } from './hooks/useTextWorker';

interface HomePageState {
  content: string;
  convertedContent: string;
  selection: Selection | null;
  textStats: {
    total: number;
    chinese: number;
    english: number;
    punctuation: number;
  };
  history: {
    past: string[];
    future: string[];
  };
  error: string | null;
  conversionMode: 'auto' | 'toZh' | 'toEn';
}

export const HomePage: React.FC = () => {
  const [state, setState] = React.useState<HomePageState>({
    content: '',
    convertedContent: '',
    selection: null,
    textStats: {
      total: 0,
      chinese: 0,
      english: 0,
      punctuation: 0
    },
    history: {
      past: [],
      future: []
    },
    error: null,
    conversionMode: 'auto'
  });

  const { processText } = useTextWorker();

  // 处理文本变化
  const handleTextChange = async (value: string) => {
    try {
      const textStats = await processText(value, 'stats');
      setState(prev => ({
        ...prev,
        content: value,
        textStats,
        history: {
          past: [...prev.history.past, prev.content],
          future: []
        }
      }));
    } catch (err) {
      showError('文本处理失败');
    }
  };

  // 处理文本选择
  const handleTextSelect = (selection: Selection) => {
    setState(prev => ({
      ...prev,
      selection
    }));
  };

  // 处理转换
  const handleConvert = async () => {
    try {
      const convertedContent = await processText(state.content, 'convert', state.conversionMode);
      setState(prev => ({
        ...prev,
        convertedContent,
        history: {
          past: [...prev.history.past, prev.content],
          future: []
        }
      }));
    } catch (err) {
      showError('转换失败，请重试');
    }
  };

  // 处理撤销
  const handleUndo = () => {
    if (state.history.past.length === 0) return;
    
    const previous = state.history.past[state.history.past.length - 1];
    const newPast = state.history.past.slice(0, -1);
    
    setState(prev => ({
      ...prev,
      content: previous,
      history: {
        past: newPast,
        future: [prev.content, ...prev.history.future]
      }
    }));
  };

  // 处理重做
  const handleRedo = () => {
    if (state.history.future.length === 0) return;
    
    const next = state.history.future[0];
    const newFuture = state.history.future.slice(1);
    
    setState(prev => ({
      ...prev,
      content: next,
      history: {
        past: [...prev.history.past, prev.content],
        future: newFuture
      }
    }));
  };

  // 复制功能
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(state.convertedContent || state.content);
    } catch (err) {
      showError('复制失败，请重试');
    }
  };

  // 粘贴功能
  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      handleTextChange(text);
    } catch (err) {
      showError('粘贴失败，请检查浏览器权限设置');
    }
  };

  // 注册快捷键
  useShortcuts({
    onCopy: handleCopy,
    onPaste: handlePaste,
    onUndo: handleUndo,
    onRedo: handleRedo,
    onConvert: handleConvert
  });

  // 显示错误信息
  const showError = (message: string) => {
    setState(prev => ({
      ...prev,
      error: message
    }));
  };

  // 清除错误信息
  const clearError = () => {
    setState(prev => ({
      ...prev,
      error: null
    }));
  };

  const handleModeChange = (mode: 'auto' | 'toZh' | 'toEn') => {
    setState(prev => ({
      ...prev,
      conversionMode: mode
    }));
  };

  return (
    <div className="home-container">
      {state.error && (
        <ErrorMessage 
          message={state.error} 
          onClose={clearError}
        />
      )}
      <Toolbar 
        onConvert={handleConvert}
        onUndo={handleUndo}
        onRedo={handleRedo}
        onCopy={handleCopy}
        onPaste={handlePaste}
        canUndo={state.history.past.length > 0}
        canRedo={state.history.future.length > 0}
        conversionMode={state.conversionMode}
        onModeChange={handleModeChange}
      />
      <div className="main-content">
        <div className="input-section">
          <TextInput 
            value={state.content}
            onChange={handleTextChange}
            onSelect={handleTextSelect}
          />
        </div>
        <div className="preview-section">
          <Preview content={state.convertedContent || state.content} />
        </div>
      </div>
      <StatusBar stats={state.textStats} />
    </div>
  );
};

export default HomePage; 