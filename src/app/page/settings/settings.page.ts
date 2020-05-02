import { Component } from '@angular/core';
import { App } from 'src/app/service/app.service';
import { Tables } from 'src/app/service/database.service';
import { AlertService } from 'src/app/service/alert.service';
import { ThemeService } from 'src/app/service/theme.service';
import { Settings } from 'src/app/model/settings.model';

@Component({
  selector: 'app-settings',
  templateUrl: 'settings.page.html',
  styleUrls: ['settings.page.scss']
})
export class SettingsPage {
  public alert: AlertService;
  public apikey: string = '';
  public budget: number = 1000.0;
  public darkMode: boolean = false;

  constructor(private theme: ThemeService) {
    this.alert = new AlertService();
    this.apikey = App.db.getApiKey();
    this.budget = App.db.selectOne<Settings>(
      Tables.settings, { find: { name: 'budget' } }).value
    this.darkMode = App.db.selectOne<Settings>(
      Tables.settings, { find: { name: 'darkMode' } }).value;
    if (this.darkMode) {
      this.theme.enableDark();
    }
  }

  ionViewWillLeave() {
    console.log('here');
    if (App.db.selectOne<Settings>(
      Tables.settings, { find: { name: 'darkMode' } }).value === false) {
        this.theme.enableLight();
    }
  }

  public save() {
    App.db.update(Tables.settings, { name: 'apikey' },
      { name: 'apikey', value: this.apikey });
    App.db.update(Tables.settings, { name: 'budget' },
      { name: 'budget', value: this.budget });
    App.db.update(Tables.settings, { name: 'darkMode' },
      { name: 'darkMode', value: this.darkMode });
    App.api.setApiKey(this.apikey);
    App.db.save();
    this.alert.showMsg('Message', '', 'The settings were saved successfully.', 'OK');
  }

  public toggleDarkTheme() {
    if (this.darkMode) {
      this.theme.enableDark();
    } else {
      this.theme.enableLight();
    }
  }
}
