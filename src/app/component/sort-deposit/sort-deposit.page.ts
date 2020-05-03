import { Component } from '@angular/core';
import { PopoverController, NavParams } from '@ionic/angular';
import { App } from 'src/app/service/app.service';
import { Stock } from 'src/app/model/stock.model';
import { Tables } from 'src/app/service/database.service';

@Component({
  selector: 'app-sort-deposit',
  templateUrl: 'sort-deposit.page.html',
  styleUrls: ['sort-deposit.page.scss'],
})
export class SortDepositComponent {
  private pc: PopoverController;
  public bySymbol: boolean = false;
  public byValue: boolean = false;
  public byChange: boolean = false;
  public desc: boolean = false;

  constructor(private navParams: NavParams) {
    this.pc = navParams.data.pc;
  }

  public changeNonSymbol() {
      this.byValue = this.byChange = false;
  }

  public changeNonValue() {
      this.bySymbol = this.byChange = false;
  }

  public changeNonChange() {
      this.bySymbol = this.byValue = false;
  }

  public close() {
    this.pc.dismiss(undefined, 'backdrop');
  }

  private sort(field: string) {
    let stocks = App.db.select<Stock>(Tables.deposit, { sortBy: field });
    if (this.desc) {
      stocks = stocks.reverse();
    }
    App.db.setTable(Tables.deposit, stocks);
    App.db.save();
  }

  public apply() {
    if (this.bySymbol) {
      this.sort('symbol');
    }
    if (this.byValue) {
      this.sort('currentPrice');
    }
    if (this.byChange) {
      this.sort('change');
    }
    this.pc.dismiss(undefined, 'sort');
  }
}
