import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { invoiceMasterConfig } from '../../../entity/projects/invoiceMasterConfig';
import BaseComponent from '../../../components/BaseComponent';

class InvoiceMaster extends BaseComponent {
  constructor(props) {
    super(props);
    this.config = { ...invoiceMasterConfig };
    this.getResponse();
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.app.isAuthenticated,
  user: state.app.user,
});

export default withRouter(connect(mapStateToProps)(InvoiceMaster));