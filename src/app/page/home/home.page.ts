import { Component, OnInit } from '@angular/core';
import { Database } from 'src/app/service/database.service';
import { StorageService } from 'src/app/service/storage.service';
import { App } from 'src/app/service/app.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private store: StorageService) {
    App.db = new Database(this.store);
  }

  async ngOnInit(): Promise<void> {
    await App.db.read();
    console.log(App.db.getApiKey());
  }
}
