import { Pipe, PipeTransform } from '@angular/core';
import { ethers } from 'ethers';

@Pipe({name: 'parseEther'})
export class ParseEtherPipe implements PipeTransform {
  transform(value: string | null ): string {
    if(value){
        return ethers.utils.formatEther(value) + " ETH";
    }else{
        return "0"
    }
    
    
  }
}