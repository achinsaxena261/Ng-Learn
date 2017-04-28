import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class GetVideos {
    constructor(private http : Http){
        console.log('Service initialized..');
    }
    getTutorials(param:number){
        return this.http.get('http://localhost/NgLearnService/api/tutorials/'+param).map(res => res.json());
    }
}