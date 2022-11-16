import * as React from 'react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import Input from './../components/Input/Input';
import { postData, putData } from '../actions/developer';
import * as _ from 'lodash';
import { Select, notification } from 'antd';
import { getDataBy } from '../actions/apiCall';
import * as moment from 'moment';
import {
  DeleteTwoTone,
  PlusCircleTwoTone
} from '@ant-design/icons';
const { Option } = Select;
interface Props {
  className?: string;
  children?: any;
  columns?: any;
  data?: any;
  onSubmitForm?: any;
  id?: any;
  dispatch?: any;
  apiData?: any;
  onCloseModal?: any;
  isView?: boolean;
}

interface States {
  changeForm: any;
  touched: any;
  apiData: any;
  combo: any;
  children: any;
}

const openNotificationWithIcon = (type, title, message) => {
  notification[type]({
    message: title,
    description: message,
  });
};
class SimpleForm extends React.Component<Props, States> {
  searchInput: any;
  constructor(props) {
    super(props);
    this.state = {
      changeForm: false,
      touched: {},
      apiData: {},
      combo: {},
      children: this.getPropsValue()
    };
  }

  getPropsValue() {
    const { children: chiled, apiData } = this.props;
    let children = chiled && chiled.getFormColumns().filter(ele => ele.type == 'form');
    if (apiData && Object.keys(apiData).length > 0) {
      children.forEach(element => {
        if (apiData[element.dataIndex]) {
          apiData[element.dataIndex].forEach((ele, index) => {
            if ((index + 1) < apiData[element.dataIndex].length) {
              element.form.push(element.form[0])
            }
          });
        }
      });
    }
    return children;
  }

  componentDidMount(): void {
    const { children } = this.props;
    if (children.combo && children.combo.length > 0) {
      this.getCombo();
    }
  }

  componentWillReceiveProps() {
    console.log('props.id', this.props);
    const { id, apiData } = this.props;
    if (id) {
      this.setState({ apiData });
    }
  }

  getCombo() {
    const { children } = this.props;
    children.combo.forEach(async element => {
      const data = await this.props.dispatch(
        getDataBy(element.api),
      );
      if (data) {
        const params = {};
        params[element.name] = data.data.map(ele => ({
          id: ele[element.idKey], name: Array.isArray(element.nameKey) ? element.nameKey.map(key => ele[key]).join(' ') : ele[element.nameKey],
        }));
        this.setState({ combo: { ...this.state.combo, ...params } });
      }
    });
  }

  addMore = (chiledForm, dataIndex) => {
    const { children } = this.state;
    children.forEach(element => {
      if (element.dataIndex == dataIndex) {
        element.form.push(chiledForm)
      }
    });
    this.setState({ children })
  }

  onDeleteRow = (dataIndex, index) => {
    const { children } = this.state;
    children.forEach(element => {
      if (element.dataIndex == dataIndex) {
        element.form.splice(index, 1)
      }
    });
    this.setState({ children })
  }

  getFormsInput = (errors, touched, isSubmitting, fields, isView) => {
    const { getFormColumns } = this.props.children;
    return (
      <div className="row">
        {getFormColumns().map((ele) => {
          const { type, key, title, formClassName, children, multiple, lebelInstructions, form, heading, dataIndex } = ele;
          const { combo } = this.state;
          if (type == 'form') {
            const { children: formChiled } = this.state;
            return <div className="col-12 pb-2 row">
              {heading && <div className="col-12"><b>{title}</b></div>}
              <div className='col-12 row margin-box'>
                {formChiled.filter(ele => ele.dataIndex == dataIndex)[0].form.map((element, index) => {
                  return <>
                    <div className="col-10 row inner-box">
                      {element.map(rows => {
                        const { type, key, title, formClassName, children, multiple, lebelInstructions } = rows;
                        let defaultValue;
                        if (fields[dataIndex].length > index && fields[dataIndex][index][key]) {
                          defaultValue = fields[dataIndex][index][key];
                          if (type === 'date') {
                            defaultValue = moment(fields[dataIndex][index][key]);
                          }
                        }
                        return (
                          <>
                            <div className={formClassName ? formClassName : 'col-12 pb-2'}>
                              <Input
                                label={title}
                                name={`${dataIndex}[${index}].${key}`}
                                disabled={isView ? isView : undefined}
                                defaultValue={defaultValue}
                                multiple={multiple}
                                type={type ? type : 'text'}
                                extra={_.omitBy(ele, ['type', 'title', 'key'])}
                                touched={touched}
                                lebelInstructions={lebelInstructions}
                                errors={errors}
                              >
                                {((children && !multiple) || (combo[key] && !multiple)) && <Option value="" disabled>Select a {title}</Option>}
                                {!combo[key] && children &&
                                  children.map((options) => {
                                    return (
                                      <Option value={options.name}>{options.value}</Option>
                                    );
                                  })}
                                {combo[key] &&
                                  combo[key].map((options) => {
                                    return (
                                      <Option value={options.id}>{options.name}</Option>
                                    );
                                  })}
                              </Input>
                            </div>
                          </>
                        );
                      })}
                    </div>
                    {!isView && <div className="col-2">
                      {formChiled.filter(ele => ele.dataIndex == dataIndex)[0].form.length > 1 &&
                        <DeleteTwoTone style={{ fontSize: '25px', padding: '14px 5px', verticalAlign: 'middle !important' }} onClick={() => this.onDeleteRow(dataIndex, index)} />}
                      <PlusCircleTwoTone style={{ fontSize: '25px', padding: '14px 5px', verticalAlign: 'middle !important' }} onClick={() => this.addMore(element, dataIndex)} />
                    </div>}
                  </>
                })}
              </div>
            </div>
          } else {
            let defaultValue = fields[key];
            if (fields[key]) {
              if (type === 'date') {
                defaultValue = moment(fields[key]);
              }
            }

            return (
              <>
                <div className={formClassName ? formClassName : 'col-12 pb-2'}>
                  <Input
                    label={title}
                    name={key}
                    disabled={isView ? isView : undefined}
                    defaultValue={defaultValue}
                    multiple={multiple}
                    type={type ? type : 'text'}
                    extra={_.omitBy(ele, ['type', 'title', 'key'])}
                    touched={touched}
                    lebelInstructions={lebelInstructions}
                    errors={errors}
                  >
                    {((children && !multiple) || (combo[key] && !multiple)) && <Option value="" disabled>Select a {title}</Option>}
                    {!combo[key] && children &&
                      children.map((options) => {
                        return (
                          <Option value={options.name}>{options.value}</Option>
                        );
                      })}
                    {combo[key] &&
                      combo[key].map((options) => {
                        return (
                          <Option value={options.id}>{options.name}</Option>
                        );
                      })}
                  </Input>
                </div>
              </>
            );
          }
        })}
      </div>
    );
  }

