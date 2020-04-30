import { Component } from '@angular/core';
import { StockService } from 'src/app/service/stock.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private http: HttpClient) {
    const stock = new StockService(http);
    // stock.find('IBM').then(x => console.log(x));
    // stock.purchaseTest('IBM', 20).then(x => console.log(x));
  }
}
