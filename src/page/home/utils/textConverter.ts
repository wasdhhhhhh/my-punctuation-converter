const PUNCTUATION_MAP: Record<string, string> = {
  '.': '。',
  ',': '，',
  '(': '（',
  ')': '）',
  ':': '：',
  ';': '；',
  '?': '？',
  '!': '！',
  '\u0022': '\u201C',
  '\u201D': '\u201D',
  '\u0027': '\u2018',
  '\u2019': '\u2019'
} as const;

interface CodeBlock {
  start: number;
  end: number;
  content: string;
}

export class TextConverter {
  // 判断字符是否是中文
  static isChinese(char: string): boolean {
    return /[\u4e00-\u9fa5]/.test(char);
  }

  // 判断字符是否是英文
  static isEnglish(char: string): boolean {
    return /[a-zA-Z]/.test(char);
  }

  // 判断字符是否是标点符号
  static isPunctuation(char: string): boolean {
    return Object.keys(PUNCTUATION_MAP).includes(char);
  }

  // 识别代码块
  static findCodeBlocks(text: string): CodeBlock[] {
    const codeBlocks: CodeBlock[] = [];
    const codeBlockRegex = /```[\s\S]*?```|`[^`]*`/g;
    
    let match;
    while ((match = codeBlockRegex.exec(text)) !== null) {
      codeBlocks.push({
        start: match.index,
        end: match.index + match[0].length,
        content: match[0]
      });
    }
    
    return codeBlocks;
  }

  // 判断位置是否在代码块内
  static isInCodeBlock(position: number, codeBlocks: CodeBlock[]): boolean {
    return codeBlocks.some(block => 
      position >= block.start && position < block.end
    );
  }

  // 更新转换标点符号方法
  static convertPunctuation(text: string, mode: 'auto' | 'toZh' | 'toEn' = 'auto'): string {
    const codeBlocks = this.findCodeBlocks(text);
    let result = '';
    let inChineseContext = false;
    
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      const inCodeBlock = this.isInCodeBlock(i, codeBlocks);

      if (inCodeBlock || mode === 'toEn') {
        // 在代码块内或强制转换为英文标点时
        if (Object.values(PUNCTUATION_MAP).includes(char)) {
          // 如果是中文标点，找到对应的英文标点
          const englishPunct = Object.entries(PUNCTUATION_MAP).find(([_, value]) => value === char)?.[0];
          result += englishPunct || char;
        } else {
          result += char;
        }
      } else if (mode === 'toZh') {
        // 强制转换为中文标点
        if (Object.keys(PUNCTUATION_MAP).includes(char)) {
          result += PUNCTUATION_MAP[char];
        } else {
          result += char;
        }
      } else {
        // auto 模式：根据上下文判断
        if (this.isChinese(char)) {
          inChineseContext = true;
        } else if (this.isEnglish(char)) {
          inChineseContext = false;
        }

        if (this.isPunctuation(char)) {
          if (inChineseContext) {
            result += PUNCTUATION_MAP[char] || char;
          } else {
            result += char;
          }
        } else {
          result += char;
        }
      }
    }

    return result;
  }

  // 统计文本信息
  static getTextStats(text: string) {
    const stats = {
      total: text.length,
      chinese: 0,
      english: 0,
      punctuation: 0
    };

    for (const char of text) {
      if (this.isChinese(char)) {
        stats.chinese++;
      } else if (this.isEnglish(char)) {
        stats.english++;
      } else if (this.isPunctuation(char)) {
        stats.punctuation++;
      }
    }

    return stats;
  }

  // 判断是否需要在字符间添加空格
  private static needSpace(char1: string, char2: string): boolean {
    const isChinese1 = this.isChinese(char1);
    const isEnglish1 = this.isEnglish(char1);
    const isChinese2 = this.isChinese(char2);
    const isEnglish2 = this.isEnglish(char2);

    return (isChinese1 && isEnglish2) || (isEnglish1 && isChinese2);
  }

  // 处理中英文间的空格
  static addSpaceBetweenLanguages(text: string): string {
    let result = '';
    
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      const nextChar = text[i + 1] || '';
      
      result += char;
      if (this.needSpace(char, nextChar)) {
        result += ' ';
      }
    }
    
    return result;
  }

  // 更新转换方法
  static convertText(text: string, mode: 'auto' | 'toZh' | 'toEn' = 'auto'): string {
    return this.convertPunctuation(text, mode);
  }
} 