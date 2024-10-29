import React, { useState } from 'react';
import { Input, Button, Textarea } from '../components/ui';

const DESSimulator = () => {
  const [message, setMessage] = useState('');
  const [key, setKey] = useState('');
  const [result, setResult] = useState('');

  const simulateDES = (mode) => {
    // Placeholder for DES simulation
    setResult(`DES ${mode} simulation result for: ${message}`);
  };

  return (
    <div>
      <h2>DES Simulator</h2>
      <Textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter message"
      />
      <Input
        value={key}
        onChange={(e) => setKey(e.target.value)}
        placeholder="Enter 64-bit key"
        style={{ marginTop: '10px' }}
      />
      <Button onClick={() => simulateDES('encryption')} style={{ marginTop: '10px', marginRight: '10px' }}>
        Encrypt
      </Button>
      <Button onClick={() => simulateDES('decryption')} style={{ marginTop: '10px' }}>
        Decrypt
      </Button>
      <div style={{ marginTop: '20px' }}>
        <h3>Result:</h3>
        <p>{result}</p>
      </div>
    </div>
  );
};

export default DESSimulator;