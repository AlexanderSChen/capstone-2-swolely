const { 
    SECRET_KEY, 
    PORT, 
    BCRYPT_WORK_FACTOR, 
    getDatabaseUri 
  } = require('./config');
  
describe('Config', function() {
    test('SECRET_KEY is defined', function() {
        expect(SECRET_KEY).toBeDefined();
    });

    test('PORT is defined', function() {
        expect(PORT).toBeDefined();
    });

    test('BCRYPT_WORK_FACTOR is defined', function() {
        expect(BCRYPT_WORK_FACTOR).toBeDefined();
    });

    test('getDatabaseUri is defined', function() {
        expect(getDatabaseUri).toBeDefined();
    });

    test('getDatabaseUri returns a string', function() {
        expect(typeof getDatabaseUri()).toBe('string');
    });
});
  