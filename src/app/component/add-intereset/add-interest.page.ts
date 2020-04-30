import { Component } from '@angular/core';
import { StockService } from 'src/app/service/stock.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-interest',
  templateUrl: 'add-interest.page.html',
  styleUrls: ['add-interest.page.scss'],
})
export class AddInterestComponent {

  constructor(private http: HttpClient) {
  }
}
