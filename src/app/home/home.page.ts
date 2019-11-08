import { Component, OnInit } from '@angular/core';
import { Mensaje } from '../models/mesajes_models';
import { MailboxService } from '../services/mailbox.service';
import { AlertController, ToastController, PopoverController, Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../login/login.page';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  sender = {} as Mensaje;
  constructor(private mailbox:MailboxService,
    private alert:AlertController,
    private toast:ToastController,
    private pop:PopoverController,
    private platform:Platform,
    private storage:Storage) {}

    ngOnInit() {
      if(this.platform.is('cordova')){
        this.storage.get('usuario').then((value)=>{
        }).catch((err)=>{
          this.login();
        })
      }
      else {
        let key = window.sessionStorage.getItem('usuario');
        if (!key){
          this.login();
        }
      }
    }
  sent(){
    this.mailbox.intermedio(this.sender);
  }
  async login(){
    let pop = await this.pop.create({
      component:LoginPage
    })
    pop.present();
  }
  async codigo(){
    let alert = await this.alert.create({
      header:'Por favor ingrese',
      subHeader:'El codigo',
      animated:true,
      inputs:[
        {
          name:'codigo',
          placeholder:'Ingrese el codigo'
        }
      
      ],
      buttons:[
        {
          text:'Confirmar',
          handler:async(value)=>{
            if(value.codigo){
              if (value.codigo != '123'){
                let toast = await this.toast.create({
                  header:'Codigo incorrecto',
                  duration:2000,
                  animated:true,
                  color:'danger'
                });
                toast.present();
              }
            }
          }
        }
      ]
      
    });
    alert.present();
  }
}
