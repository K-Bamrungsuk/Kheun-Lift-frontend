import { useEffect, useState } from "react";

import {
  apiGetExercises,
  apiGetUser,
  apiGetWeightClasses,
  apiLeaderboard,
} from "../api/mainApi";

function useLeaderboard() {
  const [user, setUser] = useState(null);
  const [gender, setGender] = useState("");
  const [exercises, setExercises] = useState([]);
  const [weightClasses, setWeightClasses] = useState([]);
  const [selectedWeightClass, setSelectedWeightClass] = useState(null);
  const [rankings, setRankings] = useState({});
  const [expanded, setExpanded] = useState({});
  const [selectedLift, setSelectedLift] = useState(null);

  const [isPageLoading, setIsPageLoading] = useState(true);
  const [isWeightClassesLoading, setIsWeightClassesLoading] = useState(false);
  const [isRankingsLoading, setIsRankingsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setIsPageLoading(true);
        setError("");

        const [userResponse, exercisesResponse] = await Promise.all([
          apiGetUser(),
          apiGetExercises(),
        ]);

        const userData = userResponse.data;
        const exercisesData = exercisesResponse.data?.exercises ?? [];

        setUser(userData);
        setGender(userData.gender ?? "");
        setExercises(exercisesData);
      } catch (requestError) {
        setError(
          requestError.response?.data?.message ??
            "Unable to load leaderboard data.",
        );
      } finally {
        setIsPageLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  useEffect(() => {
    if (!gender) return;

    const fetchWeightClasses = async () => {
      try {
        setIsWeightClassesLoading(true);
        setError("");

        const response = await apiGetWeightClasses(gender);

        setWeightClasses(response.data?.data ?? []);
      } catch (requestError) {
        setWeightClasses([]);

        setError(
          requestError.response?.data?.message ??
            "Unable to load weight classes.",
        );
      } finally {
        setIsWeightClassesLoading(false);
      }
    };

    fetchWeightClasses();
  }, [gender]);

  const handleGenderChange = (newGender) => {
    if (newGender === gender) return;

    setGender(newGender);
    setSelectedWeightClass(null);
    setRankings({});
    setExpanded({});
    setSelectedLift(null);
  };

  const handleSelectWeightClass = async (weightClass) => {
    try {
      setSelectedWeightClass(weightClass);
      setIsRankingsLoading(true);
      setRankings({});
      setExpanded({});
      setError("");

      const responses = await Promise.all(
        exercises.map((exercise) =>
          apiLeaderboard(exercise.id, weightClass.id, {
            gender,
          }),
        ),
      );

      const nextRankings = {};

      exercises.forEach((exercise, index) => {
        nextRankings[exercise.id] = Array.isArray(responses[index].data)
          ? responses[index].data
          : [];
      });

      setRankings(nextRankings);
    } catch (requestError) {
      setError(
        requestError.response?.data?.message ?? "Unable to load rankings.",
      );
    } finally {
      setIsRankingsLoading(false);
    }
  };

  const handleBack = () => {
    setSelectedWeightClass(null);
    setRankings({});
    setExpanded({});
    setSelectedLift(null);
    setError("");
  };

  const handleToggleExpanded = (exerciseId) => {
    setExpanded((current) => ({
      ...current,
      [exerciseId]: !current[exerciseId],
    }));
  };

  return {
    user,
    gender,
    exercises,
    weightClasses,
    selectedWeightClass,
    rankings,
    expanded,
    selectedLift,
    isPageLoading,
    isWeightClassesLoading,
    isRankingsLoading,
    error,
    setSelectedLift,
    handleGenderChange,
    handleSelectWeightClass,
    handleBack,
    handleToggleExpanded,
  };
}

export default useLeaderboard;
