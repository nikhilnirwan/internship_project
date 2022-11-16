import * as React from 'react';
import { Field } from 'formik';
import { Icon } from '..';
import { Select, Input, Upload, Modal, DatePicker, Tooltip } from 'antd';
import { InfoCircleTwoTone } from '@ant-design/icons';
const { TextArea }: any = Input;
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
interface Props {
  name: string;
  type: string;
  label?: string;
  placeholder?: string;
  icon?: string;
  iconLocation?: string;
  step?: string;
  errors: any;
  touched: any;
  children?: any;
  onClick?: any;
  onInput?: any;
  value?: any;
  disabled?: any;
  defaultValue?: any;
  onChange?: Function;
  defaultClassName?: string;
  search?: string;
  extra?: any;
  multiple?: any;
  lebelInstructions?: any;
}
import { PlusOutlined } from '@ant-design/icons';

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

interface State {
  previewImage: any;
  previewVisible: any;
  previewTitle: any;
  fileList: any;
}

class InputView extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      previewImage: '',
      previewVisible: '',
      previewTitle: '',
      fileList: [],
    };
  }

  getKey(errors, keyName) {
    return `${errors[keyName]}`
  }

  render() {
    let showLabel = this.props.label !== undefined;
    let className = 'input normal';
    const { previewVisible, previewImage, fileList, previewTitle } = this.state;

    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );

    if (
      this.props.errors[this.props.name] &&
      this.props.touched[this.props.name]
    ) {
      className += ' is-danger';
    }

    let field = null;
    if (this.props.search !== undefined) {
      field = (
        <Field
          className={className}
          type={this.props.type}
          name={this.props.name}
          onChange={(e) => this.props.onChange(e)}
          placeholder={this.props.placeholder}
          step={this.props.step}
          onClick={this.props.onClick}
          onInput={this.props.onInput}
          value={this.props.value}
          autoComplete="off"
        />
      );
    } else if (this.props.value !== undefined) {
      field = (
        <Field
          className={className}
          type={this.props.type}
          name={this.props.name}
          placeholder={this.props.placeholder}
          step={this.props.step}
          onClick={this.props.onClick}
          onInput={this.props.onInput}
          value={this.props.value}
        />
      );
    } else if (this.props.disabled !== undefined) {
      field = (
        <Field
          className={className}
          type={this.props.type}
          name={this.props.name}
          placeholder={this.props.placeholder}
          step={this.props.step}
          onClick={this.props.onClick}
          disabled
        />
      );
    } else {
      field = (
        <Field
          className={className}
          name={this.props.name}
          defaultValue={this.props.defaultValue}
        >
          {({ field, form }) => (
            <label className="file-label">
              <Input
                defaultValue={this.props.defaultValue}
                name={this.props.name}
                placeholder={this.props.placeholder}
                autoComplete="off"
                onChange={(event) => {
                  form.setFieldValue(
                    this.props.name,
                    event.currentTarget.value,
                  );
                }}
              />
            </label>)}
        </Field>
      );
    }

    switch (this.props.type) {
      case 'select':
        field = (
          <Field
            name={this.props.name}
            defaultValue={this.props.defaultValue}
            placeholder={this.props.placeholder || 'Select'}
          >
            {({ field, form }) => (
              <label className="file-label">
                {!this.props.multiple && <Select
                  disabled={this.props.disabled}
                  defaultValue={this.props.defaultValue}
                  placeholder={this.props.placeholder || 'Select'}
                  onChange={(event) => {
                    form.setFieldValue(
                      this.props.name,
                      event,
                    );
                  }}
                >
                  {this.props.children !== undefined ? this.props.children : null}
                </Select>}
                {this.props.multiple && <Select
                  mode={'multiple'}
                  disabled={this.props.disabled}
                  defaultValue={!this.props.defaultValue ? [] : this.props.defaultValue}
                  placeholder={this.props.placeholder || 'Select'}
                  onChange={(event) => {
                    form.setFieldValue(
                      this.props.name,
                      event,
                    );
                  }}
                >
                  {this.props.children !== undefined ? this.props.children : null}
                </Select>}
              </label>)}
          </Field>
        );
        break;
      case 'checkbox':
        showLabel = false;
        field = (
          <label className="checkbox">
            <Field name={this.props.name}
            >
              {({ field, form }) => (
                <input
                  type="checkbox"
                  disabled={this.props.disabled}
                  checked={field.value}
                  onChange={() => {
                    form.setFieldValue(this.props.name, !field.value);
                  }}
                />
              )}
            </Field>
            &nbsp;
            {this.props.label}
          </label>
        );
        break;

      case 'followCheckbox':
        showLabel = false;
        field = (
          <label className="checkbox">
            <Field name={this.props.name}>
              {({ field, form }) => (
                <input
                  type="checkbox"
                  checked={this.props.defaultValue}
                  onChange={() => {
                    form.setFieldValue(this.props.name, this.props.value);
                  }}
                />
              )}
            </Field>
            &nbsp;
            {this.props.label}
          </label>
        );
        break;
      case 'number':
        field = (
          <Field name={this.props.name} >
            {({ field, form }) => (
              <label className="file-label">
                <Input
                  type={'number'}
                  disabled={this.props.disabled}
                  defaultValue={this.props.defaultValue}
                  name={this.props.name}
                  placeholder={this.props.placeholder}
                  autoComplete="off"
                  onChange={(event) => {
                    form.setFieldValue(
                      this.props.name,
                      event.currentTarget.value,
                    );
                  }}
                />
              </label>
            )}</Field>
        );
        break;

      case 'textarea':
        field = (
          <Field name={this.props.name} >
            {({ field, form }) => (
              <label className="file-label">
                <TextArea
                  disabled={this.props.disabled}
                  placeholder={this.props.placeholder}
                  defaultValue={this.props.defaultValue}
                  rows={4}
                  onChange={(event) => {
                    form.setFieldValue(
                      this.props.name,
                      event.currentTarget.value,
                    );
                  }}
                ></TextArea>
              </label>
            )}</Field>
        );
        break;

      case 'textQuill':
        field = (
          <Field name={this.props.name} >
            {({ field, form }) => (
              <label className="file-label">
                <ReactQuill
                  defaultValue={this.props.defaultValue}
                  value={field.value}
                  onChange={(e) => this.handleTextChange(e, form)}
                />
              </label>
            )}</Field>
        );
        break;

      case 'file':
        field = (
          <Field name={this.props.name} >
            {({ field, form }) => {
              if (field.value && this.props.disabled) {
                return <div>
                  <Modal
                    visible={previewVisible}
                    title={previewTitle}
                    footer={null}
                    onCancel={this.handleCancel}
                  >
                    <img alt="example" style={{ width: '100%' }} src={`${process.env.FILE_URL}${field.value}`} />
                  </Modal>
                  <img alt="example" onClick={this.handlePreviewView} style={{ width: '100%' }} src={`${process.env.FILE_URL}${field.value}`} />
                </div>
              } else {
                return <div>
                  <Upload
                    action={`${process.env.API_URL}/upload/add`}
                    listType="picture-card"
                    onPreview={this.handlePreview}
                    onChange={e => this.handleChange(e, form)}
                  >
                    {fileList.length >= 1 ? null : uploadButton}
                  </Upload>
                  <Modal
                    visible={previewVisible}
                    title={previewTitle}
                    footer={null}
                    onCancel={this.handleCancel}
                  >
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                  </Modal>
                </div>
              }
            }}
          </Field>
        );
        break;
      case 'date': {
        field = (<Field
          className={className}
          name={this.props.name}
        >
          {({ field, form }) => (
            <label className="file-label">
              <DatePicker
                style={{ width: '100%' }}
                defaultValue={this.props.defaultValue}
                placeholder={this.props.placeholder}
                disabled={this.props.disabled}
                disabledDate={(e) => this.disabledDate(e, this.props)}
                autoComplete="off"
                onClick={this.props.onClick}
                onChange={(event) => {
                  form.setFieldValue(
                    this.props.name,
                    event,
                  );
                }}
              />
            </label>)}
        </Field>);
      }
    }

    const iconLocation = this.props.iconLocation
      ? this.props.iconLocation
      : 'right';

    return (
      <>
        {showLabel && <label className="label">{this.props.label} {this.props.lebelInstructions && <Tooltip title={this.props.lebelInstructions}>
          <InfoCircleTwoTone />
        </Tooltip>}</label>}
        <div
          className={`control${this.props.icon !== undefined ? ` has-icons-${iconLocation}` : ''
            }`}
        >
          {field}
          {this.props.icon !== undefined && (
            <Icon
              iconName={this.props.icon}
              className={`is-small is-${iconLocation}`}
            />
          )}
        </div>
        {this.props.errors[this.props.name] &&
          this.props.touched[this.props.name] && (
            <p className="help is-danger">
              {this.props.errors[this.props.name]}
            </p>
          )}
        {this.props.extra?.note && <small>{this.props.extra?.note}</small>}
      </>
    );
  }

  handleCancel = () => {
    this.setState({ previewVisible: false });
  }

  handlePreviewView = () => {
    this.setState({
      previewImage: true,
      previewVisible: true,
      previewTitle: 'View',
    });
  }

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    });
  }

  disabledDate(current, props) {
    // const { customValidation } = props.extra;
    const result = false;
    // if (customValidation && customValidation.notGraterThan && customValidation.notLessThan) {
    //   const lessDate = moment();
    //   result = current < moment(lessDate).endOf('day');
    // }
    return result;
  }

  handleChange = ({ fileList }, form) => {
    if (fileList && fileList.length > 0 && fileList[0].response) {
      this.setState({ fileList: fileList[0].response.files });
      form.setFieldValue(this.props.name, fileList[0].response.files[0]);
    } else {
      this.setState({ fileList: [] });
      form.setFieldValue(this.props.name, '');
    }
  }

  handleTextChange = (e, form) => {
    console.log("444444444", e)
    form.setFieldValue(this.props.name, e);
  }
}

export default InputView;
