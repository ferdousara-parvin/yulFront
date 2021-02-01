import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MapComponent} from './component/map/map.component';

import {RxStompService} from '@stomp/ng2-stompjs';
import {ProgressWebsocketService} from './service/progress.websocket.service';
import {HttpClientModule} from '@angular/common/http';
import {MainComponent} from './component/main/main.component';


@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [RxStompService, ProgressWebsocketService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
