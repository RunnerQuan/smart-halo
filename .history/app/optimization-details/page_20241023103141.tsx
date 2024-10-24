"use client";

import React from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs';
import 'prismjs/components/prism-solidity';
import 'prismjs/themes/prism.css';

// 定义代码编辑器组件
const CodeEditor = ({ code, language, title }) => (
  <div className="w-full md:w-1/2 p-4">
    <h2 className="text-xl font-bold mb-2">{title}</h2>
    <Editor
      value={code}
      onValueChange={() => {}}
      highlight={code => highlight(code, languages[language])}
      padding={10}
      style={{
        fontFamily: '"Fira code", "Fira Mono", monospace',
        fontSize: 12,
        backgroundColor: '#f6f8fa',
        border: '1px solid #e1e4e8',
        borderRadius: '6px',
      }}
    />
  </div>
);

// 优化详情页面组件
const OptimizationDetailsPage = () => {
  // 示例代码，您可以根据实际情况替换
  const originalCode = `pragma solidity ^0.8.0;

contract Example {
    uint public value;

    function setValue(uint _value) public {
        value = _value;
    }
}`;

  const optimizedCode = `pragma solidity ^0.8.0;

contract OptimizedExample {
    uint public value;

    function setValue(uint _value) public {
        assembly {
            sstore(0, _value)
        }
    }
}`;

  const contractSourceCode = `pragma solidity ^0.8.0;

contract SourceExample {
    mapping(address => uint) public balances;

    function deposit() public payable {
        balances[msg.sender] += msg.value;
    }

    function withdraw(uint amount) public {
        require(balances[msg.sender] >= amount, "Insufficient balance");
        balances[msg.sender] -= amount;
        payable(msg.sender).transfer(amount);
    }
}`;

  const decompileOptimizedCode = `pragma solidity ^0.8.0;

contract DecompiledOptimizedExample {
    mapping(address => uint) public balances;

    function deposit() public payable {
        assembly {
            let slot := balances.slot
            let key := caller()
            let value := sload(keccak256(key, slot))
            sstore(keccak256(key, slot), add(value, callvalue()))
        }
    }

    function withdraw(uint amount) public {
        assembly {
            let slot := balances.slot
            let key := caller()
            let balance := sload(keccak256(key, slot))
            require(iszero(lt(balance, amount)), "Insufficient balance")
            sstore(keccak256(key, slot), sub(balance, amount))
            pop(call(gas(), caller(), amount, 0, 0, 0, 0))
        }
    }
}`;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">优化详情</h1>
      <div className="flex flex-wrap -mx-4">
        <CodeEditor code={originalCode} language="solidity" title="原始代码" />
        <CodeEditor code={optimizedCode} language="solidity" title="优化后代码" />
      </div>
      <div className="flex flex-wrap -mx-4 mt-8">
        <CodeEditor code={contractSourceCode} language="solidity" title="合约源码" />
        <CodeEditor code={decompileOptimizedCode} language="solidity" title="反编译优化后代码" />
      </div>
    </div>
  );
};

export default OptimizationDetailsPage;
