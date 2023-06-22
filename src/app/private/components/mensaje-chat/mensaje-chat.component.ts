import { Component, Input } from '@angular/core';
import { MensajeI } from 'src/app/model/mensaje.interface';
import { UserI } from 'src/app/model/user.interface';
import { AuthService } from 'src/app/public/services/auth-service/auth.service';

@Component({
  selector: 'app-mensaje-chat',
  templateUrl: './mensaje-chat.component.html',
  styleUrls: ['./mensaje-chat.component.css']
})
export class MensajeChatComponent {

  @Input()
  message!: MensajeI;

  user: UserI = this.authServicio.getLoggedInUser();

  constructor(
    private authServicio: AuthService
  ) { }
}
