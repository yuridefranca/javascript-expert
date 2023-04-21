'use-strict'

const assert = require('assert')

const obj = {
    add(value) {
        return this.arg1 + this.arg2 + value
    }
}

assert.deepStrictEqual(obj.add.apply({ arg1: 10, arg2: 20 }, [100]), 130)

// um problema que pode acontecer (raro)
// Function.prototype.apply = () => { throw new TypeError('Eita') }

// esse é mais comum que pode acontecer
obj.add.apply = function () { throw new TypeError('Eita 2') }

assert.throws(
    () => obj.add.apply({}, []),
    {
        name: 'TypeError',
        message: 'Eita 2'
    }
)

// usando o reflect
const result = Reflect.apply(obj.add, { arg1: 40, arg2: 20 }, [200])
assert.deepStrictEqual(result, 260)

// --- defineProperty

// questoes semanticas
function myDate() {}

// estranho pq usa o defineProperty com um object mesmo sendo uma função
Object.defineProperty(myDate, 'withObject', { value: () => 'Hey' })

// assim faz mais sentido
Reflect.defineProperty(myDate, 'withObjectReflection', { value: () => 'Hey dude' })

assert.deepStrictEqual(myDate.withObject(), 'Hey')
assert.deepStrictEqual(myDate.withObjectReflection(), 'Hey dude')


// --- deleteProperty
const withDelete = { user: 'user test' }
// evitar usar esse "delete"
delete withDelete.user

assert.deepStrictEqual(withDelete.hasOwnProperty('user'), false)

const withReflection = { user: 'user test reflect' }
// muito mais performatico
Reflect.deleteProperty(withReflection, 'user')

assert.deepStrictEqual(withReflection.hasOwnProperty('user'), false)

// --- get
// deveriamos fazer um get somente em instancias de referencia
assert.deepStrictEqual(1['foo'], undefined)

// com o reflect, uma exceção é lançada
assert.throws(() => Reflect.get(1, 'foo'), TypeError)


// --- has

// --- ownKeys
const user = Symbol('user')
const myObj = {
    id: 1,
    [Symbol.for('password')]: 123,
    [user]: 'user test'
}

// com os metodos do object temos que fazer 2 requisiçoes
const objectKeys = [
    ...Object.getOwnPropertyNames(myObj),
    ...Object.getOwnPropertySymbols(myObj)
]

assert.deepStrictEqual(objectKeys, ['id', Symbol.for('password'), user])

// com o reflect, apenas uma requisição
assert.deepStrictEqual(Reflect.ownKeys(myObj), ['id', Symbol.for('password'), user])



