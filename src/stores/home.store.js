import { create } from "zustand";
import {
  apiGetUser,
  apiLiftRecords,
  apiRandomLeaderboard,
} from "../api/mainApi";

const getResponseData = (response) =>
  response.data?.data ?? response.data;

export const useHomeStore = create((set) => ({
  user: null,
  activities: [],
  leaderboard: [],
  isLoading: false,
  error: "",

  fetchHomeData: async () => {
    try {
      set({
        isLoading: true,
        error: "",
      });

      const [
        userResponse,
        liftsResponse,
        leaderboardResponse,
      ] = await Promise.all([
        apiGetUser(),
        apiLiftRecords(),
        apiRandomLeaderboard(),
      ]);

      const userData = getResponseData(userResponse);
      const liftsData = getResponseData(liftsResponse);
      const leaderboardData =
        getResponseData(leaderboardResponse);

      const liftRecords =
        liftsData?.liftRecords ??
        liftsData?.lifts ??
        liftsData;

      const randomLeaderboard =
        leaderboardData?.leaderboards ?? [];

      set({
        user: userData?.user ?? userData,

        activities: Array.isArray(liftRecords)
          ? liftRecords.slice(0, 3)
          : [],

        leaderboard: Array.isArray(randomLeaderboard)
          ? randomLeaderboard
          : [],

        isLoading: false,
      });
    } catch (requestError) {
      console.log(
        "Fetch home data error:",
        requestError.response?.data,
      );

      set({
        leaderboard: [],
        error:
          requestError.response?.data?.message ??
          "Unable to load home data.",
        isLoading: false,
      });
    }
  },
}));