import { useEffect, useCallback } from 'react';

interface ShortcutHandlers {
  onCopy?: () => void;
  onPaste?: () => void;
  onUndo?: () => void;
  onRedo?: () => void;
  onConvert?: () => void;
}

export const useShortcuts = (handlers: ShortcutHandlers) => {
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    // Ctrl/Cmd + C
    if ((e.ctrlKey || e.metaKey) && e.key === 'c' && handlers.onCopy) {
      handlers.onCopy();
    }
    
    // Ctrl/Cmd + V
    if ((e.ctrlKey || e.metaKey) && e.key === 'v' && handlers.onPaste) {
      handlers.onPaste();
    }
    
    // Ctrl/Cmd + Z
    if ((e.ctrlKey || e.metaKey) && !e.shiftKey && e.key === 'z' && handlers.onUndo) {
      e.preventDefault();
      handlers.onUndo();
    }
    
    // Ctrl/Cmd + Shift + Z or Ctrl/Cmd + Y
    if (((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'z') || 
        ((e.ctrlKey || e.metaKey) && e.key === 'y')) {
      e.preventDefault();
      handlers.onRedo?.();
    }
    
    // Ctrl/Cmd + Enter
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter' && handlers.onConvert) {
      e.preventDefault();
      handlers.onConvert();
    }
  }, [handlers]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
}; 