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

  constructor(private navParams: NavParams) {
    this.mc = navParams.data.mc;
    this.stock = navParams.data.stock;
  }

  public close() {
    this.mc.dismiss(undefined, 'backdrop');
  }

  public async update() {
    const val = await App.api.add(this.stock.symbol);
    if(val !== undefined) {
      console.log('here');
      App.db.update<Stock>(Tables.interests, this.stock,  val);
    }
    this.mc.dismiss();
  }

  public delete() {
    App.db.delete(Tables.interests, {symbol: this.stock.symbol});
    this.mc.dismiss();
  }
}