  getDefaultFields = () => {
    const { getFormColumns } = this.props.children;
    const { id, apiData } = this.props;
    const fields = {};
    getFormColumns().map((x) => {
      if (id) {
        fields[x.dataIndex] = apiData[x.dataIndex] ? apiData[x.dataIndex] : x.hasOwnProperty('defaultValue') ? x.defaultValue : '';
      } else {
        if (x.type == 'form') {
          const { children } = this.state;
          fields[x.dataIndex] = [];
          let formKeys = {};
          children.filter(ele => ele.dataIndex == x.dataIndex)[0].form.forEach(ele => {
            ele.forEach(element => {
              formKeys[element.dataIndex] = x.hasOwnProperty('defaultValue') ? x.defaultValue : '';
            });
            fields[x.dataIndex].push(formKeys)
          });
        } else {
          fields[x.dataIndex] = x.hasOwnProperty('defaultValue') ? x.defaultValue : '';
        }
      }
    });
    return fields;
  }

  render() {
    const { getFormColumns } = this.props.children;
    const { onSubmitForm, isView } = this.props;
    const { children: formValidation } = this.state;

    const fields = this.getDefaultFields();
    console.log('fieldsfieldsfields', fields);
    return (
      <>
        <Formik
          enableReinitialize={true}
          initialValues={fields}
          validationSchema={() => {
            const formicErrors: any = {};
            getFormColumns().map((x) => {
              if (x.isRequired && x.type !== 'form') {
                formicErrors[x.dataIndex] = Yup.string().required(
                  'This field is required',
                );
              }
              //  else if (x.type == 'form') {
              //   formValidation.filter(ele => ele.dataIndex == x.dataIndex)[0].form.map((ele, index) => {
              //     ele.map(element => {
              //       if (element.isRequired) {
              //         formicErrors[`${x.dataIndex}[${index}].${element.dataIndex}`] = Yup.string().required(
              //           'This field is required',
              //         );
              //       }
              //     })
              //   })
              // }
            });
            return Yup.object().shape(formicErrors);
          }}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            const { id, children } = this.props;
            const { api } = children;
            console.log('values', values, id);
            if (id) {
              const responseData = await this.props.dispatch(
                putData(`${api()}/${id}`, values),
              );
              if (responseData) {
                this.props.onCloseModal();
                resetForm();
              }
            } else {
              const responseData = await this.props.dispatch(
                postData(api(), values),
              );
              if (responseData && responseData.code == 200) {
                openNotificationWithIcon('success', 'Success', 'Action Executed Successfully');
                this.props.onCloseModal();
                resetForm();
              } else {
                openNotificationWithIcon('error', 'Error', responseData.message);
              }
            }
          }}
          render={({ errors, touched, isSubmitting, submitForm }) => {
            onSubmitForm(submitForm);
            return (
              <Form className="content">
                {this.getFormsInput(errors, touched, isSubmitting, fields, isView)}
              </Form>
            );
          }}
        />
      </>
    );
  }
}

export default SimpleForm;


