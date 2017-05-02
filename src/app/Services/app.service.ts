import { Injectable,Inject } from '@angular/core';
import { Http } from '@angular/http';
import {DOCUMENT} from '@angular/platform-browser';
import 'rxjs/add/operator/map';

@Injectable()
export class GetService {
    constructor(@Inject(DOCUMENT) private document,private http : Http){
        console.log('Service initialized..');
    }
    getTechnologies(){
        return this.http.get('http://'+ document.location.hostname +'/NgLearnService/api/technologies').map(res => res.json());
    }
}

