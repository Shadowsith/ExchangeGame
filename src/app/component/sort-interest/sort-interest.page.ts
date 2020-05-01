import { Component } from '@angular/core';
import { PopoverController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-sort-interest',
  templateUrl: 'sort-interest.page.html',
  styleUrls: ['sort-interest.page.scss'],
})
export class SortInterestComponent {
  private pc: PopoverController;
  public symbol: string;

  constructor(private navParams: NavParams) {
    this.pc = navParams.data.pc;
  }

  public close() {
    this.pc.dismiss();
  }
}
