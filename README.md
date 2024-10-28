# SmartHalo - 智能合约反编译输出优化工具

SmartHalo是一款创新的智能合约反编译输出优化工具,旨在提高智能合约反编译结果的可读性和准确性。本项目利用先进的静态分析技术和大语言模型，为区块链开发者和安全研究人员提供更清晰、更准确的智能合约反编译输出。

## 主要功能

1. **链上合约优化**: 用户可以输入任意的智能合约地址,系统会自动获取并优化其反编译输出。
2. **合约优化器**: 用户可以直接输入或上传智能合约代码,系统将分析代码并提供优化建议。
3. **优化详情展示**: 展示原始反编译代码和优化后的代码,方便用户对比和分析。

## 使用场景

- 智能合约安全审计
- 区块链漏洞研究
- 智能合约逆向工程
- 区块链教育和学习

## 技术特点

- **轻量化设计**: 高效运行,低资源占用,快速处理反编译和优化任务。
- **精准优化**: 结合静态分析和大语言模型,提供高质量的反编译输出。
- **深度分析**: 能够识别复杂的智能合约结构,适用于各种安全分析任务。

## 如何使用

1. 访问SmartHalo网站
2. 选择"自定义优化"或"合约地址优化"
3. 输入或上传智能合约代码或输入合约地址
4. 等待系统分析和优化
5. 查看优化后的反编译输出结果

## 项目结构

- `app/`: 包含Next.js应用的主要代码
  - `page.tsx`: 首页
  - `custom-optimization/`: 自定义优化页面
  - `contract-optimization-details/`: 合约优化详情页面
  - `help/`: 帮助页面
  - `components/`: 可复用的React组件
- `public/`: 静态资源文件

## 技术栈

- Frontend: Next.js, React, TypeScript
- Styling: Tailwind CSS
- Animation: Framer Motion
- Backend: Flask (Python)

## 安装和运行

1. 克隆仓库:   
   ``git clone https://github.com/RunnerQuan/smart-halo.git`` 

2. 安装依赖:   
   ``cd smart-halo``

   ``npm install``

3. 运行开发服务器:   
   ``npm run dev``   

4. 在浏览器中访问 http://localhost:3000

## 贡献

我们欢迎社区贡献者参与到SmartHalo的开发中来。如果您有任何建议或改进,请提交issue或pull request。

## 许可证

本项目采用MIT许可证。详情请见LICENSE文件。
