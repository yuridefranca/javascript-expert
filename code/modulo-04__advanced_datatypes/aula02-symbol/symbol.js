const assert = require('assert')

const uniqueKey = Symbol('userName')
const user = {}

user['userName'] = 'value for normal objects'
user[uniqueKey] = 'value for symbols'

// console.log('getting normal objects', user.userName)

// console.log('getting symbols', user[Symbol('userName')])
// console.log('getting symbols', user[uniqueKey])

assert.deepStrictEqual(user.userName, 'value for normal objects')

// sempre unico em nivel de endereço de memoria
assert.deepStrictEqual(user[Symbol('userName')], undefined)
assert.deepStrictEqual(user[uniqueKey], 'value for symbols')

// console.log('symbols', Object.getOwnPropertySymbols(user)[0])
assert.deepStrictEqual(Object.getOwnPropertySymbols(user)[0], uniqueKey)

// byPass - má pratica
user[Symbol.for('password')] = 123
assert.deepStrictEqual(user[Symbol.for('password')], 123)

// well known symbols
const obj = {
    [Symbol.iterator]: () => ({
        items: ['c', 'b', 'a'],
        next() {
            return {
                done: this.items.length === 0,
                value: this.items.pop()
            }
        }
    })
}

// for (const item of obj) {
//     console.log('for of', item)
// }

assert.deepStrictEqual([...obj], ['a', 'b', 'c'])

const kItems = Symbol('kItems')
class MyDate {
    constructor(...args) {
        this[kItems] = args.map(arg => new Date(...arg))
    }

    [Symbol.toPrimitive](coercionType) {
        if (coercionType !== 'string') throw new TypeError()

        const items = this[kItems].map(item => new Intl
            .DateTimeFormat('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })
            .format(item)
        )

        return new Intl.ListFormat('pt-BR', { style: 'long', type: 'conjunction' }).format(items)
    }

    *[Symbol.iterator]() {
        for (const item of this[kItems]) {
            yield item
        }
    }

    async *[Symbol.asyncIterator]() {
        const timeout = ms => new Promise(resolve => setTimeout(resolve, ms))

        for (const item of this[kItems]) {
            await timeout(100)
            yield item.toISOString()
        }
    }

    get [Symbol.toStringTag]() {
        return 'WHAT??'
    }
}

const myDate = new MyDate(
    ['2023', '03', '12'],
    ['2023', '00', '01'],
)

const expectedDates = [
    new Date('2023-04-12'),
    new Date('2023-01-01')
]

assert.deepStrictEqual(Object.prototype.toString.call(myDate), '[object WHAT??]')

assert.throws(() => myDate + 1, TypeError)

// coercao explicita para chamar o toPrimitive
assert.deepStrictEqual(String(myDate), '12 de abril de 2023 e 01 de janeiro de 2023')

// implementar o iterator!
assert.deepStrictEqual([...myDate], expectedDates)

// ;(async () => {
//     for await(const item of myDate) {
//         console.log('asyncIterator', item)
//     }
// })()
;(async () => {
    const dates = await Promise.all([...myDate])
    assert.deepStrictEqual(dates, expectedDates)
})()