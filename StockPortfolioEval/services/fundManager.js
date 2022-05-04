const fundCollection = require('../models/fund.js')

class FundManager{

    constructor() {
        this.funds = [];
    }

    async addFunds(fundsArr){
        try{
            let fund;

            for(let i = 0; i<fundsArr.length; i+=1) {
            fund = new fundCollection(fundsArr[i].name);
            fund.setStocks( fundsArr[i].stocks);
            
            this.funds.push(fund);
            }

            return Promise.resolve(true)

            
        }catch(err) {
            console.log(`fundManager: addfunds`, err);
        }
    }
    async getAllFunds(){
        let resp = [];
        for(let i = 0; i<this.funds.length; i+=1) {
            let name =  await this.funds[i].getName();
            let stocks = await this.funds[i].getStocks();
            resp.push({name, stocks});
        }
        return resp;

    }
    async getStocksForFund(fundName) {

        for(let i = 0; i<this.funds.length; i+=1) {
            if(this.funds[i].name === fundName){
                return await this.funds[i].getStocks();
            }
        }
        console.log('FUND_NOT_FOUND')
        return false;
    }

    async assignStock(stockName, fundName) {
        for(let i = 0; i<this.funds.length; i+=1) {
            if(this.funds[i].name === fundName){
                await this.funds[i].addStock(stockName);
                return true;
            }
        }
        
        console.log('FUND_NOT_FOUND')
        return false;

    }


}

module.exports =  FundManager;