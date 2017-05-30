import { Component, ElementRef, Inject, OnInit } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { AuthService } from '../Services/forum.service';
import { NavService } from '../Services/share.service';
import { Observable } from 'rxjs/Rx';
import { DOCUMENT } from '@angular/platform-browser';
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
    isError: boolean;
    isWrong: boolean;
    ErrorMsg: string;
    X: number;
    Y: number;
    shiftX: string;
    shiftY: string;
    apiEndPoint: string;
    imgPath: string;
    constructor( @Inject(DOCUMENT) private document, private route: ActivatedRoute, private elementRef: ElementRef, private navService: NavService, private oAuthService: OAuthService, private http: Http, private authService: AuthService) {
        this.oAuthService.tryLogin({
            onTokenReceived: context => {
                authService.SetToken(context.accessToken);
                authService.GetUserInfo(context.accessToken).subscribe(data => {
                    this.authenticateUser({ name: data.name, email: data.email, gender: data.gender, img: data.picture });
                });
                this.visible = false;
            },
            validationHandler: context => {
                return http.get("https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=" + context.accessToken).toPromise();
            }
        });
    }

    ngOnInit() {
        this.active = 0;
        this.shiftX = "305px";
        this.shiftY = "139px";
        this.gender = "";
        this.isError = false;
        this.isWrong = false;
        this.ErrorMsg = "";
        this.imgPath = "";
        this.apiEndPoint = "http://"+ document.location.hostname +"/NgLearnService/api/UploadFileApi";
        if (this.navService.GetSession().name != '') {
            this.visible = false;
        }
        else {
            this.visible = true;
        }
    }

    loginUser(email: string, pwd: string) {
        this.authService.ValidateUser(email, pwd).subscribe(data => { this.authenticateUser(data) },
            error => { this.isError = true; });
    }

    private authenticateUser(user: any) {
        this.authService.setCookie('ngLearn', user, 1);
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

    fileChange(event) {
        let fileList: FileList = event.target.files;
        if (fileList.length > 0) {
            let file: File = fileList[0];
            let formData: FormData = new FormData();
            formData.append('uploadFile', file, file.name);
            let headers = new Headers()
            //headers.append('Content-Type', 'json');  
            //headers.append('Accept', 'application/json');  
            let options = new RequestOptions({ headers: headers });
            this.http.post(this.apiEndPoint, formData, options)
                .map(res => res.json())
                .catch(error => Observable.throw(error))
                .subscribe(
                data => this.imgPath = data,
                error => console.log(error)
                )
        }
    }

    RegisterUser(fname: string, lname: string, pwd1: string, pwd2: string, email: string) {
        if (pwd1 != pwd2) {
            this.isWrong = true;
            this.ErrorMsg = "Both passwords should be same, try again";
            return;
        }
        let headers = new Headers()
        headers.append('Content-Type', 'json');
        headers.append('Accept', 'application/json');
        let options = new RequestOptions({ headers: headers });
        this.http.post('http://' + document.location.hostname + '/NgLearnService/api/user?name=' + fname +'%20'+ lname + '&gender=' + this.gender + '&email=' + email + '&pwd=' + btoa(pwd1),'')
            .map(res => res.json())
            .catch(error => Observable.throw(error))
            .subscribe(
            data => alert(data),
            error => alert(error)
            )
    }
}