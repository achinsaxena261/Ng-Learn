import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class GetService {
    constructor(private http : Http){
        console.log('Service initialized..');
    }
    getTechnologies(){
        return this.http.get('http://localhost/NgLearnService/api/technologies').map(res => res.json());
    }
}

