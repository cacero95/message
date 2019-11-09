import { Injectable } from '@angular/core';
import { Mensaje } from '../models/mesajes_models';
import { AngularFireDatabase } from '@angular/fire/database';
import { AlertController, ToastController } from '@ionic/angular';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MailboxService {

  constructor(private dba:AngularFireDatabase,
    private toast:ToastController) { }

  intermedio(body:Mensaje):Promise<any>{
    return new Promise((resolve,reject)=>{
      let fecha = new Date().getTime();
      this.dba.object(`mensajes/${body.name} ${body.lastName}/${fecha}`).update(body).then(()=>{
        this.send_modal('Enviado', 'success');
        resolve(true);
      }).catch((err)=>{
        this.send_modal(':(', err.message);
        reject(false);
      })
    })
  }
  async send_modal(header,color){
    let toast = await this.toast.create({
      animated:true,
      header,
      color,
      duration:2000
    });
    toast.present();
  }

  message_loading(){
    return this.dba.list('mensajes').snapshotChanges().pipe(map(values=>{
      return values.map((data)=>{
        return data.payload.val();
      })
    }))
  }


}
