import * as React from 'react';
import ViewWrapper from './ViewWrapper/ViewWrapper';
import ViewHeading from './ViewHeading/ViewHeading';
import { getData, getDataBy, deleteRow } from '../actions/apiCall';
import {
  Table,
  Modal,
  Button,
  Space,
  Dropdown,
  Menu,
  Input,
  Select,
  DatePicker,
  Drawer,
  notification,
} from 'antd';
import { DownOutlined, ExclamationCircleOutlined, SearchOutlined, EyeTwoTone } from '@ant-design/icons';
import SimpleForm from './Simple-form';
import { Image } from 'antd';

const { RangePicker } = DatePicker;
const { confirm } = Modal;
interface Props {
  dispatch?: any;
  object?: any;
  history?: any;
  children?: any;
}

interface Sates {
  visible: boolean;
  loading: boolean;
  onSubmit: any;
  searchText: any;
  searchedColumn: any;
  columnData: any;
  pagignation: number;
  isLoading: boolean;
  id: any;
  apiData: any;
  selectedValue: any;
  isView?: boolean;
  actionType?: any;
  visiblePDF?: any;
  visibleText?: any;
  htmlText: any;
  file?: any;
}

export default class BaseComponent extends React.Component<Props, Sates> {
  config: any;
  submitForm: any;
  searchInput: any;
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      loading: false,
      onSubmit: false,
      searchText: '',
      searchedColumn: '',
      columnData: [],
      pagignation: 0,
      isLoading: true,
      id: false,
      apiData: {},
      selectedValue: [],
      isView: false,
      actionType: "Add",
      visiblePDF: false,
      file: null,
      visibleText: null,
      htmlText: null
    };
  }
  getResponse = async (filter = null) => {
    this.setState({ isLoading: true });
    let funtionCall;
    if (filter) {
      funtionCall = getData(this.config.api(filter));
    } else {
      funtionCall = getData(this.config.api());
    }
    const responseData = await this.props.dispatch(funtionCall);
    const { data, count } = responseData;
    this.setState({ columnData: data, pagignation: count, isLoading: false });
    return responseData;
  }

  getRecordsById = async (id: any, isView = false) => {
    const data: any = await this.props.dispatch(
      getDataBy(`${this.config.api()}/${id}`),
    );
    this.setState({ id, apiData: data.data });
    this.showModal(isView);
  }

  showModal = (isView = false) => {
    this.setState({
      isView,
      visible: true,
    });
  }

  handleOk = () => {
    this.setState({ loading: false, visible: false, id: false, apiData: {} });
    this.getResponse();
  }

  handleCancel = () => {
    this.setState({ visible: false, id: false, apiData: {} });
  }

  onSubmitForm = (submitForm) => {
    this.submitForm = submitForm;
  }

  showNotification = (type, msg, disc) => {
    notification[type]({
      message: msg,
      description: disc,
    });
  }

  openPDF = () => {
    const { visiblePDF, file, loading, id } = this.state;
    const { maskClosable, modalTitle, getColumns } = this.config;

    return (
      <>
        <Modal
          maskClosable={maskClosable}
          width={"100%"}
          style={{ top: 20, bottom: 20 }}
          visible={visiblePDF}
          destroyOnClose={true}
          title="View"
          className="pdf-viewer"
          onCancel={() => this.setState({ visiblePDF: false })}
          footer={[
            <Button key="back" onClick={() => this.setState({ visiblePDF: false })} className="mr-2">
              Cancel
            </Button>
          ]}
        >
          <iframe src={file}
            onLoad={() => 'null'}
            title='myframe'
            id='myFrame'
            width="100%"
            style={{ height: '100%' }}
            allowFullScreen>
          </iframe>
        </Modal>
      </>
    );
  }

  viewText = () => {
    const { visibleText,
      htmlText, loading, id } = this.state;
    const { maskClosable, modalTitle, getColumns } = this.config;

    return (
      <>
        <Modal
          maskClosable={maskClosable}
          visible={visibleText}
          destroyOnClose={true}
          title="View"
          onCancel={() => this.setState({ visibleText: false })}
          footer={[
            <Button key="back" onClick={() => this.setState({ visibleText: false })} className="mr-2">
              Cancel
            </Button>
          ]}
        >
          <div dangerouslySetInnerHTML={{ __html: htmlText }}></div>
        </Modal>
      </>
    );
  }

  getModal = (actionType) => {
    const { visible, loading, id } = this.state;
    const { maskClosable, modalTitle, getColumns } = this.config;
    return (
      <>
        <Drawer
          maskClosable={maskClosable}
          width={1000}
          title={modalTitle(this.state.actionType)}
          placement="right"
          onClose={this.handleCancel}
          visible={visible}
          destroyOnClose={true}
          footer={this.state.isView ? null : [
            <Button key="back" onClick={this.handleCancel} className="mr-2">
              Cancel
            </Button>,
            <Button
              key="submit"
              type="primary"
              loading={loading}
              onClick={() => {
                this.submitForm();
              }}
            >
              Save
            </Button>,
          ]}
          footerStyle={{ textAlign: 'end' }}
        >
          <SimpleForm
            isView={this.state.isView}
            children={this.config}
            onSubmitForm={this.onSubmitForm}
            onCloseModal={this.handleOk}
            dispatch={this.props.dispatch}
            id={id}
            apiData={this.state.apiData}
          />
        </Drawer>
      </>
    );
  }

  getColumnSearchProps = (dataIndex, row) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            this.handleSearch(selectedKeys, confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => this.handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
          .toString()
          .toLowerCase()
          .includes(value.toLowerCase())
        : '',
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => this.searchInput.select(), 100);
      }
    },
    render: (text) => {
      if (this.state.searchedColumn === dataIndex) {
        return row && row['render'] ? row.render(text) : text
      } else {
        return row && row['render'] ? row.render(text) : text
      }
    },
  })

  onEdit = (id) => {
    this.setState({ actionType: 'Edit' })
    this.getRecordsById(id);
  }

  onPDFGet = (data) => {
    this.setState({ visiblePDF: true, file: data })
  }

  onView = (id) => {
    this.setState({ actionType: 'View' })
    this.getRecordsById(id, true);
  }

  onDelete = async (id) => {
    const response = await this.props.dispatch(
      deleteRow(`${this.config.api()}/${id}`),
    );
    if (response.code !== 0) {
      this.showNotification('success', 'Success', 'Record Successfully deleted');
      this.getResponse();
    } else {
      this.showNotification('error', 'Error', 'Something Went wrong');
    }
  }

  showDeleteConfirm = (id) => {
    // tslint:disable-next-line: no-this-assignment
    const scope = this;

    confirm({
      title: 'Are you sure delete this?',
      icon: <ExclamationCircleOutlined />,
      content: '',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        scope.onDelete(id);
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  getButtons = (text, row, index) => {
    const { moreActions } = this.config
    const menu = (
      <Menu>
        <Menu.Item onClick={() => this.onView(row._id)}>View</Menu.Item>
        <Menu.Item onClick={() => this.onEdit(row._id)}>Edit</Menu.Item>
        {moreActions && moreActions.map(ele =>
          <Menu.Item onClick={() => this.onPDFGet(ele.getKey(row))} key={ele.name}>{ele.name}</Menu.Item>
        )}
        <Menu.Item onClick={() => this.showDeleteConfirm(row._id)}>
          Delete
        </Menu.Item>
      </Menu>
    );
    return (
      <Space size="middle">
        <Dropdown overlay={menu}>
          <a>
            More <DownOutlined />
          </a>
        </Dropdown>
      </Space>
    );
  }

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  }

  filterData = (value) => {
    console.log('valuevaluevaluevaluevalue', value);
  }

  handleReset = (clearFilters) => {
    clearFilters();
    this.setState({ searchText: '' });
  }

  getFilter = (filter) => {
    this.getResponse(filter);
  }

  renderMethod() {
    const { getColumns, actions, isActionTab, title } = this.config;
    const { columnData, pagignation, isLoading } = this.state;
    const columnFields = [];
    if (isActionTab) {
      columnFields.push({
        title: 'Actions',
        dataIndex: 'Actions',
        key: 'Actions',
        render: (text, row, index) => this.getButtons(text, row, index),
      });
    }

    getColumns().forEach((element) => {
      if (element.isSearch) {
        columnFields.push({
          ...element,
          ...this.getColumnSearchProps(element.key, element),
        });
      } else {
        if (element && element.type == 'file') {
          columnFields.push({
            ...element,
            render: (text) => <Image width={element.width || 100} src={process.env.FILE_URL + text} />
          })
        } else if (element && element.type == 'viewText') {
          columnFields.push({
            ...element,
            render: (text) => {
              return <EyeTwoTone style={{ fontSize: '20px' }} onClick={() => this.setState({ htmlText: element.render(text), visibleText: true })} />
            }
          })
        } else if (element && element.type == 'renderHtml') {
          columnFields.push({
            ...element,
            render: (text) => {
              return <div style={{ fontSize: '20px' }} dangerouslySetInnerHTML={{ __html: element.render(text) }}></div>
            }
          })
        } else {
          columnFields.push(element);
        }
      }
    });

    const controls = [];
    if (actions.length > 0) {
      actions.forEach((element) => {
        if (element && element.isFilter && element.date) {
          controls.push(<RangePicker onChange={this.getFilter} />);
        } else if (element && element.isFilter && element.isDropDown) {
          const { selectedValue } = this.state;
          const options = [
            { label: 'shubham', value: 'shubham' },
          ];
          let mode;
          if (element.mode === 'single') {
            mode = 'single' as const;
          } else {
            mode = 'multiple' as const;
          }
          const selectProps = {
            mode,
            selectedValue,
            options,
            style: { width: '200px' },
            onChange: (newValue: string[]) => {
              this.setState({ selectedValue: newValue });
              this.filterData(newValue);
            },
            placeholder: 'Select Item...',
            maxTagCount: 'responsive' as const,
          };
          controls.push(<Select {...selectProps} />);
        } else {
          controls.push(
            <Button
              {...actions.settings}
              onClick={async () => {
                this.setState({ actionType: "Add" })
                if (element.isBack) {
                  return this.props.history.goBack();
                } if (element.isModal) {
                  this.showModal();
                }
              }}
            >
              {element.name}
            </Button>,
          );
        }
      });
    }
    return (
      <>
        <ViewWrapper requireAuth isNotRedirected title={title}>
          <ViewHeading controls={controls} isSmall={true}>
            {this.config.title}
          </ViewHeading>
          {actions.map((ele) => {
            if (ele.isModal) {
              return this.getModal('Add');
            }
          })}
          {this.openPDF()}
          {this.viewText()}
          <div className="column" style={{ paddingTop: '0%' }}>
            <Table
              loading={isLoading}
              columns={columnFields}
              dataSource={columnData}
            />
          </div>
        </ViewWrapper>
      </>
    );
  }

  render() {
    return this.renderMethod();
  }
}
