import { Component } from '@angular/core';
import { GetService } from './Services/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css','../bootstrap/css/bootstrap.min.css','./Stylesheets/animate.css'],
  providers : [GetService],
})
export class AppComponent {
  expand : boolean;
  HeaderData : object[];
  SearchData : object[];
  ShowSearch : boolean;
  ShowResults : boolean;  
  constructor(private GetService : GetService)
  {
    this.expand = false;
    this.ShowSearch = false;
    this.ShowResults = false;
    this.SearchData = [];
    GetService.getTechnologies().subscribe(data => { 
      this.HeaderData = data.$values;
      this.FormatSearchData(this.HeaderData);
    })
  };


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
        for(var j=0;j<data[i].Subjects.$values.length;j++)
        {
          this.SearchData.push({ domain : data[i].domain, child : data[i].Subjects.$values[j]});
        }
      }
      console.log(this.SearchData);
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
