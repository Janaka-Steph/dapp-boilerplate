Requirements:
- node ^8.1.4
- npm ^5.3.0
- solc ^0.4.11
- Truffle ^3.4.4
- Testrpc ^4.0.1


Introduction
============

Ethereum Dapp boilerplate 

 * Based on Fusebox bundler
 * Typescript support
 * React/Redux/Redux-sagas 
 * CSS-Next/CSS-Modules
 * Truffle
 
Don't forget Redux Devtools and Metamask Chrome extensions!
    

Run the app with TestRPC and Truffle
====================================

Run testRPC
    
    npm i -g ethereumjs-testrpc
    testrpc [-m yourMnemonic]
    
Migrate the contracts to local chain

    npm run migrate
    or 
    cd customModules/protocol
    truffle migrate
    
Migrate the contracts to Kovan chain

    npm run migrateTestnet
    or 
    cd customModules/protocol
    truffle migrate --network kovan

Attach a console

    truffle console
    
Build production bundle

    npm run prod

Serve the app
    
    npm run dev

=> Go to http://localhost:8085/

Run UI tests (using Jest)

    npm run testUI

Run Smart Contract tests (using Mocha and Chai under the hood)

    npm run testProtocol