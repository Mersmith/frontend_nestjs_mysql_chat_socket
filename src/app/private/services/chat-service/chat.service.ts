import { Injectable } from '@angular/core';
import { CustomSocket } from '../../sockets/custom-socket';
import { RoomI, RoomPaginateI } from 'src/app/model/room.interface';
import { Observable } from 'rxjs';
import { MensajeI, MensajePaginacionI } from 'src/app/model/mensaje.interface';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(
    private socket: CustomSocket
  ) { }

  traerMensajeAgregado(): Observable<MensajeI> {
    return this.socket.fromEvent<MensajeI>('messageAdded');
  }

  enviarMensaje(mensaje: MensajeI) {
    this.socket.emit('addMessage', mensaje)
  }

  unirseASalaChat(room: RoomI) {
    this.socket.emit('joinRoom', room);
  }

  dejarLaSalaChat(room: RoomI) {
    this.socket.emit('leaveRoom', room);
  }

  getMessage() {
    return this.socket.fromEvent('message');
  }

  traerMensajes(): Observable<MensajePaginacionI> {
    return this.socket.fromEvent<MensajePaginacionI>('messages');
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
