import React from 'react';
import { Provider } from '@self.id/framework';
import './App.css';

function App() {
  return (
    <Provider client={{ ceramic: 'testnet-clay' }}>
      Nothing here
    </Provider>
  );
}

export default App;
