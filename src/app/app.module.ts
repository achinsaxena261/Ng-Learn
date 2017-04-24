import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routing } from './app.routing';
import { AppComponent } from './app.component';
import { UserComponent } from './Components/user.component';
import { FilterPipe } from './filter.pipe';

@NgModule({
  declarations: [
    AppComponent, UserComponent, FilterPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    Routing
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
