import { Storage } from '@ionic/storage';

export class StorageService {
    private store: Storage;
    constructor() {
        this.store = new Storage(null);
    }

    public async getDatabase(): Promise<string> {
        return await this.get('database');
    }

    public setDatabase(value: any): void {
        this.set('database', JSON.stringify(value));
    }

    public async get(key: string): Promise<any> {
        return await this.store.get(key);
    }

    public set(key: string, value: any): void {
        this.store.set(key, value);
    }
}