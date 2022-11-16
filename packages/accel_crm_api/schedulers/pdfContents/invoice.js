const letterHeadConfig = require('./../../helper/letterHeadConfig');
const path = require('path');
const moment = require('moment');
var converter = require('number-to-words');


module.exports = (data) => {
    const { invoiceNumber, endDate, tds, GST, bonus, leaves, price, startDate, developers, billFrom, CIN, billTo } = data;
    const dateOfInvoice = moment(endDate).format('DD MMM YYYY');
    const dueDateOfInvoice = moment(endDate).add(10, 'days').format('DD MMM YYYY');
    const totalDays = moment(endDate).diff(startDate, 'days');
    const endOfMonth = moment().endOf('month').format('DD');
    const oneDayPrice = parseInt(price) / endOfMonth;
    const totalPrice = (oneDayPrice * totalDays).toFixed(2);
    const leaveDeuction = oneDayPrice * leaves;
    const afterLeaveDeduction = (totalPrice - leaveDeuction);
    const applyTDS = (afterLeaveDeduction / 100) * tds;
    const applyGST = (afterLeaveDeduction / 100) * GST;
    const resources = [];
    const BillFromObject = [];
    const BillToObject = [];
    const billToAddress = [];

    developers.forEach((element, index) => {
        resources.push([
            {
                text: `${index < 10 ? '0' + (index + 1) : index + 1}`,
                fontSize: 9,
                borderColor: '#5383be',
                alignment: 'center'
            },
            {
                text: `${element.firstName} ${element.lastName}`,
                fontSize: 9,
                borderColor: '#5383be',
                alignment: 'center'
            },
            {
                text: `${moment(startDate).format('DD MMM YYYY')} - ${dateOfInvoice}`,
                fontSize: 9,
                borderColor: '#5383be',
                alignment: 'center'
            },
            {
                text: totalDays,
                fontSize: 9,
                borderColor: '#5383be',
                alignment: 'center'
            },
            {
                text: price,
                fontSize: 9,
                borderColor: '#5383be',
                alignment: 'center',
            },
            {
                text: totalPrice,
                fontSize: 9,
                alignment: 'right',
                alignment: 'center'

            },
        ])
    });

    BillFromObject.push([
        {
            text: [{
                "text": [
                    {
                        "text": "BILL FROM",
                        "nodeName": "B",
                        "bold": true,
                        "style": [
                            "html-b",
                            "html-div"
                        ]
                    }
                ],
                "nodeName": "DIV",
                "style": [
                    "html-div"
                ]
            },
            {
                "text": " ",
                "style": []
            },
            {
                "text": "\n",
                "nodeName": "BR"
            },
            {
                "text": [
                    {
                        "text": billFrom.beneficiaryName,
                        "nodeName": "B",
                        "bold": true,
                        "style": [
                            "html-b",
                            "html-div"
                        ]
                    },
                    {
                        "text": "\n",
                        "nodeName": "BR"
                    },
                    {
                        "text": `${billFrom.addressLine1}, ${billFrom.addressLine2}, ${billFrom.city}(${billFrom.zipCode}), ${billFrom.state}, India`,
                        "style": [
                            "html-div"
                        ]
                    },
                    {
                        "text": "\n",
                        "nodeName": "BR"
                    },
                    {
                        "text": `CIN : ${CIN}`,
                        "style": [
                            "html-div"
                        ]
                    }
                ],
                "nodeName": "DIV",
                "style": [
                    "html-div"
                ]
            }],
            colSpan: 2,
            fontSize: 11,
            border: [false, false, false, false],
        },
        {},
        {
            text: [
                {
                    "text": [
                        {
                            "text": "\n",
                            "nodeName": "BR"
                        },
                        {
                            "text": "\n",
                            "nodeName": "BR"
                        },
                        {
                            "text": "\n",
                            "nodeName": "BR"
                        },
                        {
                            "text": "\n",
                            "nodeName": "BR"
                        },
                        {
                            "text": "I N V O I C E",
                            "nodeName": "B",
                            "bold": true,
                            "style": [
                                "html-b",
                                "html-div"
                            ]
                        }
                    ],
                    "nodeName": "DIV",
                    "style": [
                        "html-div"
                    ]
                },
                {
                    "text": " ",
                    "style": []
                },
                {
                    "text": "\n",
                    "nodeName": "BR"
                },
                {
                    "text": [
                        {
                            "text": [
                                {
                                    "text": `Invoice #A - ${invoiceNumber}`,
                                    "bold": true,
                                    "style": [
                                        "html-b",
                                        "html-div"
                                    ]
                                },
                                {
                                    "text": "\n",
                                    "nodeName": "BR"
                                },
                                {
                                    "text": `Date: ${dateOfInvoice}`,
                                    "bold": true,
                                    "style": [
                                        "html-b",
                                        "html-div"
                                    ]
                                },
                                {
                                    "text": "\n",
                                    "nodeName": "BR"
                                },
                                {
                                    "text": `Due Date: ${dueDateOfInvoice}`,
                                    "bold": true,
                                    "style": [
                                        "html-b",
                                        "html-div"
                                    ]
                                },
                                {
                                    "text": "\n",
                                    "nodeName": "BR"
                                }
                            ],
                            "nodeName": "B",
                            "bold": true,
                            "style": [
                                "html-b",
                                "html-div"
                            ]
                        }
                    ],
                    "nodeName": "DIV",
                    "style": [
                        "html-div"
                    ]
                }
            ],
            border: [false, false, false, false],
            rowSpan: 2,
            fontSize: 11,
            alignment: 'right',
            color: 'white',
        },
    ])

    billToAddress.push([
        {
            "text": billTo.company,
            "nodeName": "B",
            "bold": true,
            "style": [
                "html-b",
                "html-div"
            ]
        },
        {
            "text": "\n",
            "nodeName": "BR"
        },
        {
            "text": `${billTo.addressLine1}, ${billTo.addressLine2}, ${billTo.city}, ${billTo.state} (${billTo.zipCode}), ${billTo.country}`,
            "style": [
                "html-div"
            ]
        }]
    );
    if (billTo.GSTN) {
        billToAddress[0].push({
            "text": "\n",
            "nodeName": "BR"
        },
            {
                "text": `GST No : ${billTo.GSTN}`,
                "style": [
                    "html-div"
                ]
            })
    }
    BillToObject.push([
        {
            text: [
                {
                    "text": [
                        {
                            "text": "BILL TO",
                            "nodeName": "B",
                            "bold": true,
                            "style": [
                                "html-b",
                                "html-div"
                            ]
                        }
                    ],
                    "nodeName": "DIV",
                    "style": [
                        "html-div"
                    ]
                },
                {
                    "text": " ",
                    "style": []
                },
                {
                    "text": "\n",
                    "nodeName": "BR"
                },
                {
                    "text": billToAddress[0],
                    "nodeName": "DIV",
                    "style": [
                        "html-div"
                    ]
                }
            ],
            fontSize: 11,
            border: [false, false, false, false],
        },
        {
            text: [
                {
                    "text": [
                        {
                            "text": "SHIPT TO",
                            "nodeName": "B",
                            "bold": true,
                            "style": [
                                "html-b",
                                "html-div"
                            ]
                        }
                    ],
                    "nodeName": "DIV",
                    "style": [
                        "html-div"
                    ]
                },
                {
                    "text": " ",
                    "style": []
                },
                {
                    "text": "\n",
                    "nodeName": "BR"
                },
                {
                    "text": billToAddress[0],
                    "nodeName": "DIV",
                    "style": [
                        "html-div"
                    ]
                }
            ],
            fontSize: 11,
            border: [false, false, false, false],
        },
        {},
    ])

    return {
        ...letterHeadConfig(),
        content: [
            {
                alignment: 'center',
                text: '',
                fontSize: 14,
                margin: [0, 20],
            },
            {
                layout: {
                    fillColor(rowIndex, node, columnIndex) {
                        return columnIndex === 2 ? '#17365d' : null;
                    },
                },
                table: {
                    widths: ['34%', '34%', '32%'],
                    heights: [12, 12, 12],
                    headerRows: 1,
                    marginTop: 30,
                    border: 0,
                    body: [
                        ...BillFromObject,
                        ...BillToObject
                    ],
                },
                margin: [0, 20],
            },
            {
                layout: {
                    fillColor(rowIndex, node, columnIndex) {
                        return rowIndex === 0 ? '#17365d' : null;
                    },
                },
                table: {
                    widths: ['5%', '30%', '25%', '20%', '10%', '10%'],
                    heights: [12, 12, 12, 12, 12],
                    headerRows: 1,
                    body: [
                        [
                            {
                                text: 'ID',
                                color: 'white',
                                alignment: 'center',
                                bold: true,
                                fontSize: 9,
                                borderColor: '#5383be',
                            },
                            {
                                text: 'RESOURCE NAME',
                                color: 'white',
                                alignment: 'center',
                                bold: true,
                                fontSize: 9,
                                borderColor: '#5383be',
                            },
                            {
                                text: 'BILLED DATE',
                                color: 'white',
                                alignment: 'center',
                                bold: true,
                                fontSize: 9,
                                borderColor: '#5383be',
                            },
                            {
                                text: 'WORKING DAYS',
                                color: 'white',
                                alignment: 'center',
                                bold: true,
                                fontSize: 9,
                                borderColor: '#5383be',
                            },
                            {
                                text: 'PRICE',
                                color: 'white',
                                alignment: 'center',
                                bold: true,
                                fontSize: 9,
                                borderColor: '#5383be',
                            },
                            {
                                text: 'TOTAL',
                                color: 'white',
                                alignment: 'center',
                                bold: true,
                                fontSize: 9,
                                borderColor: '#5383be',
                            },
                        ],
                        ...resources,
                        [
                            {
                                text: 'Sub Total',
                                bold: true,
                                fontSize: 9,
                                colSpan: 5,
                                border: [true, false, false, false],
                                alignment: 'right',
                            },
                            {},
                            {},
                            {},
                            {},
                            {
                                text: totalPrice,
                                fontSize: 9,
                                alignment: 'right',
                            },
                        ],
                        [
                            {
                                text: `Leaves(${leaves})`,
                                alignment: 'right',
                                fontSize: 9,
                                colSpan: 5,
                                bold: true,
                                border: [true, false, false, false],
                            },
                            {},
                            {},
                            {},
                            {},
                            {
                                text: `-${leaveDeuction.toFixed(2)}`,
                                fontSize: 9,
                                alignment: 'right',
                            },
                        ],
                        [
                            {
                                text: 'Total',
                                alignment: 'right',
                                bold: true,
                                fontSize: 9,
                                colSpan: 5,
                                border: [true, false, false, false],
                            },
                            {},
                            {},
                            {},
                            {},
                            {
                                text: afterLeaveDeduction.toFixed(2),
                                bold: true,
                                alignment: 'right',
                                fontSize: 9,
                            },
                        ],
                        [
                            {
                                text: `(${tds}%)TDS Deduction by client`,
                                bold: true,
                                alignment: 'right',
                                fontSize: 9,
                                colSpan: 5,
                                border: [true, false, false, false],
                            },
                            {},
                            {},
                            {},
                            {},
                            {
                                text: `-${applyTDS.toFixed(2)}`,
                                fontSize: 9,
                                alignment: 'right',
                            },
                        ],
                        [
                            {
                                text: `GST(${GST})`,
                                bold: true,
                                alignment: 'right',
                                fontSize: 9,
                                colSpan: 5,
                                border: [true, false, false, false],
                            },
                            {},
                            {},
                            {},
                            {},
                            {
                                text: `${applyGST.toFixed(2)}`,
                                fontSize: 9,
                                alignment: 'right',
                            },
                        ],
                        [
                            {
                                text: 'Net Total',
                                alignment: 'right',
                                bold: true,
                                fontSize: 9,
                                colSpan: 5,
                                border: [true, false, false, false],
                            },
                            {},
                            {},
                            {},
                            {},
                            {
                                text: ((totalPrice - afterLeaveDeduction) - applyTDS + applyGST).toFixed(2),
                                bold: true,
                                fontSize: 9,
                                alignment: 'right',
                                color: 'white',
                                fillColor: '#17365d',
                            },
                        ],
                        [
                            {
                                text: `IN WORDS : ${converter.toWords((totalPrice - afterLeaveDeduction) - applyTDS + applyGST)} rupees only`,
                                alignment: 'left',
                                bold: true,
                                fontSize: 9,
                                colSpan: 6,
                            },
                            {},
                            {},
                            {},
                            {},
                            {},
                        ],
                    ],
                },
            },
            {
                text: 'TERMS AND CONDITIONS',
                alignment: 'left',
                bold: true,
                fontSize: 9,
                marginTop: 10,
                marginBottom: 5,
            },
            {
                text: 'Please send payment within 10 days of receiving this invoice. There will be a 1.5% interest charge per month on late invoices.',
                alignment: 'left',
                bold: true,
                fontSize: 9,
            },
            {
                text: 'PLEASE MAKE A PAYMENT TO',
                alignment: 'left',
                bold: true,
                marginTop: 10,
                fontSize: 9,
                marginBottom: 5,
            },
            {
                layout: {
                    fillColor(rowIndex, node, columnIndex) {
                        return rowIndex === 0 ? '#17365d' : null;
                    },
                },
                table: {
                    widths: ['5%', '47.5%', '47.5%'],
                    heights: [12, 12, 12, 12, 12],
                    headerRows: 1,
                    body: [
                        [
                            {
                                text: 'ID',
                                color: 'white',
                                alignment: 'center',
                                bold: true,
                                fontSize: 9,
                                borderColor: '#5383be',
                            },
                            {
                                text: 'KEYS',
                                color: 'white',
                                alignment: 'center',
                                bold: true,
                                fontSize: 9,
                                borderColor: '#5383be',
                            },
                            {
                                text: 'DETAILS',
                                color: 'white',
                                alignment: 'center',
                                bold: true,
                                fontSize: 9,
                                borderColor: '#5383be',
                            },
                        ],
                        [
                            {
                                text: '01',
                                fontSize: 9,
                                alignment: 'center',
                                borderColor: '#5383be',
                            },
                            {
                                text: 'Beneficiary Name',
                                fontSize: 9,
                                borderColor: '#5383be',
                            },
                            {
                                text: billFrom.beneficiaryName,
                                fontSize: 9,
                                borderColor: '#5383be',
                            },
                        ],
                        [
                            {
                                text: '02',
                                fontSize: 9,
                                alignment: 'center',
                                borderColor: '#5383be',
                            },
                            {
                                text: 'Beneficiary Account Number',
                                fontSize: 9,
                                borderColor: '#5383be',
                            },
                            {
                                text: billFrom.beneficiaryAccountNumber,
                                fontSize: 9,
                                borderColor: '#5383be',
                            },
                        ],
                        [
                            {
                                text: '03',
                                fontSize: 9,
                                alignment: 'center',
                                borderColor: '#5383be',
                            },
                            {
                                text: 'Bank Name and Address',
                                fontSize: 9,
                                borderColor: '#5383be',
                            },
                            {
                                text: `${billFrom.bankNameAndAddress}, ${billFrom.city}`,
                                fontSize: 9,
                                borderColor: '#5383be',
                            },
                        ],
                        [
                            {
                                text: '04',
                                fontSize: 9,
                                alignment: 'center',
                                borderColor: '#5383be',
                            },
                            {
                                text: 'Bank Type',
                                fontSize: 9,
                                borderColor: '#5383be',
                            },
                            {
                                text: billFrom.bankType,
                                fontSize: 9,
                                borderColor: '#5383be',
                            },
                        ],
                        [
                            {
                                text: '05',
                                alignment: 'center',
                                fontSize: 9,
                                borderColor: '#5383be',
                            },
                            {
                                text: 'IFSC Number',
                                fontSize: 9,
                                borderColor: '#5383be',
                            },
                            {
                                text: billFrom.ifscNumber,
                                fontSize: 9,
                                borderColor: '#5383be',
                            },
                        ],
                    ],
                },
            },
            {
                text: 'Thanks for your business with Accelgrowth!!',
                bold: true,
                marginTop: 10,
                marginBottom: 5,
                fontSize: 9,
            },
            {
                columns: [
                    {
                        image: path.join(__dirname, './../../helper/pdfImages/stamp-with-name.png'),
                        width: 150,
                    },
                    {
                        image: path.join(__dirname, './../../helper/pdfImages/company_stamp.png'),
                        width: 70,
                    },
                ],
                margin: [20, 0],
            },
        ],
        styles: {
            sectionHeader: {
                bold: true,
                decoration: 'underline',
                fontSize: 14,
                margin: [0, 15, 0, 15],
            },
            heading: {
                bold: true,
                width: "100%",

            }

        },
    }
}