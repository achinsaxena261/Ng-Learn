import { Component, ElementRef } from '@angular/core';
import { GetVideos  } from '../Services/class.service';
import { GetService  } from '../Services/app.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';

@Component({
    selector : 'app-classroom',
    templateUrl : './class.component.html',
    providers : [GetVideos,GetService],
    styleUrls : ['./class.component.css','../../bootstrap/css/bootstrap.min.css','../Stylesheets/animate.css']
})

export class ClassComponent {
    Tokens : string[];
    index : number;
    ddlData : object[];
    topic : number;
    playlist : object[];
    Url : string;
    Playing : number;
    constructor(private route : ActivatedRoute,private elementRef : ElementRef,private getVideos : GetVideos,private getList : GetService)
    {
        var text = "&lt;% @ P a g e &nbsp;L a n g u a g e =\"C#\" %&gt; <br><br> &lt;h t m l&gt <br>"
        +"&nbsp;&lt;b o d y&gt; <br> &nbsp;&nbsp;&lt; i n p u t&nbsp; t y p e = \"t e x t \" /&gt;<br>&nbsp;&lt;/b o d y&gt;<br> &lt;/h t m l&gt";
        this.index = 0;
        this.ddlData = [];
        this.topic = 0;
        this.Url = "https://www.youtube.com/embed/";
        this.Tokens = text.split(" ");

        this.route.params.subscribe((params) => {
           if(params.id != undefined){
                this.topic = params.id;
                this.CreatePlaylist(this.topic);
           }
        })
        getList.getTechnologies().subscribe((data)=>{
            var arrList = data.$values;
            for (var i=0;i<arrList.length;i++) {
                for(var j=0;j<arrList[i].subjects.$values.length;j++)
                {
                this.ddlData.push({ domain : arrList[i].domain, child : arrList[i].subjects.$values[j]});
                }
            }
        });
        Observable.interval(200).subscribe(()=> this.printText());
    }

    printText(){
        if(this.index < this.Tokens.length)
        {
            //this.BoardText += this.Tokens[this.index];
            this.elementRef.nativeElement.querySelector('.text').insertAdjacentHTML('beforeend',this.Tokens[this.index]);
            this.index++;
        }
        else
        {
            this.index = 0;
            this.elementRef.nativeElement.querySelector('.text').innerHTML = "";
        }
    }

    CreatePlaylist(param:number)
    {
        this.Playing = 0;
        this.getVideos.getTutorials(param).subscribe((data) => {
            this.playlist = data.$values;
        });
    }

    PlayVideo(id:number,url: string)
    {
        this.Playing = id;
        this.Url = "https://www.youtube.com/embed/"+url;
    }

}