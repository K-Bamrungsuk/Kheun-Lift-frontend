import { useEffect, useState } from "react";

import { apiEditUser, apiGetUser, apiLiftRecords } from "../api/mainApi";
import { useAuthStore } from "../stores/auth.store";

const getData = (response) => response.data?.data ?? response.data;

function useProfile(refreshKey) {
  const token = useAuthStore((state) => state.token);
  const setAuth = useAuthStore((state) => state.setAuth);

  const [user, setUser] = useState(null);
  const [records, setRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setError("");

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
  }, [refreshKey]);

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

  return {
    user,
    records,
    isLoading,
    isSaving,
    error,
    clearError: () => setError(""),
    hdlSave,
  };
}

export default useProfile;
