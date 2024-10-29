import React from 'react';
import './components/ui/ui.css';
import AESEncryptionSimulator from './algorithms/AESEncryptionSimulator.js';

function App() {
  return (
    <div className="App">
      <h1>AES Encryption Simulator</h1>
      <AESEncryptionSimulator />
    </div>
  );
}

export default App;