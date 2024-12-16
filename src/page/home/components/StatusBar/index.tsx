import React from 'react';
import './style.css';

interface StatusBarProps {
  stats: {
    total: number;
    chinese: number;
    english: number;
    punctuation: number;
  };
}

export const StatusBar: React.FC<StatusBarProps> = ({ stats }) => {
  return (
    <div className="status-bar">
      <div className="status-item">
        总字符: <span>{stats.total}</span>
      </div>
      <div className="status-item">
        中文字符: <span>{stats.chinese}</span>
      </div>
      <div className="status-item">
        英文字符: <span>{stats.english}</span>
      </div>
      <div className="status-item">
        标点符号: <span>{stats.punctuation}</span>
      </div>
    </div>
  );
}; 