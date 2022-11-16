import * as React from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { Link, withRouter } from 'react-router-dom';
import { loginUser } from '../../src/actions/auth';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Input } from '../components';
import { Button, notification, Space } from 'antd';
import { Box } from '@material-ui/core';

interface Props {
  isAuthenticated: boolean;
  history: any;
  dispatch: Function;
}

interface State {
  email: string;
  password: string;
}

class Login extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }
  componentDidMount() { }
  openNotificationWithIcon = (type, msg, disc) => {
    notification[type]({
      message: msg,
      description: disc,
    });
  }

  render() {
    if (!this.props.isAuthenticated) {
      return (
        <>
          <Helmet>
            <title>Welcome</title>
          </Helmet>
          <Box>
            <div className="col-12">
              <div className="row">
                <div className="col-md-12 col-lg-4 m-auto" style={{ padding: '5%' }}>
                  <img src={require('./../assets/logo/7851308.png')}
                    style={{ padding: '24px 11%' }} />{' '}
                  <div className="rows">
                    <div
                      className="column"
                      style={{ border: '1px solid #cccccc' }}
                    >
                      <Formik
                        enableReinitialize
                        initialValues={{
                          username: '',
                          password: '',
                        }}
                        validationSchema={() =>
                          Yup.object().shape({
                            username: Yup.string().required(
                              'This field is required',
                            ),
                            password: Yup.string().required(
                              'This field is required',
                            ),
                          })
                        }
                        onSubmit={async (
                          values,
                          { setSubmitting, resetForm },
                        ) => {
                          const response = await this.props.dispatch(
                            loginUser(
                              values['username'],
                              values['password'],
                              () => {
                              },
                            ),
                          );
                          debugger
                          if (response.code) {
                            const msg = 'Success';
                            const disc = 'Login Success';
                            this.openNotificationWithIcon('success', msg, disc);
                            window.location.replace('/');
                          } else {
                            const msg = 'Login Fail';
                            const disc =
                              'Please enter correct emailId and Password';
                            this.openNotificationWithIcon('error', msg, disc);
                          }
                        }}
                        render={({ errors, touched, isSubmitting }) => (
                          <Form className="content">
                            <div className="rows">
                              <div className="field newone">
                                <Input
                                  type="text"
                                  name="username"
                                  placeholder="Username"
                                  errors={errors}
                                  touched={touched}
                                />{' '}
                              </div>
                            </div>
                            <div className="rows">
                              <div className="field newone">
                                <Input
                                  type="password"
                                  name="password"
                                  placeholder="Password"
                                  errors={errors}
                                  touched={touched}
                                />{' '}
                              </div>
                            </div>
                            <div className="rows">
                              <div className="field newone">
                                <button
                                  type="submit"
                                  style={{
                                    width: '100%',
                                    padding: '2%',
                                    margin: '2%',
                                    backgroundColor: '#10afff',
                                    border: '1px solid #10afff',
                                    color: '#ffffff',
                                    borderRadius: '5px',
                                  }}
                                >
                                  <b>Login</b>
                                </button>
                              </div>
                            </div>
                          </Form>
                        )}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Box>
        </>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.app.isAuthenticated,
  user: state.app.user,
});

export default withRouter(connect(mapStateToProps)(Login));
