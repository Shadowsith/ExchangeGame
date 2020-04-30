import { App } from './app.service';
import { HttpClient } from '@angular/common/http';
import '../extensions/string.extension';

export class StockService {
    private apikey: string = '';
    private url: string = 'https://www.alphavantage.co/query?function=';
    private intraday: string =  this.url + 'TIME_SERIES_INTRADAY&interval=60min&symbol={0}&apikey=';
    private search: string = this.url + 'SYMBOL_SEARCH&keywords={0}&apikey=';

    constructor(private http: HttpClient) {
        this.apikey = App.db.getApiKey();
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

    public find(symbol: string) {
        const search = this.search.format([symbol]);
        this.get(search).then(x => {
            console.log(x);
        })
    }
}