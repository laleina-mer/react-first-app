
class StockPortfolio {

    constructor() {
        this.shares = {};
    }

    isEmpty() {
        return Object.keys(this.shares).length === 0;
    }

    countSymbols() {
        return Object.keys(this.shares).length;
    }

    purchase(symbol, amount) {
        this.shares[symbol] = (this.shares[symbol] || 0) + amount;
    }

    sell(symbol, amount) {
        if (!this.shares[symbol] || this.shares[symbol] < amount) {
            throw new Error("Not possible to sell this number of shares.")
        }

        this.shares[symbol] -= amount;

        if (this.shares[symbol] === 0) {
            delete this.shares[symbol];
        }
    }

    countSharesOf(symbol) {
        return this.shares[symbol] || 0;
    }


}

exports.StockPortfolio = StockPortfolio;
