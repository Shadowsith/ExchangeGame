import { Component } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { AddInterestComponent } from 'src/app/component/add-intereset/add-interest.page';
import { StockService } from 'src/app/service/stock.service';
import { Stock } from 'src/app/model/stock.model';
import { HttpClient } from '@angular/common/http';
import { timingSafeEqual } from 'crypto';
import { App } from 'src/app/service/app.service';
import { Tables } from 'src/app/service/database.service';

@Component({
  selector: 'app-interest',
  templateUrl: 'interest.page.html',
  styleUrls: ['interest.page.scss'],
})
export class InterestPage {
  private api: StockService;
  public stocks: Array<Stock>;

  constructor(public pc: PopoverController, private http: HttpClient) {
    this.api = new StockService(http);
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
    if(symbol !== '') {
      const val = await this.api.add(symbol);
      console.log(val);
      if(App.db.select<Stock>(Tables.interests, {symbol: symbol}) === undefined) {
        App.db.insert<Stock>(Tables.interests, val);
      } else if(val !== null) {
        const stock = new Stock();
        stock.symbol = symbol;
        App.db.update<Stock>(Tables.interests, stock, val);
      }
      console.log(App.db.select<Stock>(Tables.interests));
      App.db.save();
    }
  }
}
