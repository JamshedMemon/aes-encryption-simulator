import React, { useState, useEffect } from 'react';
import { Input, Button, Select, Textarea } from '../components/ui';

const AESEncryptionSimulator = () => {
  const [text, setText] = useState('');
  const [key, setKey] = useState('');
  const [iv, setIv] = useState('');
  const [keyType, setKeyType] = useState('generate');
  const [mode, setMode] = useState('encrypt');
  const [steps, setSteps] = useState([]);

  useEffect(() => {
    if (keyType === 'generate') {
      generateKey();
    }
    generateIv();
  }, [keyType]);

  const generateKey = () => {
    const newKey = Array.from({ length: 16 }, () => Math.floor(Math.random() * 256).toString(16).padStart(2, '0')).join('');
    setKey(newKey);
  };

  const generateIv = () => {
    const newIv = Array.from({ length: 16 }, () => Math.floor(Math.random() * 256).toString(16).padStart(2, '0')).join('');
    setIv(newIv);
  };

  const simulateProcess = () => {
    let currentState = text;
    const newSteps = [
      { name: mode === 'encrypt' ? 'Plaintext' : 'Ciphertext', result: text },
      { name: 'Key', result: key },
      { name: 'IV', result: iv },
    ];

    if (mode === 'encrypt') {
      currentState = xor(currentState, iv); // Apply IV
      newSteps.push({ name: 'Apply IV', result: currentState });
      
      currentState = addRoundKey(currentState, key);
      newSteps.push({ name: 'Initial Round Key Addition', result: currentState });

      for (let round = 1; round <= 10; round++) {
        newSteps.push({ name: `Round ${round}`, result: 'Starting round' });
        
        currentState = substituteBytes(currentState);
        newSteps.push({ name: `Round ${round} - Substitute Bytes`, result: currentState });
        
        currentState = shiftRows(currentState);
        newSteps.push({ name: `Round ${round} - Shift Rows`, result: currentState });
        
        if (round < 10) {
          currentState = mixColumns(currentState);
          newSteps.push({ name: `Round ${round} - Mix Columns`, result: currentState });
        }
        
        currentState = addRoundKey(currentState, key);
        newSteps.push({ name: `Round ${round} - Add Round Key`, result: currentState });
      }
    } else {
      for (let round = 10; round >= 1; round--) {
        newSteps.push({ name: `Round ${round}`, result: 'Starting round' });
        
        currentState = addRoundKey(currentState, key);
        newSteps.push({ name: `Round ${round} - Inverse Add Round Key`, result: currentState });
        
        if (round < 10) {
          currentState = inverseMixColumns(currentState);
          newSteps.push({ name: `Round ${round} - Inverse Mix Columns`, result: currentState });
        }
        
        currentState = inverseShiftRows(currentState);
        newSteps.push({ name: `Round ${round} - Inverse Shift Rows`, result: currentState });
        
        currentState = inverseSubstituteBytes(currentState);
        newSteps.push({ name: `Round ${round} - Inverse Substitute Bytes`, result: currentState });
      }
      
      currentState = addRoundKey(currentState, key);
      newSteps.push({ name: 'Initial Round Key Addition', result: currentState });

      currentState = xor(currentState, iv); // Remove IV
      newSteps.push({ name: 'Remove IV', result: currentState });
    }

    newSteps.push({ name: mode === 'encrypt' ? 'Encrypted Result' : 'Decrypted Result', result: currentState });
    setSteps(newSteps);
  };

  // Simplified simulation functions
  const xor = (text, key) => {
    return text.split('').map((char, i) => 
      String.fromCharCode(char.charCodeAt(0) ^ key.charCodeAt(i % key.length))
    ).join('');
  };

  const addRoundKey = (text, key) => xor(text, key);

  const substituteBytes = (text) => {
    return text.split('').map(char => 
      String.fromCharCode((char.charCodeAt(0) + 1) % 256)
    ).join('');
  };

  const inverseSubstituteBytes = (text) => {
    return text.split('').map(char => 
      String.fromCharCode((char.charCodeAt(0) - 1 + 256) % 256)
    ).join('');
  };

  const shiftRows = (text) => {
    const rows = text.match(/.{1,4}/g) || [];
    return rows.map((row, i) => row.slice(i) + row.slice(0, i)).join('');
  };

  const inverseShiftRows = (text) => {
    const rows = text.match(/.{1,4}/g) || [];
    return rows.map((row, i) => row.slice(-i) + row.slice(0, -i)).join('');
  };

  const mixColumns = (text) => {
    return text.split('').reverse().join('');
  };

  const inverseMixColumns = mixColumns; // In this simplified version, these operations are the same

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <div style={{ marginBottom: '20px' }}>
        <Button onClick={() => setMode('encrypt')} style={{ marginRight: '10px', backgroundColor: mode === 'encrypt' ? '#007bff' : '#6c757d' }}>
          Encrypt
        </Button>
        <Button onClick={() => setMode('decrypt')} style={{ backgroundColor: mode === 'decrypt' ? '#007bff' : '#6c757d' }}>
          Decrypt
        </Button>
      </div>
      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={mode === 'encrypt' ? "Enter plaintext" : "Enter ciphertext"}
      />
      <div style={{ marginTop: '10px' }}>
        <Select
          value={keyType}
          onChange={(e) => setKeyType(e.target.value)}
        >
          <option value="generate">Auto Generate Key</option>
          <option value="input">Manual Input Key</option>
        </Select>
      </div>
      {keyType === 'input' && (
        <Input
          value={key}
          onChange={(e) => setKey(e.target.value)}
          placeholder="Enter 32 character hex key"
          style={{ marginTop: '10px' }}
        />
      )}
      <Input
        value={iv}
        onChange={(e) => setIv(e.target.value)}
        placeholder="IV (auto-generated, can be modified)"
        style={{ marginTop: '10px' }}
      />
      <Button onClick={simulateProcess} style={{ marginTop: '10px' }}>
        {mode === 'encrypt' ? 'Simulate Encryption' : 'Simulate Decryption'}
      </Button>
      <Button onClick={generateIv} style={{ marginTop: '10px', marginLeft: '10px' }}>
        Generate New IV
      </Button>
      <div style={{ marginTop: '20px' }}>
        <h3>{mode === 'encrypt' ? 'Encryption' : 'Decryption'} Steps:</h3>
        {steps.map((step, index) => (
          <div key={index} style={{ marginTop: '10px' }}>
            <strong>{step.name}:</strong> {step.result}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AESEncryptionSimulator;