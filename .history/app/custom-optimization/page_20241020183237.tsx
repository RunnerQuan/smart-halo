"use client";

import React, { useState, useEffect } from 'react';
import { Button, TextArea, Form, Message } from 'semantic-ui-react';

export default function CustomOptimization() {
  const [code, setCode] = useState('');
  const [optimizedCode, setOptimizedCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleOptimize = async () => {
    setIsLoading(true);
    setError('');
    setOptimizedCode('');

    const eventSource = new EventSource('http://localhost:6666/process_code');

    eventSource.onmessage = (event) => {
      const data = event.data;
      if (data === 'Processing started') {
        setOptimizedCode('处理已开始，请耐心等待...');
      } else {
        setOptimizedCode(data);
        setIsLoading(false);
        eventSource.close();
      }
    };

    eventSource.onerror = (error) => {
      console.error('EventSource failed:', error);
      setError('处理过程中发生错误，请稍后重试。');
      setIsLoading(false);
      eventSource.close();
    };

    try {
      const response = await fetch('http://localhost:6666/process_code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('发送请求时发生错误，请检查网络连接并重试。');
      setIsLoading(false);
    }
  };

  return (
    <div className="custom-optimization">
      <h1>自定义优化</h1>
      <Form>
        <TextArea
          placeholder="在此输入您的代码..."
          value={code}
          onChange={(e) => setCode(e.target.value)}
          rows={10}
        />
        <Button primary onClick={handleOptimize} loading={isLoading} disabled={isLoading}>
          优化代码
        </Button>
      </Form>
      {error && <Message negative>{error}</Message>}
      {optimizedCode && (
        <div className="optimized-code">
          <h2>优化后的代码：</h2>
          <pre>{optimizedCode}</pre>
        </div>
      )}
    </div>
  );
}
