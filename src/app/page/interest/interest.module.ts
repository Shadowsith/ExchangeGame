import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { InterestPage } from './interest.page';
import { AddInterestComponent } from 'src/app/component/add-intereset/add-interest.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: InterestPage
      }
    ])
  ],
  entryComponents: [AddInterestComponent],
  declarations: [InterestPage, AddInterestComponent]
})
export class InterestPageModule {}
