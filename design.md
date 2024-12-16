# 项目结构设计文档

## 技术栈
- 构建工具: Vite 6.0.1
- 前端框架: React 18.3.1
- 开发语言: TypeScript 5.6.2
- 代码规范: ESLint 9.15.0


## 目录结构
.
├── src/ # 源代码目录
│ ├── assets/ # 静态资源
│ ├── App.tsx # 根组件
│ ├── main.tsx # 入口文件
│ ├── App.css # 根组件样式
│ └── index.css # 全局样式
├── public/ # 公共资源目录
├── dist/ # 构建输出目录
└── 配置文件
├── vite.config.ts # Vite 配置
├── tsconfig.json # TypeScript 配置
├── package.json # 项目依赖配置
└── eslint.config.js # ESLint 配置
## 技术要点

### 1. TypeScript 配置
- 启用严格模式
- 分离 app 和 node 环境配置
- 现代 ES 特性支持
- 完整的类型检查

### 2. 开发工具支持
- ESLint 代码规范检查
- Hot Module Replacement (HMR)
- React Fast Refresh
- TypeScript 类型检查

### 3. 构建特性
- 开发服务器: `npm run dev`
- 生产构建: `npm run build`
- 预览构建: `npm run preview`
- 代码检查: `npm run lint`

### 4. 样式方案
- CSS 模块化支持
- 全局样式: index.css
- 组件级样式: App.css

### 5. 环境配置
- 支持开发/生产环境区分
- 环境变量配置
- TypeScript 路径别名

## 注意事项
1. 使用 TypeScript 严格模式，确保类型安全
2. 遵循 ESLint 规范进行开发
3. 组件开发遵循 React 最佳实践
4. 注意保持依赖版本的兼容性 