# Cryptographic Algorithm Simulator

An interactive educational tool built with React that simulates various cryptographic algorithms. Currently features AES (Advanced Encryption Standard) encryption and decryption with a step-by-step visualization of the process.

## About

This project aims to help students and enthusiasts understand cryptographic algorithms through visual simulation. It demonstrates the internal workings of encryption algorithms by showing each step of the process.

### Current Features
- AES encryption and decryption simulation
- Step-by-step visualization of all AES rounds
- IV (Initialization Vector) implementation
- Support for both auto-generated and manual keys
- Real-time visualization of each encryption/decryption step

## Setup and Running

### Prerequisites
- Node.js and npm must be installed on your system

### Installation Steps

1. Clone the repository
```bash
git clone https://github.com/JamshedMemon/aes-encryption-simulator
```

2. Navigate to project directory
```bash
cd aes-encryption-simulator
```

3. Install dependencies
```bash
npm install
```

4. Start the application
```bash
npm start
```

The application will open in your default browser at `http://localhost:3000`

## Using the Simulator

1. Enter your text in the input field
2. Choose between auto-generated or manual key input
3. (Optional) Modify the IV or generate a new one
4. Click "Simulate Encryption" to see the encryption process
5. Switch to "Decrypt" mode to see the decryption process
6. Watch as each step of the process is displayed with its intermediate results

## Technology Stack
- React
- JavaScript
- CSS

## Future Plans
- Implementation of RSA encryption/decryption
- Implementation of DES (Data Encryption Standard)
- Addition of more cryptographic algorithms
- Enhanced visualizations and educational content
