// O padrão fluent API tem como objetivo executar taferas de forma encadeada, e no fim chama o build
// muito parecido como  o padrão builder, porém o builder é mais focado em construir objetos e esse
// é mais sobre processos

class TextProcessorFluentApi {
    #content;

    constructor(content) {
        this.#content = content;
    }

    extractPeopleData() {
        const regExpression =
            /(?<=[contratante|contratada]:\s{1})(?!\s)(.*\n.*?)$/gim;

        const person = this.#content.match(regExpression);
        this.#content = person;

        return this;
    }

    build() {
        return this.#content;
    }
}

module.exports = TextProcessorFluentApi;
