const assert = require('assert')

const arr1 = ['0', '1', '2']
const arr2 = ['2', '0', '3']
const arr3 = arr1.concat(arr2)

assert.deepStrictEqual(arr3.sort(), ['0', '0', '1', '2', '2', '3'])

const set = new Set()

arr1.forEach(item => set.add(item))
arr2.forEach(item => set.add(item))
assert.deepStrictEqual(Array.from(set), ['0', '1', '2', '3'])

assert.deepStrictEqual(Array.from(new Set([...arr1, ...arr2])), ['0', '1', '2', '3'])

// console.log('set.keys()', set.keys())
// console.log('set.values()', set.values()) // só existe por compatibilidade com o Map

assert.ok(set.has('1'))

// compara o que tem nos dois arrays
const users1 = new Set([
    'Yuri',
    'João',
    'Maria',
])

const users2 = new Set([
    'Yuri',
    'José',
    'Ana',
])

const intersection = new Set([...users1].filter(user => users2.has(user)))
assert.deepStrictEqual(Array.from(intersection), ['Yuri'])

const difference = new Set([...users1].filter(user => !users2.has(user)))
assert.deepStrictEqual(Array.from(difference), ['João', 'Maria'])

// WeakSet
const users = [
    { id: 1, name: 'Yuri' },
    { id: 2, name: 'João' },
]

const weakSet = new WeakSet(users)
// weakSet.add({ id: 3, name: 'Maria' })
// weakSet.delete(users[0])
// weakSet.has(users[1])