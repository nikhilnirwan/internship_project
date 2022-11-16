import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Helmet from 'react-helmet';
import ErrorView from '../../views/Error';
import { User } from '../../definitions';

interface Props {
  title: string;
  children: any;
  permissions?: string[];
  requireAuth?: boolean;
  requireNoAuth?: boolean;
  requireGlobalAdmin?: boolean;
  isNotRedirected?: boolean;
  isLoaded: boolean;
  isAuthenticated: boolean;
  isGlobalAdmin: boolean;
  user: User;
  history: any;
}

interface State {
  isReady: boolean;
}

class ViewWrapper extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
    };
  }

  componentDidMount() {
    // Throw error if authentication is needed
    if (
      this.props.requireAuth &&
      (!this.props.isAuthenticated || this.props.user === null)
    ) {
      return <ErrorView />;
    }

    // Throw error if authentication is not needed
    if (this.props.requireNoAuth && this.props.isAuthenticated) {
      return <ErrorView />;
    }

    // Redirect to settings page if no password is set
    if (
      !this.props.isNotRedirected &&
      this.props.isAuthenticated &&
      !this.props.user.hasPassword()
    ) {
      this.props.history.replace('/');
    }

    // Redirect to settings page if no active account attached
    if (!this.props.isNotRedirected && this.props.isAuthenticated) {
      this.props.history.replace('/');
    }

    // Throw error if invalid permissions
    if (this.props.permissions !== undefined) {
      for (const permission of this.props.permissions) {
        if (!this.props.user.hasPermission(permission)) {
          return <ErrorView />;
        }
      }
    }

    this.setState({ isReady: true });
  }

  render() {
    if (!this.props.isLoaded || !this.state.isReady) {
      return (
        <Helmet>
          <title>Loading...</title>
        </Helmet>
      );
    }
    return (
      <div>
        <Helmet>
          <title>{this.props.title}</title>
        </Helmet>
        {this.props.children}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoaded: state.app.isLoaded,
  isAuthenticated: state.app.isAuthenticated,
  user: state.app.user,
});

export default withRouter(connect(mapStateToProps)(ViewWrapper));
