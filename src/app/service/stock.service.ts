import { App } from './app.service';
import { HttpClient } from '@angular/common/http';
import '../extensions/string.extension';
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

    public test() {
        this.get(this.intraday).then(x => {
        });
    }

    public async add(symbol: string, amount: number = 0): Promise<Stock> {
        try {
            const stock = new Stock();
            const obj: any = await this.find(symbol);
            stock.symbol = obj['1. symbol']
            const cur: any = await this.current(symbol);
            stock.name = obj['2. name'];
            stock.type = obj['3. type'];
            stock.region = obj['4. region'];
            stock.currency = obj['8. currency'];
            stock.purchaseDate = cur.date;
            stock.purchasePrice = cur.price;
            stock.currentPrice = cur.price;
            stock.change = cur.change;
            stock.change_percent = cur.change_percent;
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
        res = res['Global Quote'] ;
        return {
            date: res['07. latest trading day'],
            price: res['05. price'],
            change: res['09. change'],
            change_precent: res['10. change percent']
        };
    }

    public async find(symbol: string): Promise<any> {
        const search = this.search.format([symbol]);
        const res = await this.get(search);
        return res.bestMatches[0];
    }
}