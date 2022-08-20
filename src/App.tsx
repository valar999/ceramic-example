import React from 'react';
import { CeramicClient } from '@ceramicnetwork/http-client';
import { ThreeIdConnect } from '@3id/connect';
import './App.css';
import { ConnectButton } from './components/ConnectButton';
import { CreateTileDocument } from './components/CreateTileDocument';

// const ceramicURL = 'https://gateway-clay.ceramic.network';
const ceramicURL = 'https://ceramic-clay.3boxlabs.com';

function App() {
  const ceramic = new CeramicClient(ceramicURL);
  const threeID = new ThreeIdConnect();

  return (
    <div className="App">
      <header className="App-header">
        <ConnectButton ceramic={ceramic} threeID={threeID} />
        <CreateTileDocument ceramic={ceramic} />
      </header>
    </div>
  );
}

export default App;
