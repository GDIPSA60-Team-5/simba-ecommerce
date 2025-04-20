// src/pages/user/Profile.tsx
import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { User } from "../../types/User";
import { ProfilePicture } from "../../components/ProfilePicture";

export default function Profile() {
  const { user } = useAuth();

  const [profile, setProfile] = useState<User | null>(null);
  const [formData, setFormData] = useState<Partial<User>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (!user?.id) return;
    axios
      .get<User>(`/api/users/${user.id}`)
      .then(({ data }) => {
        setProfile(data);
        setFormData(data);
      })
      .catch(() => setError("Failed to load profile"))
      .finally(() => setLoading(false));
  }, [user]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    if (!profile) return;
    try {
      const payload = { ...formData, profilePictureUrl: profile.profilePictureUrl };
      await axios.put(`/api/users/${profile.id}`, payload);
      setProfile(prev => ({ ...prev!, ...payload }));
      setEditMode(false);
    } catch (err: any) {
      console.error(err.response || err);
      setError(err.response?.data?.message || "Failed to save changes");
    }
  };

  if (loading) return <div className="p-6">Loading…</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;
  if (!profile) return null;

  return (
    <div className="w-3/4 mx-auto p-6">
      <div className="flex justify-between items-center mb-4">
        <span className="text-xs font-semibold">PROFILE</span>
        <div className="flex items-center space-x-2">
          <Link to="/account/orders" className="text-gray-600 hover:text-gray-800">
            My Orders →
          </Link>
        </div>
      </div>

      <h1 className="text-3xl font-bold text-center mb-6">My Profile</h1>

      <div className="border border-gray-400 p-6 rounded-lg bg-gray-50 shadow-md">
        {profile.profilePictureUrl && (
          <div className="flex justify-center mb-6">
            <ProfilePicture user={profile} height="h-24" />
          </div>
        )}

        <div className="flex justify-end items-center space-x-2 mb-4">
          {!editMode ? (
            <button
              onClick={() => setEditMode(true)}
              className="px-3 py-1 text-sm bg-gray-800 text-white rounded hover:bg-black"
            >
              Edit
            </button>
          ) : (
            <>
              <button
                onClick={handleSave}
                className="px-2 py-1 text-xs bg-gray-800 text-white rounded hover:bg-black"
              >
                Save
              </button>
              <button
                onClick={() => {
                  setFormData(profile);
                  setEditMode(false);
                }}
                className="px-2 py-1 text-xs bg-white text-gray-800 rounded hover:bg-gray-100"
              >
                Cancel
              </button>
            </>
          )}
        </div>

        <form onSubmit={handleSave}>
          <table className="table-auto w-full border-collapse">
            <tbody>
              <tr>
                <td className="py-2 font-semibold">Username</td>
                <td className="py-2">
                  {editMode ? (
                    <input
                      name="username"
                      value={formData.username || ""}
                      onChange={handleChange}
                      className="border px-2 py-1 rounded w-full"
                    />
                  ) : (
                    profile.username
                  )}
                </td>
              </tr>
              <tr>
                <td className="py-2 font-semibold">Name</td>
                <td className="py-2">
                  {editMode ? (
                    <div className="flex space-x-2">
                      <input
                        name="firstName"
                        value={formData.firstName || ""}
                        onChange={handleChange}
                        className="border px-2 py-1 rounded w-1/2"
                      />
                      <input
                        name="lastName"
                        value={formData.lastName || ""}
                        onChange={handleChange}
                        className="border px-2 py-1 rounded w-1/2"
                      />
                    </div>
                  ) : (
                    `${profile.firstName} ${profile.lastName}`
                  )}
                </td>
              </tr>
              <tr>
                <td className="py-2 font-semibold">Email</td>
                <td className="py-2">
                  {editMode ? (
                    <input
                      name="email"
                      value={formData.email || ""}
                      onChange={handleChange}
                      className="border px-2 py-1 rounded w-full"
                    />
                  ) : (
                    profile.email
                  )}
                </td>
              </tr>
              <tr>
                <td className="py-2 font-semibold">Phone</td>
                <td className="py-2">
                  {editMode ? (
                    <input
                      name="phoneNumber"
                      value={formData.phoneNumber || ""}
                      onChange={handleChange}
                      className="border px-2 py-1 rounded w-full"
                    />
                  ) : (
                    profile.phoneNumber
                  )}
                </td>
              </tr>
              <tr>
                <td className="py-2 font-semibold">Address</td>
                <td className="py-2">
                  {editMode ? (
                    <input
                      name="address"
                      value={formData.address || ""}
                      onChange={handleChange}
                      className="border px-2 py-1 rounded w-full"
                    />
                  ) : (
                    profile.address
                  )}
                </td>
              </tr>
              <tr>
                <td className="py-2 font-semibold">Date of Birth</td>
                <td className="py-2">
                  {editMode ? (
                    <input
                      name="dateOfBirth"
                      type="date"
                      value={formData.dateOfBirth?.slice(0, 10) || ""}
                      onChange={handleChange}
                      className="border px-2 py-1 rounded"
                    />
                  ) : (
                    new Date(profile.dateOfBirth!).toLocaleDateString()
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    </div>
  );
}
