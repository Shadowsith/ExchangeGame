export class Stock {
    public id: number;
    public symbol: string;
    public name: string;
    public type: string;
    public region: string;
    public currency: string;
    public amount: number; // amount of stocks purchased at the same time
    public purchasePrice: number;
    public currentPrice: number;
    public purchaseDate: string;
    public change: number;
    public change_percent: string;
    public timestamp: string; // last refreshed
}