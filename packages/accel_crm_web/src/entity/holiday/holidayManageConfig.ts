const moment = require('moment');
export const holidayManagementConfig = {
    api: () => '/holiday',
    title: 'Holiday Management',
    isActionTab: true,
    modalTitle: (action) => `${action}  Holiday`,
    getColumns: () => {
        return [
            {
                title: 'Image',
                dataIndex: 'file',
                key: 'file',
                type: 'file'
            },
            {
                title: 'Holiday For',
                dataIndex: 'name',
                key: 'name',
                isSearch: true,
            },
            {
                title: 'Holiday On',
                dataIndex: 'holidayOn',
                key: 'holidayOn',
                isSearch: true,
                render: (text) => {
                    return moment(text).format('DD MMM YYYY')
                }
            }
        ];
    },
    getFormColumns: () => {
        return [
            {
                title: 'Holiday For',
                dataIndex: 'name',
                key: 'name',
                isRequired: true,
                formClassName: 'col-6 pb-2',
            },
            {
                title: 'Holiday On',
                dataIndex: 'holidayOn',
                key: 'holidayOn',
                type: 'date',
                isRequired: true,
                formClassName: 'col-6 pb-2',
            },
            {
                title: 'Description',
                dataIndex: 'description',
                key: 'description',
                type: 'textarea',
                isRequired: true,
                formClassName: 'col-6 pb-2',
            },
            {
                title: 'File',
                dataIndex: 'file',
                key: 'file',
                type: 'file',
                isRequired: true,
                formClassName: 'col-4 pb-2',
            }
        ];
    },
    combo: [],
    getData: () => { },
    actions: [
        { name: 'Add Holiday', isModal: true, settings: { type: 'primary' } },
        { name: 'Return', isBack: true, settings: { type: 'primary' } },
    ],
};
