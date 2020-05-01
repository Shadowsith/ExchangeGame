import * as low from 'lowdb';
import * as Memory from 'lowdb/adapters/Memory';
import { StorageService } from './storage.service';
import { Stock } from '../model/stock.model';

export class Tables {
    public static stocks: string = 'stocks';
    public static interests: string = 'interests';
    public static settings: string = 'settings';
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

    public setTable(tableName: string, values: any): void {
        this.db.set(tableName, values).write();
    }

    public select<T>(tableName: string, where: object = null): Array<T> {
        let val: any = this.db.get(tableName);
        if(where !== null) {
            val = val.find(where);
        }
        return val.value();
    }

    public insert<T>(tableName: string, obj: T): void {
        const val = this.getTable(tableName);
        val.push(obj).write();
    }

    public update<T>(tableName: string, oldVal: T, newVal: T): void {
        const val = this.getTable(tableName);
        val.find(oldVal).assign(newVal).write();
    }

    public delete(tableName: string, obj: any) {
        const val = this.getTable(tableName);
        val.remove(obj).write();
    }

    public getApiKey(): string {
        const res: any = this.select(Tables.settings, {name: 'apikey'});
        return res.value;
    }

    public getStocks(): Array<Stock> {
        return this.db.get(Tables.stocks).value();
    }

    public removeDuplicates(tableName: string, uniqueBy: string): void {
        const table: any = this.db.get(tableName);
        const val = table.uniqBy(uniqueBy).value();
        this.db.set(tableName, val).write();
    }

    public save(): void {
        this.storeage.setDatabase(this.db);
    }

    // remove currpted data
    public clean(): void {
        this.delete(Tables.interests, {symbol: null});
    }

    public async read() {
        let json = await this.storeage.getDatabase();
        json = JSON.parse(json);
        this.db.defaults(json).write();
        if(!this.db.has(Tables.stocks).value()) {
            this.db.set(Tables.stocks, []).write();
        }
        if(!this.db.has(Tables.interests).value()) {
            this.db.set(Tables.interests, []).write();
        }
        if(!this.db.has(Tables.settings).value()) {
            this.db.set(Tables.settings, [
                {id: 1, name: 'apikey', value: 'demo'},
                {id: 2, name: 'ui_color', value: 'white'},
                {id: 3, name: 'dark_mode', value: false}
            ]).write();
        }
    }
}