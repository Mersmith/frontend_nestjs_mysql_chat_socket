import { Component, Input } from '@angular/core';
import { MensajeI } from 'src/app/model/mensaje.interface';

@Component({
  selector: 'app-mensaje-chat',
  templateUrl: './mensaje-chat.component.html',
  styleUrls: ['./mensaje-chat.component.css']
})
export class MensajeChatComponent {

  @Input()
  message!: MensajeI;
}
