import { Component, OnInit } from '@angular/core';
import { MetamaskService } from 'src/app/SERVICES/metamask.service';
import { Web3Service } from 'src/app/SERVICES/web3Service.service';
import { HttpClientModule } from '@angular/common/http';
import Web3 from 'web3';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {

  constructor(private metamask: MetamaskService, private web3: Web3Service) {}

  openMetamask() {
    alert();
    this.metamask.openMetamask().then((resp: any) => {});
  }

  stakeAmount() {
    alert();
    this.web3.stakeAmount({
      monthAmountStakedfor: 12,
      rateOfInterest: 3,
      amountOfToken: 1
    }).then((resp: any) => {});
  }
  ngOnInit(): void {
  }

}
