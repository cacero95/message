import { Component, OnInit } from '@angular/core';
import { Mensaje } from '../../models/mesajes_models';
import { MailboxService } from '../../services/mailbox.service';

@Component({
  selector: 'app-su',
  templateUrl: './su.page.html',
  styleUrls: ['./su.page.scss'],
})
export class SuPage implements OnInit {

  change = false;
  mensajes:Mensaje[] = [];
  constructor(private mail:MailboxService) { }

  ngOnInit() {
    this.mail.message_loading().subscribe((data:any)=>{
      for(let objeto of data){
        for(let values in objeto){
          let info_user = objeto[values];
          let us_message:Mensaje = {
            name:`${info_user.name} ${info_user.lastName}`,
            lastName:info_user.lastName,
            descripcion:info_user.descripcion,
            comentario:info_user.comentario
          };
          this.mensajes.push(us_message);
        }
      }
    })
  }
  sent(){
    
  }
}
