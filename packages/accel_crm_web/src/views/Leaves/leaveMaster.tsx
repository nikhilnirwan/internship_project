import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { leavesConfirg } from '../../entity/leaves/leavesMasterConfig';
import BaseComponent from '../../components/BaseComponent';

class LeavesMaster extends BaseComponent {
    constructor(props) {
        super(props);
        this.config = { ...leavesConfirg };
        this.getResponse();
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.app.isAuthenticated,
    user: state.app.user,
});

export default withRouter(connect(mapStateToProps)(LeavesMaster));
