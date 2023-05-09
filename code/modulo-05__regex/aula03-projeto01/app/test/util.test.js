const { describe, it } = require('mocha');
const { expect } = require('chai');
const { InvalidRegexError, validateRegex } = require('../src/utils');

describe('utils', () => {
    it('#validateRegex should  throw InvalidRegexError when expression is not safe', () => {
        const unsafeRegex = /^([a-z|A-Z|0-9]+\s?)+$/;
        expect(() => validateRegex(unsafeRegex)).to.throw(
            InvalidRegexError,
            `This ${unsafeRegex} is not safe!`
        );
    });

    it('#validateRegex should return expression when expression is safe', () => {
        const safeRegex = /^([a-z])$/;
        expect(validateRegex(safeRegex)).to.be.equal(safeRegex);
    });
});
