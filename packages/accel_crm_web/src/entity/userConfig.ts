export const userConfigs = {
  api: () => '/users',
  title: 'Users',
  isActionTab: true,
  modalTitle: (action) => `${action} User`,
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
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
        isSearch: true,
      },
      {
        title: 'Gender',
        dataIndex: 'gender',
        key: 'gender',
        isSearch: true,
      },
      // {
      //   title: 'User Name',
      //   dataIndex: 'username',
      //   key: 'username',
      // },
      {
        title: 'Designation',
        dataIndex: 'role',
        key: 'role',
        render: (item) => {
          if (item) {
            return item.name
          }
        }
      },
      {
        title: 'Joining Date',
        dataIndex: 'dateOfJoining',
        key: 'dateOfJoining',
        isSearch: true,
      },
    ];
  },
  getFormColumns: () => {
    return [
      {
        title: 'First Name',
        dataIndex: 'firstName',
        key: 'firstName',
        isRequired: true,
        formClassName: 'col-4 pb-2',
      },
      {
        title: 'Middel Name',
        dataIndex: 'middelName',
        key: 'middelName',
        isRequired: false,
        formClassName: 'col-4 pb-2',
      },
      {
        title: 'Last Name',
        dataIndex: 'lastName',
        key: 'lastName',
        isRequired: true,
        formClassName: 'col-4 pb-2',
      },
      {
        title: 'Gender',
        dataIndex: 'gender',
        key: 'gender',
        isRequired: true,
        type: 'select',
        children: [
          { name: 'Male', value: 'Male' },
          { name: 'Female', value: 'Female' },
          { name: 'Other', value: 'Other' },
        ],
        formClassName: 'col-4 pb-2',
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
        isRequired: true,
        formClassName: 'col-4 pb-2',
      },
      // {
      //   title: 'User Name',
      //   dataIndex: 'username',
      //   key: 'username',
      //   isRequired: true,
      //   formClassName: 'col-4 pb-2',
      // },
      {
        title: 'Mobile',
        dataIndex: 'mobile',
        key: 'mobile',
        type: 'number',
        isRequired: true,
        formClassName: 'col-4 pb-2',
      },
      {
        title: 'Secondary Mobile',
        dataIndex: 'secondaryMobile',
        key: 'secondaryMobile',
        type: 'number',
        isRequired: false,
        formClassName: 'col-4 pb-2',
      },
      {
        title: 'Designation',
        dataIndex: 'role',
        key: 'role',
        isRequired: true,
        type: 'select',
        isCombo: true,
        formClassName: 'col-4 pb-2',
      },
      {
        title: 'Date Of Birth',
        dataIndex: 'dob',
        isRequired: true,
        type: 'date',
        key: 'dob',
        formClassName: 'col-4 pb-2',
      },
      {
        title: 'Date Of Joining',
        dataIndex: 'dateOfJoining',
        isRequired: true,
        type: 'date',
        key: 'dateOfJoining',
        formClassName: 'col-4 pb-2',
      },
      {
        title: 'Experience',
        dataIndex: 'experience',
        key: 'experience',
        type: 'text',
        isRequired: true,
        formClassName: 'col-4 pb-2',
      },

      // {
      //   title: 'PAN Number',
      //   dataIndex: 'PANNumber',
      //   key: 'PANNumber',
      //   type: 'text',
      //   isRequired: false,
      //   formClassName: 'col-4 pb-2',
      // }, {
      //   title: 'Adhar Number',
      //   dataIndex: 'adharNumber',
      //   key: 'adharNumber',
      //   type: 'number',
      //   isRequired: false,
      //   formClassName: 'col-4 pb-2',
      // },
      {
        title: 'Profile Photo',
        dataIndex: 'avatar',
        key: 'avatar',
        value: { size: 600 },
        type: 'file',
        isRequired: false,
        formClassName: 'col-2 pb-2',
      },
      // {
      //   title: 'Adhar Front',
      //   dataIndex: 'adharFront',
      //   key: 'adharFront',
      //   value: { size: 600 },
      //   type: 'file',
      //   isRequired: false,
      //   formClassName: 'col-2 pb-2',
      // },
      // {
      //   title: 'Adhar Back',
      //   dataIndex: 'adharBack',
      //   key: 'adharBack',
      //   value: { size: 600 },
      //   type: 'file',
      //   isRequired: false,
      //   formClassName: 'col-2 pb-2',
      // },
      // {
      //   title: 'Pan Card',
      //   dataIndex: 'panFile',
      //   key: 'panFile',
      //   value: { size: 600 },
      //   type: 'file',
      //   isRequired: false,
      //   formClassName: 'col-2 pb-2',
      // },
    ];
  },
  combo: [{
    name: 'role',
    api: '/role',
    idKey: '_id',
    nameKey: 'name',
  }],
  getData: () => { },
  actions: [
    { name: 'Add User', isModal: true, settings: { type: 'primary' } },
    { name: 'Return', isBack: true, settings: { type: 'primary' } },
  ],
};
