import * as moment from 'moment';

export const projectConfigs = {
  api: () => '/projects',
  title: 'Project',
  isActionTab: true,
  maskClosable: false,
  modalTitle: (action) => action + ' Project',
  getColumns: () => {
    return [
      {
        title: 'Organization',
        dataIndex: 'company',
        key: 'company',
        isSearch: true,
      },
      {
        title: 'Project Name',
        dataIndex: 'name',
        key: 'name',
        isSearch: true,
      },
      {
        title: 'Client Name',
        dataIndex: 'clientName',
        key: 'clientName',
        isSearch: true,
      },
      {
        title: 'Client Email',
        dataIndex: 'clientEmail',
        key: 'clientEmail',
        isSearch: true,
      },
      {
        title: 'Project Link',
        dataIndex: 'projectLink',
        key: 'projectLink',
        isSearch: true,
      },
      {
        title: 'Starting Date',
        dataIndex: 'startDate',
        key: 'startDate',
        isSearch: true,

      },
      {
        title: 'Ending Date',
        dataIndex: 'endDate',
        key: 'endDate',
        isSearch: true,
      },
    ];
  },
  getFormColumns: () => {
    return [
      {
        title: 'Organization',
        dataIndex: 'company',
        key: 'company',
        type: 'text',
        isRequired: true,
        formClassName: 'col-4 pb-2',
      },
      {
        title: 'Project Name',
        dataIndex: 'name',
        key: 'name',
        type: 'text',
        isRequired: true,
        formClassName: 'col-4 pb-2',
      },
      {
        title: 'Client Name',
        dataIndex: 'clientName',
        key: 'clientName',
        type: 'text',
        isRequired: true,
        formClassName: 'col-4 pb-2',
      },
      {
        title: 'Client Email',
        dataIndex: 'clientEmail',
        key: 'clientEmail',
        type: 'email',
        formClassName: 'col-4 pb-2',
      },
      {
        title: 'GSTN',
        dataIndex: 'GSTN',
        key: 'GSTN',
        type: 'text',
        formClassName: 'col-4 pb-2',
      },
      {
        title: 'Starting Date',
        dataIndex: 'startDate',
        key: 'startDate',
        type: 'date',
        formClassName: 'col-4 pb-2',
      },
      {
        title: 'Ending Date',
        dataIndex: 'endDate',
        key: 'endDate',
        type: 'date',
        formClassName: 'col-4 pb-2',
      },
      {
        title: 'SAC Number',
        dataIndex: 'SAC',
        key: 'SAC',
        type: 'text',
        formClassName: 'col-4 pb-2',
      },
      {
        title: 'Project Link',
        dataIndex: 'projectLink',
        key: 'projectLink',
        type: 'url',
        formClassName: 'col-4 pb-2',
      },

      {
        title: 'State',
        dataIndex: 'state',
        key: 'state',
        type: 'text',
        formClassName: 'col-4 pb-2',
      },
      {
        title: 'City',
        dataIndex: 'city',
        key: 'city',
        type: 'text',
        formClassName: 'col-4 pb-2',
      },
      {
        title: 'Zip Code',
        dataIndex: 'zipCode',
        key: 'zipCode',
        type: 'text',
        formClassName: 'col-4 pb-2',
      },
      {
        title: 'Address Line 1',
        dataIndex: 'addressLine1',
        key: 'addressLine1',
        type: 'textarea',
        formClassName: 'col-4 pb-2',
      },
      {
        title: 'Address Line 2',
        dataIndex: 'addressLine2',
        key: 'addressLine2',
        type: 'textarea',
        formClassName: 'col-4 pb-2',
      },
      {
        title: 'Client declaration',
        dataIndex: 'clientDeclaration',
        key: 'clientDeclaration',
        type: 'textarea',
        formClassName: 'col-4 pb-2',
      },
      {
        title: 'Client Discriptions for Invoice',
        dataIndex: 'clientDiscriptions',
        key: 'clientDiscriptions',
        type: 'textarea',
        formClassName: 'col-4 pb-2',
      },
      {
        title: 'Project Discriptions',
        dataIndex: 'description',
        key: 'description',
        type: 'textarea',
        formClassName: 'col-8 pb-',
      },
    ];
  },
  getData: () => { },
  actions: [
    { name: 'Add Project', isModal: true, settings: { type: 'primary' } },
    { name: 'Return', isBack: true, settings: { type: 'primary' } },
  ],
};
