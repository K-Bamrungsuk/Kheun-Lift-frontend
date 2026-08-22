import { useState } from "react";
import { LogOut } from "lucide-react";
import { useNavigate, useOutletContext } from "react-router-dom";

import LiftDetailModal from "../components/LiftDetailModal";
import EditUserCard from "../components/profile/EditUserCard";
import PersonalRecords from "../components/profile/PersonalRecords";
import ProfileActivity from "../components/profile/ProfileActivity";
import ProfileHeader from "../components/profile/ProfileHeader";
import useProfile from "../hooks/useProfile";
import { useAuthStore } from "../stores/auth.store";

function Profile() {
  const navigate = useNavigate();
  const { refreshKey } = useOutletContext();

  const clearAuth = useAuthStore((state) => state.clearAuth);
  const { user, records, isLoading, isSaving, error, clearError, handleSave } =
    useProfile(refreshKey);

  const [selectedLift, setSelectedLift] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const openEdit = () => {
    clearError();
    setIsEditOpen(true);
  };

  const handleLogout = () => {
    clearAuth();
    navigate("/login", { replace: true });
  };

  return (
    <>
      <main className="mx-auto max-w-4xl space-y-4 px-4 pb-28 pt-6 md:px-8 md:pb-10 md:pt-10">
        {isLoading ? (
          <p className="text-zinc-400">Loading profile...</p>
        ) : user ? (
          <>
            <ProfileHeader user={user} onEdit={openEdit} />

            <PersonalRecords records={records} />

            <ProfileActivity records={records} onSelectLift={setSelectedLift} />

            <div className="flex justify-end border-t border-zinc-800 pt-4">
              <button
                type="button"
                onClick={handleLogout}
                className="flex items-center gap-2 rounded-xl border border-red-500/30 px-4 py-2 text-sm font-semibold text-red-400 transition hover:border-red-500/60 hover:bg-red-500/10 hover:text-red-300"
              >
                <LogOut size={17} />
                Log out
              </button>
            </div>
          </>
        ) : (
          <p className="text-red-400">{error}</p>
        )}

        {isEditOpen && (
          <EditUserCard
            user={user}
            onSave={handleSave}
            onClose={() => setIsEditOpen(false)}
            isSaving={isSaving}
            error={error}
          />
        )}
      </main>

      <LiftDetailModal
        key={selectedLift?.id ?? "empty"}
        lift={selectedLift}
        onClose={() => setSelectedLift(null)}
      />
    </>
  );
}

export default Profile;
