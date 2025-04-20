// src/pages/user/Profile.tsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { User } from "../../types/User";
import { ProfilePicture } from "../../components/ProfilePicture";

const Profile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user?.id) return;
    axios
      .get<User>(`/api/users/${user.id}`)
      .then(({ data }) => setProfile(data))
      .catch(() => setError("Failed to load profile"))
      .finally(() => setLoading(false));
  }, [user]);

  if (loading) return <div className="p-6">Loading…</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;
  if (!profile) return null;

  return (
    <div className="w-3/4 mx-auto p-6">
      <div className="flex justify-between items-center mb-2 text-xs">
        <span className="font-semibold">PROFILE</span>
        <Link to="/account/orders" className="text-gray-700 hover:text-gray-900">
          My Orders →
        </Link>
        
      </div>
      <h1 className="text-3xl font-bold text-center mb-4">My Profile</h1>
      <div className="border border-gray-300 p-6 rounded-lg bg-white shadow">
        {profile.profilePictureUrl && (
          <div className="flex justify-center mb-6">
            <ProfilePicture user={user} height="h-24" />
          </div>
        )}
         <div className="profile-img justify-self-center">
            <ProfilePicture user={user} height={"h-30"}></ProfilePicture>
          </div>
        <table className="table-auto w-full  justify-self-center border-collapse">
          <tbody>
            <tr>
              <td className="py-2 font-semibold">Username</td>
              <td className="py-2">{profile.username}</td>
            </tr>
            <tr>
              <td className="py-2 font-semibold">Name</td>
              <td className="py-2">
                {profile.firstName} {profile.lastName}
              </td>
            </tr>
            <tr>
              <td className="py-2 font-semibold">Email</td>
              <td className="py-2">{profile.email}</td>
            </tr>
            {profile.phoneNumber && (
              <tr>
                <td className="py-2 font-semibold">Phone</td>
                <td className="py-2">{profile.phoneNumber}</td>
              </tr>
            )}
            {profile.address && (
              <tr>
                <td className="py-2 font-semibold">Address</td>
                <td className="py-2">{profile.address}</td>
              </tr>
            )}
            {profile.dateOfBirth && (
              <tr>
                <td className="py-2 font-semibold">Date of Birth</td>
                <td className="py-2">
                  {new Date(profile.dateOfBirth).toLocaleDateString()}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Profile;
