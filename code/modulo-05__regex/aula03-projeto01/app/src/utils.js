const safeRegex = require('safe-regex')

class InvalidRegexError extends Error {
    constructor(expression) {
        super(`This ${expression} is not safe!`)
        this.name = 'InvalidRegexError'
    }
}

const validateRegex = (expression) => {
    const isSave = safeRegex(expression)
    if (isSave) return expression

    throw new InvalidRegexError(expression)
}

module.exports = {
    InvalidRegexError,
    validateRegex,
}