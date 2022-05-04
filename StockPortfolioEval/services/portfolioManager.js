const portfolioCollection = require('../models/customerPortfolio.js')
const fundManager = require('./fundManager.js')

class PortfolioManager {
    constructor(fundManager){
        this.portfolio = {};
        this.fundManager= fundManager
    }

    async generatePortfolio( funds, id=1) {
        this.portfolio = new portfolioCollection(id);
        this.portfolio.assignPortfolio(funds); 
        
    }

    async getPortfolio( ) {
        return this.portfolio.getPortfolio(); 
        
    }

    async getOverlap(stocks1, stocks2){
        let common = 0;
        for(let i =0; i< stocks1.length; i+=1) {
            if(stocks2.includes(stocks1[i]))
            common++;
        }
        return parseFloat(((2*common)/(stocks1.length+ stocks2.length))*100).toFixed(2);
    }
    async calculateOverlap(fundName) {
        try{
        const stocksToMatch = await this.fundManager.getStocksForFund(fundName);
            
        if(Array.isArray(stocksToMatch)) {
            const portfolioFunds = await this.portfolio.getPortfolio()||[];
            for(let i =0; i< portfolioFunds.length; i+=1){
                let stocksOfPortfolio = await this.fundManager.getStocksForFund(portfolioFunds[i]);
                let percentage = await this.getOverlap(stocksOfPortfolio, stocksToMatch);
                if(percentage > 0)
                    console.log(`${fundName} ${portfolioFunds[i]} ${percentage}%`);
            }

        }
    } catch(err) { console.log('calculate overlap error', err)};
    }




}

module.exports = PortfolioManager;