export const invoiceMasterConfig = {
  api: () => '/invoiceMaster',
  title: 'Invoice Master',
  isActionTab: true,
  maskClosable: false,

  modalTitle: (action) => action + ' Invoice',
  getColumns: () => {
    return [
      {
        title: 'Bill From',
        dataIndex: 'billFrom',
        key: 'billFrom',
        render: (value) => {
          return value && value.beneficiaryName;
        }
      },
      {
        title: 'Bill To',
        dataIndex: 'billTo',
        key: 'billTo',
        render: (value) => {
          return value && value.name;
        }
      },
      {
        title: 'Developers',
        dataIndex: 'developers',
        key: 'developers',
        render: (value) => {
          if (Array.isArray(value)) {
            return value.map(ele => ele.firstName + ' ' + ele.lastName).join(', ')
          } else {
            return value
          }
        }
      },
      {
        title: 'Price',
        dataIndex: 'price',
        key: 'price'
      },
      {
        title: 'Leaves',
        dataIndex: 'leaves',
        key: 'leaves'
      },
      {
        title: 'TDS',
        dataIndex: 'tds',
        key: 'tds'
      },
      {
        title: 'GST',
        dataIndex: 'GST',
        key: 'GST'
      },
      {
        title: 'Start Date',
        dataIndex: 'startDate',
        key: 'startDate',
      },
      {
        title: 'End Date',
        dataIndex: 'endDate',
        key: 'endDate',
      },
      {
        title: 'Send Immediate',
        dataIndex: 'sendImmediate',
        key: 'sendImmediate',
        render: (value) => {
          return value ? 'Active' : 'Deactive'
        }
      },
      {
        title: 'Is Schedule',
        dataIndex: 'isSchedule',
        key: 'isSchedule',
        render: (value) => {
          return value ? 'Active' : 'Deactive'
        }
      }
    ];
  },
  getFormColumns: () => {
    return [
      {
        title: 'Bill From',
        dataIndex: 'billFrom',
        key: 'billFrom',
        type: 'select',
        isCombo: true,
        isRequired: true,
        formClassName: 'col-4 pb-2',
      },
      {
        title: 'Bill To',
        dataIndex: 'billTo',
        key: 'billTo',
        type: 'select',
        isCombo: true,
        isRequired: true,
        formClassName: 'col-4 pb-2'
      },
      {
        title: 'Developers',
        lebelInstructions: 'Use *developers* key as a comboKey in map Designation to populate this field',
        dataIndex: 'developer',
        key: 'developer',
        type: 'form',
        heading: 'Developers',
        form: [
          [
            {
              title: 'Developer',
              lebelInstructions: 'Use *developers* key as a comboKey in map Designation to populate this field',
              dataIndex: 'developers',
              key: 'developers',
              type: 'select',
              multiple: false,
              isCombo: true,
              formClassName: 'col-4 pb-2',
            },
            {
              title: 'Price',
              dataIndex: 'price',
              key: 'price',
              type: 'number',
              isRequired: true,
              formClassName: 'col-4 pb-2',
            },
            {
              title: 'Leaves',
              dataIndex: 'leaves',
              key: 'leaves',
              type: 'number',
              isRequired: true,
              formClassName: 'col-4 pb-2',
            },
            {
              title: 'Bonus',
              dataIndex: 'bonus',
              key: 'bonus',
              type: 'text',
              formClassName: 'col-4 pb-2',
            },
          ]
        ]
      },
      {
        title: 'TDS',
        dataIndex: 'tds',
        isRequired: true,
        lebelInstructions: 'Value will be count as percentage(%)',
        key: 'tds',
        type: 'number',
        formClassName: 'col-4 pb-2',
      },
      {
        title: 'GST',
        dataIndex: 'GST',
        isRequired: true,
        lebelInstructions: 'Value will be count as percentage(%)',
        key: 'GST',
        type: 'number',
        formClassName: 'col-4 pb-2',
      },
      {
        title: 'Start Date',
        dataIndex: 'startDate',
        key: 'startDate',
        isRequired: true,
        type: 'date',
        formClassName: 'col-4 pb-2',
      },
      {
        title: 'End Date',
        dataIndex: 'endDate',
        key: 'endDate',
        type: 'date',
        isRequired: true,
        formClassName: 'col-4 pb-2',
      },
      {
        title: 'Send Immediate',
        dataIndex: 'sendImmediate',
        key: 'sendImmediate',
        type: 'checkbox',
        formClassName: 'col-2 pb-',
      },
      {
        title: 'Is Schedule',
        dataIndex: 'isSchedule',
        key: 'isSchedule',
        type: 'checkbox',
        formClassName: 'col-2 pb-',
      },
    ];

  },
  combo: [{
    name: 'billTo',
    api: '/projects',
    idKey: '_id',
    nameKey: 'name',
  }, {
    name: 'billFrom',
    api: '/accounts',
    idKey: '_id',
    nameKey: 'beneficiaryName',
  },
  {
    name: 'developers',
    api: '/users/developers/list',
    idKey: '_id',
    nameKey: ['firstName', 'middelName', 'lastName'],
  },
  ],
  getData: () => { },
  actions: [
    { name: 'Add Invoice', isModal: true, settings: { type: 'primary' } },
    { name: 'Return', isBack: true, settings: { type: 'primary' } },
  ],
};
