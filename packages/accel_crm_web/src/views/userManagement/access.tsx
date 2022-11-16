import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { accessConfig } from '../../entity/designations/accessConfig';
import BaseComponent from '../../components/BaseComponent';

class Access extends BaseComponent {
    constructor(props) {
        super(props);
        this.config = { ...accessConfig };
        this.getResponse();
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.app.isAuthenticated,
    user: state.app.user,
});

export default withRouter(connect(mapStateToProps)(Access));
