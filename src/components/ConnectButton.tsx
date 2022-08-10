import { useState } from 'react';
import Web3Modal from 'web3modal';
import * as IPFS from 'ipfs-core';
import { DID } from 'dids';
import { EthereumAuthProvider, ThreeIdConnect } from '@3id/connect';
import { CeramicClient } from '@ceramicnetwork/http-client';
import { getResolver as getKeyResolver } from 'key-did-resolver';
import { getResolver as get3IDResolver } from '@ceramicnetwork/3id-did-resolver';

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
      <>
        <button onClick={() => { alert('not implemented') }}>
          Disconnect
        </button>
        <button onClick={async () => {
          const ceramic = new CeramicClient('https://gateway-clay.ceramic.network');
          const did = new DID({
            provider: props.threeID.getDidProvider(),
            resolver: {
              ...get3IDResolver(ceramic),
              ...getKeyResolver(),
            },
          });
          await did.authenticate();
          ceramic.did = did;
          console.log(did.id);
          console.log(ceramic);
          console.log(did);

          const ipfs = await IPFS.create();
          const payload = { some: 'data' };
          const { jws, linkedBlock } = await did.createDagJWS(payload);
          const jwsCid = await ipfs.dag.put(jws, {
            format: 'dag-jose',
            hashAlg: 'sha2-256',
          });
          const block = await ipfs.block.put(linkedBlock, { cid: jws.link })
          console.log((await ipfs.dag.get(jwsCid, { path: '/link' })).value)
          console.log((await ipfs.dag.get(jwsCid)).value)
        }}>
          Save Data
        </button>
      </>
    );
  }
}
