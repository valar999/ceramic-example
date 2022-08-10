import React from 'react';
import { ThreeIdConnect } from '@3id/connect';
import './App.css';
import { ConnectButton } from './components/ConnectButton';

function App() {
  const threeID = new ThreeIdConnect();

  return (
    <div className="App">
      <header className="App-header">
        <p>
          <ConnectButton threeID={threeID} />
        </p>
      </header>
    </div>
  );
}

export default App;
