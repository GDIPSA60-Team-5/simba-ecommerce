export type Role = "USER" | "ADMIN"; 

export interface User {
  id: number;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  email: string;
  address?: string;
  dateOfBirth?: string;
  profilePictureUrl?: string;
  role: Role;
}
