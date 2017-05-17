import { Component, ElementRef, OnDestroy } from '@angular/core';
import { NavService } from '../Services/share.service';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-home',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css', '../../bootstrap/css/bootstrap.min.css', '../Stylesheets/animate.css']
})
export class UserComponent implements OnDestroy {

  slides: SliderData[];
  current: number;
  forward: boolean;
  item: number;
  scrollPos : number;
  public subscriber: any = {};
  constructor(private scrollContainer: ElementRef, private NavService: NavService) {
    this.slides = [];
    this.current = 0;
    this.forward = true;
    this.item = 0;
    this.scrollPos = 1;
    this.slides.push({ index: 0, url: '../../assets/images/slide1.jpg', active: true, prev: false, title: "Forget the Complexity now", message: "Helps you to make learning about any technology easier and effective" });
    this.slides.push({ index: 1, url: '../../assets/images/slide2.jpg', active: false, prev: false, title: "Always be with us", message: "Stay connected with us to get the information of the new technologies" });
    this.slides.push({ index: 2, url: '../../assets/images/slide3.jpg', active: false, prev: false, title: "Time is money", message: "Save your time, we are the one stop for all technical learnings" });
    this.slides.push({ index: 3, url: '../../assets/images/slide4.jpg', active: false, prev: false, title: "Be from Good to Great", message: "Give yourself the chance to be versatile and highly valuable" });
    this.slides.push({ index: 4, url: '../../assets/images/slide5.jpg', active: false, prev: false, title: "Play, stop, practice & repeat", message: "Start whenever and wherever you want, learn offline by download & play" });
    this.slides.push({ index: 5, url: '../../assets/images/slide6.jpg', active: false, prev: true, title: "Take the challange & beat it", message: "Join the quiz and test yourself, we will help you to get the desired mark" });
    this.update(this.current);
    this.subscriber = Observable.interval(5000).subscribe(() => this.update(null));
  }

  ngOnDestroy() {
    this.update(0);
    this.subscriber.unsubscribe();
  }

  scrollToBottom(): void {
    try {
      window.scrollBy(0, this.scrollPos);
      if(this.scrollPos<38)
      {
        setTimeout(() => { this.scrollToBottom() }, 10);
      }
      else{
        this.scrollPos = 1;
      }
      this.scrollPos = this.scrollPos + 1;
    } catch (err) { }
  }

  update(param: number) {
    if (param != null && param != undefined) {
      if (param - this.current >= 0) { this.forward = true; }
      else { this.forward = false; }
      this.current = param;
    }
    else {
      this.forward = true;
    }
    if (this.current > this.slides.length - 1) { this.current = 0; }
    this.NavService.SetValue(this.current);
    for (let x of this.slides) {
      if (x.index == this.current) {
        this.slides[x.index].active = true;
        if (x.index == 0) { this.slides[this.slides.length - 1].prev = true; }
        else { this.slides[x.index - 1].prev = true; }
      }
      else {
        this.slides[x.index].active = false;
        if (x.index == 0) { this.slides[this.slides.length - 1].prev = false; }
        else { this.slides[x.index - 1].prev = false; }
      }
    }
    this.current++;
  }

  SetStyle(param: number) {
    if (param == 1) {
      return '#32ec18';
    }
    else if (param == 2) {
      return '#f43636';
    }
    else if (param == 3) {
      return '#55f';
    }
    else {
      return '#fff';
    }
  }
}

interface SliderData {
  index: number,
  url: string,
  active: boolean,
  prev: boolean,
  title: string,
  message: string
}
