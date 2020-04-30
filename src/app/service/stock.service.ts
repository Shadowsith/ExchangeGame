import * as alpha from 'alphavantage';

export class StockService {
    private api: any;

    constructor(apikey: string) {

        this.api = alpha({key: ''});
    }
}