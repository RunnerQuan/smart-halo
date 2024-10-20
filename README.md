# SmartHalo - 智能合约反编译输出优化工具

SmartHalo 是一个专门用于优化智能合约反编译输出的工具,旨在让反编译结果更清晰、更准确、更易读。

## 主要功能

1. **合约地址优化**: 自动识别和优化合约地址的显示。
2. **自定义优化**: 允许用户定制优化规则,以满足特定需求。
3. **使用教程**: 提供详细的使用指南,帮助用户快速上手。

## 技术栈

- Next.js 14 (使用 App Router)
- React
- TypeScript
- Tailwind CSS

## 项目结构

- `app/`: 包含所有页面组件
  - `page.tsx`: 主页
  - `address-optimization/`: 合约地址优化功能
  - `custom-optimization/`: 自定义优化功能
  - `help/`: 使用教程页面
- `components/`: 可复用的 React 组件
- `public/`: 静态资源文件

## 开发指南

1. 克隆仓库
2. 安装依赖: `npm install`
3. 运行开发服务器: `npm run dev`
4. 在浏览器中打开 `http://localhost:3000`

## 部署

本项目使用 Vercel 进行部署。每次推送到 main 分支时会自动触发部署。

## 贡献指南

欢迎提交 Pull Requests 来改进这个项目。在提交之前,请确保你的代码符合我们的编码规范并通过所有测试。

## 许可证

MIT License
