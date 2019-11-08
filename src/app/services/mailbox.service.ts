import { Injectable } from '@angular/core';
import { Mensaje } from '../models/mesajes_models';
import { AngularFireDatabase } from '@angular/fire/database';
import { AlertController } from '@ionic/angular';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MailboxService {

  constructor(private dba:AngularFireDatabase,
    private alert:AlertController) { }

  intermedio(body:Mensaje):Promise<any>{
    return new Promise((resolve,reject)=>{
      let fecha = `${new Date().getDay()}_${new Date().getMonth()}_${new Date().getFullYear()}`;
      this.dba.object(`mensajes/${body.name} ${body.lastName}/${fecha}`).update(body).then((salida)=>{
        this.send_modal(':)', 'Enviado');
        resolve(true);
      }).catch((err)=>{
        this.send_modal(':(', err.message);
        reject(false);
      })
    })
  }
  async send_modal(header,subHeader){
    let alert = await this.alert.create({
      animated:true,
      header,
      subHeader
    });
    alert.present();
  }

  message_loading(){
    return this.dba.list('mensajes').snapshotChanges().pipe(map(values=>{
      return values.map((element)=>{
        let us = new Object();
        us['key'] = element.key;
        us['value'] = element.payload.val();
        return us;
      })
    }))
  }


}
