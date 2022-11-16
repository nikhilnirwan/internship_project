import Login from './login';
import Home from './home/index';
import Projects from './projects';
import Addtask from './add/addTask';
import profile from './settings/profile';
import Invoice from './projects/invoice/invoicejobs';
import InvoiceMaster from './projects/invoice/invoicemaster';
import Genrate from './projects/invoice/genrate';
import Accounts from './projects/accounts';
import Users from './userManagement/listUsers';
import Designations from './userManagement';
import MapDesignations from './userManagement/mapDesignations';
import Leaves from './Leaves';
import SalarySlip from './salaryManagement/SalarySlip';
import ManageSalary from './salaryManagement/manageSalary';
import Access from './userManagement/access';
import Routings from './userManagement/routingMap';
import * as action from './../actions/auth';
import HolidayManagement from './holiday'
import LeavesMaster from './Leaves/leaveMaster'

const routes = {
  Home,
  Login,
  Projects,
  Users,
  Access,
  Routings,
  Leaves,
  Designations,
  Invoice,
  InvoiceMaster,
  Accounts,
  SalarySlip,
  Genrate,
  MapDesignations,
  ManageSalary,
  HolidayManagement,
  LeavesMaster
}

export const getAccess = async (dispatch) => {
  let appAccess = await dispatch(action.getAccess());
  return appAccess.map(({ componentName, routeUrl, parentMenu, subparentMenu }) => ({ component: routes[componentName], path: routeUrl, parentMenu, subparentMenu }));
}

export default [
  {
    path: '/login',
    component: Login,
  },
];
