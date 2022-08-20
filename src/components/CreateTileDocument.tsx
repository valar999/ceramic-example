import { useState } from 'react';
// import * as IPFS from 'ipfs-core';
import { CeramicClient } from '@ceramicnetwork/http-client';
import { TileDocument } from '@ceramicnetwork/stream-tile';
import { DID } from 'dids';
import { Ed25519Provider } from 'key-did-provider-ed25519';
import { getResolver } from 'key-did-resolver';

// const ceramicTestnet = 'https://gateway-clay.ceramic.network';
const ceramicTestnet = 'https://ceramic-clay.3boxlabs.com';

export function CreateTileDocument() {
  const [ceramicId, setCeramicId] = useState("");
  const [ceramicContent, setCeramicContent] = useState("");

  return (
    <div>
      <div>
        <button
          onClick={async () => {
            const ceramic = new CeramicClient(ceramicTestnet);
    
            // init key(ed25519) provider, for testing only
            const seed = new Uint8Array(32);
            const provider = new Ed25519Provider(seed)
            const did = new DID({ provider, resolver: getResolver() })
            await did.authenticate()
            ceramic.did = did
            console.log(did.id);
    
            // create a document
            const content = { name: 'Test Document', data: { key1: 'value1' } };
            const doc = await TileDocument.create(ceramic, content);
            setCeramicId(doc.id.toUrl());
            console.log("Created", doc.id.toUrl());
          }}>
          Create Document
        </button>
      </div>
      <div>
        Document Id:
        <input id="ceramicId" defaultValue={ceramicId} />

        Document Content:
        <textarea id="ceramicContent" defaultValue={ceramicContent} />

        <button
          onClick={async () => {
            const ceramic = new CeramicClient(ceramicTestnet);
    
            // read a document
            const id = (document.getElementById("ceramicId") as HTMLInputElement).value;
            const doc = await TileDocument.load(ceramic, id);
            setCeramicContent(JSON.stringify(doc.content, null, '  '));
            console.log("Loaded", id);
          }}>
          Load Document
        </button>
      </div>
      <div>
        <button
          onClick={async () => {
            const ceramic = new CeramicClient(ceramicTestnet);
    
            // init key(ed25519) provider, for testing only
            const seed = new Uint8Array(32);
            // seed[1] = 5; // change seed, update should fail, 
            const provider = new Ed25519Provider(seed)
            const did = new DID({ provider, resolver: getResolver() })
            await did.authenticate()
            ceramic.did = did

            const id = (document.getElementById("ceramicId") as HTMLInputElement).value;
            const doc = await TileDocument.load(ceramic, id);
            const content = JSON.parse((document.getElementById("ceramicContent") as HTMLTextAreaElement).value);
            await doc.update(content);
            console.log("Updated", id);
          }}>
          Update Document
        </button>
      </div>
    </div>
  );
}
