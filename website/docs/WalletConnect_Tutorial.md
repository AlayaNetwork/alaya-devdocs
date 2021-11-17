---
id: WalletConnect_Tutorial
title: WalletConnect Simple example
sidebar_label: WalletConnect
---

## Introduction

[WalletConnect](https://walletconnect.org/) is an open protocol to communicate securely between Wallets and Dapps (Web3 Apps). The protocol establishes a remote connection between two apps and/or devices using a Bridge server to relay payloads. These payloads are symmetrically encrypted through a shared key between the two peers. The connection is initiated by one peer displaying a QR Code or deep link with a standard WalletConnect URI and is established when the counter-party approves this connection request. It also includes an optional Push server to allow Native applications to notify the user of incoming payloads for established connections.

> - ATON version 1.1.0 started supporting the WalletConnect protocol, which allows users to connect to DApps and sign transactions while keeping the private key from leaving the mobile device and being exposed to the connected DApps.
> - As a DApp developer, you need to understand the basics of a successful Walletconnect integration that allows your users to sign transactions generated by your DApp locally in the ATON wallet.

## Core Architecture

The architecture consists essentially of a websocket server (Bridge) between two peers (Dapp and Wallet) that use the Client.

![arch](/img/walletconnect-header.png)

### Requesting Connection

The initiator, is the first peer who requests connection (Dapp). Dapp posts an encrypted payload consisting of one-time topic (used for handshake only) and connection request details to the Bridge Server. Then using the WalletConnect Standard URI format ([EIP-1328](https://eips.ethereum.org/EIPS/eip-1328)) Dapp assembles together the required parameters to establish the connection: (handshake) topic, bridge (url) and (symmetric) key.

```text
wc:{topic...}@{version...}?bridge={url...}&key={key...}
// Example URL
wc:8a5e5bdc-a0e4-4702-ba63-8f1a5655744f@1?bridge=https%3A%2F%2Fbridge.walletconnect.org&key=41791102999c339c844880b23950704cc43aa840f3739e365323cda4dfa89e7a
```

| Required parts | Notes                                                         |
| -------------- | ------------------------------------------------------------   |
| wc             | Wallet Connect protocol defined in  [EIP-1328](https://eips.ethereum.org/EIPS/eip-1328) |
| topic          | String                                                         |
| version        | Number (eg. 1.9.0)                                             |
| bridge         | Bridge URL (URL Encoded)                                       |
| key            | Symmetric key hex string                                       |



### Establishing Connection​

![establishing connection](/img//establishing-connection.png)

The second peer (Wallet) will read the URI using either a QR Code or a deep link. After reading the URI the peer will immediately receive and decrypt the connection request payload.

The Wallet will then display to the user request details provided by the Dapp. The user will then approve or reject the connection. If rejected, the Dapp will disconnect from the Bridge Server immediately and throw an error message if provided by the Wallet. If approved, the Dapp will receive provided account and chainId from the Wallet.

Once the connection is established, the Dapp will be able to send any JSON-RPC call requests to be handled by the Wallet either to read data from its node or make signing requests for transactions or messages.

## Simple example
[GitHub](https://github.com/PlatONnetwork/WalletConnect-Example)， [JSON-RPC Description](https://docs.walletconnect.com/1.0/client-api)

```typescript
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";

// Create a connector
const connector = new WalletConnect({
  bridge: "https://bridge.walletconnect.org", // Required
  qrcodeModal: QRCodeModal,
});

// Check if connection is already established
if (!connector.connected) {
  // create new session
  connector.createSession();
}

// Subscribe events
connector.on("connect", (error, payload) => {
  if (error) {
    throw error;
  }
  
  const { accounts, chainId } = payload.params[0];
});

connector.on("session_update", (error, payload) => {
  if (error) {
    throw error;
  }
  const { accounts, chainId } = payload.params[0];
});

connector.on("disconnect", (error, payload) => {
  if (error) {
    throw error;
  }
});

// Call method, for details please visit https://docs.walletconnect.com/1.0/client-api
// transaction method
connector.sendTransaction({
  data: "0x",
  from: "0xc115ceadf9e5923330e5f42903fe7f926dda65d2",
  gasLimit: "0x5208",
  gasPrice: "0x746a528800",
  nonce: "0x12",
  to: "0xc115ceadf9e5923330e5f42903fe7f926dda65d2",
  value: "0x00"
}).then(txHash => {
  // When the transaction is sent successfully, the wallet will return the transaction hash
  console.log('txHash: ', txHash)
})

```







