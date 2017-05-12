import { Component, ElementRef } from '@angular/core';

@Component({
    selector: 'app-forum',
    templateUrl: './forum.component.html',
    styleUrls: ['./forum.component.css', '../../bootstrap/css/bootstrap.min.css', '../Stylesheets/animate.css']
})

export class forumComponent {
    active:number;
    constructor(private elementRef : ElementRef) {
        this.active = 1;
    }

}