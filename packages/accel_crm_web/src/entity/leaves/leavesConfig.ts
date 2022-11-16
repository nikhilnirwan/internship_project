import * as moment from "moment";

export const leavesConfirg = {
  api: () => '/leaves',
  title: 'Leaves',
  isActionTab: true,
  modalTitle: (action) => `${action}  Leaves`,
  getColumns: () => {
    return [
      {
        title: 'Leave From',
        dataIndex: 'leaveFrom',
        key: 'leaveFrom',
        isSearch: true,
        render: (text) => {
          return moment(text).format('DD MMM YYYY')
        }
      },
      {
        title: 'Leave To',
        dataIndex: 'leaveTo',
        key: 'leaveTo',
        isSearch: true,
        render: (text) => {
          return moment(text).format('DD MMM YYYY')
        }
      },
      {
        title: 'Leave Type',
        dataIndex: 'leaveType',
        key: 'leaveType',
        isSearch: true,
        render: (text) => {
          return text.name
        }
      },
      {
        title: 'Approved By',
        dataIndex: 'approvedBy',
        key: 'approvedBy',
        render: (text) => {
          return text.map(ele => `${ele.firstName} ${ele.middelName} ${ele.lastName}`).join(', ')
        }
      },
      {
        title: 'Approval Status',
        dataIndex: 'approvalStatus',
        key: 'approvalStatus',
      },
      {
        title: 'Approved By',
        dataIndex: 'approvalFrom',
        key: 'approvalFrom',
        type: "viewText",
        render: (text) => {
          return Array.isArray(text) && text.map(ele => `<b>${ele.name} </b><br/> ${ele.comment} <br/><br/>`).join('')
        }
      }
    ];
  },
  getFormColumns: () => {
    return [
      {
        title: 'Leave from',
        dataIndex: 'leaveFrom',
        key: 'leaveFrom',
        type: 'date',
        isRequired: true,
        customValidation: { notLessThan: 'today', notGraterThan: 'leaveTo' },
        formClassName: 'col-4 pb-2',
      },
      {
        title: 'Leave To',
        dataIndex: 'leaveTo',
        key: 'leaveTo',
        type: 'date',
        isRequired: true,
        formClassName: 'col-4 pb-2',
      },
      {
        title: 'Approvel need from',
        lebelInstructions: 'Use *managers* key as a comboKey in map Designation to populate this field',
        dataIndex: 'approvedBy',
        key: 'approvedBy',
        type: 'select',
        multiple: true,
        isCombo: true,
        isRequired: true,
        formClassName: 'col-4 pb-2',
      },
      {
        title: 'Leave Type',
        dataIndex: 'leaveType',
        key: 'leaveType',
        isRequired: true,
        type: 'select',
        isCombo: true,
        formClassName: 'col-4 pb-2',
      },
      {
        title: 'Reason',
        dataIndex: 'reason',
        key: 'reason',
        type: 'textarea',
        isRequired: true,
        formClassName: 'col-12 pb-2',
      },
    ];
  },
  combo: [
    {
      name: 'leaveType',
      api: '/leaveMaster',
      idKey: '_id',
      nameKey: 'name',
    },
    {
      name: 'approvedBy',
      api: '/users/managers/list',
      idKey: '_id',
      nameKey: ['firstName', 'middelName', 'lastName'],
    }
  ],
  getData: () => { },
  actions: [
    { name: 'Add Leave', isModal: true, settings: { type: 'primary' } },
    { name: 'Return', isBack: true, settings: { type: 'primary' } },
  ],
};
