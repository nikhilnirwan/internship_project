import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { projectConfigs } from '../../entity/projects/projectConfig';
import BaseComponent from '../../components/BaseComponent';

class Projects extends BaseComponent {
  constructor(props) {
    super(props);
    this.config = { ...projectConfigs };
    this.getResponse();
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.app.isAuthenticated,
  user: state.app.user,
});

export default withRouter(connect(mapStateToProps)(Projects));