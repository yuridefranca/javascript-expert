const { after, before, describe, it } = require('mocha')
const app = require('./api')
const assert = require('assert')
const supertest = require('supertest')

describe('API Suite test', () => {
    let app
    before((done) => {
        app = require('./api')
        app.once('listening', done())
    })

    after(done => app.close(done()))

    describe('/contacts:get', () => {
        it('should request the contacts route and return HTTP status 200', async () => {
            const response = await supertest(app)
                .get('/contacts')
                .expect(200)

            assert.deepStrictEqual(response.text, 'Contact us page')
        })
    })

    describe('/login:post', () => {
        it('should request the login route and return HTTP status 200', async () => {
            const response = await supertest(app)
                .post('/login')
                .send({ username: 'yuridefranca', password: '123' })
                .expect(200)

            assert.deepStrictEqual(response.text, 'Log in succeeded!')
        })

        it('should request the login route and return HTTP status 401', async () => {
            const response = await supertest(app)
                .post('/login')
                .send({ username: 'wronguser', password: '123' })
                .expect(401)

            assert.ok(response.unauthorized)
            assert.deepStrictEqual(response.text, 'Log in failed!')
        })
    })

    describe('/hi:get', () => {
        it('should request a non existing route and return HTTP status 404', async () => {
            const response = await supertest(app)
                .get('/hi')
                .expect(404)

            assert.deepStrictEqual(response.text, 'Not found')
        })
    })
})