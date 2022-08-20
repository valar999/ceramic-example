import React from 'react';
import { ThreeIdConnect } from '@3id/connect';
import './App.css';
import { ConnectButton } from './components/ConnectButton';
import { CreateTileDocument } from './components/CreateTileDocument';

function App() {
  const threeID = new ThreeIdConnect();

  return (
    <div className="App">
      <header className="App-header">
        <ConnectButton threeID={threeID} />
        <CreateTileDocument />
      </header>
    </div>
  );
}

export default App;
