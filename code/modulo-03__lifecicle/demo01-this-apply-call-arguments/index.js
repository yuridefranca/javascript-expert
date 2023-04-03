'use-strict';

const { watch, promises: { readFile } } = require('fs')

class File {
    watch(event, filename) {
        console.log('this', this)
        console.log('arguments', Array.prototype.slice.call(arguments))

        this.showContent(filename)
    }

    async showContent(filename) {
        console.log((await readFile(filename)).toString())
    }
}

const file = new File()

// dessa forma ele entende o 'this' como sendo do fsWatch
// watch(__filename, file.watch)

// alternativa para herdar o this da classe, usar arrow function
// porem fica feio! 
// watch(__filename, (event, filename) => file.watch(event, filename))

// outra alternativa, a melhor, seria deixar explicito o contexto usando o 'bind'
// o bind retorna uma função com o 'this' que se mantem de file, ignorando o fsWatch
// watch(__filename, file.watch.bind(file))

file.watch.call({ showContent: () => console.log('call: hey sinon!') }, null, __filename)
file.watch.apply({ showContent: () => console.log('call: hey sinon!') }, [ null, __filename ])


