import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { leavesConfirg } from '../../entity/leaves/leavesConfig';
import BaseComponent from '../../components/BaseComponent';

class Leaves extends BaseComponent {
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


export default withRouter(connect(mapStateToProps)(Leaves));
