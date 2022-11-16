import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import BaseComponent from '../../../components/BaseComponent';
import { manageSalaryConfig } from '../../../entity/SalaryManagement/manageSalary';

class ManageSalary extends BaseComponent {
    constructor(props) {
        super(props);
        this.config = { ...manageSalaryConfig, };
        this.getResponse();
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.app.isAuthenticated,
    user: state.app.user,
});


export default withRouter(connect(mapStateToProps)(ManageSalary));
