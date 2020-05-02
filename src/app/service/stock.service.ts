import { App } from './app.service';
import { HttpClient } from '@angular/common/http';
import '../extensions/string.extension';
import '../extensions/date.extension';
import { Stock } from '../model/stock.model';

export class StockService {
    private apikey: string = '';
    private url: string = 'https://www.alphavantage.co/query?function=';
    private global: string = this.url + 'GLOBAL_QUOTE&symbol={0}&apikey=';
    private intraday: string = this.url + 'TIME_SERIES_INTRADAY&interval=60min&symbol={0}&apikey=';
    private search: string = this.url + 'SYMBOL_SEARCH&keywords={0}&apikey=';

    constructor(private http: HttpClient) {
        this.apikey = App.db.getApiKey();
        this.global += this.apikey;
        this.intraday += this.apikey;
        this.search += this.apikey;
    }

    private get(url: string): Promise<any> {
        return this.http.get(url).toPromise();
    }

    private setCurrent(stock: Stock, cur: any): Stock {
        stock.currentPrice = Math.floor(cur.price * 100) / 100;
        stock.change = Math.floor(cur.change * 100) / 100;
        stock.change_percent = cur.change_percent;
        stock.timestamp = new Date().getUsDate();
        return stock;
    }

    public setApiKey(apikey: string) {
        this.apikey = apikey;
        const pos = this.global.lastIndexOf('=');
        const oldKey = this.global.substr(pos + 1);
        this.global = this.global.replace(oldKey, apikey);
        this.intraday = this.intraday.replace(oldKey, apikey);
        this.search = this.search.replace(oldKey, apikey);
        console.log(this.search);
    }

    public async update(stock: Stock): Promise<Stock> {
        const cur: any = await this.current(stock.symbol);
        return this.setCurrent(stock, cur);
    }

    public async add(symbol: string, amount: number = 0): Promise<Stock> {
        try {
            let stock = new Stock();
            const obj: any = await this.find(symbol);
            stock.symbol = obj['1. symbol'];
            const cur: any = await this.current(stock.symbol);
            stock.name = obj['2. name'];
            stock.type = obj['3. type'];
            stock.region = obj['4. region'];
            stock.currency = obj['8. currency'];
            stock.purchaseDate = cur.date;
            stock.purchasePrice = Math.floor(cur.price * 100) / 100;
            stock = this.setCurrent(stock, cur),
                stock.amount = amount;
            return stock;
        }
        catch {
            return null;
        }
    }

    public async current(symbol: string): Promise<object> {
        const global = this.global.format([symbol]);
        let res = await this.get(global);
        res = res['Global Quote'];
        return {
            date: res['07. latest trading day'],
            price: res['05. price'],
            change: res['09. change'],
            change_percent: res['10. change percent']
        };
    }

    public async find(symbol: string): Promise<any> {
        const search = this.search.format([symbol]);
        const res = await this.get(search);
        return res.bestMatches[0];
    }
}