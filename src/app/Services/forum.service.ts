import { Injectable,Inject, EventEmitter } from '@angular/core';
import { Http } from '@angular/http';
import {DOCUMENT} from '@angular/platform-browser';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService{
    token : string;
    constructor(@Inject(DOCUMENT) private document,private http : Http)
    {   }
    GetToken()
    {
        return this.token;
    }
    SetToken(token: string)
    {
        this.token = token;
    }
    
    GetUserInfo(token : string)
    {
        return this.http.get('https://www.googleapis.com/oauth2/v3/userinfo?access_token='+token).map(res => res.json());
    }
    setCookie(name : string,userinfo: any,expireDays : number,token : string = '',path : string = '')
    {
        let d:Date = new Date();
        d.setTime(d.getTime() + expireDays * 24 * 60 * 60 * 1000);
        let expires:string = `expires=${d.toUTCString()}`;
        let cpath:string = path ? `; path=${path}` : '';  
        let value : string;
        if(userinfo != null){     
           value = `name::`+userinfo.name+'%email::'+userinfo.email+`%gender::`+userinfo.gender+`%img::`+userinfo.img;
        }
        else{
            value = ``;
        }
        document.cookie = `${name}=${value}; ${expires}${cpath}`;
    }
    getCookie()
    {
        var tokens = document.cookie.split(';');
        var userData = userData = { name: '', email: '', gender: '' };
        if (tokens.length > 2) {
            var cookieData = tokens[tokens.length - 1].trim().split('%');
            userData = { name: cookieData[0].split("::")[1], email: cookieData[1].split("::")[1], gender: cookieData[2].split("::")[1], img: cookieData[3].split("::")[1] };
        }
        return userData;
    }
    deleteCookie(name:string)
    {
        this.setCookie(name, null, -1);
    }
    ValidateUser(email:string,pwd:string)
    {
        return this.http.post('http://'+ document.location.hostname +'/NgLearnService/api/user?email='+email+'&pwd='+pwd,'').map(res => res.json());       
    }
}