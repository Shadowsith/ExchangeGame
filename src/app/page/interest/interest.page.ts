import { Component } from '@angular/core';
import { StockService } from 'src/app/service/stock.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: 'interest.page.html',
  styleUrls: ['interest.page.scss'],
})
export class InterestPage {

  constructor(private http: HttpClient) {
  }
}
