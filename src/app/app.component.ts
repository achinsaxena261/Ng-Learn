import { Component, ElementRef, OnInit } from '@angular/core';
import { GetService } from './Services/app.service';
import { Router } from '@angular/router';
import { NavService } from './Services/share.service';
import { Observable } from 'rxjs/Rx';
import { OAuthService } from 'angular-oauth2-oidc';
import { AuthService } from './Services/forum.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', '../bootstrap/css/bootstrap.min.css', './Stylesheets/animate.css'],
  providers: [GetService],
  host: {
    '(window:scroll)': 'updateHeader($event)'
  }
})
export class AppComponent implements OnInit {
  expand: boolean;
  HeaderData: object[];
  SearchData: object[];
  ShowSearch: boolean;
  session: any;
  ShowResults: boolean;
  barColor: string;
  IsScroll: boolean;
  IsMenu: boolean;
  Init: boolean;
  constructor(private GetService: GetService, private authService: AuthService, private oauthService: OAuthService, private router: Router, private NavService: NavService, private elementRef: ElementRef) {
    GetService.getTechnologies().subscribe(data => {
      this.HeaderData = data.$values;
      this.FormatSearchData(this.HeaderData);
    });
    // URL of the SPA to redirect the user to after login
    this.oauthService.redirectUri = window.location.origin + "/connect";

    // The SPA's id. The SPA is registerd with this id at the auth-server
    this.oauthService.clientId = "223902805055-bpb9t244brstijq7vg6n276l9gscosqt.apps.googleusercontent.com";

    // set the scope for the permissions the client should request
    // The first three are defined by OIDC. The 4th is a usecase-specific one
    this.oauthService.scope = "https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile";

    // set to true, to receive also an id_token via OpenId Connect (OIDC) in addition to the
    // OAuth2-based access_token
    this.oauthService.oidc = true;

    // Use setStorage to use sessionStorage or another implementation of the TS-type Storage
    // instead of localStorage
    this.oauthService.setStorage(sessionStorage);

    // The name of the auth-server that has to be mentioned within the token
    this.oauthService.issuer = "https://accounts.google.com";

    // Load Discovery Document and then try to login the user
    this.oauthService.loadDiscoveryDocument().then(() => {
      // This method just tries to parse the token(s) within the url when
      // the auth-server redirects the user back to the web-app
      // It dosn't send the user the the login page
      this.oauthService.tryLogin({});

    });

    this.ChangeColor(NavService.GetValue());
    NavService.navUpdated.subscribe((value) => this.ChangeColor(NavService.GetValue()));
    NavService.session.subscribe((data) => this.session = data);
  }

  ngOnInit() {
    this.expand = false;
    this.ShowSearch = false;
    this.ShowResults = false;
    this.barColor = 'rgba(100, 100, 100, 0.5)';
    this.SearchData = [];
    this.IsScroll = false;
    this.IsMenu = false;
    this.Init = false;
    this.session = this.authService.getCookie();
  }

  Logout(){
    this.authService.deleteCookie('ngLearn');
    this.NavService.ClearSession();
    window.location.reload();
  }

  updateHeader(evt) {
    if (window.pageYOffset > this.elementRef.nativeElement.querySelector('.slide').height) {
      if (!this.IsScroll) {
        this.IsScroll = true;
        this.ChangeColor(0);
      }
    }
    else {
      if (this.IsScroll) {
        this.IsScroll = false;
        this.ChangeColor(this.NavService.GetValue())
      }
    }
  }

  ChangeColor(index: number) {
    if (index == 2 && !this.IsScroll && this.router.url == "/") {
      this.barColor = 'rgba(5, 5, 5, 0.3)';
    }
    else if (index == 1 && !this.IsScroll && this.router.url == "/") {
      this.barColor = 'rgba(111, 65, 8, 0.3)';
    }
    else if (index == 3 && !this.IsScroll && this.router.url == "/") {
      this.barColor = 'rgba(50, 50, 125, 0.3)';
    }
    else if (index == 4 && !this.IsScroll && this.router.url == "/") {
      this.barColor = 'rgba(103, 8, 8, 0.3)';
    }
    else if (index == 5 && !this.IsScroll && this.router.url == "/") {
      this.barColor = 'rgba(10, 99, 119, 0.35)';
    }
    else {
      this.barColor = 'rgba(100, 100, 100, 0.4)';
    }
  }

  DisplaySearch() {
    if (this.ShowSearch == true) {
      this.ShowSearch = false;
    }
    else {
      this.ShowSearch = true;
    }
  }

  ShowMenu() {
    if (this.IsMenu == true) {
      this.IsMenu = false;
    }
    else {
      this.IsMenu = true;
    }
  }

  FormatSearchData(data) {
    for (var i = 0; i < data.length; i++) {
      for (var j = 0; j < data[i].subjects.$values.length; j++) {
        this.SearchData.push({ domain: data[i].domain, child: data[i].subjects.$values[j] });
      }
    }
  }
  ViewResults(term) {
    if (term.trim() === "") {
      this.ShowResults = false;
    }
    else {
      this.ShowResults = true;
    }
  }


  ExpandBar() {
    this.Init = true;
    if (this.expand == true) {
      this.expand = false;
    }
    else {
      this.expand = true;
    }
  }

}
