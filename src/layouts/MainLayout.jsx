import { useState } from "react";
import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar";
import SubmitLiftModal from "../components/SubmitLiftModal";

function MainLayout() {
  const [isSubmitOpen, setIsSubmitOpen] = useState(false);

  const [refreshKey, setRefreshKey] = useState(0);

  const handleLiftCreated = () => {
    setIsSubmitOpen(false);
    setRefreshKey((current) => current + 1);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar onSubmitLift={() => setIsSubmitOpen(true)} />

      <Outlet
        context={{
          refreshKey,
          openSubmitLift: () => setIsSubmitOpen(true),
        }}
      />

      {isSubmitOpen && (
        <SubmitLiftModal
          onClose={() => setIsSubmitOpen(false)}
          onSuccess={handleLiftCreated}
        />
      )}
    </div>
  );
}

export default MainLayout;
