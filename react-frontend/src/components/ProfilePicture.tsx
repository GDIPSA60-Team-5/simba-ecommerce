import { User } from "../types/User";

interface ProfilePictureProps {
    user: User | null;
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
