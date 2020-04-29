import { Storage } from '@ionic/storage';

export class StorageService {
    constructor(private store: Storage) {
    }

    public async getSettings(): Promise<any> {
        return await this.get('settings');
    }

    public setSettings(value: any): void {
        this.set("settings", value);
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