class StatisticsService {
    static generateStatistics(transactions) {
        const totalIncome = transactions.filter(t => t.type === 'income').reduce((acc, curr) => acc + curr.amount, 0);
        const totalExpense = transactions.filter(t => t.type === 'expense').reduce((acc, curr) => acc + curr.amount, 0);
        const netSavings = totalIncome + totalExpense; // Expenses are negative

        return {
            totalIncome,
            totalExpense,
            netSavings
        };
    }
}

module.exports = StatisticsService;
