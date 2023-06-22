import { Meta } from "@angular/platform-browser";
import { RoomI } from "./room.interface";
import { UserI } from "./user.interface";

export interface MensajeI {
    id?: number;
    text: string;
    user?: UserI;
    room: RoomI;
    created_at?: Date;
    updated_at?: Date;
}

export interface MensajePaginacionI {
    items: MensajeI[];
    meta: Meta;
}