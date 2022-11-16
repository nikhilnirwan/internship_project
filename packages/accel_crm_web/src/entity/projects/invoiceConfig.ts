import * as moment from 'moment';

export const invoiceConfig = {
  api: () => '/invoiceJobs',
  title: 'Invoice Jobs',
  isActionTab: true,
  moreActions: [
    { name: 'View PDF', action: 'invoice', getKey: (value) => value['invoiceFile'] }
  ],
  maskClosable: false,
  modalTitle: (action) => action + ' Invoice',
  getColumns: () => {
    return [
      {
        title: 'Invoice Number',
        dataIndex: 'invoiceNumber',
        key: 'invoiceNumber',
        render: (value) => {
          return `A-${value}`;
        },
      },
      {
        title: 'Bill From',
        dataIndex: 'billFrom',
        key: 'billFrom',
        render: (value) => {
          return value.beneficiaryName;
        },
      },
      {
        title: 'Bill TO',
        dataIndex: 'billTo',
        key: 'billTo',
        render: (value) => {
          return `${value.name} (${value.clientName})`;
        },
      },
      {
        title: 'Billing Start Date',
        dataIndex: 'startDate',
        key: 'startDate',
        render: (value) => {
          return moment(value).format('DD MMM, YYYY');
        },
      },
      {
        title: 'Billing End Date',
        dataIndex: 'endDate',
        key: 'endDate',
        render: (value) => {
          return moment(value).format('DD MMM, YYYY');
        },
      },
      {
        title: 'Invoice Sent On',
        dataIndex: 'invoiceDate',
        key: 'invoiceDate',
        isSearch: true,
      },
      {
        title: 'Is Invoice Sent?',
        dataIndex: 'invoiceSent',
        key: 'invoiceSent',
        render: (value) => {
          return value ? 'Sent' : 'Pending';
        },
      },
      {
        title: 'Is Invoice Cleared?',
        dataIndex: 'invoiceSent',
        key: 'invoiceSent',
        render: (value) => {
          return value ? 'Sent' : 'Pending';
        },
      },
      {
        title: 'Invoice Cleared On',
        dataIndex: 'invoiceSent',
        key: 'invoiceSent',
      },
    ];
  },
  getFormColumns: () => {
    return [{
      title: 'Beneficiary Name',
      dataIndex: 'beneficiaryName',
      key: 'beneficiaryName',
      type: 'text',
      formClassName: 'col-4 pb-2',
    }];
  },
  getData: () => { },
  actions: [
    { name: 'Add InvoiceJob', isModal: true, settings: { type: 'primary' } },
    { name: 'Return', isBack: true, settings: { type: 'primary' } },
  ],
};
