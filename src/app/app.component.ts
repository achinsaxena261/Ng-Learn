import { Component, ElementRef } from '@angular/core';
import { GetService } from './Services/app.service';
import { Router } from '@angular/router';
import { NavService } from './Services/share.service';
import { Observable } from 'rxjs/Rx';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css','../bootstrap/css/bootstrap.min.css','./Stylesheets/animate.css'],
  providers : [GetService],
  host : {
    '(window:scroll)' : 'updateHeader($event)'
  }
})
export class AppComponent {
  expand : boolean;
  HeaderData : object[];
  SearchData : object[];
  ShowSearch : boolean;
  ShowResults : boolean;  
  barColor : string;
  IsScroll : boolean;
  constructor(private GetService : GetService, private router : Router ,private NavService : NavService,private elementRef : ElementRef)
  {
    this.expand = false;
    this.ShowSearch = false;
    this.ShowResults = false;
    this.barColor = 'rgba(255, 255, 255, 0.5)';
    this.SearchData = [];
    this.IsScroll = false;
    GetService.getTechnologies().subscribe(data => { 
      this.HeaderData = data.$values;
      this.FormatSearchData(this.HeaderData);
    });
    this.ChangeColor(NavService.GetValue());
    NavService.navUpdated.subscribe((value)=> this.ChangeColor(NavService.GetValue())); 
  }

  updateHeader(evt) {
    if (window.pageYOffset > this.elementRef.nativeElement.querySelector('.slide').height) {
      if (!this.IsScroll) {
        this.IsScroll = true;
        this.ChangeColor(0);
      }
    }
     else{
       if (this.IsScroll) {
          this.IsScroll = false;
          this.ChangeColor(this.NavService.GetValue())
       }
     }
  }

  ChangeColor(index:number)
  {
      if(index == 2 && !this.IsScroll && this.router.url == "/")
      {
        this.barColor = 'rgba(5, 5, 5, 0.3)';
      }
      else if(index == 1 && !this.IsScroll && this.router.url == "/")
      {
        this.barColor = 'rgba(111, 65, 8, 0.3)';
      }
      else if(index == 3 && !this.IsScroll && this.router.url == "/")
      {
        this.barColor = 'rgba(50, 50, 125, 0.3)';
      }
      else if(index == 4 && !this.IsScroll && this.router.url == "/")
      {
        this.barColor = 'rgba(103, 8, 8, 0.3)';
      }  
      else if(index == 5 && !this.IsScroll && this.router.url == "/")
      {
        this.barColor = 'rgba(10, 99, 119, 0.35)';
      }      
      else{
        this.barColor = 'rgba(255, 255, 255, 0.4)';
      }
  }

  DisplaySearch()
  {
    if(this.ShowSearch == true){
      this.ShowSearch = false;
    }
    else{
      this.ShowSearch = true;
    }    
  }

  FormatSearchData(data)
  {
      for (var i=0;i<data.length;i++) {
        for(var j=0;j<data[i].subjects.$values.length;j++)
        {
          this.SearchData.push({ domain : data[i].domain, child : data[i].subjects.$values[j]});
        }
      }
  }
  ViewResults(term)
  {
    if(term.trim() === ""){
      this.ShowResults = false;
    }
    else{
      this.ShowResults = true;
    }    
  }


  ExpandBar()
  {
    if(this.expand == true){
      this.expand = false;
    }
    else{
      this.expand = true;
    }
  }

}
