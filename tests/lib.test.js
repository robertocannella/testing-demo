
const lib = require('../lib');
const db = require('../db');
const mail = require('../mail');

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

describe('getProduct', () => {
    it('should return the product with the given id', () => {
        const result = lib.getProduct(1)
        // expect(result).toBe({ id: 1, price: 10 }); <-- toBe references memory location
        //expect(result).toEqual({ id: 1, price: 10 }); // <-- must much exact properties
        expect(result).toMatchObject({ id: 1, price: 10 }); // <-- match object with at least these properties
        expect(result).toHaveProperty('id', 1); // <-- verify specific property exists
    })
});

describe('registerUser', () => {
    it('should throw if username is falsy', () => {
        const falsyValues = [null, undefined, NaN, '', 0, false];
        falsyValues.forEach((value) => {
            expect(() => { lib.registerUser(value) }).toThrow();
        });
    });

    it('should return the username and its assigned id as DateTime', () => {
        const result = lib.registerUser('robertocannella');
        expect(result).toMatchObject({ username: 'robertocannella' });
        expect(result.id).toBeGreaterThan(0);
    });
});

describe('fizzBuzz', () => {
    it('should throw if input is NaN', () => {
        expect(() => { lib.fizzBuzz(undefined) }).toThrow();
        expect(() => { lib.fizzBuzz("a") }).toThrow();
        expect(() => { lib.fizzBuzz(null) }).toThrow();
        expect(() => { lib.fizzBuzz("12") }).toThrow();
    });

    it('should return "FizzBuzz" if it is divisible by 3 and 5', () => {
        const result = lib.fizzBuzz(15);
        expect(result).toBe('FizzBuzz');
    });

    it('should return "Fizz" if it is divisible by 3', () => {
        const result = lib.fizzBuzz(9);
        expect(result).toBe('Fizz');
    })

    it('should return "Buzz" if it is divisible by 5', () => {
        const result = lib.fizzBuzz(20);
        expect(result).toBe('Buzz');
    })

    it('should return input if it is not divisible by 3 or 5', () => {
        const result = lib.fizzBuzz(1);
        expect(result).toBe(1);
    })
});

// Applying Mock Function
describe('applyDiscount', () => {
    it('should apply 10% discount if customer has more than 10 points', () => {
        db.getCustomerSync = function (customerId) {
            console.log('fake db call....')
            return ({ id: customerId, points: 20 })
        }

        const order = { id: 1, totalPrice: 10 };
        lib.applyDiscount(order);
        expect(order.totalPrice).toBe(9)
    });
});

// Another mock funtion checking interaction
describe('notifyCustomer', () => {
    it('should send an email to the customer', () => {
        db.getCustomerSync = function (customerId) {
            console.log('fake db call....')
            return ({ email: 'a' })
        }
        let mailSent = false;
        mail.send = function (email, message) {
            mailSent = true;
        }
        lib.notifyCustomer({ id: 1 });
        expect(mailSent).toBe(true);
    });
});

// Mock function using Jest
describe('notifyCustomer', () => {
    it('should send an email to the customer', () => {


        // const mockFunction = jest.fn();
        // mockFunction.mockReturnValue(1);  <-- Return a value
        // mockFunction.mockResolvedValue(1); // <-- Return a promise
        // mockFunction.mockRejectedValue(new Error('...'));  // <-- Return a rejected promise

        // const result = await mockFunction();
        // console.log(result)

        db.getCustomerSync = jest.fn().mockReturnValue({ email: 'a' });
        mail.send = jest.fn()

        lib.notifyCustomer({ id: 1 });

        expect(mail.send).toHaveBeenCalled();
        expect(mail.send.mock.calls[0][0]).toBe('a');  // <-- Jest stores the calls as an array
        expect(mail.send.mock.calls[0][1]).toMatch(/order/);
    });
});

