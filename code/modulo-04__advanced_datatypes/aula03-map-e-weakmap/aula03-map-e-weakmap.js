const assert = require('assert')
const myMap = new Map()

myMap
    .set(1, 'one')
    .set('Yuri', { text: 'two' })
    .set(true, () => 'hello')

const myMapWithConstructor = new Map([
    ['1', 'str1'],
    [1, 'num1'],
    [true, 'bool1']
])

// console.log('myMap', myMap)
// console.log('myMap.get(1)', myMap.get(1))

assert.deepStrictEqual(myMap.get(1), 'one')
assert.deepStrictEqual(myMap.get('Yuri'), { text: 'two' })
assert.deepStrictEqual(myMap.get(true)(), 'hello')

const onlyReferenceWorks = { id: 1 }
myMap.set(onlyReferenceWorks, { name: 'Yuri' })

assert.deepStrictEqual(myMap.get({ id: 1 }), undefined)
assert.deepStrictEqual(myMap.get(onlyReferenceWorks), { name: 'Yuri' })

// utilitarios
// - Em um objeto comum seria Object.keys({ a: 1 }).length
assert.deepStrictEqual(myMap.size, 4)

// - Em um objeto comum seria ({ a: 1 }).hasOwnProperty('a')
assert.ok(myMap.has(1))

// - Em um objeto comum seria delete ({ a: 1 }).a
assert.ok(myMap.delete(1))

assert.deepStrictEqual(JSON.stringify([...myMap]), JSON.stringify([["Yuri",{"text":"two"}],[true,null],[{"id":1},{"name":"Yuri"}]]))

// for (const [ key, value ] of myMap) {
//     console.log({ key, value })
// }

// Object é inseguro pois permite a substituição de comportamentos padrao
// ({}).toString => '[object Object]'
// ({ toString: () => 'Hey' }).toString() === 'Hey'

const actor = {
    name: 'Yuri',
    toString: 'teste'
}

// nao tem restrição dde nome de chave
myMap.set(actor)
assert.ok(myMap.has(actor))
assert.throws(() => myMap.get(actor).toString, TypeError)

// nao da pra "limpar" um objeto sem reassina-lo
myMap.clear()
assert.deepStrictEqual([...myMap.keys()], [])

// WeakMap
// - Não é iteravel
// Só é possivel acessar com a referencia das chaves

const weakMap = new WeakMap()
const hero = { name: 'Black Panther' }

// weakMap.set(hero)
// weakMap.get(hero)
// weakMap.delete(hero)
// weakMap.has(hero)
