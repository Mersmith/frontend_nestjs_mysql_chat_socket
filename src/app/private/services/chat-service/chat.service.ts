import { Injectable } from '@angular/core';
import { CustomSocket } from '../../sockets/custom-socket';
import { RoomI, RoomPaginateI } from 'src/app/model/room.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private socket: CustomSocket) { }

  sendMessage() { }

  getMessage() {
    return this.socket.fromEvent('message');
  }

  getMyRooms(): Observable<RoomPaginateI> {
    return this.socket.fromEvent<RoomPaginateI>('rooms');//Obtiene un Observable que escucha el evento 'rooms' del socket.
  }

  createRoom(room: RoomI) {
    this.socket.emit('createRoom', room);
  }

  emitPaginateRooms(cantidadDeSalasPorPaginacion: number, paginacionActualDeSalas: number) {
    this.socket.emit('paginateRooms', { cantidadDeSalasPorPaginacion, paginacionActualDeSalas });
  }

}
