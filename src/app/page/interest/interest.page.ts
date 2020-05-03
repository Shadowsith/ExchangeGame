import { Component } from '@angular/core';
import { PopoverController, ModalController } from '@ionic/angular';
import { AddInterestComponent } from 'src/app/component/add-interest/add-interest.page';
import { Stock } from 'src/app/model/stock.model';
import { App } from 'src/app/service/app.service';
import { Tables } from 'src/app/service/database.service';
import '../../extensions/string.extension';
import { ShowStockComponent } from 'src/app/component/show-stock/show-stock.page';
import { SortInterestComponent } from 'src/app/component/sort-interest/sort-interest.page';

@Component({
  selector: 'app-interest',
  templateUrl: 'interest.page.html',
  styleUrls: ['interest.page.scss'],
})
export class InterestPage {
  public stocks: Array<Stock>;

  constructor(public pc: PopoverController, public mc: ModalController) {
    this.stocks = App.db.select<Stock>(Tables.interests);
  }

  public async add() {
    const popover = await this.pc.create({
      component: AddInterestComponent,
      componentProps: {
        pc: this.pc
      }
    });
    await popover.present();
    const symbol: string = ((await popover.onDidDismiss()).data);
    if(symbol !== undefined && symbol !== null && symbol !== '') {
      const val = await App.api.add(symbol);
      if(App.db.select<Stock>(Tables.interests, {find: {symbol: val.symbol}}) === undefined && val !== null) {
        App.db.insert<Stock>(Tables.interests, val);
      } else if(val !== null && val !== undefined) {
        const stock = new Stock();
        stock.symbol = symbol;
        App.db.update<Stock>(Tables.interests, stock, val);
      } else {
        // TODO Meldung nicht gefunden oder Requests abwarten
      }
      App.db.removeDuplicates(Tables.interests, 'symbol');
      App.db.save();
      this.stocks = App.db.select<Stock>(Tables.interests);
    }
  }

  public async sort(): Promise<void> {
    const popover = await this.pc.create({
      component: SortInterestComponent,
      componentProps: {
        pc: this.pc
      }
    });
    await popover.present();
    const res = await popover.onDidDismiss();
    if(res.role === 'sort') {
      this.stocks = App.db.select<Stock>(Tables.interests);
    }
  }

  public async show(item: Stock) {
    const modal = await this.mc.create({
      component: ShowStockComponent,
      componentProps: {
        mc: this.mc,
        stock: item
      }
    });
    await modal.present();
    const res = await modal.onDidDismiss();
    if(res.role !== 'backdrop') {
      this.stocks = App.db.select<Stock>(Tables.interests);
      App.db.save();
    }
  }
}
