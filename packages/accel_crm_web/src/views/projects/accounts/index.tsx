import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { accountConfig } from '../../../entity/projects/accountsConfig';
import BaseComponent from '../../../components/BaseComponent';

class InvoiceJob extends BaseComponent {
    constructor(props) {
        super(props);
        this.config = { ...accountConfig };
        this.getResponse();
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.app.isAuthenticated,
    user: state.app.user,
});

export default withRouter(connect(mapStateToProps)(InvoiceJob));