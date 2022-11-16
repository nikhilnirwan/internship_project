import * as React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import '../../../../src/scss/home.scss';
import { User } from '../../../definitions';
import ViewWrapper from '../../../components/ViewWrapper/ViewWrapper';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import * as htmlForm from 'html-to-pdfmake';
import * as moment from 'moment';
import JSONInput from 'react-json-editor-ajrm';
import locale from 'react-json-editor-ajrm/locale/en';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

interface Props {
  isAuthenticated: boolean;
  history: any;
  dispatch: any;
  user: User;
}

interface State {
  errors: any;
}

class GenrateInvoice extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      errors: [],
    };
  }

  getBase64ImageFromURL(url) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.setAttribute('crossOrigin', 'anonymous');

      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);

        const dataURL = canvas.toDataURL('image/png');

        resolve(dataURL);
      };

      img.onerror = (error) => {
        reject(error);
      };

      img.src = url;
    });
  }

  generatePDF = async (action = 'open') => {
    try {
      const docDefinition = {
        header: {
          columns: [
            {
              image: await this.getBase64ImageFromURL(
                require('../../../assets/logo/logo.png'),
              ),
              width: 200,
              marginTop: 20,
              marginLeft: 35,
            },
          ],
        },
        footer: {
          columns: [
            {
              text: 'This is a computer generated salary slip and does not require any signature.',
              alignment: 'center',
            },
          ],
        },
        content: [
          {
            alignment: 'left',
            text: 'Accelgrowth Technology Pvt Ltd',
            style: 'header',
            fontSize: 12,
            bold: true,
            marginTop: 40,
          },
          {
            alignment: 'left',
            text: 'Shesh Nagar, Shaktimata Nagar,',
            style: 'header',
            fontSize: 12,
            bold: false,
          },
          {
            alignment: 'left',
            text: 'Kharbi Nagpur-440024.(Maharashtra)',
            style: 'header',
            fontSize: 12,
            bold: false,
          },
          {
            alignment: 'left',
            text: 'Phone: 7020635528',
            style: 'header',
            fontSize: 12,
            bold: false,
          },
          {
            alignment: 'center',
            text: `Salary Slip For ${moment().add(-1, 'M').format('MMM YYYY')}`,
            style: 'header',
            fontSize: 14,
            bold: true,
            margin: [0, 10],
          },
          {
            table: {
              widths: ['25%', '25%', '25%', '25%'],
              heights: [
                12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12,
              ],
              headerRows: 1,
              body: [
                [
                  {
                    text: 'Employee Name',
                    bold: true,
                    fontSize: 9,
                  },
                  {
                    text: 'Rahul R. Chaudhari',
                    bold: true,
                    fontSize: 9,
                  },
                  {
                    text: 'Employee Code',
                    bold: true,
                    fontSize: 9,
                  },
                  {
                    text: 'A-131',
                    fontSize: 9,
                    bold: true,
                  },
                ],
                [
                  {
                    text: 'Designation',
                    bold: true,
                    fontSize: 9,
                  },
                  {
                    text: 'System Enginner',
                    bold: true,
                    fontSize: 9,
                  },
                  {
                    text: 'Department',
                    bold: true,
                    fontSize: 9,
                  },
                  {
                    text: 'Software',
                    fontSize: 9,
                    bold: true,
                  },
                ],
                [
                  {
                    text: 'Total No. of Days',
                    bold: true,
                    fontSize: 9,
                  },
                  {
                    text: '31',
                    bold: true,
                    fontSize: 9,
                  },
                  {
                    text: 'Name of Bank',
                    bold: true,
                    fontSize: 9,
                  },
                  {
                    text: 'ICICI',
                    fontSize: 9,
                    bold: true,
                  },
                ],
                [
                  {
                    text: 'Total Days worked',
                    bold: true,
                    fontSize: 9,
                  },
                  {
                    text: '22',
                    bold: true,
                    fontSize: 9,
                  },
                  {
                    text: 'Account No.',
                    bold: true,
                    fontSize: 9,
                  },
                  {
                    text: '104401536698',
                    fontSize: 9,
                    bold: true,
                  },
                ],
                [
                  {
                    text: 'Gender',
                    bold: true,
                    fontSize: 9,
                  },
                  {
                    text: 'Male',
                    bold: true,
                    fontSize: 9,
                  },
                  {
                    text: 'PF No.',
                    bold: true,
                    fontSize: 9,
                  },
                  {
                    text: '-',
                    fontSize: 9,
                    bold: true,
                  },
                ],
                [
                  {},
                  {},
                  {
                    text: 'PF UAN',
                    bold: true,
                    fontSize: 9,
                  },
                  {
                    text: '-',
                    fontSize: 9,
                    bold: true,
                  },
                ],
                [{}, {}, {}, {}],
                [
                  {
                    text: 'Earnings',
                    bold: true,
                    fontSize: 9,
                  },
                  {
                    text: 'Amount(₹)',
                    bold: true,
                    fontSize: 9,
                  },
                  {
                    text: 'Deductions',
                    bold: true,
                    fontSize: 9,
                  },
                  {
                    text: 'Amount(₹)',
                    fontSize: 9,
                    bold: true,
                  },
                ],
                [
                  {
                    text: 'Basic',
                    bold: false,
                    fontSize: 9,
                  },
                  {
                    text: '42995.00',
                    bold: false,
                    fontSize: 9,
                    alignment: 'right',
                  },
                  {
                    text: 'Profession Tax',
                    bold: false,
                    fontSize: 9,
                  },
                  {
                    text: '200.00',
                    fontSize: 9,
                    bold: false,
                    alignment: 'right',
                  },
                ],
                [
                  {
                    text: 'HRA',
                    bold: false,
                    fontSize: 9,
                  },
                  {
                    text: '19870.00',
                    bold: false,
                    fontSize: 9,
                    alignment: 'right',
                  },
                  {
                    text: 'PF',
                    bold: false,
                    fontSize: 9,
                  },
                  {
                    text: '1800.00',
                    fontSize: 9,
                    bold: false,
                    alignment: 'right',
                  },
                ],
                [
                  {
                    text: 'Medical allowance',
                    bold: false,
                    fontSize: 9,
                  },
                  {
                    text: '19870.00',
                    bold: false,
                    fontSize: 9,
                    alignment: 'right',
                  },
                  {
                    text: 'TDS',
                    bold: false,
                    fontSize: 9,
                  },
                  {
                    text: '1800.00',
                    fontSize: 9,
                    bold: false,
                    alignment: 'right',
                  },
                ],
                [
                  {
                    text: 'Conveyance',
                    bold: false,
                    fontSize: 9,
                  },
                  {
                    text: '19870.00',
                    bold: false,
                    fontSize: 9,
                    alignment: 'right',
                  },
                  {
                    text: 'ESIC',
                    bold: false,
                    fontSize: 9,
                  },
                  {
                    text: '1800.00',
                    fontSize: 9,
                    bold: false,
                    alignment: 'right',
                  },
                ],
                [
                  {
                    text: 'Skills Development Allowance',
                    bold: false,
                    fontSize: 9,
                  },
                  {
                    text: '19870.00',
                    bold: false,
                    fontSize: 9,
                    alignment: 'right',
                  },
                  {},
                  {},
                ],
                [
                  {
                    text: 'Gross Earnings',
                    bold: true,
                    fontSize: 9,
                  },
                  {
                    text: '19870.00',
                    bold: true,
                    fontSize: 9,
                    alignment: 'right',
                  },
                  {
                    text: 'Gross Deductions',
                    bold: true,
                    fontSize: 9,
                  },
                  {
                    text: '1800.00',
                    fontSize: 9,
                    bold: true,
                    alignment: 'right',
                  },
                ],
                [
                  {
                    text: 'Net Salary',
                    bold: true,
                    fontSize: 9,
                  },
                  {
                    text: '19870.00',
                    bold: true,
                    fontSize: 9,
                    alignment: 'right',
                  },
                  {},
                  {},
                ],
              ],
            },
          },
        ],
        styles: {
          sectionHeader: {
            bold: true,
            decoration: 'underline',
            fontSize: 14,
            margin: [0, 15, 0, 15],
          },
        },
      };

      if (action === 'download') {
        pdfMake.createPdf(docDefinition).download();
      } else if (action === 'print') {
        pdfMake.createPdf(docDefinition).print();
      } else {
        console.log('hhhh');
        pdfMake.createPdf(docDefinition).open();
      }
    } catch (error) {
      console.log('error+++++++==', error);
    }
  }

  generateInvoice = async (action = 'open') => {
    const companyName = 'SmartData Enterprises India Ltd.';
    try {
      const docDefinition = {
        header: {
          columns: [
            {
              image: await this.getBase64ImageFromURL(
                require('../../../assets/logo/logo.png'),
              ),
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
            bold: true,
            fontSize: 9,
          },
          {
            text: 'Corp Off: Diamond Nagar Rd, New Diamond Nagar, Shaktimata Nagar, Kharbi, Nagpur, Maharashtra 440017',
            alignment: 'center',
            bold: true,
            fontSize: 9,
          },
          {
            text: 'E-mail : info@accelgrowthteh.com | https://accelgrowthech.com | CIN: U72200MH2020PTC352071',
            alignment: 'center',
            bold: true,
            marginBottom: 10,
            fontSize: 9,
          },
        ],
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
                [
                  {
                    text: htmlForm(`
                        <div><b>BILL FROM</b></div> </br>
                        <div><b>Accelgrowth Technology Pvt. Ltd.</b></br>
                        P-107 Shesh Nagar, Shaktimata Nagar, Kharbi, Nagpur, Maharashtra 440024, India </br>
                        hr@accelgrowthtech.com </br>
                        CIN : U72200MH2020PTC352071</div>
                      `),
                    colSpan: 2,
                    fontSize: 11,
                    border: [false, false, false, false],
                  },
                  {},
                  {
                    text: htmlForm(`
                    <div></br></br></br></br><b>I N V O I C E</b></div> </br>
                    <div><b>Invoice # A-132</br>
                    Date: 29 June 2021</br>
                    Due Date: 10 July 2021</br>
                   </div>
                  `),
                    border: [false, false, false, false],
                    rowSpan: 2,
                    fontSize: 11,
                    alignment: 'right',
                    color: 'white',
                  },
                ],
                [
                  {
                    text: htmlForm(`
                    <div><b>BILL TO</b></div> </br>
                    <div><b>${companyName}</b></br>
                    P-107 Shesh Nagar, Shaktimata Nagar, Kharbi, Nagpur, Maharashtra 440024, India </br>
                    hr@accelgrowthtech.com </br>
                    CIN : U72200MH2020PTC352071</div>
                  `),
                    fontSize: 11,
                    border: [false, false, false, false],
                  },
                  {
                    text: htmlForm(`
                    <div><b>SHIPT TO</b></div> </br>
                    <div><b>Accelgrowth Technology Pvt. Ltd.</b></br>
                    P-107 Shesh Nagar, Shaktimata Nagar, Kharbi, Nagpur, Maharashtra 440024, India </br>
                    hr@accelgrowthtech.com </br>
                    CIN : U72200MH2020PTC352071</div>
                  `),
                    fontSize: 11,
                    border: [false, false, false, false],
                  },
                  {},
                ],
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
                [
                  {
                    text: '01',
                    fontSize: 9,
                    borderColor: '#5383be',
                  },
                  {
                    text: 'Shubham kanfade',
                    fontSize: 9,
                    borderColor: '#5383be',
                  },
                  {
                    text: '20-2-21',
                    fontSize: 9,
                    borderColor: '#5383be',
                  },
                  {
                    text: '31',
                    fontSize: 9,
                    borderColor: '#5383be',
                  },
                  {
                    text: '80,000',
                    fontSize: 9,
                    borderColor: '#5383be',
                    alignment: 'center',
                  },
                  {
                    text: '80,000',
                    fontSize: 9,
                    alignment: 'right',
                  },
                ],
                [
                  {
                    text: '01',
                    fontSize: 9,
                    borderColor: '#5383be',
                  },
                  {
                    text: 'Shubham kanfade',
                    fontSize: 9,
                    borderColor: '#5383be',
                  },
                  {
                    text: '20-2-21',
                    fontSize: 9,
                    borderColor: '#5383be',
                  },
                  {
                    text: '31',
                    fontSize: 9,
                    borderColor: '#5383be',
                  },
                  {
                    text: '80,000',
                    fontSize: 9,
                    borderColor: '#5383be',
                    alignment: 'center',
                  },
                  {
                    text: '80,000',
                    fontSize: 9,
                    alignment: 'right',
                  },
                ],
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
                    text: '80,000',
                    fontSize: 9,
                    alignment: 'right',
                  },
                ],
                [
                  {
                    text: 'Leaves(1)',
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
                    text: '80,000',
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
                    text: '80,000',
                    bold: true,
                    alignment: 'right',
                    fontSize: 9,
                  },
                ],
                [
                  {
                    text: '(10%)TDS Deduction by client',
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
                    text: '80,000',
                    fontSize: 9,
                    alignment: 'right',
                  },
                ],
                [
                  {
                    text: 'GST(18%)',
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
                    text: '80,000',
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
                    text: '80,000',
                    bold: true,
                    fontSize: 9,
                    alignment: 'right',
                    color: 'white',
                    fillColor: '#17365d',
                  },
                ],
                [
                  {
                    text: 'IN WORDS : Sixty Nine Thousand Nine Hundred One Rupees Only',
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
            text: 'Please send payment within 10 days of receiving this invoice. There will be a 1.5% interest charge permonth on late invoices.',
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
                    text: 'Accelgrowth Technology Private Limited',
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
                    text: '50200056891590',
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
                    text: 'SAKKARDARA, NAGPUR',
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
                    text: 'CURRENT',
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
                    text: 'HDFC0009524',
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
                image: await this.getBase64ImageFromURL(
                  require('../../../assets/logo/stamp-with-name.png'),
                ),
                width: 150,
              },
              {
                image: await this.getBase64ImageFromURL(
                  require('../../../assets/logo/company_stamp.png'),
                ),
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
        },
      };

      if (action === 'download') {
        pdfMake.createPdf(docDefinition).download();
      } else if (action === 'print') {
        pdfMake.createPdf(docDefinition).print();
      } else {
        console.log('hhhh');
        pdfMake.createPdf(docDefinition).open();
      }
    } catch (error) {
      console.log('error+++++++==', error);
    }
  }

  async componentDidMount() { }

  htmlform() {
    return <JSONInput
      id="a_unique_id"
      placeholder={{}}
      locale={locale}
      height="550px"
      onChange={this.handleChange}
    />;
  }

  handleChange = (e) => {
    console.log('eeeeeeeeeeee', e);
  }

  render() {
    if (this.props.isAuthenticated) {
      return (
        <>
          <ViewWrapper requireAuth isNotRedirected title="Profile">
            <div onClick={() => this.generateInvoice()}>Genrate</div>
            {this.htmlform()}
          </ViewWrapper>
        </>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.app.isAuthenticated,
  user: state.app.user,
});

export default withRouter(connect(mapStateToProps)(GenrateInvoice));

// {
//   margin: [0, 0, 0, 10],
//   layout: {
//     fillColor: function (rowIndex, node, columnIndex) {
//       return rowIndex % 2 === 0 ? "#ebebeb" : "#f5f5f5";
//     },
//   },
//   table: {
//     widths: ["100%"],
//     heights: [20, 10],
//     body: [
//       [
//         {
//           text: "SETOR: ADMINISTRATIVO",
//           fontSize: 9,
//           bold: true,
//         },
//       ],
//       [
//         {
//           text: "FUNÇÃO: DIRETOR DE ENSINO",
//           fontSize: 9,
//           bold: true,
//         },
//       ],
//     ],
//   },
// },
// {
//   style: "tableExample",
//   layout: {
//     fillColor: function (rowIndex, node, columnIndex) {
//       return rowIndex === 0 ? "#c2dec2" : null;
//     },
//   },
//   table: {
//     widths: ["30%", "10%", "25%", "35%"],
//     heights: [10, 10, 10, 10, 30, 10, 25],
//     headerRows: 1,
//     body: [
//       [
//         {
//           text: "AGENTE: Não Identificados",
//           colSpan: 3,
//           bold: true,
//           fontSize: 9,
//         },
//         {},
//         {},
//         {
//           text: "GRUPO: Grupo 1 - Riscos Físicos",
//           fontSize: 9,
//           bold: true,
//         },
//       ],
//       [
//         {
//           text: "Limite de Tolerância:",
//           fontSize: 9,
//           bold: true,
//         },
//         {
//           text: "Meio de Propagação:",
//           colSpan: 3,
//           fontSize: 9,
//           bold: true,
//         },
//         {},
//         {},
//       ],
//       [
//         {
//           text: [
//             "Frequência: ",
//             {
//               text: "Habitual",
//               bold: false,
//             },
//           ],
//           fontSize: 9,
//           bold: true,
//         },
//         {
//           text: [
//             "Classificação do Efeito: ",
//             {
//               text: "Leve",
//               bold: false,
//             },
//           ],
//           colSpan: 3,
//           fontSize: 9,
//           bold: true,
//         },
//         {},
//         {},
//       ],
//       [
//         {
//           text: "Tempo de Exposição:",
//           colSpan: 2,
//           fontSize: 9,
//           bold: true,
//         },
//         {},
//         {
//           text: "Medição:",
//           colSpan: 2,
//           fontSize: 9,
//           bold: true,
//         },
//         {},
//       ],
//       [
//         {
//           text: "Fonte Geradora:",
//           border: [true, true, false, false],
//           colSpan: 2,
//           fontSize: 9,
//           bold: true,
//         },
//         {},
//         {
//           text: "Téc. Utilizada:",
//           border: [false, true, true, false],
//           colSpan: 2,
//           fontSize: 9,
//           bold: true,
//         },
//         {},
//       ],
//       [
//         {
//           text: "Conclusão:",
//           border: [true, false, true, true],
//           colSpan: 4,
//           fontSize: 9,
//           bold: true,
//         },
//         {},
//         {},
//         {},
//       ],
//       [
//         {
//           text: "EPIs/EPCs:",
//           border: [true, true, false, true],
//           colSpan: 3,
//           fontSize: 9,
//           bold: true,
//         },
//         {},
//         {},
//         {
//           text: "CAs:",
//           border: [false, true, true, true],
//           fontSize: 9,
//           bold: true,
//         },
//       ],
//     ],
//   },
// },
