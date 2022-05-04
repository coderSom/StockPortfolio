const Fundmanager = require("./services/fundManager.js")
const Portfoliomanager = require("./services/portfolioManager.js")
const data = require("./fundData.json")
const fs = require('fs')


const myFundManager = new Fundmanager();
addInitialFunds();
const myPortfolioManager = new Portfoliomanager(myFundManager);
requestParser(process.argv[2]);

async function addInitialFunds(){
    myFundManager.addFunds(data);
}

async function createRequest(args) {
    if(args && args.length) {
        const requestType = args[0];
        switch(requestType) {
            case 'CURRENT_PORTFOLIO' : 
                await myPortfolioManager.generatePortfolio(args.slice(1));
                break;
            case 'CALCULATE_OVERLAP' :
                await myPortfolioManager.calculateOverlap(args[1]);
                break;
            case 'ADD_STOCK' :
                let string = "";
                for(let i =2;i < args.length; i+=1) {
                    string+= args[i]+' ';
                }  
                
                await myFundManager.assignStock(string.trim(), args[1]);
                break;
        }
    }
}
async function requestParser() { 
    const pr = await new Promise((resolve)=>{
        const filename = process.argv[2];
        fs.readFile(filename, 'utf8', async function(err, data){
        data = data.toString().split('\n');
        
        for(let i=0; i<data.length; i+=1) {
            let arr = data[i].toString().split(' ');
            await createRequest(arr);
        }
    })
    resolve(null)
    });
}




