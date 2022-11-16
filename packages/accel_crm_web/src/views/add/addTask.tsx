import * as React from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { Link, withRouter } from 'react-router-dom';
import '../../../src/scss/home.scss';
import { MDBDataTable } from 'mdbreact';
import { generateKeyPair } from 'crypto';
import { Icon } from '../../components';
import Select from 'react-select';
import chroma from 'chroma-js';

interface Props {
  isAuthenticated: boolean;
  history: any;
}

interface State {
  data1: any;
  taskstatus: boolean;
  pname: any;
  projname: string;
  dname: any;
  devname: string;
  ttype: any;
  tasktype: string;
  taskprio: any;
  taskp: string;
}

class AddTask extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      data1: [],
      taskstatus: false,
      pname: [],
      projname: '',
      dname: [],
      devname: '',
      ttype: [],
      tasktype: '',
      taskprio: [],
      taskp: '',
    };

    this.onchangepname = this.onchangepname.bind(this);
    this.onchagedname = this.onchagedname.bind(this);
    this.onchangetasktype = this.onchangetasktype.bind(this);
    this.onchangetaskprio = this.onchangetaskprio.bind(this);
  }

  onchangetaskprio(e) {
    console.log('callingsd sjdns dmsnd ', e);
    const taskp = e.value;
    this.setState({ taskp });
  }
  onchangetasktype(e) {
    console.log('callingsd sjdns dmsnd ', e);
    const tasktype = e.value;
    this.setState({ tasktype });
  }
  onchagedname(e) {
    console.log('callingsd sjdns dmsnd ', e);
    const devname = e.value;
    this.setState({ devname });
  }

  onchangepname(e) {
    console.log('callingsd sjdns dmsnd ', e);
    const projname = e.value;
    this.setState({ projname });
  }

  componentDidMount() {
    const pname = [
      {
        value: 'Wealthylife',
        label: 'Wealthylife',
      },
      {
        value: 'Elearning',
        label: 'Elearning',
      },
      {
        value: 'Stock-Market',
        label: 'Stock-Market',
      },
      {
        value: 'Meest',
        label: 'Meest',
      },
    ];

    const dname = [
      {
        value: 'Motesh',
        label: 'Motesh',
      },
      {
        value: 'Chinmay',
        label: 'Chinmay',
      },
      {
        value: 'Ajinkya',
        label: 'Ajinkya',
      },
      {
        value: 'Maruti',
        label: 'Maruti',
      },
    ];
    const ttype = [
      {
        value: 'New Task',
        label: 'New Task',
      },
      {
        value: 'Bug',
        label: 'Bug',
      },
    ];
    const taskprio = [
      {
        value: 'Low',
        label: 'Low',
      },
      {
        value: 'Medium',
        label: 'Medium',
      },
      {
        value: 'High',
        label: 'High',
      },
    ];
    this.setState({ pname, dname, ttype, taskprio });
  }

  render() {
    if (this.props.isAuthenticated) {
      return (
        <>
          <div
            className="filter-area"
            style={{
              backgroundColor: '#707070',
              margin: '23px',
              marginBottom: '0%',
              border: '0.1px solid #cccccc',
              borderRadius: '6px',
            }}
          >
            <div
              style={{
                height: '100%',
                width: '85%',
                padding: '1%',
                marginLeft: '20px',
              }}
            >
              <b
                style={{
                  marginRight: '20%',
                  color: '#ffffff',
                  fontWeight: 800,
                }}
              >
                Add Task :
              </b>
            </div>
          </div>
          <div className="column" style={{ paddingTop: '0%' }}>
            <div
              style={{
                border: '0.1px solid #cccccc',
                padding: '2%',
                margin: '1%',
                marginTop: '0%',
                borderRadius: '6px',
              }}
            >
              <div className="rows">
                <div className="column is-half">
                  <div className="rows">
                    <label
                      style={{
                        width: '30%',
                        paddingBottom: '30px',
                        margin: '0px',
                        marginRight: '10px',
                      }}
                    >
                      <b>Task Title:</b>
                    </label>
                    <div style={{ width: '70%' }}>
                      <input
                        type="text"
                        style={{
                          width: '100%',
                          height: '65%',
                          border: '1px solid #cccccc',
                        }}
                      />
                    </div>
                  </div>
                  <div className="rows">
                    <label
                      style={{
                        width: '30%',
                        paddingBottom: '30px',
                        margin: '0px',
                        marginRight: '10px',
                      }}
                    >
                      <b>Project Name:</b>
                    </label>
                    <div style={{ width: '70%' }}>
                      <Select
                        className="basic-single"
                        classNamePrefix="select"
                        isClearable={true}
                        name="projname"
                        options={this.state.pname}
                        isSearchable={true}
                        defaultValue={this.state.pname[0]}
                        onChange={this.onchangepname}
                      />
                    </div>
                  </div>
                  <div className="rows">
                    <label
                      style={{
                        width: '30%',
                        paddingBottom: '30px',
                        margin: '0px',
                        marginRight: '10px',
                      }}
                    >
                      <b>Start Date:</b>
                    </label>
                    <div style={{ width: '70%' }}>
                      <input
                        type="date"
                        style={{
                          width: '100%',
                          height: '65%',
                          border: '1px solid #cccccc',
                        }}
                      />
                    </div>
                  </div>
                  <div className="rows">
                    <label
                      style={{
                        width: '30%',
                        paddingBottom: '30px',
                        margin: '0px',
                        marginRight: '10px',
                      }}
                    >
                      <b>End Date:</b>
                    </label>
                    <div style={{ width: '70%' }}>
                      <input
                        type="date"
                        style={{
                          width: '100%',
                          height: '65%',
                          border: '1px solid #cccccc',
                        }}
                      />
                    </div>
                  </div>
                  <div className="rows">
                    <label
                      style={{
                        width: '30%',
                        paddingBottom: '30px',
                        margin: '0px',
                        marginRight: '10px',
                      }}
                    >
                      <b>Developer Name:</b>
                    </label>
                    <div style={{ width: '70%' }}>
                      <Select
                        className="basic-single"
                        classNamePrefix="select"
                        isClearable={true}
                        name="devlopername"
                        options={this.state.dname}
                        isSearchable={true}
                        defaultValue={this.state.dname[0]}
                        onChange={this.onchagedname}
                      />
                    </div>
                  </div>
                </div>
                <div className="column is-half">
                  <div className="rows">
                    <label
                      style={{
                        width: '30%',
                        paddingBottom: '30px',
                        margin: '0px',
                        marginRight: '10px',
                      }}
                    >
                      <b>Task Type:</b>
                    </label>
                    <div style={{ width: '70%' }}>
                      <Select
                        className="basic-single"
                        classNamePrefix="select"
                        isClearable={true}
                        name="tasktype"
                        options={this.state.ttype}
                        isSearchable={true}
                        defaultValue={this.state.ttype[0]}
                        onChange={this.onchangetasktype}
                      />
                    </div>
                  </div>
                  <div className="rows">
                    <label
                      style={{
                        width: '30%',
                        paddingBottom: '30px',
                        margin: '0px',
                        marginRight: '10px',
                      }}
                    >
                      <b>Task Priority:</b>
                    </label>
                    <div style={{ width: '70%' }}>
                      <Select
                        className="basic-single"
                        classNamePrefix="select"
                        isClearable={true}
                        name="taskprio"
                        options={this.state.taskprio}
                        isSearchable={true}
                        defaultValue={this.state.taskprio[0]}
                        onChange={this.onchangetaskprio}
                      />
                    </div>
                  </div>
                  <div className="rows">
                    <label
                      style={{
                        width: '30%',
                        paddingBottom: '30px',
                        margin: '0px',
                        marginRight: '10px',
                      }}
                    >
                      <b>Description:</b>
                    </label>
                    <div style={{ width: '70%' }}>
                      <input
                        type="textarea"
                        style={{
                          width: '100%',
                          height: '65%',
                          border: '1px solid #cccccc',
                        }}
                      />
                    </div>
                  </div>
                  <div className="rows">
                    <label
                      style={{
                        width: '30%',
                        paddingBottom: '30px',
                        margin: '0px',
                        marginRight: '10px',
                      }}
                    >
                      <b>Attachment:</b>
                    </label>
                    <div style={{ width: '70%' }}>
                      <input
                        type="file"
                        style={{
                          width: '100%',
                          height: '65%',
                          border: '1px solid #cccccc',
                        }}
                      />
                    </div>
                  </div>
                  <br /> <br />
                  <div className="rows">
                    <div
                      style={{
                        width: '8%',
                        paddingBottom: '30px',
                        margin: '0px',
                        marginRight: '135px',
                      }}
                    ></div>
                    <div style={{ width: '70%' }}>
                      <button
                        style={{
                          backgroundColor: '#04c404',
                          color: '#ffffff',
                          width: '110px',
                          height: '32px',
                          borderRadius: '5px',
                          float: 'right',
                        }}
                      >
                        <Icon iconName="save" />
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div></div>
            </div>
          </div>
        </>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.app.isAuthenticated,
  user: state.app.user,
});

export default withRouter(connect(mapStateToProps)(AddTask));
