import { UserSessionDTO } from "../types/dto/UserSessionDTO";

interface ProfilePictureProps {
    user: UserSessionDTO | null;
    height?: string;
}

export const ProfilePicture = ({ user, height = "h-12" }: ProfilePictureProps) => {
    const profilePicture = user?.profilePictureUrl || "/images/pfp-placeholder.png";

    return (
        <img
            src={profilePicture}
            alt="Profile"
            className={`${height} aspect-square rounded-full object-cover`}
        />
    );
};
