export type Role = "USER" | "ADMIN";

export interface UserSessionDTO {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    profilePictureUrl?: string;
    role: Role;
}
