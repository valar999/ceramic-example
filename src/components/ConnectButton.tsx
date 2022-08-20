import { useState } from 'react';
import Web3Modal from 'web3modal';
import { CeramicClient } from '@ceramicnetwork/http-client';
import { DID } from 'dids';
import { EthereumAuthProvider, ThreeIdConnect } from '@3id/connect';
import { getResolver as getKeyResolver } from 'key-did-resolver';
import { getResolver as get3IDResolver } from '@ceramicnetwork/3id-did-resolver';

interface Window {
  ethereum?: any;
}

export function ConnectButton(props: { ceramic: CeramicClient, threeID: ThreeIdConnect }) {
  const ceramic = props.ceramic;
  const threeID = props.threeID;
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
          const authProvider = new EthereumAuthProvider(ethProvider, accounts[0]);
          await props.threeID.connect(authProvider);

          const provider = threeID.getDidProvider();
          const did = new DID({
            provider,
            resolver: {
              ...get3IDResolver(ceramic),
              ...getKeyResolver(),
            },
          });
          await did.authenticate();

          ceramic.did = did;
          setConnected(props.threeID.connected);
        }}>
        Connect
      </button>
    );
  } else {
    return (
      <button onClick={() => { alert('not implemented') }}>
        Disconnect {props.threeID.accountId}
      </button>
    );
  }
}
