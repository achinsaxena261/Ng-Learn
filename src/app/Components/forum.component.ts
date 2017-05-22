import { Component, ElementRef, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { AuthService } from '../Services/forum.service';
import { NavService } from '../Services/share.service';
import 'rxjs/add/operator/map';

@Component({
    selector: 'app-forum',
    templateUrl: './forum.component.html',
    styleUrls: ['./forum.component.css', '../../bootstrap/css/bootstrap.min.css', '../Stylesheets/animate.css']
})

export class forumComponent implements OnInit {
    gender: string;
    active: number;
    visible: boolean;
    isError : boolean;
    X: number;
    Y: number;
    shiftX: string;
    shiftY: string;
    constructor(private route : ActivatedRoute,private elementRef: ElementRef,private navService:NavService, private oAuthService: OAuthService,private http : Http,private authService : AuthService) {
        this.oAuthService.tryLogin({
            onTokenReceived: context => {
                authService.SetToken(context.accessToken);
                authService.GetUserInfo(context.accessToken).subscribe(data => {
                   this.authenticateUser({ name:data.name, email:data.email,gender:data.gender,img:data.picture });
                } );
                this.visible = false;
            },
            validationHandler: context => {
                return http.get("https://www.googleapis.com/oauth2/v3/tokeninfo?access_token="+context.accessToken).toPromise();
            }
        });                    
    }

    ngOnInit()
    {
        this.active = 0;
        this.shiftX = "305px";
        this.shiftY = "139px";
        this.gender = ""; 
        this.isError = false;
        if (this.navService.GetSession().name != '') {
            this.visible = false;
        }
        else {
            this.visible = true;
        }          
    }

    loginUser(email : string,pwd : string)
    {
        this.authService.ValidateUser(email,pwd).subscribe(data=> { this.authenticateUser(data) },
        error => { this.isError = true; });
    }

    private authenticateUser(user : any)
    {        
        this.authService.setCookie('ngLearn',user,1);
        this.navService.SetSession(this.authService.getCookie());
        this.isError = false;
        this.visible = false;
    }

    public login() {
        this.oAuthService.initImplicitFlow();
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