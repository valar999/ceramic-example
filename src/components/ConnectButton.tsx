import { useState } from 'react';
import Web3Modal from 'web3modal';
import { EthereumAuthProvider, ThreeIdConnect } from '@3id/connect';

interface Window {
  ethereum?: any;
}

export function ConnectButton(props: { threeIdConnect: ThreeIdConnect }) {
  const { ethereum } = window as Window;
  const [connected, setConnected] = useState(props.threeIdConnect.connected);

  if (ethereum === undefined) {
    return (
      <p>
        <a href="https://metamask.io/">MetaMask</a> is needed to authenticate.
      </p>
    );
  }

  if (!connected) {
    return (
      <>
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
            const res = await props.threeIdConnect.connect(provider);
            setConnected(props.threeIdConnect.connected);
          }}>
          Connect
        </button>
      </>
    );
  } else {
    return (
      <button onClick={() => { alert('not implemented') }}>
        Disconnect
      </button>
    );
  }
}
