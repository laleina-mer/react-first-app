const myFunctions = require('./sample-functions.js');

/* -------- div() tests -------- */ 

test('Testing div -- positive value', () => {
    const target = 9;
    const result = myFunctions.div(81, 9);
    expect(target).toBe(result);
})

test('Testing div -- negative value', () => {
    const target = -10;
    const result = myFunctions.div(100, -10);
    expect(target).toBe(result);
})

test('Testing div -- decimal value', () => {
    const target = 2.25;
    const result = myFunctions.div(9, 4);
    expect(target).toBe(result);
})

test('Testing div -- zero divided by x equals zero', () => {
    const target = 0;
    const result = myFunctions.div(0, 805);
    expect(target).toBe(result);
})

/* -------- containsNumbers() tests -------- */ 

test('Testing containsNumbers -- string with numbers (at end)', () => {
    const target = true;
    const result = myFunctions.containsNumbers('QWERTY123');
    expect(target).toBe(result);
});

test('Testing containsNumbers -- string with numbers (at beginning)', () => {
    const target = true;
    const result = myFunctions.containsNumbers('123QWERTY');
    expect(target).toBe(result);
});

test('Testing containsNumbers -- string with numbers (in between)', () => {
    const target = true;
    const result = myFunctions.containsNumbers('Q1W2E3R4T5Y6');
    expect(target).toBe(result);
});

test('Testing containsNumbers -- string without numbers', () => {
    const target = false;
    const result = myFunctions.containsNumbers('QWERTY');
    expect(target).toBe(result);
});

test('Testing containsNumbers -- empty string', () => {
    const target = false;
    const result = myFunctions.containsNumbers('');
    expect(target).toBe(result);
});

test('Testing containsNumbers -- whitespace', () => {
    const target = false;
    const result = myFunctions.containsNumbers(' ');
    expect(target).toBe(result);
});

test('Testing containsNumbers -- single digit string', () => {
    const target = true;
    const result = myFunctions.containsNumbers('7');
    expect(target).toBe(result);
});

test('Testing containsNumbers -- multiple digit string', () => {
    const target = true;
    const result = myFunctions.containsNumbers('13579');
    expect(target).toBe(result);
});

test('Testing containsNumbers -- non-number and non-letter characters', () => {
    const target = false;
    const result = myFunctions.containsNumbers('-+=/');
    expect(target).toBe(result);
});