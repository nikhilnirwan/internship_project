let invoiceSchedular = require('../schedulers/invoiceJob.scheduler');

module.exports = (app) => {
    invoiceSchedular.calculateInvoice();

}
