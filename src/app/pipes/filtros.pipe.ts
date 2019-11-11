import { Pipe, PipeTransform } from '@angular/core';
import { Mensaje } from '../models/mesajes_models';

@Pipe({
  name: 'filtros'
})
export class FiltrosPipe implements PipeTransform {

  transform(mails:Mensaje[], status:number): Mensaje[] {
    if (status == 0){
      return mails;
    }
    else if (status == 1){
      return mails.filter((item)=>{
        return item.comentario === true;
      })
    }
    else {
      return mails.filter((item)=>{
        return item.comentario === false
      });
    }
  }

}
