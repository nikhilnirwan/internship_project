import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import BaseComponent from '../../../components/BaseComponent';
import { salarySlipConfig } from '../../../entity/salarySlips';

class SalarySlipes extends BaseComponent {
    constructor(props) {
        super(props);
        this.config = { ...salarySlipConfig, };
        this.getResponse();
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.app.isAuthenticated,
    user: state.app.user,
});


export default withRouter(connect(mapStateToProps)(SalarySlipes));
