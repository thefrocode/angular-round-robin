import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Web3Service } from 'src/app/services/web3.service';
import { ErrorDialogService } from 'src/app/shared/services/errors/error-dialog.service';
import { SuccessDialogService } from 'src/app/shared/services/success/success-dialog.service';
import { ViewSavingsGroupComponent } from 'src/app/shared/ui/view-savings-group/view-savings-group.component';
import { CreateSavingsGroupComponent } from 'src/app/shared/ui/create-savings-group/create-savings-group.component';
import { ProgressDialogService } from 'src/app/shared/services/progress/progress-dialog.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  connectedAccount!: Observable<string>;
  isConnected!: Observable<boolean>;
  constructor(private web3: Web3Service, 
    private dialog: MatDialog,
    private router: Router,
    private successDialogService: ErrorDialogService,
    ) {}

  async ngOnInit(): Promise<void> {
    this.connectedAccount = this.web3.accounts$;
    this.isConnected = this.web3.isConnected$;
    await this.web3.checkIfWalletIsConnected();
  }
  async connectWallet() {
    await this.web3.connectWallet();
  }
  async openSavingsGroupForm() {
    
    const dialogRef = this.dialog.open(CreateSavingsGroupComponent, {
      maxHeight: '100%',
        width: '360px',
        maxWidth: '100%',
        disableClose: true,
        hasBackdrop: true,
    });
     

    dialogRef.afterClosed().subscribe(
        async data => {
          console.log("Dialog output:", data)
          if(data){
            this.createSavingsGroup(data)
          }
          
        }
    ); 
    
  }
  async createSavingsGroup(data:any){
    
    const newAddress = await this.web3.createSavingsGroup(data);
    if(newAddress){
      
      this.router.navigate([`savings_group/${newAddress}`]);
    }else{
      this.successDialogService.openDialog('Chama creation unsuccessfull')
    }
    
  }
  async viewSavingsGroupForm(){
    const dialogRef = this.dialog.open(ViewSavingsGroupComponent, {
      maxHeight: '100%',
        width: '360px',
        maxWidth: '100%',
        disableClose: true,
        hasBackdrop: true,
    });
     

    dialogRef.afterClosed().subscribe(
        async data => {
          console.log("Dialog output:", data)
          if(data){
            this.viewSavingsGroup(data)
          }
          
        }
    ); 
  }
  viewSavingsGroup(data:any){
    if(data['group_address']){
      this.router.navigate([`savings_group/${data['group_address']}`]);
    }else{
      this.successDialogService.openDialog('Enter a valid address')
    }
  }

}
