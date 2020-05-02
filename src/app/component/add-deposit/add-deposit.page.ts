import { Component } from '@angular/core';
import { PopoverController, NavParams } from '@ionic/angular';
import { App } from 'src/app/service/app.service';
import { AlertService } from 'src/app/service/alert.service';

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

  constructor(private navParams: NavParams) {
    this.pc = navParams.data.pc;
    this.alert = new AlertService();
  }

  public async add() {
    if (this.symbol === '' || this.amount < 1) {
      await this.alert.showMsg('Warning', '', 'Please add stock symbol/name and a valid amount');
    }
    const stock = await App.api.add(this.symbol, this.amount);
    if(stock !== undefined) {
      const alert = await this.alert.askMsg('Question', '', `Do you want buy ${this.amount} ` +
       `of ${stock.symbol} (${stock.name}) for ${stock.purchasePrice * this.amount} ${stock.currency}?`);
       console.log(alert);
    }
    this.pc.dismiss(undefined, 'refresh');
  }

  public close() {
    this.pc.dismiss(undefined, 'backdrop');
  }
}
