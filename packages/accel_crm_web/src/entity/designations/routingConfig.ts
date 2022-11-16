import * as React from 'react';

export const routingConfig = {
  api: () => '/routing',
  title: 'Routing',
  isActionTab: true,
  modalTitle: (action) => `${action} Routing`,
  getColumns: () => {
    return [
      {
        title: 'Icon',
        dataIndex: 'icon',
        key: 'icon',
        type: 'renderHtml',
        render: (value) => {
          return `<${value}/>`
        }
      },
      {
        title: 'Page Name',
        dataIndex: 'name',
        key: 'name',
        isSearch: true,
      },
      {
        title: 'Route URL',
        dataIndex: 'routeUrl',
        key: 'routeUrl',
        isSearch: true,
      },
      {
        title: 'Component Name',
        dataIndex: 'componentName',
        key: 'componentName',
        isSearch: true,
      },
      {
        title: 'Parent Menu',
        dataIndex: 'parentMenu',
        key: 'parentMenu',
        isSearch: true,
      },
      {
        title: 'Sub Parent Menu',
        dataIndex: 'subparentMenu',
        key: 'subparentMenu',
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
        formClassName: 'col-4 pb-2',
      },
      {
        title: 'Component Name',
        dataIndex: 'componentName',
        key: 'componentName',
        formClassName: 'col-4 pb-2',
      },
      {
        title: 'Parent Menu',
        dataIndex: 'parentMenu',
        key: 'parentMenu',
        formClassName: 'col-4 pb-2',
      },
      {
        title: 'Sub Parent Menu',
        dataIndex: 'subparentMenu',
        key: 'subparentMenu',
        formClassName: 'col-4 pb-2',
      },
      {
        title: 'Route URL',
        dataIndex: 'routeUrl',
        key: 'routeUrl',
        isRequired: true,
        formClassName: 'col-4 pb-2',
      },
      {
        title: 'Icon',
        dataIndex: 'icon',
        key: 'icon',
        isRequired: true,
        formClassName: 'col-4 pb-2',
      },
    ];
  },
  getData: () => { },
  actions: [
    { name: 'Add Route', isModal: true, settings: { type: 'primary' } },
    { name: 'Return', isBack: true, settings: { type: 'primary' } },
  ],
};
