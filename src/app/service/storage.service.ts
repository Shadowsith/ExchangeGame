import { Storage } from '@ionic/storage';

export class StorageService {
    public depot = {};
    public settings = {};

    constructor(private storage: Storage) {
    }

    public async getSettings(): Promise<any> {
        return await this.get("settings");
    }

    public setSettings(value: any): void {
        this.set("settings", value);
    }

    public async get(key: string): Promise<any> {
        return await this.storage.get(key);
    }

    public set(key: string, value: any): void {
        this.storage.set(key, value);
    }
}