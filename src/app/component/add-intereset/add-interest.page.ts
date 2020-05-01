import { Component } from '@angular/core';
import { PopoverController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-add-interest',
  templateUrl: 'add-interest.page.html',
  styleUrls: ['add-interest.page.scss'],
})
export class AddInterestComponent {
  private pc: PopoverController;
  public symbol: string;

  constructor(private navParams: NavParams) {
    this.pc = navParams.data.pc;
  }

  public add() {
    this.pc.dismiss(this.symbol);
  }

  public close() {
    this.pc.dismiss();
  }
}
