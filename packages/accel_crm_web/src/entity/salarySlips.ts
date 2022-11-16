export const salarySlipConfig = {
  api: () => '/salaryslips',
  title: 'My Salary',
  isActionTab: true,
  modalTitle: (action) => `${action} ' Salary'`,
  getColumns: () => {
    return [
      {
        title: 'First Name',
        dataIndex: 'firstName',
        key: 'firstName',
        isSearch: true,
      },
      {
        title: 'Last Name',
        dataIndex: 'lastName',
        key: 'lastName',
        isSearch: true,
      },
      {
        title: 'Month',
        dataIndex: 'month',
        key: 'month',
        isSearch: true,
      },
      {
        title: 'Total Salary',
        dataIndex: 'totalSalary',
        key: 'totalSalary',
        isSearch: true,
      },
    ];
  },
  getFormColumns: () => {
    return [];
  },
  getData: () => { },
  actions: [
    { name: 'Return', isBack: true, settings: { type: 'primary' } },
  ],
};
