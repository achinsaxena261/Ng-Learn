import { Injectable, EventEmitter } from '@angular/core';
import { AuthService } from '../Services/forum.service';

@Injectable()
export class NavService{
    value : number;
    state : any;
    navUpdated : EventEmitter<number> = new EventEmitter();
    session : EventEmitter<any> = new EventEmitter();
    constructor(private authService : AuthService)
    {
        this.value = 0;
        this.state = authService.getCookie();
    }
    GetValue()
    {
        return this.value;
    }
    SetValue(num: number)
    {
        this.value = num;
        this.navUpdated.emit(num);
    }
    SetSession(session:any)
    {
        this.state = session;
        this.session.emit(session);
    }
    GetSession()
    {
        return this.state;
    }
    ClearSession()
    {
        this.state = this.authService.getCookie();
    }
}