
const lib = require('../lib')

describe('absolute', () => {
    // we can rename 'test' to 'it'
    // test('should return a positive number if input is positive', () => { 
    //     const result = lib.absolute(1);
    //     expect(result).toBe(1);
    // });
    it('should return a positive number if input is positive', () => {
        const result = lib.absolute(1);
        expect(result).toBe(1);
    });

    it('should return a positive number if input is negative', () => {
        const result = lib.absolute(-1);
        expect(result).toBe(1);
    });

    it('should return 0 number if input is 0', () => {
        const result = lib.absolute(0);
        expect(result).toBe(0);
    });
});

describe('greet', () => {
    it('should return the greeting message', () => {
        const result = lib.greet('Roberto');
        //expect(result).toMatch(/Roberto/);  <-- can use REGEX or 'toContain'
        expect(result).toContain('Roberto')
    })
});

describe('getCurrencies', () => {
    it('should return supported currencies', () => {
        const result = lib.getCurrencies();
        // Proper solution
        expect(result).toContain('USD');
        expect(result).toContain('EUR');
        expect(result).toContain('AUD');

        // Ideal solution
        expect(result).toEqual(expect.arrayContaining(['EUR', 'AUD', 'USD']))
    })
});
