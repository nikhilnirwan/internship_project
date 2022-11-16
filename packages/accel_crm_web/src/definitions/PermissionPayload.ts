interface PermissionPayload {
  id: number;
  name: string;
  key: string;
  description: string;
  created_at: string;
  updated_at: string;
  user_permission?: {
    created_at: string;
  };
}

export default PermissionPayload;
