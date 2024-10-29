import React, { useState } from 'react';
import { Input, Button, Textarea } from '../components/ui';

const RSASimulator = () => {
  const [message, setMessage] = useState('');
  const [publicKey, setPublicKey] = useState('');
  const [privateKey, setPrivateKey] = useState('');
  const [result, setResult] = useState('');

  const simulateRSA = (mode) => {
    // Placeholder for RSA simulation
    setResult(`RSA ${mode} simulation result for: ${message}`);
  };

  return (
    <div>
      <h2>RSA Simulator</h2>
      <Textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter message"
      />
      <Input
        value={publicKey}
        onChange={(e) => setPublicKey(e.target.value)}
        placeholder="Public Key"
        style={{ marginTop: '10px' }}
      />
      <Input
        value={privateKey}
        onChange={(e) => setPrivateKey(e.target.value)}
        placeholder="Private Key"
        style={{ marginTop: '10px' }}
      />
      <Button onClick={() => simulateRSA('encryption')} style={{ marginTop: '10px', marginRight: '10px' }}>
        Encrypt
      </Button>
      <Button onClick={() => simulateRSA('decryption')} style={{ marginTop: '10px' }}>
        Decrypt
      </Button>
      <div style={{ marginTop: '20px' }}>
        <h3>Result:</h3>
        <p>{result}</p>
      </div>
    </div>
  );
};

export default RSASimulator;