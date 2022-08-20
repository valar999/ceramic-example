import { useState } from 'react';
import Web3Modal from 'web3modal';
// TODO user did-session
import { EthereumAuthProvider, ThreeIdConnect } from '@3id/connect';

interface Window {
  ethereum?: any;
}

export function ConnectButton(props: { threeID: ThreeIdConnect }) {
  const { ethereum } = window as Window;
  const [connected, setConnected] = useState(props.threeID.connected);

  if (ethereum === undefined) {
    return (
      <p>
        <a href="https://metamask.io/">MetaMask</a> is needed to authenticate.
      </p>
    );
  }

  if (!connected) {
    return (
      <button
        onClick={async () => {
          const web3Modal = new Web3Modal({
            network: 'mainnet',
            cacheProvider: true,
          });
          const ethProvider = await web3Modal.connect()
          const accounts = await ethereum.request({
            method: 'eth_requestAccounts',
          })
          const provider = new EthereumAuthProvider(ethProvider, accounts[0]);
          await props.threeID.connect(provider);
          setConnected(props.threeID.connected);
        }}>
        Connect
      </button>
    );
  } else {
    return (
      <button onClick={() => { alert('not implemented') }}>
        Disconnect
      </button>
    );
  }
}
