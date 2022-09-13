import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'shortenAddress'})
export class ShortenAddressPipe implements PipeTransform {
  transform(value: string | any): string {
    
    if(value){
        return value.slice(0,5)+"...."+value.slice(value.length-5); 
    }else{
        return ""
    }
    
  }
}