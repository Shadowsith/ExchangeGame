import { Database } from './database.service';
import { StockService } from './stock.service';

/**
 * Global app-wide values
 */
export class App {
    public static db: Database = null;
    public static api: StockService = null;
}