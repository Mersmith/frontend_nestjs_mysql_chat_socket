import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrivateRoutingModule } from './private-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CreateRoomComponent } from './components/create-room/create-room.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SelectUsComponent } from './components/select-us/select-us.component';
import { MensajeSalaChatComponent } from './components/mensaje-sala-chat/mensaje-sala-chat.component';
import { MensajeChatComponent } from './components/mensaje-chat/mensaje-chat.component';


@NgModule({
  declarations: [
    DashboardComponent,
    CreateRoomComponent,
    SelectUsComponent,
    MensajeSalaChatComponent,
    MensajeChatComponent
  ],
  imports: [
    CommonModule,
    PrivateRoutingModule,
    ReactiveFormsModule
  ]
})
export class PrivateModule { }
