import { TextConverter } from '../utils/textConverter';

self.onmessage = (e: MessageEvent) => {
  const { text, type, mode } = e.data;
  
  let result;
  switch (type) {
    case 'convert':
      result = TextConverter.convertText(text, mode);
      break;
    case 'stats':
      result = TextConverter.getTextStats(text);
      break;
    default:
      result = text;
  }
  
  self.postMessage({ type, result });
}; 