import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
    name : 'safe'
})

export class SafePipe implements PipeTransform{
    constructor(private sanitizer : DomSanitizer){ }
    transform(url){
        var newurl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
        console.log(newurl);
        return newurl;
    }
}