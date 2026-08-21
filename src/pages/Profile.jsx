import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import EditUserCard from "../components/profile/EditUserCard";
import PersonalRecords from "../components/profile/PersonalRecords";
import ProfileActivity from "../components/profile/ProfileActivity";
import ProfileHeader from "../components/profile/ProfileHeader";
import { apiEditUser, apiGetUser, apiLiftRecords } from "../api/mainApi";
import { useAuthStore } from "../stores/auth.store";

const getData = (response) => response.data?.data ?? response.data;

function Profile() {
  const token = useAuthStore((state) => state.token);

  const setAuth = useAuthStore((state) => state.setAuth);

  const [user, setUser] = useState(null);
  const [records, setRecords] = useState([]);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const [userResponse, liftsResponse] = await Promise.all([
          apiGetUser(),
          apiLiftRecords(),
        ]);

        const userData = getData(userResponse);
        const liftsData = getData(liftsResponse);

        setUser(userData?.user ?? userData);

        setRecords(
          liftsData?.liftRecords ?? liftsData?.lifts ?? liftsData ?? [],
        );
      } catch (err) {
        setError(err.response?.data?.message ?? "Unable to load profile.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const hdlSave = async (body) => {
    try {
      setIsSaving(true);
      setError("");

      await apiEditUser(body);

      const response = await apiGetUser();
      const data = getData(response);
      const updatedUser = data?.user ?? data;

      setUser(updatedUser);
      setAuth(token, updatedUser);

      return true;
    } catch (err) {
      setError(err.response?.data?.message ?? "Unable to update profile.");

      return false;
    } finally {
      setIsSaving(false);
    }
  };

  const openEdit = () => {
    setError("");
    setIsEditOpen(true);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar activePage="Profile" />

      <main className="mx-auto max-w-4xl space-y-4 px-4 pb-28 pt-6 md:px-8 md:pb-10 md:pt-10">
        {isLoading ? (
          <p className="text-zinc-400">Loading profile...</p>
        ) : user ? (
          <>
            <ProfileHeader user={user} onEdit={openEdit} />

            <PersonalRecords records={records} />

            <ProfileActivity records={records} />
          </>
        ) : (
          <p className="text-red-400">{error}</p>
        )}
      </main>

      {isEditOpen && (
        <EditUserCard
          user={user}
          onSave={hdlSave}
          onClose={() => setIsEditOpen(false)}
          isSaving={isSaving}
          error={error}
        />
      )}
    </div>
  );
}

export default Profile;
