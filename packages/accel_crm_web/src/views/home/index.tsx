import * as React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import ViewWrapper from '../../components/ViewWrapper/ViewWrapper';
import { List, Avatar, Empty } from 'antd';
import VirtualList from 'rc-virtual-list';
import { Switch } from 'antd';
import { getTimeProps } from 'antd/lib/date-picker/generatePicker';
import * as moment from 'moment';
import { getData, getDataBy, deleteRow } from '../../actions/apiCall';
import { Calendar, Badge } from 'antd';
import {
  Modal,
  Button,
  Image
} from 'antd';

interface Props {
  isAuthenticated: boolean;
  history: any;
  dispatch?: any;
}

interface State {
  options: any;
  time: any;
  userList: any;
  holidayList: any;
  visible: any;
  event: any
}
class Home extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      options: null,
      time: null,
      userList: [],
      holidayList: [],
      visible: false,
      event: null
    }
    this.getTime();
    this.getBirthday();
    this.getHoliday();
  }

  async getBirthday() {
    const { data } = await this.props.dispatch(getData('/users/birthday/list'));
    console.log("datadatadatadata", data);
    this.setState({ userList: data })
  }


  async getHoliday() {
    const { data } = await this.props.dispatch(getData('/holiday/upcomming/holiday'));
    console.log("datadatadatadata", data);
    this.setState({ holidayList: data })
  }

  onSelect(value) {
    const { holidayList } = this.state;
    let event = [];
    holidayList.forEach(element => {
      if (value.date() == parseInt(moment(element.holidayOn).format('DD'))
        && value.month() == parseInt(moment(element.holidayOn).subtract(1, 'month').format('M'))) {
        event.push(element)
      }
    });
    if (event.length > 0) {
      this.setState({ visible: true, event: event })
    }
  }


  getModal() {
    const { visible, event } = this.state;
    return (
      <>
        <Modal
          maskClosable={true}
          visible={visible}
          destroyOnClose={true}
          title="View"
          onCancel={() => this.setState({ visible: false })}
          footer={[
            <Button key="back" onClick={() => this.setState({ visible: false })} className="mr-2">
              Cancel
            </Button>
          ]}
        >
          <>
            {!event && <p>No Events Found</p>}
            {event && event.map(ele => <div className='row'>
              <div className='col-12'><h6>{ele.name}</h6></div>
              <div className='col-12'>
                <Image width={'100%'} src={process.env.FILE_URL + ele.file} />
              </div>
              <div className='col-12'><p>{ele.description}</p></div>
            </div>)}
          </>
        </Modal>
      </>
    );
  }


  getTime() {
    setInterval(() => {
      let date_future: any = new Date("2022-03-18T08:51:00.011Z");
      let date_now: any = new Date();

      let seconds = Math.floor((date_future - (date_now)) / 1000);
      let minutes = Math.floor(seconds / 60);
      let hours = Math.floor(minutes / 60);
      let days = Math.floor(hours / 24);

      hours = hours - (days * 24);
      minutes = minutes - (days * 24 * 60) - (hours * 60);
      seconds = seconds - (days * 24 * 60 * 60) - (hours * 60 * 60) - (minutes * 60);
      this.setState({ time: `${days}:${hours}:${minutes}:${seconds}` })
    }, 1000)
  }

  getListData(value) {
    let listData = [];
    const { holidayList } = this.state;

    if (holidayList && holidayList.length) {
      holidayList.forEach(ele => {
        if (value.date() == parseInt(moment(ele.holidayOn).format('DD'))
          && value.month() == parseInt(moment(ele.holidayOn).subtract(1, 'month').format('M'))) {
          listData.push({ type: 'error', content: ele.name })
        }
      })
    }
    return listData || [];
  }

  dateCellRender(value) {
    const listData = this.getListData(value);
    return (
      <ul className="events">
        {listData.map(item => (
          <li key={item.content}>
            <Badge status={item.type} text={item.content} />
          </li>
        ))}
      </ul>
    );
  }

  render() {
    const { time, userList, holidayList } = this.state;
    const data = [
      {
        title: 'Ant Design Title 1',
      },
      {
        title: 'Ant Design Title 2',
      },
      {
        title: 'Ant Design Title 3',
      },
      {
        title: 'Ant Design Title 4',
      },
    ];
    return <>
      <ViewWrapper requireAuth isNotRedirected title="Home">
        {this.getModal()}
        <div className="row">
          <div className="col-6">
            <section className="section">
              <div className="level view-heading d-block">
                <div>
                  <h5>Log In</h5>
                </div>
                <div className='row'>
                  <div className='col-2'>
                    <Switch />
                  </div>
                  <div className='col-2'>{time}</div>
                </div>
              </div>
            </section>
          </div>
          <div className="col-6">
            <section className="section">
              <div className="level view-heading d-block">
                <div>
                  <h5>Up-Coming Birthday's</h5>
                </div>
                <List>
                  <VirtualList
                    data={userList}
                    height={310}
                    itemHeight={47}
                    itemKey="email"
                  >
                    {item => <List.Item>
                      <List.Item.Meta
                        avatar={<Image width={50} src="https://joeschmoe.io/api/v1/random" />}
                        title={<a href="#">{item.firstName} {item.middelName} {item.lastName}</a>}
                        description={`${item.firstName} ${item.middelName} ${item.lastName} has birthday on ${moment(item.dob).format('DD MMM')} ${moment().format('YYYY')}`}
                      />
                    </List.Item>
                    }
                  </VirtualList>
                </List>
              </div>
            </section>
          </div>
          <div className="col-6">
            <section className="section">
              <div className="level view-heading d-block">
                <div>
                  <h5>Notifications</h5>
                </div>
                <List>
                  <VirtualList
                    data={[]}
                    height={310}
                    itemHeight={47}
                    itemKey="email"
                  >
                    {item => <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                        title={<a href="https://ant.design">{item.title}</a>}
                        description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                      />
                    </List.Item>
                    }
                  </VirtualList>
                </List>
              </div>
            </section>
          </div>
          <div className="col-6">
            <section className="section">
              <div className="level view-heading d-block">
                <div>
                  <h5>My Leaves</h5>
                </div>
                <List>
                  <VirtualList
                    data={data}
                    height={310}
                    itemHeight={47}
                    itemKey="email"
                  >
                    {item => <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                        title={<a href="https://ant.design">{item.title}</a>}
                        description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                      />
                    </List.Item>
                    }
                  </VirtualList>
                </List>
              </div>
            </section>
          </div>
          <div className="col-12">
            <section className="section">
              <div className="level view-heading d-block">
                <div>
                  <h5>Holiday(s) <span>In Year ({moment().format('YYYY')})</span></h5>
                </div>
                <Calendar className='calendar-view'
                  dateCellRender={(e) => this.dateCellRender(e)}
                  onSelect={(e) => this.onSelect(e)}
                />
              </div>
            </section>
          </div>
        </div>
      </ViewWrapper>
    </>;
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.app.isAuthenticated,
  user: state.app.user,
});

export default withRouter(connect(mapStateToProps)(Home));
