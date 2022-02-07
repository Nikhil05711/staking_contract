import { Component } from '@angular/core';
import { MetamaskService } from './SERVICES/metamask.service';
import { HttpClientModule } from '@angular/common/http';
import Web3 from 'web3';
// import { Web3Service } from './services/web3Service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'staking';


  // stake(){
  //   alert();
  //   this.staking.stake(this.amount,this.months).then((resp: any) => {});
  // }
}
