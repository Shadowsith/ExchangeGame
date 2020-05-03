import { Component } from '@angular/core';
import { PopoverController, ModalController } from '@ionic/angular';
import { AddDepositComponent } from 'src/app/component/add-deposit/add-deposit.page';
import { Stock } from 'src/app/model/stock.model';
import { App } from 'src/app/service/app.service';
import { Tables } from 'src/app/service/database.service';
import { ShowStockComponent } from 'src/app/component/show-stock/show-stock.page';
import { SortDepositComponent } from 'src/app/component/sort-deposit/sort-deposit.page';
import { Settings } from 'src/app/model/settings.model';

@Component({
  selector: 'app-deposit',
  templateUrl: 'deposit.page.html',
  styleUrls: ['deposit.page.scss'],
})
export class DepositPage {
  public stocks: Stock[] = [];
  public budget: number = 0;

  constructor(private pc: PopoverController, private mc: ModalController) {
      this.stocks = App.db.select<Stock>(Tables.deposit);
      this.budget = App.db.selectOne<Settings>(Tables.settings, {find: {name: 'budget'}}).value;
      console.log(this.budget);
  }

  public async add() {
    const popover = await this.pc.create({
      component: AddDepositComponent,
      backdropDismiss: false,
      componentProps: {
        pc: this.pc,
        budget: this.budget
      }
    });
    await popover.present();
    const res = await popover.onDidDismiss();
    if(res.role = 'refresh') {
      this.budget = App.db.selectOne<Settings>(Tables.settings, {find: {name: 'budget'}}).value;
      this.stocks = App.db.select<Stock>(Tables.deposit);
    }
  }

  public async sort(): Promise<void> {
    const popover = await this.pc.create({
      component: SortDepositComponent,
      componentProps: {
        pc: this.pc
      }
    });
    await popover.present();
    const res = await popover.onDidDismiss();
    if(res.role === 'sort') {
      this.stocks = App.db.select<Stock>(Tables.deposit);
    }
  }

  public async show(item: Stock) {
    const modal = await this.mc.create({
      component: ShowStockComponent,
      componentProps: {
        mc: this.mc,
        stock: item,
        isDeposit: true
      }
    });
    await modal.present();
    const res = await modal.onDidDismiss();
    if(res.role !== 'backdrop') {
      this.stocks = App.db.select<Stock>(Tables.deposit);
      App.db.save();
    }
  }

  public calcSum(price: number, amount: number): number {
    return Math.floor(price * amount * 100) / 100;
  }
}
