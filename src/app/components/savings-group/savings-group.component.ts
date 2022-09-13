import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Web3Service } from 'src/app/services/web3.service';
import { AddMemberComponent } from 'src/app/shared/ui/add-member/add-member.component';
import { MakeContributionComponent } from 'src/app/shared/ui/make-contribution/make-contribution.component';

@Component({
  selector: 'app-savings-group',
  templateUrl: './savings-group.component.html',
  styleUrls: ['./savings-group.component.scss']
})
export class SavingsGroupComponent implements OnInit {

  group_address!:string
  group_details:any;
  member_details:any;
  constructor(
    private route: ActivatedRoute,
    private web3: Web3Service,
    private dialog: MatDialog,
  ) {
    
    this.route.params.subscribe(params => { 
      console.log(params['group_address'])
      this.group_address = params['group_address']; });
   }

  async ngOnInit(){
    this.group_details=await this.web3.getSavingsGroupDetails(this.group_address)
    this.member_details=await this.web3.getMemberDetails(this.group_address)
    
  }
  openAddMemberForm(){
    const dialogRef = this.dialog.open(AddMemberComponent, {
      maxHeight: '100%',
        width: '360px',
        maxWidth: '100%',
        disableClose: true,
        hasBackdrop: true,
    });
     

    dialogRef.afterClosed().subscribe(
        async data => {
          console.log("Dialog output:", data)
          this.addMember(data)
        }
    ); 

  }

  async addMember(data:any){
    this.group_details = await this.web3.addMember(this.group_address,data);
    this.member_details = await this.web3.getMemberDetails(this.group_address)
  }

  openMakeContributionForm(){
    const dialogRef = this.dialog.open(MakeContributionComponent, {
      maxHeight: '100%',
        width: '360px',
        maxWidth: '100%',
        disableClose: true,
        hasBackdrop: true,
    });
     

    dialogRef.afterClosed().subscribe(
        async data => {
          console.log("Dialog output:", data)
          this.makeContribution(data)
        }
    ); 
  }
  async makeContribution(data:any){
    await this.web3.makeContribution(this.group_address,data)
    this.group_details=await this.web3.getSavingsGroupDetails(this.group_address)
    this.member_details=await this.web3.getMemberDetails(this.group_address)
  }

}
