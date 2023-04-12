import * as mocha from 'mocha'
const { describe, it } = mocha
import chai from 'chai'
const { expect } = chai

import Person from '../src/person.js'

describe('Person', () => {
    it('should return instance of Person from a string', async () => {
        const person = Person.generateInstanceFromString('1 Bike,Moto 20000 2023-01-01 2023-04-11')

        const expected = {
            from: '2023-01-01',
            id: '1',
            kmTraveled: '20000',
            to: '2023-04-11',
            vehicles: ['Bike', 'Moto']
        }

        expect(person).to.be.deep.equal(expected)

    })

    it('should format values', async () => {
        const person = new Person({
            from: '2023-01-01',
            id: '1',
            kmTraveled: '20000',
            to: '2023-04-11',
            vehicles: ['Bike', 'Moto']
        })

        const response = person.formatted('pt-BR')

        const expected = {
            id: 1,
            vehicles: 'Bike e Moto',
            kmTraveled: '20.000 km',
            from: '01 de janeiro de 2023',
            to: '11 de abril de 2023'
        }

        expect(response).to.be.deep.equal(expected)
    })
})

