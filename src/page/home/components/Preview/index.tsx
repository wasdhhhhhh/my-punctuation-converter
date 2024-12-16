import React from 'react';
import './style.css';

interface PreviewProps {
  content: string;
}

export const Preview: React.FC<PreviewProps> = React.memo(({ content }) => {
  // TODO: 实现转换逻辑
  const convertedContent = content; // 临时直接显示原文

  return (
    <div className="preview-container">
      <div className="preview-content">
        {convertedContent}
      </div>
    </div>
  );
}); 