import { Component,ElementRef, ViewChild, } from '@angular/core';
import { Observable } from 'rxjs/Rx'

@Component({
  selector: 'app-child',
  templateUrl: './user.component.html',
  styleUrls : ['./user.component.css','../../bootstrap/css/bootstrap.min.css','../Stylesheets/animate.css']
})
export class UserComponent {

  slides : SliderData[];
  current : number;
  forward : boolean;
  constructor(private scrollContainer : ElementRef) {
    this.slides = [];
    this.current = 0;
    this.forward = true;
    this.slides.push({ index : 0,url : '../../assets/images/slide1.jpg',active : false, prev : false, title: "Forget the Complexity now", message: "Helps you to make learning about any technology easier and effective" });
    this.slides.push({ index : 1,url : '../../assets/images/slide2.jpg',active : false, prev : false, title: "Always be with us", message: "Stay connected with us to get the information of the new technologies"  });
    this.slides.push({ index : 2,url : '../../assets/images/slide3.jpg',active : false, prev : false, title: "Time is money", message: "Save your time, we are the one stop for all technical learnings"  });
    this.slides.push({ index : 3,url : '../../assets/images/slide4.jpg',active : false, prev : false, title: "Be from Good to Great", message: "Give yourself the chance to be versatile and highly valuable"  });
    this.slides.push({ index : 4,url : '../../assets/images/slide5.jpg',active : false, prev : false, title: "Play, stop, practise & repeat", message: "Start whenever and wherever you want, learn offline by download & play"  });
    this.slides.push({ index : 5,url : '../../assets/images/slide6.jpg',active : false, prev : false, title: "Take the challange and beat it", message: "Join the quiz and test yourself, we will help you to get the desired mark"  });
    Observable.interval(5000).subscribe(()=> this.update(null));
  }

      scrollToBottom(): void {
        try {
            this.scrollContainer.nativeElement.querySelector('.footer').scrollIntoView({ behaviour : 'smooth' });
        } catch(err) { }                 
    }

  update(param : number){
    if(param != null && param != undefined){ 
      if(param - this.current >= 0){ this.forward = true; }
      else{ this.forward = false; }
      console.log(this.forward);
      this.current = param; 
    }
    else{
      this.forward = true;
    }
    
    if(this.current > this.slides.length -1){ this.current = 0; }
    for(let x of this.slides){
        if(x.index == this.current)
        {
          this.slides[x.index].active = true;
          if(x.index == 0){ this.slides[this.slides.length -1].prev = true; }
          else{ this.slides[x.index - 1].prev = true; }
        }
        else{
          this.slides[x.index].active = false;
          if(x.index == 0){ this.slides[this.slides.length -1].prev = false; }
          else{ this.slides[x.index - 1].prev = false; }          
        }
    }   
    this.current++;
  }


}

interface SliderData{
  index : number,
  url : string,
  active : boolean,
  prev : boolean,
  title : string,
  message: string
}