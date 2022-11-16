export const manageSalaryConfig = {
  api: () => '/salaries',
  title: 'Manage Salary',
  isActionTab: true,
  modalTitle: (action) => `${action} Salary`,
  getColumns: () => {
    return [
      {
        title: 'Employee Name',
        dataIndex: 'employee',
        key: 'employee',
        isSearch: true,
        render: (value) => {
          return `${value.firstName} ${value.middelName} ${value.lastName}`
        }
      },
      {
        title: 'Bank Name',
        dataIndex: 'bankName',
        key: 'bankName',
        isSearch: true,
      },
      {
        title: 'Account Type',
        dataIndex: 'accountType',
        key: 'accountType',
        isSearch: true,
      },
      {
        title: 'Salary Per Month',
        dataIndex: 'salaryPerMonth',
        key: 'salaryPerMonth',
        isSearch: true,
      }
    ];
  },
  getFormColumns: () => {
    return [
      {
        title: 'Employee',
        dataIndex: 'employee',
        key: 'employee',
        lebelInstructions: 'Use *employees* key as a comboKey in map Designation to populate this field',
        type: 'select',
        isRequired: true,
        isCombo: true,
        formClassName: 'col-4 pb-2',
      },
      {
        title: 'Beneficiary Account Number',
        dataIndex: 'beneficiaryAccountNumber',
        key: 'beneficiaryAccountNumber',
        formClassName: 'col-4 pb-2',
      },
      {
        title: 'Bank Name',
        dataIndex: 'bankName',
        key: 'bankName',
        formClassName: 'col-4 pb-2',
      },
      {
        title: 'Bank Address',
        dataIndex: 'bankNameAndAddress',
        key: 'bankNameAndAddress',
        formClassName: 'col-4 pb-2',
      },
      {
        title: 'Account Type',
        dataIndex: 'accountType',
        key: 'accountType',
        formClassName: 'col-4 pb-2',
        type: 'select',
        isRequired: true,
        children: [
          { name: 'Saving', value: 'Saving' },
          { name: 'Current', value: 'Current' },
          { name: 'Salary', value: 'Salary' },
          { name: 'Other', value: 'Other' },
        ],
      },
      {
        title: 'IFSC Number',
        dataIndex: 'ifscNumber',
        key: 'ifscNumber',
        formClassName: 'col-4 pb-2',
      },
      {
        title: 'Salary Per Month',
        dataIndex: 'salaryPerMonth',
        key: 'salaryPerMonth',
        formClassName: 'col-4 pb-2',
      },
      {
        title: 'Salary Increment',
        dataIndex: 'salaryIncrements',
        key: 'salaryIncrements',
        type: 'form',
        form: [
          [
            {
              title: 'Increase By',
              dataIndex: 'increaseBy',
              key: 'increaseBy',
              type: 'number',
              isRequired: true,
              formClassName: 'col pb-2',
            },
            {
              title: 'Increment On',
              dataIndex: 'increemntOn',
              key: 'increemntOn',
              type: 'date',
              formClassName: 'col-4 pb-2',
            },
          ]
        ]
      }
    ];
  },
  combo: [
    {
      name: 'employee',
      api: '/users/employees/list',
      idKey: '_id',
      nameKey: ['firstName', 'middelName', 'lastName'],
    },
  ],
  getData: () => { },
  actions: [
    { name: 'Add Salary', isModal: true, settings: { type: 'primary' } },
    { name: 'Return', isBack: true, settings: { type: 'primary' } },
  ],
};
