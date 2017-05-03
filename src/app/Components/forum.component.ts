import { Component, ElementRef } from '@angular/core';

@Component({
    selector: 'app-forum',
    templateUrl: './forum.component.html',
    styleUrls: ['./forum.component.css', '../../bootstrap/css/bootstrap.min.css', '../Stylesheets/animate.css']
})

export class forumComponent {

    constructor(private elementRef : ElementRef) {

    }

}