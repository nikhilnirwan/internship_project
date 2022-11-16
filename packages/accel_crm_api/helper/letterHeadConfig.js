const path = require('path');
module.exports = () => ({
    header: {
        columns: [
            {
                image: path.join(__dirname, './pdfImages/logo.png'),
                width: 200,
                marginTop: 20,
                marginLeft: 35,
            },
        ],
    },
    footer: [
        {
            canvas: [
                {
                    type: 'line',
                    x1: 10,
                    y1: 10,
                    x2: 595 - 10,
                    y2: 10,
                    lineWidth: 0.5,
                },
            ],
            marginTop: -30,
            marginBottom: 10,
        },
        {
            text: 'Regd Off: P-No 33, Diamond Nagar, Nagpur, Nagpur-440024 Maharashtra',
            alignment: 'center',
            bold: false,
            fontSize: 9
        },
        {
            text: 'Corp Off: Diamond Nagar Rd, New Diamond Nagar, Shaktimata Nagar, Kharbi, Nagpur, Maharashtra 440017',
            alignment: 'center',
            bold: false,
            fontSize: 9
        },
        {
            text: 'E-mail : info@accelgrowthteh.com | https://accelgrowthech.com | CIN: U72200MH2020PTC352071',
            alignment: 'center',
            bold: false,
            marginBottom: 10,
            fontSize: 9
        },
    ],
})