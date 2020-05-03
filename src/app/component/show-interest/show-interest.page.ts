import { Component } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { Stock } from 'src/app/model/stock.model';
import { App } from 'src/app/service/app.service';
import { Tables } from 'src/app/service/database.service';

@Component({
  selector: 'app-show-interest',
  templateUrl: 'show-interest.page.html',
  styleUrls: ['show-interest.page.scss'],
})
export class ShowInterestComponent {
  private mc: ModalController;
  public stock: Stock;
  public isDeposit: boolean = false;

  constructor(private navParams: NavParams) {
    this.mc = navParams.data.mc;
    this.stock = navParams.data.stock;
    if (navParams.data.isDeposit !== undefined) {
      this.isDeposit = navParams.data.isDeposit;
    }
  }

  public close() {
    this.mc.dismiss(undefined, 'backdrop');
  }

  public async update() {
    const val = await App.api.update(this.stock);
    if (this.isDeposit) {
      if (val !== undefined) {
        App.db.update<Stock>(Tables.stocks, this.stock, val);
      }
    } else {
      if (val !== undefined) {
        App.db.update<Stock>(Tables.interests, this.stock, val);
      }
    }
    this.mc.dismiss();
  }

  public delete() {
    if (this.isDeposit) {
      App.db.delete(Tables.stocks, this.stock);
    } else {
      App.db.delete(Tables.interests, { symbol: this.stock.symbol });
    }
    this.mc.dismiss();
  }
}
