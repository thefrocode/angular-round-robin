import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { Contract, ethers } from 'ethers';
import factoryAbi from '../constants/factoryAbi.json';
import roundRobinAbi from "../constants/roundRobinAbi.json"
import contractAddresses from '../constants/contractAddresses.json';
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import { ProgressDialogService } from '../shared/services/progress/progress-dialog.service';
interface contractAddressesInterface {
  [key: string]: string[]
}

@Injectable({
  providedIn: 'root',
})
export class Web3Service {
  private accountConnected = new BehaviorSubject<string>('');
  accounts$ = this.accountConnected.asObservable();
  private isConnected = new BehaviorSubject<boolean>(false);
  isConnected$ = this.isConnected.asObservable();

  constructor(private progressDialogService: ProgressDialogService) {
    
  }

  async connectWallet() {
    try {
      if (!(window as any).ethereum) return alert('Please install Coinbase Wallet.');
      

      const accounts = await (window as any).ethereum.request({
        method: 'eth_requestAccounts',
      });
      console.log(accounts);
      this.accountConnected.next(accounts);
      this.isConnected.next(true);
    } catch (error) {
      console.log(error);

      throw new Error('No ethereum object');
    }
  }
  checkIfWalletIsConnected = async () => {
    try {
      if (!(window as any).ethereum) return alert('Please install MetaMask.');

      const accounts = await (window as any).ethereum.request({
        method: 'eth_accounts',
      });

      if (accounts.length) {
        this.accountConnected.next(accounts);
        this.isConnected.next(true);
      } else {
        console.log('No accounts found');
      }
    } catch (error) {
      console.log(error);
    }
  };

  private static async getContract() {
    
    const addresses: contractAddressesInterface = contractAddresses
    const provider = new ethers.providers.Web3Provider(
      (window as any).ethereum
    );
     
    const signer = provider.getSigner();
    const { chainId } = await provider.getNetwork()
    console.log(signer)

    return {
      provider: provider,
      signer: signer,
      chainId: chainId,
      contract: new ethers.Contract(
        chainId in addresses ? addresses[chainId][0] : "",
        JSON.stringify(factoryAbi),
        signer
      ),
    };
  }
  createSavingsGroup = async (group_details:any) => {
    try {
      if (!(window as any).ethereum) return alert('Please install MetaMask.');
        const { contract  }= await Web3Service.getContract();
        
        try {
          
          const transactionResponse = await contract['createRoundRobin'](
            group_details['group_name'],
            ethers.utils.parseEther( group_details['contribution_amount']),
            group_details['contribution_frequency'],
            ethers.utils.parseEther(group_details['reserve_balance']));
            this.progressDialogService.openDialog("Creating chama...")
          const address = await this.listenForCreateContract("CreateContract", contract )
          
          this.progressDialogService.close()
          return address;
        } catch (error) {
          console.log(error)
        }

        
      
    } catch (error) {
      console.log(error);

      
    }
  };
  async getSavingsGroupDetails(group_address: string){
    
    try {
      if (!(window as any).ethereum) return alert('Please install MetaMask.');
        const { contract, signer  }= await Web3Service.getContract();
        
        try {
          
          const roundRobin = new ethers.Contract(group_address, JSON.stringify(roundRobinAbi), signer);
          const groupDetails = await roundRobin['getGroupDetails']();
          console.log(groupDetails)
          return groupDetails;
        } catch (error) {
          console.log(error)
        }
 
    } catch (error) {
      console.log(error);

      
    }
  }
  async getMemberDetails(group_address: string){
    try {
      if (!(window as any).ethereum) return alert('Please install MetaMask.');
        const { contract, provider, signer }= await Web3Service.getContract();
        
        try {
          
          const roundRobin = new ethers.Contract(group_address, JSON.stringify(roundRobinAbi),signer);
          const currentAddress = await signer.getAddress()
          const memberDetails = await roundRobin['getMemberDetails'](currentAddress);
          return memberDetails;
        } catch (error) {
          console.log(error)
        }
 
    } catch (error) {
      console.log(error);

      
    }
  }
  async addMember(group_address:string,member_details:any){
    
    try {
      if (!(window as any).ethereum) return alert('Please install MetaMask.');
        const { contract, provider, signer  }= await Web3Service.getContract();
        
        try {
          const roundRobin = new ethers.Contract(group_address, JSON.stringify(roundRobinAbi),signer);
          
          const transactionResponse = await roundRobin['addMembers'](
            member_details['member_name'],
            member_details['member_address'],
            member_details['member_title']);
          this.progressDialogService.openDialog("Adding new member")
            const address = await this.listenForMemberAdded("MemberAdded", roundRobin )
            const currentAddress = await signer.getAddress()
            const groupDetails = await roundRobin['getGroupDetails']();
            this.progressDialogService.update("Member Added Successfully")
          return groupDetails;
           
        } catch (error) {
          console.log(error)
        }

        
      
    } catch (error) {
      console.log(error);

      
    }
  }
  async makeContribution(group_address: string,contribution_amount:any){
    console.log(contribution_amount)
    try {
      if (!(window as any).ethereum) return alert('Please install MetaMask.');
        const { contract, signer ,provider }= await Web3Service.getContract();
        
        try {
          const roundRobin = new ethers.Contract(group_address, JSON.stringify(roundRobinAbi), signer);
          const options = {value: ethers.utils.parseEther(contribution_amount['contribution_amount'].toString())}
          
          const transactionResponse = await roundRobin['makeContribution'](options);
          this.progressDialogService.openDialog("Sending Contribution...")
            const contributionAmount= await this.listenForContributionReceived("ContributionReceived", roundRobin )
            this.progressDialogService.update(`${ethers.utils.formatUnits(contributionAmount)} ETH Received`)
            return contributionAmount;
        } catch (error) {
          console.log(error)
        }

        
      
    } catch (error) {
      console.log(error);

      
    }
    
  }
  listenForCreateContract(event: string, contract: Contract, ) {
    
    return new Promise<string>((resolve, reject) => {
      contract.on(event, (address) => {
        resolve(address)
      })
    })
  }
  listenForMemberAdded(event: string, contract: Contract, ) {
    
    return new Promise<string>((resolve, reject) => {
      contract.on(event, (address) => {
        resolve(address)
      })
    })
  }
  listenForContributionReceived(event: string, contract: Contract, ) {
    
    return new Promise<string>((resolve, reject) => {
      contract.on(event, (contributionAmount) => {
        resolve(contributionAmount)
      })
    })
  }
}
