import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'shortenAddressAsync'})
export class ShortenAddressWithAsyncPipe implements PipeTransform {
  transform(value: string | any): string {
    
    if(value){
        return value[0].slice(0,5)+"...."+value[0].slice(value.length-5); 
    }else{
        return ""
    }
    
  }
}