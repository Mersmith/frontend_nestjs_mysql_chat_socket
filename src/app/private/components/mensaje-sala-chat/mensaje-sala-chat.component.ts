import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { combineLatest, Observable } from 'rxjs';
import { map, startWith, tap } from 'rxjs/operators';
import { MensajePaginacionI } from 'src/app/model/mensaje.interface';
import { RoomI } from 'src/app/model/room.interface';
import { ChatService } from '../../services/chat-service/chat.service';

@Component({
  selector: 'app-mensaje-sala-chat',
  templateUrl: './mensaje-sala-chat.component.html',
  styleUrls: ['./mensaje-sala-chat.component.css']
})
export class MensajeSalaChatComponent implements OnChanges, OnDestroy, AfterViewInit {

  @Input()
  chatRoom: RoomI | null = null;

  @ViewChild('messages', { static: true })
  private messagesScroller!: ElementRef<any>;

  chatMessage: FormControl = new FormControl(null, [Validators.required]);

  messagesPaginate$: Observable<MensajePaginacionI> = combineLatest(
    [
      this.chatService.traerMensajes(),
      this.chatService.traerMensajeAgregado().pipe(startWith(null))
    ]).pipe(
      map(([messagePaginate, message]) => {
        if (message && message.room.id === this.chatRoom?.id && !messagePaginate.items.some(m => m.id === message.id)) {
          messagePaginate.items.push(message);
        }
        const items = messagePaginate.items.sort((a, b) => {
          const dateA = a.created_at ? new Date(a.created_at) : null;
          const dateB = b.created_at ? new Date(b.created_at) : null;
          return dateA && dateB ? dateA.getTime() - dateB.getTime() : 0;
        });
        messagePaginate.items = items;
        return messagePaginate;
      }),
      tap(() => this.scrollToBottom())
    ) 

  constructor(
    private chatService: ChatService
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    this.chatService.dejarLaSalaChat(changes['chatRoom'].previousValue);
    if (this.chatRoom) {
      this.chatService.unirseASalaChat(this.chatRoom);
    }
  }

  ngAfterViewInit() {
    if (this.messagesScroller) {
      this.scrollToBottom();
    }
  }

  ngOnDestroy() {
    if (this.chatRoom) {
      this.chatService.dejarLaSalaChat(this.chatRoom);
    }
  }

  sendMessage() {
    if (this.chatRoom) {
      this.chatService.enviarMensaje({ text: this.chatMessage.value, room: this.chatRoom });
      this.chatMessage.reset();
    }
  }

  scrollToBottom(): void {
    try {
      setTimeout(() => { this.messagesScroller.nativeElement.scrollTop = this.messagesScroller.nativeElement.scrollHeight }, 1);
    } catch { }

  }

}
