import * as moment from 'moment';
import { find } from 'lodash';
import {
  UserStatus,
  UserPayload,
  PermissionPayload,
} from '../definitions';

const noAvatar = require('../assets/user-male.png');

class User {
  id: number;
  href: string;
  name: string;
  email: string;
  password: string | boolean;
  status: UserStatus;
  displayPicture?: string | null;
  createdAt: moment.Moment;
  updatedAt: moment.Moment;
  isAdmin: boolean;
  account: any;
  permissions: Array<PermissionPayload> | null;
  type: string;
  designation: any;
  role: string;

  isEVSubscribed: boolean;
  title?: string;
  firstName?: string;
  lastName?: string;
  countryCode?: string;
  phone?: string;
  jobTitle?: string;
  appointment?: any;

  constructor(user: UserPayload, isAdmin?: boolean) {
    this.id = user.id;
    this.href = `/users/${this.id}`;
    this.name = user.name;
    this.email = user.email;
    this.role = user.role;
    this.password = false;
    if (user.password) {
      this.password = user.password;
    }
    this.status = user.status;
    this.displayPicture = user.displayPicture;
    this.createdAt = moment(user.created_at);
    this.updatedAt = moment(user.updated_at);

    this.isAdmin = false;
    if (isAdmin) {
      this.isAdmin = isAdmin;
    }

    this.account = null;

    if (this.displayPicture === null) {
      this.displayPicture = noAvatar;
    }

    this.permissions = null;
    if (user.permissions && user.permissions.length > 0) {
      this.permissions = user.permissions;
    }

    this.type = 'Member';
    if (this.isAdmin) {
      this.type = 'Administrator';
    } else if (this.hasPermission('DOCTOR')) {
      this.type = 'Doctor';
    }

    this.isEVSubscribed = !!user.is_ev_subscriber ? true : false;

    this.firstName = user.first_name;
    this.lastName = user.last_name;
    this.countryCode = user.country_code;
    this.phone = user.phone;
    this.title = user.title;
    this.countryCode = user.country_code;
    this.jobTitle = user.job_title;
  }


  hasPermission(permission: string) {
    if (this.isAdmin) {
      return true;
    }
    if (this.permissions === null) {
      return false;
    }
    return find(this.permissions, { key: permission }) !== undefined;
  }

  hasPassword() {
    return !!this.password;
  }

  getTypeClass(prefix = 'is-') {
    let className = 'default';
    switch (this.type) {
      case 'Administrator':
        className = 'dark';
        break;
      case 'Doctor':
        className = 'info';
        break;
    }
    return `${prefix}${className}`;
  }
}

export default User;
