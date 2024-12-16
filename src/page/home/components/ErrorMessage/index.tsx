import React from 'react';
import './style.css';

interface ErrorMessageProps {
  message: string;
  onClose: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onClose }) => {
  React.useEffect(() => {
    const timer = setTimeout(onClose, 5000); // 5秒后自动关闭
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="error-message">
      <span>{message}</span>
      <button className="error-close" onClick={onClose}>×</button>
    </div>
  );
}; 