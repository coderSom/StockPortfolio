const stock = require('./stock.js');
const stockCollection = require('./stock.js')


class Fund{
    constructor(name) {
        this.name = name;
        this.stocks = [];
    }

    async setStocks(stocksArray) {
        let stock;
        for(let i = 0; i<stocksArray.length; i+=1) {
            stock = new stockCollection(stocksArray[i]);
            this.stocks.push(stock);
         }
    }
    async getStocks() {
        let resp = [];
        for(let i = 0; i<this.stocks.length; i+=1) {
            resp.push(await this.stocks[i].getName());
        }
        

        return Promise.resolve(resp);
    }
    async addStock(st) {
        let stock = new stockCollection(st);
        this.stocks.push(stock);
        return true;
    }


    async getName() {
        return this.name;

    }
    async setName(name ) {
        this.name = name;
        return true

    }
    

}
module.exports = Fund;