import * as React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import ReactGA from 'react-ga';
import { truncate } from 'lodash';
import { User } from '../../definitions';
import { Image } from '../../components';
import { Menu } from 'antd';

import {
  UsergroupAddOutlined,
  HomeOutlined,
  CarryOutOutlined,
  MoneyCollectOutlined,
  FileProtectOutlined,
  BorderlessTableOutlined,
} from '@ant-design/icons';
const { SubMenu } = Menu;
import { closeNavigation } from '../../actions/app';

const icons = {
  UsergroupAddOutlined: <UsergroupAddOutlined />,
  HomeOutlined: <HomeOutlined />,
  CarryOutOutlined: <CarryOutOutlined />,
  FileProtectOutlined: <FileProtectOutlined />,
  BorderlessTableOutlined: <BorderlessTableOutlined />,
  MoneyCollectOutlined: <MoneyCollectOutlined />,
}

interface Props {
  isAuthenticated: boolean;
  isNavigationOpen: boolean;
  user: User;
  dispatch: Function;
  location: any;
  routes?: any;
  history?: any;
  navigations?: any;
}

interface State {
  collapsed: boolean;
  changeClass: string;
}

class Navbar extends React.Component<Props, State> {
  invalidRoutes = ['/pdf'];

  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      changeClass: '',
    };
  }


  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      window.scrollTo(0, 0);
      this.props.dispatch(closeNavigation());

      // Log the page view
      ReactGA.set({ page: window.location.pathname });
      ReactGA.pageview(window.location.pathname);
    }
  }

  handleClick = (event) => {
    console.log('event', event);
    this.props.history.push(event.key);
  }

  getSideBarMenu = () => {
    const { navigations } = this.props;
    console.log("navigationsnavigationsnavigations", navigations)
    return (
      <Menu
        onClick={this.handleClick}
        defaultSelectedKeys={['/']}
        mode="inline"
        inlineCollapsed={this.state.collapsed}
      >
        {navigations && navigations.map(ele => {
          if (!ele.list) {
            return <Menu.Item key={ele.routeUrl} icon={icons[ele.icon]}>
              {ele.name}
            </Menu.Item>
          } else {
            return <SubMenu
              key={ele.name}
              icon={<UsergroupAddOutlined />}
              title={ele.name}
            >
              {ele.list.map(parentMn => {
                if (!parentMn.list) {
                  return <Menu.Item key={parentMn.routeUrl} icon={icons[ele.icon]}>
                    {parentMn.name}
                  </Menu.Item>
                } else {
                  return <SubMenu
                    key={parentMn.name}
                    icon={<UsergroupAddOutlined />}
                    title={parentMn.name}
                  >
                    {parentMn.list.map(subMn => <Menu.Item key={subMn.routeUrl} icon={icons[ele.icon]}>
                      {subMn.name}
                    </Menu.Item>)}
                  </SubMenu>
                }
              })}
            </SubMenu>
          }
        })}
      </Menu>
    );
  }

  toggleCollapsed = () => {
    this.setState({ collapsed: !this.state.collapsed });
  }

  getClass = () => {
    setTimeout(() => {
      this.setState({
        changeClass: 'col-11',
      });
    }, 1000);
  }

  render() {
    const { collapsed, changeClass } = this.state;
    if (this.invalidRoutes.indexOf(this.props.location.pathname) !== -1) {
      return null;
    }
    return (
      <>
        {this.props.isAuthenticated && (
          <nav className="navbar is-info is-fixed-top">
            <div className="container-fluid content">
              <div
                className={`navbar-menu ${this.props.isNavigationOpen ? 'is-active' : ''
                  }`}
              >
                <div className="navbar-start">
                  <img src={require('../../assets/logo/logo.png')} alt="" className="logo-admin" />
                  {/* <div>
                    <Button
                      type="primary"
                      onClick={this.toggleCollapsed}
                      style={{ marginBottom: 16 }}
                    >
                      {React.createElement(
                        this.state.collapsed
                          ? MenuUnfoldOutlined
                          : MenuFoldOutlined
                      )}
                    </Button>
                  </div> */}
                </div>

                <div className="navbar-end">
                  {this.props.isAuthenticated ? (
                    <>
                      <Link to="/profile" className="navbar-item">
                        <Image
                          src={this.props.user.displayPicture}
                          className="is-circle is-24x24"
                        />
                        <div style={{ lineHeight: 1 }}>
                          {this.props.user.firstName}
                          {this.props.isAuthenticated &&
                            this.props.user.designation && (
                              <>
                                <small style={{ opacity: 0.7 }}>
                                  <br />
                                  {truncate(this.props.user.designation)}
                                </small>
                              </>
                            )}
                        </div>
                      </Link>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
          </nav>
        )}
        <div className="clearfix"></div>
        <div className="row">
          {this.props.isAuthenticated && (
            <div
              className={
                collapsed
                  ? 'col-1 with-5px fixed_side_bar'
                  : 'col-2 fixed_side_bar'
              }
            >
              <div>{this.getSideBarMenu()}</div>
            </div>
          )}
          <div
            className={
              this.props.isAuthenticated
                ? collapsed
                  ? 'col-11'
                  : 'col-10'
                : 'col-12'
            }
          >
            <div className="row col-12 p-0">
              <section className="section scroll">{this.props.routes}</section>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.app.isAuthenticated,
    isNavigationOpen: state.app.isNavigationOpen,
    user: state.app.user,
    navigations: state.app.navigations
  }
};

export default withRouter(connect(mapStateToProps)(Navbar));
