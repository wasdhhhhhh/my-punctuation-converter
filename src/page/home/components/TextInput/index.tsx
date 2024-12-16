import React from 'react';
import './style.css';
import { useDebounce } from '../../hooks/useDebounce';

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  onSelect: (selection: Selection) => void;
  placeholder?: string;
  disabled?: boolean;
  maxLength?: number;
  style?: React.CSSProperties;
}

export const TextInput: React.FC<TextInputProps> = React.memo(({
  value,
  onChange,
  onSelect,
  placeholder = '请输入需要转换的文本...',
  disabled = false,
  maxLength,
  style
}) => {
  const debouncedOnChange = useDebounce(onChange, 300);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    debouncedOnChange(e.target.value);
  };

  const handleSelect = () => {
    const selection = window.getSelection();
    if (selection) {
      onSelect(selection);
    }
  };

  return (
    <div className="text-input-container">
      <textarea
        className="text-input"
        value={value}
        onChange={handleChange}
        onSelect={handleSelect}
        placeholder={placeholder}
        disabled={disabled}
        maxLength={maxLength}
        style={style}
      />
    </div>
  );
}); 