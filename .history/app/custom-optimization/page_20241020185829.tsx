"use client";

import React, { useState, useEffect } from 'react';
import { Button, TextArea, Form } from 'semantic-ui-react';
import io from 'socket.io-client';

const socket = io('http://172.18.197.84:6666');

export default function CustomOptimization() {
  const [inputCode, setInputCode] = useState('');
  const [outputCode, setOutputCode] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    socket.on('task_started', (data) => {
      console.log('Task started:', data.task_id);
      checkTaskStatus(data.task_id);
    });

    socket.on('task_status', (data) => {
      if (data.status === 'pending') {
        setTimeout(() => checkTaskStatus(data.task_id), 5000); // 每5秒检查一次
      }
    });

    socket.on('task_completed', (data) => {
      setOutputCode(data.processed_code);
      setIsProcessing(false);
    });

    socket.on('task_failed', (data) => {
      setError(data.error);
      setIsProcessing(false);
    });

    socket.on('error', (data) => {
      setError(data.message);
      setIsProcessing(false);
    });

    return () => {
      socket.off('task_started');
      socket.off('task_status');
      socket.off('task_completed');
      socket.off('task_failed');
      socket.off('error');
    };
  }, []);

  const checkTaskStatus = (taskId) => {
    socket.emit('check_task_status', { task_id: taskId });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setError('');
    setOutputCode('');

    socket.emit('process_code', { code: inputCode });
  };

  return (
    <div>
      <h1>自定义优化</h1>
      <Form onSubmit={handleSubmit}>
        <TextArea
          placeholder="在此输入代码..."
          value={inputCode}
          onChange={(e) => setInputCode(e.target.value)}
          rows={10}
        />
        <Button type="submit" primary loading={isProcessing} disabled={isProcessing}>
          {isProcessing ? '处理中...' : '提交'}
        </Button>
      </Form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {outputCode && (
        <div>
          <h2>优化后的代码：</h2>
          <pre>{outputCode}</pre>
        </div>
      )}
    </div>
  );
}
