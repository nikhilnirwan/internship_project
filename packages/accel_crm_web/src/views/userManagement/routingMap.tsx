import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { routingConfig } from '../../entity/designations/routingConfig';
import BaseComponent from '../../components/BaseComponent';

class Routing extends BaseComponent {
    constructor(props) {
        super(props);
        this.config = { ...routingConfig };
        this.getResponse();
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.app.isAuthenticated,
    user: state.app.user,
});

export default withRouter(connect(mapStateToProps)(Routing));
