import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { IonicStorageModule } from '@ionic/storage';
 import { HttpClientModule } from '@angular/common/http';
import { StorageService } from './service/storage.service';
import { ThemeService } from './service/theme.service';
import { ShowInterestComponent } from './component/show-interest/show-interest.page';

@NgModule({
  declarations: [AppComponent, ShowInterestComponent],
  entryComponents: [
    ShowInterestComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    StorageService,
    ThemeService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
