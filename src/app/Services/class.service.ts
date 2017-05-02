import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import {DOCUMENT} from '@angular/platform-browser';
import 'rxjs/add/operator/map';

@Injectable()
export class GetVideos {
    constructor(@Inject(DOCUMENT) private document,private http : Http){
        console.log('Service initialized..');
    }
    getTutorials(param:number){
        return this.http.get('http://'+ document.location.hostname +'/NgLearnService/api/tutorials/'+param).map(res => res.json());
    }
}