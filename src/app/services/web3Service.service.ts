// import { Injectable } from '@angular/core';
// import Web3 from 'web3';
// import { Globals } from './app-global';
// import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
// import { environment } from 'src/environments/environment';
// const detectEthereumProvider = require('@metamask/detect-provider');
// const { RijenttokenAbi } = require('../ABI/RIJENTTOKEN.js');
// const { stakingAbi } = require('../ABI/STAKING.js');
// declare var require: any;
// declare let window: any;
// // Bsc Mainnet - 56
// // Bsc Testnet - 97
// const fixChainId = 97;
// var currentTokenPrice = 1;
// /*
// Bsc Mainnet - https://bscscan.com/
// Bsc Testnet - https://testnet.bscscan.com/
// */
// const baseExplorerUrl = 'https://testnet.bscscan.com/';
// const chainName = 'Bsc Testnet';

// @Injectable({
//   providedIn: 'root',
// })
// export class Web3Service {
//   addressUrl = environment;
//   public contractData: any;
//   public web3Http = new Web3(`${this.addressUrl.provider}`);
//   public stakingAddress = this.addressUrl.stakingaddress;
//   public tokenAddress = this.addressUrl.rijecttokenaddress;
//   public id: any = [];
//   public url: any = [];
//   public flagFee = false;

//   constructor(private snack: MatSnackBar, private global: Globals) {
//     if (!this.global.getValue()) {
//       this.getAccount().then((item: string) => {
//         this.global.setValue(item);
//       });
//     }
//   }
//   public async checkMetaMaskInstallation(): Promise<any> {
//     const provider = await detectEthereumProvider();
//     if (!provider || !window.ethereum) {
//       return this.snack.open(
//         'MetaMask is not Installed, Please Install MetaMask ',
//         'X',
//         {
//           duration: 4000,
//           panelClass: ['error-snackbar'],
//           horizontalPosition: 'end',
//         }
//       );
//     }
//     const web3 = new Web3(window.web3.currentProvider);
//     /**
//      * Check the whick wallet connect into the metamask wallet
//      */
//     web3.eth.net.getId((_err: any, netId: any) => {
//       switch (netId) {
//         case 1:
//           console.log('This is Ethereum Main Network (MainNet).');
//           break;
//         case 3:
//           console.log('This is Ropsten Test Network.');
//           break;
//         case 4:
//           console.log('This is Rinkeby Test Network.');
//           break;
//         case 5:
//           console.log('This is Goerli Test Network.');
//           break;
//         case 42:
//           console.log('This is Kovan Test Network.');
//           break;
//         default:
//           console.log('This is an unknown network.');
//       }
//     });
//     // console.log('Metamask installed', window.ethereum.networkVersion);
//     /***
//      * When Account Wallet Change one to another
//      */
//     return true;
//   }

//   /***
//    * Enable the metamask wallet to connect button
//    */
//   public async enableMetaMaskAccount(): Promise<any> {
//     try {
//       const data = await window.ethereum.request({
//         method: 'eth_requestAccounts',
//       });
//       this.global.setValue(data[0]);
//       return data[0];
//     } catch (e) {
//       this.snack.open('Please connect metamask manually', 'X', {
//         duration: 4000,
//         panelClass: ['error-snackbar'],
//         horizontalPosition: 'end',
//       });
//       return null;
//     }
//   }

//   /***
//    * Get Account of Metamask Wallet
//    */
//   public async getAccount(): Promise<any> {
//     try {
//       const data = await window.ethereum.request({
//         method: 'eth_accounts',
//       });
//       if (data.length > 0) {
//         this.global.setValue(data[0]);
//       }
//       return data.length > 0 ? data[0] : null;
//     } catch (e) {
//       return null;
//     }
//   }

//   public async RijentTokenContract() {
//     return new this.web3Http.eth.Contract(RijenttokenAbi, this.tokenAddress);
//   }

//   public async stakingContract() {
//     return new this.web3Http.eth.Contract(stakingAbi, this.stakingAddress);
//   }

//   public async metaMaskWalletBalance() {
//     const web3 = new Web3(window.web3.currentProvider);
//     const balance = await web3.eth.getBalance(this.global.getValue());
//     const result =
//       (await this.web3Http.utils.fromWei(balance, 'ether')) + ' ETH';
//     return result;
//   }

  
//   async stake(_amount: any, months: any) {
//     const contract = await this.stakingContract;
//     const month = months.numberOfMonths;
//     const amount = this.web3Http.utils.toHex(
//       this.web3Http.utils.toWei(_amount.amountOfToken.toString(), 'ether')
//     );
//     console.log('_amount', _amount);
//     const staking = contract.arguments.stake(
//       month,
//       amount
//     ).encodedABI();
//     const stakingObject = {
//       from: this.global.getValue(),
//       to: this.stakingAddress,
//       data: this.stake,
//       chainId: 97,
//     };
//     try {
//       const txHash = await window.ethereum.request({
//         method: 'eth_sendTransaction',
//         params: [stakingObject],
//       });
//       console.log('txhash of badgeCreate', txHash);
//       return txHash;
//     } catch (e) {
//       console.log('catch', e);
//       return null;
//     }
//   }
// }
