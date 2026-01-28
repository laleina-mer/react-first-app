const { StockPortfolio } = require('./stock-portfolio.js');

test('Testing portfolio creation -- success', () => {
    const target = 0;

    const portfolio = new StockPortfolio();
    const result = portfolio.countSymbols();

    expect(target).toBe(result);
});

test('Test portfolio is empty when created -- success' , () => {
    const target = true;

    const portfolio = new StockPortfolio();
    const result = portfolio.isEmpty();

    expect(target).toBe(result);
});

test('Test purchase adds shares -- success', () => {
    const target = false; 

    const portfolio = new StockPortfolio();
    portfolio.purchase("AAPL", 5);
    const result = portfolio.isEmpty();

    expect(target).toBe(result);
});

test('Test sell substract shares from a symbol -- success', () => {
    const target = 1;

    const portfolio = new StockPortfolio(); 
    portfolio.purchase("AAPL", 5);
    portfolio.sell("AAPL", 2);
    const result = portfolio.countSymbols();

    expect(target).toBe(result);
});

test('Test symbol count -- success', () => {
    const target = 3;

    const portfolio = new StockPortfolio(); 
    portfolio.purchase("AAPL", 5);
    portfolio.purchase("TSLA", 3);
    portfolio.purchase("GOOGL", 10);
    const result = portfolio.countSymbols();

    expect(target).toBe(result);
});

test('Test symbol removal when all shares are sold -- success', () => {
    const target = 0; 

    const portfolio = new StockPortfolio(); 
    portfolio.purchase("AAPL", 5); 
    portfolio.sell("AAPL", 5);
    const result = portfolio.countSymbols();

    expect(target).toBe(result);
});

test('Test share count for given symbol -- success', () => {
    const target = 10; 

    const portfolio = new StockPortfolio();
    portfolio.purchase("AAPL", 4);
    portfolio.sell("AAPL", 2);
    portfolio.purchase("AAPL", 8);
    const result = portfolio.countSharesOf("AAPL");

    expect(target).toBe(result);
});

test('Test error thrown if user tries to sell more shares than owned -- success', () => {
    const target = "Not possible to sell this number of shares."

    const portfolio = new StockPortfolio();
    portfolio.purchase("AAPL", 5);
    
    let result; 
    try {
        portfolio.sell("AAPL", 10);
    } catch (error) {
        result = error.message;
    }

    expect(target).toBe(result);
})

/* Reflection: Initially, I was having trouble following the TDD method. The process did not 
feel very intuitive, and I often found myself thinking ahead to later functionality instead
of focusing only on the current test. In particular, the red phase felt somewhat unproductive
to me since I already knew the test would fail simply because the function had not been
implemented yet. Writing a failing test in that situation felt unnecessary and even disrupted 
my train of thought. While I can see how TDD might become more natural with additional practice 
and in larger or more complex projects, in this assignment I did not personally find it very 
useful and felt that it sometimes slowed down my problem-solving process rather than helping it. */