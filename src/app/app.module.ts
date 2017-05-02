import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routing } from './app.routing';
import { AppComponent } from './app.component';
import { UserComponent } from './Components/user.component';
import { ClassComponent } from './Components/class.component';
import { forumComponent } from './Components/forum.component';
import { SafePipe } from './Components/safe.pipe';
import { FilterPipe } from './filter.pipe';
import { NavService } from './Services/share.service';

@NgModule({
  declarations: [
    AppComponent, UserComponent,ClassComponent,forumComponent, FilterPipe, SafePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    Routing
  ],
  providers: [NavService],
  bootstrap: [AppComponent]
})
export class AppModule { }
