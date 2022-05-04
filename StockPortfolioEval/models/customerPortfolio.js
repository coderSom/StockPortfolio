class customerPortfolio {
    constructor(id) {
        this.name = id;
        this.portfolioFunds = [];
    }

    async getName() {
        return this.name;

    }
    async setName(name ) {
        this.name = name;
        return true

    }
    async assignPortfolio(funds) {
        this.portfolioFunds = funds;
        return true;
    }
    async getPortfolio() {
        return  this.portfolioFunds;
        
    }
    
}

module.exports =  customerPortfolio;