import * as React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "../../../../src/scss/home.scss";
import { userConfigs } from "../../../entity/userConfig";
import BaseComponent from "../../../components/BaseComponent";

class userPage extends BaseComponent {
  constructor(props) {
    super(props);
    this.config = { ...userConfigs };
    this.getResponse();
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.app.isAuthenticated,
  user: state.app.user,
});

export default withRouter(connect(mapStateToProps)(userPage));
