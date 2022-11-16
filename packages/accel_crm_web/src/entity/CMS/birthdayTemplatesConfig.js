export const birthdayTemplatesConfig = {
    listApi: () => '/timesheet/get/userlist/?date=',
    formUrl: () => 'timesheet/get/userlist/',
    updateAPI: () => '/timeSheet/',
    deleteApi: () => '/timeSheet/',
    title: 'Timesheet',
    isActionTab: true,
    modalTitle: (action) => `${action} ' Timesheet'`,
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
                title: 'Gender',
                dataIndex: 'gender',
                key: 'gender',
                isSearch: true,
            },
            {
                title: 'Email',
                dataIndex: 'email',
                key: 'email',
                isSearch: true,
            },
            {
                title: 'User Name',
                dataIndex: 'username',
                key: 'username',
            },
            {
                title: 'Total Hours',
                dataIndex: 'totalHours',
                key: 'totalHours',
            },
            {
                title: 'Total Count',
                dataIndex: 'taskCount',
                key: 'taskCount',
                isSearch: false,
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
                formClassName: 'col-4 pb-2',
            },
            {
                title: 'User Name',
                dataIndex: 'username',
                key: 'username',
                formClassName: 'col-4 pb-2',
            },
            {
                title: 'Total Hours',
                dataIndex: 'totalHours',
                key: 'totalHours',
                formClassName: 'col-4 pb-2',
            },
            {
                title: 'Total Count',
                dataIndex: 'taskCount',
                key: 'taskCount',
                formClassName: 'col-4 pb-2',
            },
        ];
    },
    getData: () => { },
    actions: [
        { name: 'Add Timesheet', isModal: true, settings: { type: 'primary' } },
        { name: 'Return', isBack: true, settings: { type: 'primary' } },
    ],
};
