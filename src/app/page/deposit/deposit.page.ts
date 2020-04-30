import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-deposit',
  templateUrl: 'deposit.page.html',
  styleUrls: ['deposit.page.scss'],
})
export class DepositPage {

  constructor(private http: HttpClient) {
  }
}
