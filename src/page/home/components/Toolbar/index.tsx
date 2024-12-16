import React from 'react';
import './style.css';

interface ToolbarProps {
  onConvert: () => void;
  onUndo: () => void;
  onRedo: () => void;
  onCopy: () => void;
  onPaste: () => void;
  canUndo: boolean;
  canRedo: boolean;
  conversionMode: 'auto' | 'toZh' | 'toEn';
  onModeChange: (mode: 'auto' | 'toZh' | 'toEn') => void;
}

export const Toolbar: React.FC<ToolbarProps> = ({
  onConvert,
  onUndo,
  onRedo,
  onCopy,
  onPaste,
  canUndo,
  canRedo,
  conversionMode,
  onModeChange
}) => {
  return (
    <div className="toolbar-container">
      <div className="toolbar-group">
        <button className="toolbar-button" onClick={onCopy}>
          复制
        </button>
        <button className="toolbar-button" onClick={onPaste}>
          粘贴
        </button>
      </div>
      <div className="toolbar-group">
        <button 
          className="toolbar-button" 
          onClick={onUndo}
          disabled={!canUndo}
        >
          撤销
        </button>
        <button 
          className="toolbar-button" 
          onClick={onRedo}
          disabled={!canRedo}
        >
          重做
        </button>
      </div>
      <div className="toolbar-group">
        <select 
          className="toolbar-select"
          value={conversionMode}
          onChange={(e) => onModeChange(e.target.value as 'auto' | 'toZh' | 'toEn')}
        >
          <option value="auto">自动检测</option>
          <option value="toZh">转换为中文标点</option>
          <option value="toEn">转换为英文标点</option>
        </select>
      </div>
      <div className="toolbar-group">
        <button className="toolbar-button primary" onClick={onConvert}>
          转换
        </button>
      </div>
    </div>
  );
}; 