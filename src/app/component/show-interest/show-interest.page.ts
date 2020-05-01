import { Component } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { Stock } from 'src/app/model/stock.model';

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
    this.mc.dismiss();
  }

  public update() {

  }

  public delete() {

  }
}
