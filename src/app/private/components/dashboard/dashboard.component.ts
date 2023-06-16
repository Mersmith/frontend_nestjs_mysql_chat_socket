import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat-service/chat.service';
import { RoomI } from 'src/app/model/room.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {

  title = this.chatService.getMessage();

  rooms = this.chatService.getMyRooms();

  selectedRoom: RoomI | null = null;

  currentPage = 1;
  pageSize = 10;

  constructor(
    private chatService: ChatService
  ) { }

  ngOnInit(): void {
    /*this.chatService.createRoom();
    console.log("m***************************createRoom***************************");
    console.log(this.rooms);     
    */
  }

  ngAfterViewInit() {
    this.chatService.emitPaginateRooms(10, 0)
  }

  getRooms() {
    this.chatService.emitPaginateRooms(this.pageSize, this.currentPage);
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getRooms();
    }
  }

  nextPage() {
    this.currentPage++;
    this.getRooms();
  }

  onRoomSelectionChange(event: Event) {
    const selectedRoomString: string = (event.target as HTMLInputElement).value;
    const selectedRoom: RoomI = JSON.parse(selectedRoomString);
    console.log(selectedRoom.id);
    this.selectedRoom = selectedRoom;
  }

}
