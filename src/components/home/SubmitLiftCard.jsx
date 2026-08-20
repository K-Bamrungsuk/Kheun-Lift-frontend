import { useEffect, useState } from "react";
import { Dumbbell, X } from "lucide-react";

import { apiCreateLiftRecord, apiGetExercises } from "../../api/mainApi";

function SubmitLiftCard({ onClose, onSuccess }) {
  const [exercises, setExercises] = useState([]);
  const [isLoadingExercises, setIsLoadingExercises] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchExercises() {
      try {
        setIsLoadingExercises(true);
        setError("");

        const response = await apiGetExercises();

        console.log("Exercises response:", response.data);

        const responseData = response.data?.data ?? response.data;

        const exerciseList = Array.isArray(responseData)
          ? responseData
          : (responseData?.exercises ?? []);

        console.log("Exercise list:", exerciseList);

        setExercises(exerciseList);
      } catch (requestError) {
        console.log("Exercise error:", requestError.response?.data);

        setError(
          requestError.response?.data?.message ?? "Unable to load exercises.",
        );
      } finally {
        setIsLoadingExercises(false);
      }
    }

    fetchExercises();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setIsSubmitting(true);
      setError("");

      const formData = new FormData(event.currentTarget);

      const caption = formData.get("caption")?.trim();
      const videoUrl = formData.get("videoUrl")?.trim();

      const body = {
        exerciseId: Number(formData.get("exerciseId")),
        weight: Number(formData.get("weight")),
        reps: Number(formData.get("reps")),

        ...(caption && {
          caption,
        }),

        ...(videoUrl && {
          videoUrl,
        }),
      };

      const response = await apiCreateLiftRecord(body);

      await onSuccess?.(response.data?.data ?? response.data);
    } catch (requestError) {
      setError(
        requestError.response?.data?.message ?? "Unable to submit lift.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] grid place-items-center bg-black/80 px-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="submit-lift-title"
        onClick={(event) => event.stopPropagation()}
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl border border-zinc-800 bg-zinc-950 p-5 shadow-2xl md:p-8"
      >
        <div className="mb-6 flex items-center justify-between border-b border-zinc-800 pb-5">
          <div className="flex items-center gap-3">
            <span className="rounded-xl bg-yellow-400 p-3 text-black">
              <Dumbbell size={22} />
            </span>

            <div>
              <p className="text-xs uppercase tracking-widest text-yellow-400">
                New record
              </p>

              <h2 id="submit-lift-title" className="text-xl font-black">
                Submit Lift
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            disabled={isSubmitting}
            className="rounded-xl p-2 text-zinc-500 hover:bg-zinc-900 hover:text-white"
          >
            <X size={22} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <label className="block">
            <span className="mb-2 block text-sm font-bold">Exercise</span>

            <select
              name="exerciseId"
              required
              defaultValue=""
              disabled={isLoadingExercises}
              className="w-full rounded-2xl border border-zinc-800 bg-black px-4 py-3 text-white outline-none focus:border-yellow-400"
            >
              <option value="" disabled className="bg-zinc-950 text-zinc-500">
                {isLoadingExercises
                  ? "Loading exercises..."
                  : exercises.length === 0
                    ? "No exercises available"
                    : "Select exercise"}
              </option>

              {exercises.map((exercise) => (
                <option
                  key={exercise.id}
                  value={exercise.id}
                  className="bg-zinc-950 text-white"
                >
                  {exercise.name}
                </option>
              ))}
            </select>
          </label>

          <div className="grid grid-cols-2 gap-4">
            <label className="block">
              <span className="mb-2 block text-sm font-bold">Weight (kg)</span>

              <input
                type="number"
                name="weight"
                min="0.1"
                step="0.1"
                required
                placeholder="120"
                className="w-full rounded-2xl border border-zinc-800 bg-black px-4 py-3 outline-none placeholder:text-zinc-700 focus:border-yellow-400"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-bold">Reps</span>

              <input
                type="number"
                name="reps"
                min="1"
                step="1"
                required
                placeholder="4"
                className="w-full rounded-2xl border border-zinc-800 bg-black px-4 py-3 outline-none placeholder:text-zinc-700 focus:border-yellow-400"
              />
            </label>
          </div>

          <label className="block">
            <span className="mb-2 block text-sm font-bold">
              Caption
              <span className="ml-2 font-normal text-zinc-500">Optional</span>
            </span>

            <textarea
              name="caption"
              rows="3"
              maxLength="300"
              placeholder="Tell us about your lift..."
              className="w-full resize-none rounded-2xl border border-zinc-800 bg-black px-4 py-3 outline-none placeholder:text-zinc-700 focus:border-yellow-400"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-bold">
              Video URL
              <span className="ml-2 font-normal text-zinc-500">Optional</span>
            </span>

            <input
              type="url"
              name="videoUrl"
              placeholder="https://youtube.com/..."
              className="w-full rounded-2xl border border-zinc-800 bg-black px-4 py-3 outline-none placeholder:text-zinc-700 focus:border-yellow-400"
            />
          </label>

          {error && (
            <p className="rounded-2xl border border-red-900/50 bg-red-950/30 px-4 py-3 text-sm text-red-400">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={
              isSubmitting || isLoadingExercises || exercises.length === 0
            }
            className="w-full rounded-2xl bg-yellow-400 py-4 font-black text-black hover:bg-yellow-300 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? "Submitting..." : "Submit Lift"}
          </button>
        </form>
      </section>
    </div>
  );
}

export default SubmitLiftCard;
