const http = require('http')
const { once } = require('events')

const DEFAULT_USER = {
    username: 'yuridefranca',
    password: '123',
}

const routes = {
    // curl -i localhost:80/contacts
    '/contacts:get': (req, res) => {
        res.write('Contact us page')
        return res.end()
    },
    // curl -X POST localhost:80/login --data '{"username": "yuridefranca", "password": "123"}'
    '/login:post': async (req, res) => {
        const user = JSON.parse(await once(req, 'data'))
        const toLower = (string) => string.toLowerCase()

        if (
            toLower(user.username) !== toLower(DEFAULT_USER.username) ||
            user.password !== DEFAULT_USER.password
        ) {
            res.writeHead(401)
            res.end('Log in failed!')
            return
        }

        return res.end('Log in succeeded!')
    },

    default: (req, res) => {
        res.writeHead(404)
        return res.end('Not found')
    }
}

const handler = (req, res) => {
    const { url, method } = req

    const routeKey = `${url}:${method.toLowerCase()}`
    const chosen = routes[routeKey] || routes.default

    res.writeHeader(200, {
        'Content-Type': 'text/html'
    })

    return chosen(req, res)
}

const app = http.createServer(handler)
    .listen(80, () => console.log('app is running on port', 80))

module.exports = app