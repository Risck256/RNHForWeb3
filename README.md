# Introduction
A Proof-Of-Concept App for our first implementation of a mobile wallet on the Ethereum blockchain with etherjs functionalities.
# Getting Started
To run the application you need to add your **.env** file on the root of the project;<br />the needed key are the following:
```
PROVIDER_URL // url to connect to the node of blockchain
PROVIDER_NETWORK // the Ethereum network where you want to connect eg: 'sepolia'
ETHSCAN_TX_URL // url to ethscan service to show the transaction
ETHSCAN_URL // etherscan api provider url
ETHSCAN_API_KEY // etherscan api key
```

## Installation
Open terminal and go in the project's root folder<br/>
Run the following command:
```
yarn
npx pod-install
yarn ios //for ios build
yarn android //for android build
```

## Made with ❤️ by
- Umberto Lanno
- Mirko Quaglia

## Special thanks to:
[EtherScan](https://etherscan.io/)<br/>
[Ethers](https://github.com/ethers-io/ethers.js/)<br/>
[react-native-quick-crypto](https://github.com/margelo/react-native-quick-crypto)<br/>
