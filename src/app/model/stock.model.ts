export class Stock {
    public id: number;
    public isin: string; // Stock number
    public wkn: string;
    public symbol: string; //
    public company: string;
    public purchasePrice: number;
    public currentPrice: number;
    public purchaseDate: Date;
}