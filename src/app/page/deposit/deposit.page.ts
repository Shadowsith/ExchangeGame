import { Component } from '@angular/core';
import { PopoverController, ModalController } from '@ionic/angular';
import { AddDepositComponent } from 'src/app/component/add-deposit/add-deposit.page';

@Component({
  selector: 'app-deposit',
  templateUrl: 'deposit.page.html',
  styleUrls: ['deposit.page.scss'],
})
export class DepositPage {

  constructor(private pc: PopoverController, private mc: ModalController) {
  }

  public async add() {
    console.log('here');
    const popover = await this.pc.create({
      component: AddDepositComponent,
      componentProps: {
        pc: this.pc
      }
    });
    await popover.present();
    const res = await popover.dismiss();

  }

  public async sort() {
    alert('here');
  }
}
