interface User {
  id: string;
  name: string;
  username: string;
  accessKey: string;
  companyId: string;
  imageUrl?: string;
  additionalInfo?: string;
  role: UserRole
}

interface UserRole {
  id: string;
  name: string;
  access: Role[];
}