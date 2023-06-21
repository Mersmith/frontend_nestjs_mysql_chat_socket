import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap, tap, of } from 'rxjs';
import { UserI } from 'src/app/model/user.interface';
import { UserService } from 'src/app/public/services/user-service/user.service';

@Component({
  selector: 'app-select-us',
  templateUrl: './select-us.component.html',
  styleUrls: ['./select-us.component.css']
})
export class SelectUsComponent implements OnInit {

  @Input() usuariosSalaChat: UserI[] = [];
  @Output() agregarUsuarioEvento: EventEmitter<UserI> = new EventEmitter<UserI>();
  @Output() quitarUsuarioEvento: EventEmitter<UserI> = new EventEmitter<UserI>();

  buscarPorNombreUsuario = new FormControl();
  usuariosFiltrados: UserI[] = [];
  usuarioSeleccionado: UserI = {};
  seRealizoBusqueda = false;

  constructor(private usuarioServicio: UserService) { }

  ngOnInit(): void {
    this.buscarPorNombreUsuario.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((username: string) => {
        if (username?.trim() === '') {
          this.usuariosFiltrados = [];
          this.seRealizoBusqueda = false;
          return of([]);
        }

        return this.usuarioServicio.findByUsername(username).pipe(
          tap((usuariosSalaChat: UserI[]) => {
            this.usuariosFiltrados = usuariosSalaChat;
            this.seRealizoBusqueda = true;
          })
        )
      }
      )
    ).subscribe();
  }

  agregarUsuarioAFormulario(): void {
    console.log("agregarUsuarioAFormulario: ", this.usuarioSeleccionado);

    this.agregarUsuarioEvento.emit(this.usuarioSeleccionado);
    this.usuariosFiltrados = [];
    this.usuarioSeleccionado = {};
    this.buscarPorNombreUsuario.setValue(null);
  }

  quitarUsuarioDeFormulario(user: UserI): void {
    this.quitarUsuarioEvento.emit(user);
  }

  seleccionarUsuario(userParametro: UserI): void {
    this.usuarioSeleccionado = userParametro;
    console.log("seleccionarUsuario: ", userParametro);
  }

  borrarBusquedaUsario(): void {
    this.buscarPorNombreUsuario.setValue('');
    this.usuariosFiltrados = [];
    this.seRealizoBusqueda = false;
  }

}
