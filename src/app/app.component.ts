import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import Moralis from 'moralis';
import { Observable } from 'rxjs';
import { Web3Service } from './services/web3.service';
import { CreateSavingsGroupComponent } from './shared/ui/create-savings-group/create-savings-group.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent  {
  title = 'angular-round-robin';
  
  connectedAccount!: Observable<string>;
  isConnected!: Observable<boolean>;
  constructor(private web3: Web3Service){

   }
  async ngOnInit(): Promise<void> {
    this.connectedAccount = this.web3.accounts$;
    this.isConnected = this.web3.isConnected$;
    console.log(this.connectedAccount)
    await this.web3.checkIfWalletIsConnected();
  }
  async connectWallet() {
    await this.web3.connectWallet();
  }
  
}
