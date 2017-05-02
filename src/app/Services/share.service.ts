import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class NavService{
    value : number;
    navUpdated : EventEmitter<number> = new EventEmitter();
    constructor()
    {
        this.value = 0;
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
}