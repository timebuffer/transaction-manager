const createCsvWriter = require('csv-writer').createObjectCsvWriter;

class CsvUtils {
    static async saveToCsv(data, filename) {
        const csvWriter = createCsvWriter({
            path: filename,
            header: [
                { id: 'date', title: 'DATE' },
                { id: 'description', title: 'DESCRIPTION' },
                { id: 'amount', title: 'AMOUNT' },
                { id: 'type', title: 'TYPE' }
            ]
        });

        try {
            await csvWriter.writeRecords(data);
            console.log(`Data saved to ${filename}`);
        } catch (error) {
            console.error(`Error saving data to CSV:`, error);
            throw error;
        }
    }
}

module.exports = CsvUtils;
