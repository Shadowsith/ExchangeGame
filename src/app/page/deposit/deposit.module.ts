import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { DepositPage } from './deposit.page';
import { AddDepositComponent } from 'src/app/component/add-deposit/add-deposit.page';
import { SortDepositComponent } from 'src/app/component/sort-deposit/sort-deposit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: DepositPage
      }
    ])
  ],
  declarations: [DepositPage, AddDepositComponent, SortDepositComponent],
  entryComponents: [AddDepositComponent, SortDepositComponent]
})
export class DepositPageModule {}
