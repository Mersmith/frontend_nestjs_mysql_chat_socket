import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat-service/chat.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  title = this.chatService.getMessage();

  rooms = this.chatService.getMyRooms();

  constructor(
    private chatService: ChatService
  ) { }

  ngOnInit(): void {
      this.chatService.createRoom();

      console.log("m***************************createRoom***************************");
      console.log(this.rooms);
  }

}
