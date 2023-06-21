import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserI } from 'src/app/model/user.interface';
import { ChatService } from '../../services/chat-service/chat.service';

@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.css']
})
export class CreateRoomComponent {

  formularioCrearSalaChat: FormGroup = new FormGroup({
    nombreSalaChat: new FormControl(null, [Validators.required]),
    descripcionSalaChat: new FormControl(null),
    usuariosSalaChat: new FormArray([], [Validators.required])
  });

  usuarioInicial(usuarioSalaChat: UserI) {
    return new FormControl({
      id: usuarioSalaChat.id,
      username: usuarioSalaChat.username,
      email: usuarioSalaChat.email
    });
  }

  constructor(
    private chatServicio: ChatService,
    private enrutador: Router,
    private rutaActivada: ActivatedRoute
  ) { }

  crearSalaChat() {
    if (this.formularioCrearSalaChat.valid) {
      this.chatServicio.createRoom({
        name: this.nombreSalaChat.value,
        description: this.descripcionSalaChat.value,
        users: this.usuariosSalaChat.value
      });
      this.enrutador.navigate(['../dashboard'], { relativeTo: this.rutaActivada });
    }
  }

  agregarUsuarioASala(usuarioFormularioControl: FormControl) {
    this.usuariosSalaChat.push(usuarioFormularioControl);
  }

  quitarUsuarioDeSala(usuarioIdSalaChat: number | undefined) {
    if (usuarioIdSalaChat) {
      this.usuariosSalaChat.removeAt(this.usuariosSalaChat.value.findIndex((userItem: UserI) => userItem.id === usuarioIdSalaChat));
    }
  }

  get nombreSalaChat(): FormControl {
    return this.formularioCrearSalaChat.get('nombreSalaChat') as FormControl;
  }

  get descripcionSalaChat(): FormControl {
    return this.formularioCrearSalaChat.get('descripcionSalaChat') as FormControl;
  }

  get usuariosSalaChat(): FormArray {
    return this.formularioCrearSalaChat.get('usuariosSalaChat') as FormArray;
  }

}
