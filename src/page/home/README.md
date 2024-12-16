# 标点符号转换工具首页

## 页面概述

标点符号转换工具的首页,提供核心的文本转换功能。用户可以在此页面输入需要处理的文本,实时预览转换效果,并获取转换结果。

## 目录结构
home/
├── README.md        # 开发文档
├── index.tsx        # 首页组件
├── style.css        # 首页样式
└── components/      # 子组件目录
    ├── TextInput/   # 文本输入组件
    ├── Preview/     # 预览结果组件
    ├── Toolbar/     # 工具栏组件
    └── StatusBar/   # 状态栏组件

## 核心功能设计

### 1. 文本处理功能

#### 1.1 文本类型识别规则
- 中文文本识别
  - 连续三个及以上中文字符视为中文段落
  - 中文标点符号视为中文段落的一部分
  - 支持中文数字识别
  
- 英文文本识别
  - 连续的英文单词视为英文段落
  - 英文标点和数字视为英文段落的一部分
  - 支持英文缩写识别

- 代码块识别
  - 识别常见代码块标记（```、~~~）
  - 识别缩进式代码块
  - 支持行内代码识别

#### 1.2 实时转换机制
- 输入防抖处理
  ```typescript
  const debounce = (fn: Function, delay: number) => {
    let timer: NodeJS.Timeout
    return (...args: any[]) => {
      clearTimeout(timer)
      timer = setTimeout(() => fn(...args), delay)
    }
  }
  ```

- 分片处理
  - 文本按段落分片
  - 每片最大处理字符数：1000
  - 使用 requestAnimationFrame 调度渲染

#### 1.3 历史记录管理
- 操作历史栈结构
  ```typescript
  interface HistoryRecord {
    content: string;
    selection: Selection;
    timestamp: number;
  }
  ```
- 最大历史记录数：50
- 撤销/重做快捷键支持

### 2. 转换规则

#### 2.1 中文标点处理
- 句号：. → 。
- 逗号：, → ，
- 括号：() → （）
- 引号："" → ""
- 冒号：: → ：
- 分号：; → ；
- 问号：? → ？
- 感叹号：! → ！

#### 2.2 混合文本处理规则
- 中英文过渡处理
  ```typescript
  interface TransitionRule {
    prevType: 'cn' | 'en' | 'code';
    nextType: 'cn' | 'en' | 'code';
    spaceRule: 'add' | 'remove' | 'keep';
    punctuationRule: 'cn' | 'en' | 'keep';
  }
  ```

- 特殊情况处理
  - 英文单词后的中文标点
  - 中文后的英文标点
  - 数字与中英文混合

#### 2.3 代码块保护规则
- 完整代码块保护
- 行内代码保护
- 字符串内容保护
- 注释内容处理

### 3. 用户交互

#### 3.1 快捷键映射
```typescript
interface ShortcutMap {
  'Ctrl+Z': 'undo';
  'Ctrl+Y': 'redo';
  'Ctrl+C': 'copy';
  'Ctrl+V': 'paste';
  'Ctrl+A': 'selectAll';
  'Ctrl+S': 'save';
  'Ctrl+Enter': 'convert';
}
```

#### 3.2 状态反馈
- 处理进度指示
  - 进度百分比
  - 取消机制
  - 剩余时间估算

- 错误提示
  - 错误类型分类
  - 错误位置标记
  - 修复建议

#### 3.3 统计信息
- 字符统计
  - 总字符数
  - 中文字符数
  - 英文字符数
  - 标点符号数
  
- 性能统计
  - 处理时间
  - 内存使用
  - 转换效率

## 组件设计

### 1. TextInput 组件

#### 1.1 Props 定义
```typescript
interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  onSelect: (selection: Selection) => void;
  placeholder?: string;
  disabled?: boolean;
  maxLength?: number;
  style?: React.CSSProperties;
}
```

#### 1.2 状态管理
```typescript
interface TextInputState {
  content: string;
  selection: Selection;
  history: HistoryRecord[];
  historyIndex: number;
  isComposing: boolean;
}
```

#### 1.3 性能优化
- 使用 React.memo 优化渲染
- 实现虚拟滚动
- 输入防抖处理
- 大文本分片渲染

[其他组件的详细设计以此类推...]

## 技术实现要点

### 1. 状态管理

#### 1.1 全局状态结构
```typescript
interface GlobalState {
  text: {
    content: string;
    selection: Selection;
    history: HistoryRecord[];
  };
  config: {
    rules: ConversionRule[];
    theme: ThemeConfig;
    shortcuts: ShortcutMap;
  };
  ui: {
    loading: boolean;
    error: Error | null;
    progress: number;
  };
}
```

#### 1.2 状态更新流程
1. 用户输入触发
2. 防抖处理
3. 状态预处理
4. 更新全局状态
5. 触发相关组件更新

[继续补充其他技术实现细节...]

## 开发规范

### 1. 代码规范

#### 1.1 命名规范
- 组件名：PascalCase
- 函数名：camelCase
- 常量名：UPPER_SNAKE_CASE
- 类型名：PascalCase
- 文件名：kebab-case

#### 1.2 代码组织
```typescript
// 导入顺序
import React from 'react';
import type { FC } from 'react';
import { useEffect, useState } from 'react';
import styles from './style.module.css';

// 类型定义
interface Props {}
interface State {}

// 常量定义
const CONSTANTS = {};

// 组件定义
export const Component: FC<Props> = () => {
  // hooks
  // 处理函数
  // 渲染
};
```

[继续补充其他规范细节...]

## 注意事项

### 1. 性能优化清单
- [ ] 使用 React.memo 优化组件渲染
- [ ] 实现虚拟滚动
- [ ] 使用 Web Worker 处理文本转换
- [ ] 实现分片处理机制
- [ ] 优化重渲染逻辑

### 2. 用户体验清单
- [ ] 添加加载状态指示
- [ ] 实现进度反馈
- [ ] 添加错误提示
- [ ] 优化响应时间
- [ ] 支持快捷键操作

### 3. 测试清单
- [ ] 单元测试覆盖
- [ ] 集成测试
- [ ] 性能测试
- [ ] 兼容性测试
- [ ] 用户体验测试
