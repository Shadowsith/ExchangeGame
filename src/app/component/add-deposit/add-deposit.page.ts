import { Component } from '@angular/core';
import { PopoverController, NavParams } from '@ionic/angular';
import { App } from 'src/app/service/app.service';
import { AlertService } from 'src/app/service/alert.service';
import { Tables } from 'src/app/service/database.service';
import { Stock } from 'src/app/model/stock.model';
import { Settings } from 'src/app/model/settings.model';

@Component({
  selector: 'app-add-deposit',
  templateUrl: 'add-deposit.page.html',
  styleUrls: ['add-deposit.page.scss'],
})
export class AddDepositComponent {
  private pc: PopoverController;
  private alert: AlertService;
  public symbol: string = '';
  public amount: number = 0;
  public budget: number = 0;

  constructor(private navParams: NavParams) {
    this.pc = navParams.data.pc;
    this.budget = navParams.data.budget;
    this.alert = new AlertService();
  }

  public async add() {
    let dismiss = false;
    let price = 0;
    if (this.symbol === '' || this.amount < 1) {
      await this.alert.showMsg('Warning', '', 'Please add stock symbol/name and a valid amount');
    }
    const stock = await App.api.add(this.symbol, this.amount);
    if(stock !== undefined && stock !== null) {
      price = Math.floor(stock.currentPrice * stock.amount * 100) / 100;
      dismiss = await this.alert.askMsg('Question', '', `Do you want to buy ${stock.amount} Stocks` +
       `of ${stock.symbol} (${stock.name}) for ${price} ${stock.currency}?`);
    }
    if (dismiss) {
      this.budget -= price;
      if(this.budget < 0) {
        await this.alert.showMsg('Warning', '', 
        'Your budget is to low for this transaction. Please sell stocks or higher your budget in the settings', 'OK');
        this.pc.dismiss(undefined, 'backdrop');
        return;
      }
      App.db.update<any>(Tables.settings, {name: 'budget'}, {value: this.budget});
      App.db.insert<Stock>(Tables.deposit, stock);
      App.db.save();
      this.pc.dismiss(undefined, 'refresh');
    }
  }

  public close() {
    this.pc.dismiss(undefined, 'backdrop');
  }
}
