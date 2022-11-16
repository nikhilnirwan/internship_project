import * as React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import '../../../src/scss/home.scss';
import { getDesignation } from '../../actions/developer';
import {  User } from '../../definitions';
import Box from '../../components/Box/Box';
import Errors from '../../components/Errors/Errors';
import ViewWrapper from '../../components/ViewWrapper/ViewWrapper';
import ViewHeading from '../../components/ViewHeading/ViewHeading';

import Image from './../../components/Image/Image';

import { logout } from './../../actions/auth';

interface Props {
    isAuthenticated: boolean;
    history: any;
    dispatch: any;
    user: User;
}

interface State {
    errors: any;
}

class Profile extends React.Component<Props, State> {
    constructor(props) {
        super(props);
        this.state = {
            errors: [],
        };
    }

    async componentDidMount() {
        const reponseData: any = await this.props.dispatch(getDesignation());
    }

    render() {
        if (this.props.isAuthenticated) {
            const controls = [];
            controls.push(
                <button
                    className={`button is-outlined is-primary'`}
                    onClick={async () => {
                        this.props.history.goBack()
                    }}
                >
                    Return
        </button>,
            );
            controls.push(
                <button
                    className="button is-danger is-outlined"
                    onClick={async () => {
                        await this.props.dispatch(
                            logout(() => {
                                window.location.replace('/');
                            }),
                        );
                    }}
                >
                    Logout
                </button>,
            );
            return (
                <>
                    <ViewWrapper
                        requireAuth
                        isNotRedirected
                        title="Profile"
                    >
                        <div className="container content">
                            <div className="columns is-centered">
                                <div className="column is-two-thirds">
                                    <Errors errors={this.state.errors} />
                                    <ViewHeading controls={controls}>Profile</ViewHeading>
                                    <Box>
                                        <div>
                                            <div className="columns">
                                                <div className="column is-one-quarter has-text-centered">
                                                    <Image
                                                        src={this.props.user.displayPicture}
                                                        className="is-circle is-128x128"
                                                    />
                                                </div>
                                                <div className="column is-three-quarters">
                                                    <table>
                                                        <tbody>
                                                            <tr>
                                                                <th>Name</th>
                                                                <td>{this.props.user.firstName} {this.props.user.lastName ? this.props.user.lastName : ''}</td>
                                                            </tr>
                                                            <tr>
                                                                <th>Email</th>
                                                                <td>{this.props.user.email}</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </Box>
                                </div>
                            </div>
                        </div>
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

export default withRouter(connect(mapStateToProps)(Profile));
