import { Component, OnInit } from '@angular/core';
import { TAFFY } from 'taffy';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor() {}

  async ngOnInit(): Promise<void> {
    const stocks = TAFFY([
      {
        "stock": "TSLA",
        "price": 600
      },
      {
        "stock": "AMD",
        "price": 40.5
      }
    ]);
    console.log(db.get());
  }

}
