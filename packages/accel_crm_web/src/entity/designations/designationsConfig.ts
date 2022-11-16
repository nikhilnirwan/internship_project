import * as React from 'react';

export const designationConfig = {
  api: () => '/role',
  title: 'Designation',
  isActionTab: true,
  modalTitle: (action) => `${action} ${designationConfig.title}`,
  getColumns: () => {
    return [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        isSearch: true,
      },
      {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
        isSearch: true,
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        isSearch: false,
        showSorterTooltip: true,
        render: (item) => {
          return item ? 'Active' : 'Deactive';
        },
      },
      {

        title: 'Created On',
        dataIndex: 'createdAt',
        key: 'createdAt',
        isSearch: true,

      },
    ];
  },
  getFormColumns: () => {
    return [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        isRequired: true,
        formClassName: 'col-8 pb-2',
      },
      {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
        type: 'textarea',
        isRequired: false,
        formClassName: 'col-8 pb-2',
      },
    ];
  },
  getData: () => { },
  actions: [
    { name: 'Add Designation', isModal: true, settings: { type: 'primary' } },
    { name: 'Return', isBack: true, settings: { type: 'primary' } },
  ],
};
