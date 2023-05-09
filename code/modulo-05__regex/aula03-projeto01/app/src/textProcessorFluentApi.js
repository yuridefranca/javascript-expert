// O padrão fluent API tem como objetivo executar taferas de forma encadeada, e no fim chama o build
// muito parecido como  o padrão builder, porém o builder é mais focado em construir objetos e esse
// é mais sobre processos

const { validateRegex } = require('./utils');

class TextProcessorFluentApi {
    #content;

    constructor(content) {
        this.#content = content;
    }

    build() {
        return this.#content;
    }

    extractPeopleData() {
        const regExpression = validateRegex(
            /(?<=[contratante|contratada]:\s{1})(?!\s)(.*\n.*?)$/gim
        );

        const person = this.#content.match(regExpression);
        this.#content = person;

        return this;
    }

    divideTextInColumns() {
        const splitRegex = validateRegex(/,/g);
        this.#content = this.#content.map((line) => line.split(splitRegex));
        return this;
    }

    removeEmptyCharacters() {
        const trimSpaces = validateRegex(/^\s+|\s+$|\n/g);
        this.#content = this.#content.map((line) =>
            line.map((item) => item.replace(trimSpaces, ''))
        );
        return this;
    }
}

module.exports = TextProcessorFluentApi;
