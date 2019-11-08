import { Component, OnInit } from '@angular/core';
import { Mensaje } from '../../models/mesajes_models';
import { MailboxService } from '../../services/mailbox.service';

@Component({
  selector: 'app-su',
  templateUrl: './su.page.html',
  styleUrls: ['./su.page.scss'],
})
export class SuPage implements OnInit {

  sender = {} as Mensaje;
  constructor(private mail:MailboxService) { }

  ngOnInit() {
  }
  sent(){
    
  }
}
