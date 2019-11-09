import { Component, OnInit } from '@angular/core';
import { Mensaje } from '../models/mesajes_models';
import { MailboxService } from '../services/mailbox.service';
import { AlertController, ToastController, PopoverController, Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../login/login.page';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  sender = {} as Mensaje;
  lista_palabras = {
    malas:[
      'No me funciona',
      'no me funciona',
      'no me funciono',
      'dañado',
      'Dañado',
      'malo',
      'Malo',
      'Mal servicio',
      'mal servicio',
      'No me ayudaron',
      'no me ayudaron',
      'no funciona',
      'No Funciona',
      `didn't work`,
      'didnt work',
      'help up',
      'ayudenos',
      'no quiso ayudar'
    ]
  }
  constructor(private mailbox:MailboxService,
    private alert:AlertController,
    private toast:ToastController,
    private pop:PopoverController,
    private platform:Platform,
    private router:Router) {}

    ngOnInit() {
      this.sender.comentario = true;
    }
  sent(){
    //this.mailbox.intermedio(this.sender);
    this.analizar_contenido().then((data)=>{
      this.mailbox.intermedio(data);
    })
  }

  analizar_contenido():Promise<any>{
    return new Promise((resolve,reject)=>{
      let contador = 0;
      let contenido:string = this.sender.descripcion.toLowerCase();
      for(let palabra of this.lista_palabras.malas){
        if (contenido.includes(palabra)){
          contador++;
        }
      }
      if (contador > 0){
        // esto quiere decir que el comentario no es positivo
        this.sender.comentario = false;
      }
      resolve(this.sender);
    })
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
              else {
                this.router.navigate(['/su']);
              }
            }
          }
        }
      ]
      
    });
    alert.present();
  }
}
