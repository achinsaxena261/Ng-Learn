import { Component, ElementRef } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
    selector: 'app-forum',
    templateUrl: './forum.component.html',
    styleUrls: ['./forum.component.css', '../../bootstrap/css/bootstrap.min.css', '../Stylesheets/animate.css']
})

export class forumComponent {
    gender: string;
    active: number;
    visible: boolean;
    X: number;
    Y: number;
    shiftX: string;
    shiftY: string;
    constructor(private elementRef: ElementRef,private oAuthService: OAuthService) {
        this.active = 0;
        this.visible = true;
        this.shiftX = "305px";
        this.shiftY = "139px";
        this.gender = ""; 
        this.oAuthService.tryLogin({
            onTokenReceived: context => {
                //
                // Output just for purpose of demonstration
                // Don't try this at home ... ;-)
                // 
                console.log("logged in");
                console.log(context.idToken);
                this.visible = false;
            },
            //validationHandler: context => {
                // var search = new URLSearchParams();
                // search.set('token', context.idToken); 
                // search.set('client_id', oauthService.clientId);
                // return http.get(validationUrl, { search}).toPromise();
            //}
        });               
    }

    public login() {
        this.oAuthService.initImplicitFlow();
        this.oAuthService.tryLogin({
            onTokenReceived: context => {
                //
                // Output just for purpose of demonstration
                // Don't try this at home ... ;-)
                // 
                console.log("logged in");
                console.log(context);
            },
            validationHandler: context => {
                console.log(context.idToken);
                // var search = new URLSearchParams();
                // search.set('token', context.idToken); 
                // search.set('client_id', oauthService.clientId);
                // return http.get(validationUrl, { search}).toPromise();
            }
        });
    }
    
    public logoff() {
        this.oAuthService.logOut();
    }
    
    public get name() {
        let claims = this.oAuthService.getIdentityClaims();
        if (!claims) return null;
        return claims.given_name; 
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