// import { Injectable, NgZone } from '@angular/core';
// import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
// import { Router } from '@angular/router';
// import { BehaviorSubject, Observable } from 'rxjs';

// import { Web3Service } from '../services/web3Service.service';
// import { Globals } from '../services/app-global';
// import { Url } from 'url';
// // import Web3 from 'web3';
// declare let window: any;

// @Injectable({
//   providedIn: 'root',
// })
// export class MetamaskService {
//   public userTypeObj: any;
//   public home: boolean | undefined;
//   public isMetamask: boolean | undefined;
//   public loader: boolean | undefined;
//   isUserConnected: BehaviorSubject<any> = new BehaviorSubject(false);
//   public fetchEvent: BehaviorSubject<any> = new BehaviorSubject(false);
//   metaChanged: BehaviorSubject<any> = new BehaviorSubject(null);

//   constructor(
//     private web3Service: Web3Service,
//     private router: Router,
//     private snack: MatSnackBar,
//     private ngZone: NgZone,
//     private global: Globals
//   ) {
//     this.detectMetamaskAccountChanged();
//   }
//   public profileEventReceiver(): Observable<any> {
//     return this.fetchEvent.asObservable();
//   }
//   public profileEventTrigger() {
//     return this.fetchEvent.next(1);
//   }

//   async isMetaMaskInstalled(): Promise<any> {
//     return await this.web3Service.checkMetaMaskInstallation();
//   }

//   async isMetaMaskConnected() {
//     return await this.web3Service.getAccount();
//   }

//   navigationUser(): void {
//     this.loader = true;
//     this.web3Service
//       .checkMetaMaskInstallation()
//       .then(() => {
//         this.loader = false;
//         this.enableMetamask();
//       })
//       .catch((error: string) => {
//         this.loader = false;
//         this.snack.open(error, 'X', {
//           duration: 4000,
//           panelClass: ['error-snackbar'],
//           horizontalPosition: 'end',
//         });
//       });
//   }
//   enableMetamask(): void {
//     this.web3Service
//       .enableMetaMaskAccount()
//       .then(() => {
//         this.home = false;
//         this.isMetamask = true;
//         this.web3Service
//           .getAccount()
//           .then((accountRes: any) => {
//             if (accountRes) {
//               this.userTypeObj = { account: accountRes };
//               this.isUserConnected.next(accountRes);
//             }
//             this.loader = true;
//           })
//           .catch((error: any) => {
//             this.loader = false;
//             this.snack.open(
//               'Please check your metamask. Connect it manually',
//               'X',
//               {
//                 duration: 4000,
//                 panelClass: ['error-snackbar'],
//                 horizontalPosition: 'end',
//               }
//             );
//           });
//       })
//       .catch((error: any) => {
//         this.loader = false;
//         this.snack.open(
//           'Please check your metamask. Connect it manually',
//           'X',
//           {
//             duration: 4000,
//             panelClass: ['error-snackbar'],
//             horizontalPosition: 'end',
//           }
//         );
//       });
//   }

//   async isLoggedIn() {
//     const isMetaMaskInstalled = await this.isMetaMaskInstalled();
//     const isMetaMaskConnected = await this.isMetaMaskConnected();
//   }
//   public async detectMetamaskAccountChanged() {
//     await window.ethereum.on('accountsChanged', async (accounts: any) => {
//       const connectedAcccount = await this.isMetaMaskConnected();
//       if (accounts[0] === connectedAcccount) {
//         this.global.setValue(connectedAcccount);
//       }
//     });
//   }

//   public accountChangedEvent(): Observable<any> {
//     return this.metaChanged.asObservable();
//   }
// }
