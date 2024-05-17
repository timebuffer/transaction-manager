class Transaction {
    constructor(date, description, amount, type) {
        this.date = date;
        this.description = description;
        this.amount = amount;
        this.type = type;
    }
}

module.exports = Transaction;
