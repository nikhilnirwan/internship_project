import * as moment from 'moment';

export const accountConfig = {
    api: () => '/accounts',
    title: 'Accounts',
    isActionTab: true,
    maskClosable: false,
    modalTitle: (action) => action + ' Accounts',
    getColumns: () => {
        return [
            {
                title: 'Beneficiary Name',
                dataIndex: 'beneficiaryName',
                key: 'beneficiaryName',
                isSearch: true,
            },
            {
                title: 'Beneficiary Account Number',
                dataIndex: 'beneficiaryAccountNumber',
                key: 'beneficiaryAccountNumber',
                isSearch: true,
            },
            {
                title: 'Bank Name and Address',
                dataIndex: 'bankNameAndAddress',
                key: 'bankNameAndAddress',
                isSearch: true,
            },
            {
                title: 'Bank Type',
                dataIndex: 'bankType',
                key: 'bankType',
                isSearch: true,
            },
            {
                title: 'IFSC Number',
                dataIndex: 'ifscNumber',
                key: 'ifscNumber',
                isSearch: true,

            },
            {
                title: 'Created At',
                dataIndex: 'createdAt',
                key: 'createdAt',
                isSearch: true,
            },
        ];
    },
    getFormColumns: () => {
        return [
            {
                title: 'Beneficiary Name',
                dataIndex: 'beneficiaryName',
                key: 'beneficiaryName',
                type: 'text',
                isRequired: true,
                formClassName: 'col-4 pb-2',
            },
            {
                title: 'Beneficiary Account Number',
                dataIndex: 'beneficiaryAccountNumber',
                key: 'beneficiaryAccountNumber',
                type: 'number',
                isRequired: true,
                formClassName: 'col-4 pb-2',
            },
            {
                title: 'Bank Name and Address',
                dataIndex: 'bankNameAndAddress',
                key: 'bankNameAndAddress',
                type: 'text',
                isRequired: true,
                formClassName: 'col-4 pb-2',
            },

            {
                title: 'Bank Type',
                dataIndex: 'bankType',
                key: 'bankType',
                type: 'select',
                isRequired: true,
                children: [
                    { name: 'Saving', value: 'Saving' },
                    { name: 'Current', value: 'Current' },
                    { name: 'Salary', value: 'Salary' },
                    { name: 'Other', value: 'Other' },
                ],
                formClassName: 'col-4 pb-2',
            },
            {
                title: 'IFSC Number',
                dataIndex: 'ifscNumber',
                key: 'ifscNumber',
                isRequired: true,
                type: 'text',
                formClassName: 'col-4 pb-2',
            },
            {
                title: 'PAN',
                dataIndex: 'PAN',
                key: 'PAN',
                isRequired: true,
                type: 'text',
                formClassName: 'col-4 pb-2',
            },
            {
                title: 'LUT Number',
                dataIndex: 'LUT',
                key: 'LUT',
                isRequired: true,
                type: 'text',
                formClassName: 'col-4 pb-2',
            },
            {
                title: 'GST Number',
                dataIndex: 'GST',
                key: 'GST',
                isRequired: true,
                type: 'text',
                formClassName: 'col-4 pb-2',
            },
            {
                title: 'CIN',
                dataIndex: 'CIN',
                key: 'CIN',
                isRequired: true,
                type: 'text',
                formClassName: 'col-4 pb-2',
            },
            {
                title: 'State',
                dataIndex: 'state',
                key: 'state',
                type: 'text',
                isRequired: true,
                formClassName: 'col-4 pb-2',
            },
            {
                title: 'City',
                dataIndex: 'city',
                key: 'city',
                isRequired: true,
                type: 'text',
                formClassName: 'col-4 pb-2',
            },
            {
                title: 'Zip Code',
                dataIndex: 'zipCode',
                key: 'zipCode',
                isRequired: true,
                type: 'text',
                formClassName: 'col-4 pb-2',
            },
            {
                title: 'Address Line 1',
                dataIndex: 'addressLine1',
                key: 'addressLine1',
                type: 'textarea',
                isRequired: true,
                formClassName: 'col-6 pb-2',
            },
            {
                title: 'Address Line 2',
                dataIndex: 'addressLine2',
                key: 'addressLine2',
                type: 'textarea',
                formClassName: 'col-6 pb-2',
            }
        ];
    },
    getData: () => { },
    actions: [
        { name: 'Add Account', isModal: true, settings: { type: 'primary' } },
        { name: 'Return', isBack: true, settings: { type: 'primary' } },
    ],
};
