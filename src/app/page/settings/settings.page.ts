import { Component  } from '@angular/core';
import { App } from 'src/app/service/app.service';
import { Tables } from 'src/app/service/database.service';
import { AlertService } from 'src/app/service/alert.service';

@Component({
  selector: 'app-settings',
  templateUrl: 'settings.page.html',
  styleUrls: ['settings.page.scss']
})
export class SettingsPage {
  public alert: AlertService;
  public apikey: string = '';

  constructor() {
    this.apikey = App.db.getApiKey();
    this.alert = new AlertService();
  }

  public save() {
    App.db.update(Tables.settings, { name: 'apikey' },
      { name: 'apikey', value: this.apikey });
    App.api.setApiKey(this.apikey);
    App.db.save();
    this.alert.showMsg('Message', '', 'The settings were saved successfully.', 'OK');
  }
}
