import { Component, ElementRef } from '@angular/core';

@Component({
    selector: 'app-forum',
    templateUrl: './forum.component.html',
    styleUrls: ['./forum.component.css', '../../bootstrap/css/bootstrap.min.css', '../Stylesheets/animate.css']
})

export class forumComponent {
    active:number;
    visible : boolean;
    X : number;
    Y : number;
    shiftX : string;
    shiftY : string;    
    constructor(private elementRef : ElementRef) {
        this.active = 0;
        this.visible = true;
        this.shiftX = "305px";
        this.shiftY = "139px";
    }

    GetPosition(event) {     
        this.X = event.clientX;
        this.Y = event.clientY;
    }
    SetPosition(event) {
        event.preventDefault();
        event.stopPropagation();
    }
    UpdatePosition(event) {
        var x = event.clientX - this.X;
        var y = event.clientY - this.Y;
        this.X = event.clientX;
        this.Y = event.clientY;
        this.shiftX = this.elementRef.nativeElement.querySelector('.model').offsetLeft + x + "px";
        this.shiftY = this.elementRef.nativeElement.querySelector('.model').offsetTop + y + "px";        
    }
}