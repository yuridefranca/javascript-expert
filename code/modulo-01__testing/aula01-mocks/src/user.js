class User {
    constructor({ age, id, name, profession }) {
        this.birthYear = new Date().getFullYear() - age
        this.id = parseInt(id)
        this.name = name
        this.profession = profession
    }
}

module.exports = User;