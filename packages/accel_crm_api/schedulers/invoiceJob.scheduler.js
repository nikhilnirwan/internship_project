const schedule = require('node-schedule');
const invoiceCrons = require("./invoiceCrons");
module.exports = {
    calculateInvoice: () => {
        schedule.scheduleJob('* * * * *', () => {
            invoiceCrons.getInvoices();
        });
    },
    sendInvoice: () => {
        // schedule.scheduleJob('* * * * *', () => {
        //     invoiceCrons.getInvoices();
        // });
    }
}