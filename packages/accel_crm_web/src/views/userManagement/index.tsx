import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { designationConfig } from '../../entity/designations/designationsConfig';
import BaseComponent from '../../components/BaseComponent';

class UserPage extends BaseComponent {
  constructor(props) {
    super(props);
    this.config = { ...designationConfig };
    this.getResponse();
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.app.isAuthenticated,
  user: state.app.user,
});

export default withRouter(connect(mapStateToProps)(UserPage));
