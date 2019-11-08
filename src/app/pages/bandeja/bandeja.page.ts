import { Component, OnInit } from '@angular/core';
import { MailboxService } from '../../services/mailbox.service';

@Component({
  selector: 'app-bandeja',
  templateUrl: './bandeja.page.html',
  styleUrls: ['./bandeja.page.scss'],
})
export class BandejaPage implements OnInit {

  constructor(private mail:MailboxService) { }

  ngOnInit() {
    this.mail.message_loading().subscribe((data)=>{
      console.log(data);
    })
  }

}
