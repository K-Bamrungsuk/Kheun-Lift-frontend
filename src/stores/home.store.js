import { create } from "zustand";
import { apiGetUser, apiLeaderboard, apiLiftRecords } from "../api/mainApi";

const getResponseData = (response) => response.data?.data ?? response.data;

export const useHomeStore = create((set) => ({
  user: null,
  activities: [],
  leaderboard: null,
  isLoading: false,
  error: "",

  fetchHomeData: async ({ exerciseId, weightClassId, gender }) => {
    try {
      set({ isLoading: true, error: "" });

      const [userResponse, liftsResponse, leaderboardResponse] =
        await Promise.all([
          apiGetUser(),
          apiLiftRecords(),
          apiLeaderboard(exerciseId, weightClassId, { gender }),
        ]);

      const userData = getResponseData(userResponse);
      const liftsData = getResponseData(liftsResponse);
      const leaderboardData = getResponseData(leaderboardResponse);

      const liftRecords =
        liftsData?.liftRecords ?? liftsData?.lifts ?? liftsData;

      set({
        user: userData?.user ?? userData,
        activities: Array.isArray(liftRecords) ? liftRecords.slice(0, 3) : [],
        leaderboard:
          leaderboardData?.leaderboard ??
          leaderboardData?.rankings ??
          leaderboardData,
        isLoading: false,
      });
    } catch (requestError) {
      set({
        error:
          requestError.response?.data?.message ?? "Unable to load home data.",
        isLoading: false,
      });
    }
  },
}));
