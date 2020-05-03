import * as low from 'lowdb';
import * as Memory from 'lowdb/adapters/Memory';
import { StorageService } from './storage.service';
import { Stock } from '../model/stock.model';

export class Tables {
    public static deposit: string = 'deposit';
    public static interests: string = 'interests';
    public static settings: string = 'settings';
}

/**
 * Options for Database select method
 */
export class SelectOptions {
    public find?: object = null;
    public filter?: object = null;
    public sortBy?: string = null;
    public take?: number = null;
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

    private processSelect(val: any, where: SelectOptions = null): any {
        if (where !== null) {
            if (where.find !== undefined) {
                val = val.find(where.find);
            }
            if (where.filter !== undefined) {
                val = val.filter(where.filter);
            }
            if (where.sortBy !== undefined) {
                val = val.sortBy(where.sortBy);
            }
            if (where.take !== undefined) {
                val = val.take(where.take);
            }
        }
        return val;
    }

    public selectOne<T>(tableName: string, where: SelectOptions = null): T {
        let val: any = this.db.get(tableName);
        val = this.processSelect(val, where);
        return val.value();
    }

    public select<T>(tableName: string, where: SelectOptions = null): Array<T> {
        let val: any = this.db.get(tableName);
        val = this.processSelect(val, where);
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
        const res: any = this.select(Tables.settings, { find: { name: 'apikey' } });
        return res.value;
    }

    public getStocks(): Array<Stock> {
        return this.db.get(Tables.deposit).value();
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
        this.delete(Tables.interests, { symbol: null });
    }

    public async read() {
        let json = await this.storeage.getDatabase();
        json = JSON.parse(json);
        this.db.defaults(json).write();
        if (!this.db.has(Tables.deposit).value()) {
            this.db.set(Tables.deposit, []).write();
        }
        if (!this.db.has(Tables.interests).value()) {
            this.db.set(Tables.interests, []).write();
        }
        if (!this.db.has(Tables.settings).value()) {
            this.db.set(Tables.settings, [
                { id: 1, name: 'apikey', value: 'demo' },
                { id: 2, name: 'darkMode', value: false },
                { id: 3, name: 'budget', value: 1000.0}
            ]).write();
        }
    }
}