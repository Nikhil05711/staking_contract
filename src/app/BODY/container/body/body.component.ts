import { Component, OnInit } from '@angular/core';
import { MetamaskService } from 'src/app/SERVICES/metamask.service';
import { HttpClientModule } from '@angular/common/http';
import Web3 from 'web3';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {

  constructor(private metamask: MetamaskService) {}

  openMetamask() {
    alert();
    this.metamask.openMetamask().then((resp: any) => {});
  }

  ngOnInit(): void {
  }

}
