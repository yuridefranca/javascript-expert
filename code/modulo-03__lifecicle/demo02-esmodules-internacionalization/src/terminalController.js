import chalk from 'chalk'
import chalkTable from 'chalk-table'
import DraftLog from 'draftlog'
import readLine from 'readline'

import Person from './person.js'

export default class TerminalController {
    constructor() {
        this.data = {}
        this.print = {}
        this.terminal = {}
    }

    initializeTerminal(database, language) {
        DraftLog(console).addLineListener(process.stdin)
        this.terminal = readLine.createInterface({
            input: process.stdin,
            output: process.stdout
        })

        this.initializeTable(database, language)
    }

    initializeTable(database, language) {
        const data = database.map(item => new Person(item).formatted(language))
        const table = chalkTable(this.getTableOptions(), data)
        const print = console.draft(table)

        this.data = data
        this.print = print
    }

    question(text = '') {
        return new Promise(resolve => this.terminal.question(text, resolve))
    }

    getTableOptions() {
        return {
            leftPad: 2,
            columns: [
                { field: 'id', name: chalk.cyan('ID') },
                { field: 'vehicles', name: chalk.magenta('Vehicles') },
                { field: 'kmTraveled', name: chalk.cyan('Km Traveled') },
                { field: 'from', name: chalk.cyan('From') },
                { field: 'to', name: chalk.cyan('To') },
            ]
        }
    }

    closeTerminal() {
        this.terminal.close()
    }

    updateTable(item) {
        this.data.push(item)
        this.print(chalkTable(this.getTableOptions(), this.data))
    }
}