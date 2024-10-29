import React, { useState } from 'react';
import { Select, Button } from './components/ui';
import AESEncryptionSimulator from './algorithms/AESEncryptionSimulator';
import RSASimulator from './algorithms/RSASimulator';
import DESSimulator from './algorithms/DESSimulator';

const algorithms = [
  { name: 'AES', component: AESEncryptionSimulator },
  { name: 'RSA', component: RSASimulator },
  { name: 'DES', component: DESSimulator },
];

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