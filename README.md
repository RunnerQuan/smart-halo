# SmartHalo - 智能合约反编译输出优化工具

SmartHalo是一个专门用于优化智能合约反编译输出的工具。它利用静态分析和大语言模型的结合,有效解决了变量类型恢复、方法边界识别等问题,帮助用户更好地理解智能合约字节码。

## 主要功能

1. **链上合约优化**: 用户可以输入任意的智能合约地址,系统会自动获取并优化其反编译输出。
2. **合约优化器**: 用户可以直接输入或上传智能合约代码,系统将分析代码并提供优化建议。
3. **优化详情展示**: 展示原始反编译代码和优化后的代码,方便用户对比和分析。

## 技术栈

- 前端: Next.js 14, React, TypeScript, Tailwind CSS
- 后端: Python Flask API
- AI模型: OpenAI GPT-4

## 安装和运行

1. 克隆仓库:   ```
   git clone https://github.com/your-username/smart-halo.git   ```

2. 安装依赖:   ```
   cd smart-halo
   npm install   ```

3. 运行开发服务器:   ```
   npm run dev   ```

4. 在浏览器中访问 `http://localhost:3000`

## 贡献

欢迎提交问题和拉取请求。对于重大更改,请先开issue讨论您想要更改的内容。

## 许可证

[MIT](https://choosealicense.com/licenses/mit/)
