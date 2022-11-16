import * as React from 'react';

export const accessConfig = {
    api: () => '/access',
    title: 'Access',
    isActionTab: true,
    modalTitle: (action) => `${action} ${accessConfig.title}`,
    getColumns: () => {
        return [
            {
                title: 'Role Name',
                dataIndex: 'role',
                key: 'role',
                isSearch: false,
                render: (value) => {
                    if (value) {
                        return value.name
                    } else {
                        return ''
                    }
                }
            },
            {
                title: 'Page Name',
                dataIndex: 'routing',
                key: 'routing',
                render: (value) => {
                    if (value) {
                        return value.name
                    } else {
                        return ''
                    }
                }
            },
            {
                title: 'View',
                dataIndex: 'view',
                key: 'view',
                render: (item) => {
                    return item ? '✅' : '❌';
                },
            },
            {
                title: 'Edit',
                dataIndex: 'edit',
                key: 'edit',
                render: (item) => {
                    return item ? '✅' : '❌';
                },
            },
            {
                title: 'Create',
                dataIndex: 'create',
                key: 'create',
                render: (item) => {
                    return item ? '✅' : '❌';
                },
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
                title: 'Role Name',
                dataIndex: 'role',
                key: 'role',
                isRequired: true,
                type: 'select',
                isCombo: true,
                formClassName: 'col-6 pb-2',
            },
            {
                title: 'Page Name',
                dataIndex: 'routing',
                key: 'routing',
                isRequired: true,
                type: 'select',
                isCombo: true,
                formClassName: 'col-6 pb-2',
            },
            {
                title: 'View',
                dataIndex: 'view',
                key: 'view',
                type: 'checkbox',
                formClassName: 'col-2 pb-2',
                defaultValue: false
            },
            {
                title: 'Edit',
                dataIndex: 'edit',
                key: 'edit',
                type: 'checkbox',
                formClassName: 'col-2 pb-2',
                defaultValue: false
            },
            {
                title: 'Create',
                dataIndex: 'create',
                key: 'create',
                type: 'checkbox',
                formClassName: 'col-2 pb-2',
                defaultValue: false
            },
        ];
    },
    combo: [{
        name: 'role',
        api: '/role',
        idKey: '_id',
        nameKey: 'name',
    }, {
        name: 'routing',
        api: '/routing',
        idKey: '_id',
        nameKey: 'name',
    }],
    getData: () => { },
    actions: [
        { name: 'Add Access', isModal: true, settings: { type: 'primary' } },
        { name: 'Return', isBack: true, settings: { type: 'primary' } },
    ],
};
