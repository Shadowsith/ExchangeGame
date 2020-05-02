import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { StorageService } from './service/storage.service';
import { App } from './service/app.service';
import { Database, Tables } from './service/database.service';
import { HttpClient } from '@angular/common/http';
import { StockService } from './service/stock.service';
import { ThemeService } from './service/theme.service';
import { Settings } from './model/settings.model';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public appPages = [
    {
      title: 'Start',
      url: '/start',
      icon: 'home'
    },
    {
      title: 'Deposit',
      url: '/deposit',
      icon: 'stats-chart'
    },
    {
      title: 'Interests',
      url: '/interest',
      icon: 'analytics'
    },
    {
      title: 'Settings',
      url: '/settings',
      icon: 'settings'
    },
    {
      title: 'Help',
      url: '/help',
      icon: 'school'
    },
    {
      title: 'About',
      url: '/about',
      icon: 'information-circle-outline'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage: StorageService,
    private http: HttpClient,
    private theme: ThemeService
  ) {
    this.initializeApp();
    App.db = new Database(storage);
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  async ngOnInit() {
    await App.db.read();
    App.api = new StockService(this.http);
    if (App.db.selectOne<Settings>(Tables.settings,
      { find: { name: 'darkMode' } }).value === true) {
        this.theme.enableDark();
    }
  }

  public showSubPages() {

  }
}
