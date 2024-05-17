const fs = require('fs');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

// Mock function to fetch transaction data
function fetchTransactionData() {
    // Replace this with actual data fetching logic (API call, database query, etc.)
    return [
        { date: '2024-01-01', description: 'Salary', amount: 3000, type: 'income' },
        { date: '2024-01-05', description: 'Groceries', amount: -150, type: 'expense' },
        { date: '2024-01-10', description: 'Electricity Bill', amount: -100, type: 'expense' },
        { date: '2024-01-15', description: 'Freelance Work', amount: 500, type: 'income' },
        { date: '2024-01-20', description: 'Dining Out', amount: -60, type: 'expense' }
    ];
}

// Save data to CSV
function saveToCsv(data, filename = 'transactions.csv') {
    const csvWriter = createCsvWriter({
        path: filename,
        header: [
            { id: 'date', title: 'DATE' },
            { id: 'description', title: 'DESCRIPTION' },
            { id: 'amount', title: 'AMOUNT' },
            { id: 'type', title: 'TYPE' }
        ]
    });

    csvWriter.writeRecords(data)
        .then(() => {
            console.log(`Data saved to ${filename}`);
        });
}

// Generate statistics
function generateStatistics(data) {
    const totalIncome = data.filter(d => d.type === 'income').reduce((acc, curr) => acc + curr.amount, 0);
    const totalExpense = data.filter(d => d.type === 'expense').reduce((acc, curr) => acc + curr.amount, 0);
    const netSavings = totalIncome + totalExpense; // Expenses are negative

    console.log(`Total Income: ${totalIncome}`);
    console.log(`Total Expense: ${totalExpense}`);
    console.log(`Net Savings: ${netSavings}`);
}

// Add new category for income
function addIncomeCategory(data, description, amount) {
    const newIncome = { date: new Date().toISOString().split('T')[0], description, amount, type: 'income' };
    data.push(newIncome);
    return data;
}

// Main function
function main() {
    let data = fetchTransactionData();
    saveToCsv(data);
    generateStatistics(data);

    // Add new income category
    data = addIncomeCategory(data, 'Investment Return', 200);
    saveToCsv(data, 'updated_transactions.csv');
    generateStatistics(data);
}

main();
