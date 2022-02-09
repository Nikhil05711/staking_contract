import { Injectable } from '@angular/core';
import Web3 from 'web3';
// import Web3Modal from 'web3modal';
import { Subject } from 'rxjs';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';
import { Globals } from '../SERVICES/app-global';
const detectEthereumProvider = require('@metamask/detect-provider');
const { RijentTokenAbi } = require('../ABI/RIJENTTOKEN.js');
const { StakingAbi } = require('../ABI/STAKING.js');
const { testAbi } = require('../ABI/TEST.js');
declare let window: any;
declare let require: any;

@Injectable({
  providedIn: 'root',
})
export class Web3Service {
  private web3js: any;
  // web3Modal: any;
  eve = environment;
  private provider = `${this.eve.provider}`;
  public web3Http = new Web3(new Web3.providers.HttpProvider(this.provider));
  public rijentTokenAddress = this.eve.rijecttokenaddress;
  public stakingAddress = this.eve.stakingaddress;
  public testAddress = this.eve.testaddress;

  constructor(private global: Globals, private snack: MatSnackBar) {
    if (this.global.getValue()) {
      this.getAccounts().then((item) => {
        this.global.setValue(item);
      });
    }
  }

  public async rijentTokenContract() {
    return new this.web3Http.eth.Contract(
      RijentTokenAbi,
      this.rijentTokenAddress
    );
  }

  public async stakingContract() {
    return new this.web3Http.eth.Contract(StakingAbi, this.stakingAddress);
  }

  public async testContract() {
    return new this.web3Http.eth.Contract(testAbi, this.testAddress);
  }

  /***
   * Get Account of Metamask Wallet
   */
  public async getAccounts(): Promise<any> {
    try {
      const data = await window.ethereum.request({
        method: 'eth_accounts',
      });
      if (data.length > 0) {
        this.global.setValue(data[0]);
      }
      return data.length > 0 ? data[0] : null;
    } catch (error) {
      return null;
    }
  }

  public async getMetamaskWalletBalance(): Promise<any> {
    const web3 = new Web3(window.web3.currentProvider);
    const balance = await web3.eth.getBalance(this.global.getValue());
    const result =
      (await this.web3Http.utils.fromWei(balance, 'ether')) + 'ETH';
    return result;
  }

  public async checkMetaMaskInstallation(): Promise<any> {
    const provider = await detectEthereumProvider();
    if (!provider || !window.ethereum) {
      return this.snack.open(
        'MetaMask is not Installed, Please Install MetaMask ',
        'X',
        {
          duration: 4000,
          panelClass: ['error-snackbar'],
          horizontalPosition: 'end',
        }
      );
    }
  }

  /***
   * Enable the metamask wallet to connect button
   */
  public async enableMetaMaskAccount(): Promise<any> {
    try {
      const data = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      this.global.setValue(data[0]);
      return data[0];
    } catch (e) {
      this.snack.open('Please connect metamask manually', 'X', {
        duration: 4000,
        panelClass: ['error-snackbar'],
        horizontalPosition: 'end',
      });
      return null;
    }
  }

  async stakeAmount(value: any): Promise<any> {
    const contract = await this.testContract;
    const amount = this.web3Http.utils.toHex(
      this.web3Http.utils.toWei(value.amountOfToken.toString(), 'ether')
    );
    const months = value.monthAmountStakedfor;
    const _interest = value.rateOfInterest;
    console.log(amount, months, _interest);
    const stake = contract.arguments
      .stake(amount, months, _interest)
      .encodeABI();
    const stakingObject = {
      from: this.global.getValue(),
      to: this.stakingAddress,
      data: stake,
      chainId: 97,
    };
    try {
      const txHash = await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [stakingObject],
      });
      console.log('txhash of stakeAmount', txHash);
      return txHash;
    } catch (error) {
      console.log('catch', error);
      return null;
    }
  }

  async rewardGen(value: any): Promise<any> {
    const contract = await this.testContract;
    const rewardGeneration = contract.arguments.rewardGeneration().encodeABI();
    const rewardGeneratedObject = {
      from: this.global.getValue(),
      data: rewardGeneration,
      chainId: 97,
    };
    try {
      const txHash = await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [rewardGeneratedObject],
      });
      console.log('txhash of rewardGeneration', txHash);
      return txHash;
    } catch (error) {
      console.log('catch', error);
      return null;
    }
  }

  async claimed(value: any): Promise<any> {
    const contract = await this.testContract;
    // const amount = this.web3Http.utils.toHex(
    //   this.web3Http.utils.toWei(value.amountOfToken.toString(), 'ether')
    // );
    const claimed = contract.arguments.claim().encodeABI();
    const claimObject = {
      from: this.stakingAddress,
      to: this.global.getValue(),
      data: claimed,
      chainId: 97,
    };
    try {
      const txHash = await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [claimObject],
      });
      console.log('txhash of claimReward', txHash);
      return txHash;
    } catch (error) {
      console.log('catch', error);
      return null;
    }
  }

  async unfreezedPrinciple(value: any): Promise<any> {
    const contract = await this.stakingContract;
    const unfreezedPrinciple = contract.arguments
      .unfreezedCapital()
      .encodeABI();
    const principleObject = {
      from: this.global.getValue(),
      to: this.global.setValue,
      data: unfreezedPrinciple,
      chainId: 97,
    };
    try {
      const txHash = await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [principleObject],
      });
      console.log('txhash of unfreezedPrinciple', txHash);
      return txHash;
    } catch (error) {
      console.log('catch', error);
      return null;
    }
  }

  async matureAmount(value: any): Promise<any> {
    const contract = await this.testContract;
    const maturePrinciple = contract.arguments.matureAmount().encodeABI();
    const principleObject = {
      from: this.global.getValue(),
      to: this.global.setValue,
      data: maturePrinciple,
      chainId: 97,
    };
    try {
      const txHash = await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [principleObject],
      });
      console.log('txhash of unfreezedPrinciple', txHash);
      return txHash;
    } catch (error) {
      console.log('catch', error);
      return null;
    }
  }

  async claimPrinciple(value: any): Promise<any> {
    const contract = await this.testContract;
    const claimPrinciple = contract.arguments.matureAmount().encodeABI();
    const principleObject = {
      from: this.global.getValue(),
      to: this.global.setValue,
      data: claimPrinciple,
      chainId: 97,
    };
    try {
      const txHash = await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [principleObject],
      });
      console.log('txhash of unfreezedPrinciple', txHash);
      return txHash;
    } catch (error) {
      console.log('catch', error);
      return null;
    }
  }
}
