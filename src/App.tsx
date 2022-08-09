import React from 'react';
import { ThreeIdConnect } from '@3id/connect';
import './App.css';
import { ConnectButton } from './components/ConnectButton';

function App() {
  const threeIdConnect = new ThreeIdConnect();

  return (
    <div className="App">
      <header className="App-header">
        <p>
          <ConnectButton threeIdConnect={threeIdConnect} />
        </p>
      </header>
    </div>
  );
}

export default App;
