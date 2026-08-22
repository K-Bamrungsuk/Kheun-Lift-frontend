import { useEffect, useState } from "react";

import { apiCreateLiftRecord, apiGetExercises } from "../api/mainApi";

function useSubmitLift(onSuccess) {
  const [exercises, setExercises] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await apiGetExercises();
        const data = response.data?.data ?? response.data;
        const list = data?.exercises ?? data;

        setExercises(Array.isArray(list) ? list : []);
      } catch (err) {
        setError(err.response?.data?.message ?? "Unable to load exercises.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchExercises();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const form = new FormData(event.currentTarget);
      const caption = form.get("caption").trim();
      const videoUrl = form.get("videoUrl").trim();

      const body = {
        exerciseId: Number(form.get("exerciseId")),
        weight: Number(form.get("weight")),
        reps: Number(form.get("reps")),
        ...(caption && { caption }),
        ...(videoUrl && { videoUrl }),
      };

      const response = await apiCreateLiftRecord(body);

      await onSuccess?.(response.data?.data);
    } catch (err) {
      setError(err.response?.data?.message ?? "Unable to submit lift.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const placeholder = isLoading
    ? "Loading exercises..."
    : exercises.length
      ? "Select exercise"
      : "No exercises available";

  return {
    exercises,
    isLoading,
    isSubmitting,
    error,
    placeholder,
    handleSubmit,
  };
}

export default useSubmitLift;
