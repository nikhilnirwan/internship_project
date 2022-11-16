export const leavesConfirg = {
  api: () => '/leaveMaster',
  title: 'Leaves Master',
  isActionTab: true,
  modalTitle: (action) => `${action}  Leaves`,
  getColumns: () => {
    return [
      {
        title: 'Leave Name',
        dataIndex: 'name',
        key: 'name',
        isSearch: true,
      },
      {
        title: 'Leave Can Aprroved after day(s)',
        dataIndex: 'leaveCanAprrovedAfterDays',
        key: 'leaveCanAprrovedAfterDays',
        isSearch: true,
      },
      {
        title: 'Leave Can Take In A Year',
        dataIndex: 'LeaveCanTakeInAYear',
        key: 'LeaveCanTakeInAYear',
        isSearch: true,
      }
    ];
  },
  getFormColumns: () => {
    return [
      {
        title: 'Leave Name',
        dataIndex: 'name',
        key: 'name',
        isRequired: true,
        formClassName: 'col-4 pb-2',
      },
      {
        title: 'Leave Can Aprroved after day(s)',
        dataIndex: 'leaveCanAprrovedAfterDays',
        key: 'leaveCanAprrovedAfterDays',
        type: 'number',
        isRequired: true,
        formClassName: 'col-4 pb-2',
      },
      {
        title: 'Leave Can Take In A Year',
        dataIndex: 'LeaveCanTakeInAYear',
        key: 'LeaveCanTakeInAYear',
        type: 'number',
        isRequired: true,
        formClassName: 'col-4 pb-2',
      }
    ];
  },
  getData: () => { },
  actions: [
    { name: 'Add Leave', isModal: true, settings: { type: 'primary' } },
    { name: 'Return', isBack: true, settings: { type: 'primary' } },
  ],
};
