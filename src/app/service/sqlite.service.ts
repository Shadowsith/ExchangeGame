import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

export class Sqlite {
    private sql: SQLite;
    private db: SQLiteObject;

    public constructor() {
        this.sql = new SQLite();
    }

    public async open(): Promise<void> {
        this.db = await this.sql.create({
            name: 'exchange.db',
            location: 'default'
        });
    }

    public async create(): Promise<void> {
        await this.open();
        this.db.executeSql('CREATE TABLE test (first_name VARCHAR(100), last_name VARCHAR(100))', []);
    }

    public async execute(query: string): Promise<any> {
        const res = await this.db.executeSql(query, []);
        return res;
    }
}