import * as React from 'react';

export const mapDesignationsConfig = {
    api: () => '/map-designation',
    title: 'Map Designation',
    isActionTab: true,
    modalTitle: (action) => `${action} ${mapDesignationsConfig.title}`,
    getColumns: () => {
        return [
            {
                title: 'Designation Name',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: 'Combo Key',
                dataIndex: 'comboKey',
                key: 'comboKey',
            },
            {
                title: 'Role Name',
                dataIndex: 'role',
                key: 'role',
                isSearch: false,
                render: (value) => {
                    if (value) {
                        return value.map(ele => ele.name).join(', ')
                    } else {
                        return ''
                    }
                }
            },
            {
                title: 'Created On',
                dataIndex: 'createdAt',
                key: 'createdAt',
                isSearch: false,
            },
        ];
    },
    getFormColumns: () => {
        return [
            {
                title: 'Designation Name',
                dataIndex: 'name',
                key: 'name',
                isRequired: true,
                formClassName: 'col-4 pb-2',
            },
            {
                title: 'Combo Key',
                dataIndex: 'comboKey',
                key: 'comboKey',
                isRequired: true,
                formClassName: 'col-4 pb-2',
            },

            {
                title: 'Role Name',
                dataIndex: 'role',
                key: 'role',
                isRequired: true,
                type: 'select',
                multiple: true,
                isCombo: true,
                formClassName: 'col-4 pb-2',
            }
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
        { name: 'Map Designations', isModal: true, settings: { type: 'primary' } },
        { name: 'Return', isBack: true, settings: { type: 'primary' } },
    ],
};
