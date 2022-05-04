class Stock{

    constructor(name){
        this.name = name;
    }

    async getName() {
        return Promise.resolve(this.name);

    }
    async setName(name ) {
        this.name = name;
        return Promise.resolve(true);

    }
}


module.exports = Stock;