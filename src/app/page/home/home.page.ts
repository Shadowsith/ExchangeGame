import { Component, OnInit } from '@angular/core';
import * as low from 'lowdb';
import { StorageService } from 'src/app/service/storage.service';
import { Database, Tables } from 'src/app/service/database.service';
import { Stock } from 'src/app/model/stock.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private store: StorageService) {
    const db = new Database(this.store);
    db.push<Stock>(Tables.stocks, {id: 1, name: 'moep'});
    console.log(db.getTableVal(Tables.stocks));
    db.save();
  }

  async ngOnInit(): Promise<void> {
  }
}
