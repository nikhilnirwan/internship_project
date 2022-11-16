import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { mapDesignationsConfig } from '../../entity/designations/mapDesignationsConfig';
import BaseComponent from '../../components/BaseComponent';

class MapDesignations extends BaseComponent {
    constructor(props) {
        super(props);
        this.config = { ...mapDesignationsConfig };
        this.getResponse();
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.app.isAuthenticated,
    user: state.app.user,
});

export default withRouter(connect(mapStateToProps)(MapDesignations));
