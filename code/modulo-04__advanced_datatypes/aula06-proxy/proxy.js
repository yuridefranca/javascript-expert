'use-strict';

const Event = require('events');
const event = new Event();
const eventName = 'counter';

event.on(eventName, (msg) => console.log('counter updated', msg));

// event.emit(eventName, 'oi');
// event.emit(eventName, 'tchau');

const myCounter = {
    counter: 0,
};

const proxy = new Proxy(myCounter, {
    get: (object, prop) => {
        // console.log('chamou', { object, prop })
        return object[prop];
    },
    set: (target, propertyKey, newValue) => {
        event.emit(eventName, { newValue, key: target[propertyKey] });
        target[propertyKey] = newValue;
        return true;
    },
});

setInterval(function () {
    proxy.counter += 1;
    console.log('[3]: setInterval', proxy.counter);
    if (proxy.counter === 10) {
        clearInterval(this);
    }
}, 200);

setTimeout(() => {
    proxy.counter = 4;
    console.log('[2]: timeout');
}, 100);

// se quer que executa agora
setImmediate(() => {
    console.log('[1]: setImmediate', proxy.counter)
})

// executa agora, mas acaba com o ciclo de vida do node
process.nextTick(() => {
    proxy.counter = 2;
    console.log('[0]: nextTrick');
});
