import { Component, OnInit } from '@angular/core';
import { Database, Tables } from 'src/app/service/database.service';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  private db: Database;

  constructor(private store: StorageService) {
    this.db = new Database(this.store);
  }

  async ngOnInit(): Promise<void> {
    await this.db.read();
    // this.db.push<Stock>(Tables.stocks, {id: 1, name: 'moep'});
    // console.log(this.db.getTableVal(Tables.stocks));
    // this.db.save()
  }
}
