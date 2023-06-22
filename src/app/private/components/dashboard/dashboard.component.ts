import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat-service/chat.service';
import { RoomI, RoomPaginateI } from 'src/app/model/room.interface';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/public/services/auth-service/auth.service';
import { UserI } from 'src/app/model/user.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {

  tituloSocket = this.chatServicio.getMessage();

  user: UserI = this.authService.getLoggedInUser();

  salaSocketObservable: Observable<RoomPaginateI> = this.chatServicio.getMyRooms();
  salasDataPaginadas: RoomPaginateI | null = null;
  salaChatSeleccionada: RoomI | null = null;

  cantidadDeSalasPorPaginacion = 10;
  paginacionActualDeSalas = 0;// Es la página 1

  constructor(
    private chatServicio: ChatService,
    private authService: AuthService
  ) { }

  //Se ejecuta después de que Angular haya inicializado todas las propiedades vinculadas a datos de una directiva.
  ngOnInit(): void {
    this.salaSocketObservable.subscribe((dataSalasChat: RoomPaginateI) => {
      this.salasDataPaginadas = dataSalasChat;
    });
  }

  //Se ejecuta después de que Angular haya inicializado completamente la vista de un componente.
  ngAfterViewInit() {
    //Se emite el evento 'paginateRooms' utilizando el método emitPaginateRooms del servicio ChatService.
    this.chatServicio.emitPaginateRooms(this.cantidadDeSalasPorPaginacion, this.paginacionActualDeSalas)
  }

  traerSalasChat() {
    this.chatServicio.emitPaginateRooms(this.cantidadDeSalasPorPaginacion, this.paginacionActualDeSalas);
  }

  seleccionarSalaChat(event: Event) {
    const selectedRoomString: string = (event.target as HTMLInputElement).value;
    const salaChatSeleccionada: RoomI = JSON.parse(selectedRoomString);
    this.salaChatSeleccionada = salaChatSeleccionada;
    console.log(salaChatSeleccionada);
  }

  retrocederPaginaSalaChat() {
    if (this.paginacionActualDeSalas > 0) {
      this.paginacionActualDeSalas--;
      this.traerSalasChat();
    }
  }

  siguientePaginaSalaChat() {
    const totalPages = this.salasDataPaginadas?.meta.totalPages ?? 0;
    const currentPage = this.salasDataPaginadas?.meta.currentPage ?? 0;
    if (totalPages >= currentPage + 1) {
      this.paginacionActualDeSalas++;
      this.traerSalasChat();
    }
  }

}
