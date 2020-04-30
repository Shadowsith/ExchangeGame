import * as low from 'lowdb';
import * as Memory from 'lowdb/adapters/Memory';
import { StorageService } from './storage.service';
import { Stock } from '../model/stock.model';

export class Tables {
    public static stocks: string = 'stocks';
}

export class Database {
    private db: low.LowdbSync<any>;
    private storeage: StorageService;

    constructor(storage: StorageService) {
        this.storeage = storage;
        this.db = low(new Memory(''));
    }

    public get(): low.LowdbSync<any> {
        return this.db;
    }

    public set(db: low.LowdbSync<any>): void {
        this.db = db;
    }

    public getTable(tableName: string): any {
        return this.db.get(tableName);
    }

    public push<T>(tableName: string, T: any): void {
        const val = this.getTable(tableName);
        val.push(T).write();
    }

    public getTableVal<T>(tableName: string, where: object = null): Array<T> {
        let val: any = this.db.get(tableName).value();
        if(where !== null) {
            val = val.filter(where);
        }
        return val;
    }


    public getStocks(): Array<Stock> {
        return this.db.get(Tables.stocks).value();
    }

    public save(): void {
        this.storeage.setDatabase(this.db);
    }

    public async read() {
        let json = await this.storeage.getDatabase();
        json = JSON.parse(json);
        this.db.defaults(json).write();
        if(!this.db.has('test').value()) {
            this.db.set('test', []).write();
        }
    }
}