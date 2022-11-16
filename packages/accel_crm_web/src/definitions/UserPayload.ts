import { UserStatus, PermissionPayload } from '../definitions';

interface UserPayload {
  id: number;
  name: string;
  email: string;
  password: string;
  status: UserStatus;
  displayPicture: string | null;
  created_at: string;
  updated_at: string;
  designation?: any;
  role: string | null;
  account_user?: {
    is_admin: boolean;
  };
  permissions: Array<PermissionPayload>;

  is_ev_subscriber: boolean;
  title?: string;
  first_name?: string;
  last_name?: string;
  country_code?: string;
  phone?: string;
  job_title?: string;
}

export default UserPayload;
