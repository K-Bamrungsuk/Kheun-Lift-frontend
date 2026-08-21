import { useEffect, useState } from "react";
import { Dumbbell, X } from "lucide-react";
import { apiCreateLiftRecord, apiGetExercises } from "../api/mainApi";

const inputClass =
  "w-full rounded-2xl border border-zinc-800 bg-black px-4 py-3 outline-none focus:border-yellow-400";

function SubmitLiftCard({ onClose, onSuccess }) {
  const [exercises, setExercises] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await apiGetExercises();

        const data = response.data?.data ?? response.data;

        const exerciseList = data?.exercises ?? data;

        setExercises(Array.isArray(exerciseList) ? exerciseList : []);
      } catch (err) {
        setError(err.response?.data?.message ?? "Unable to load exercises.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchExercises();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const form = new FormData(e.currentTarget);

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

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 grid place-items-center bg-black/80 px-4 backdrop-blur-sm"
    >
      <section
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl border border-zinc-800 bg-zinc-950 p-5 shadow-2xl md:p-8"
      >
        <header className="mb-6 flex items-center justify-between border-b border-zinc-800 pb-5">
          <div className="flex items-center gap-3">
            <span className="rounded-xl bg-yellow-400 p-3 text-black">
              <Dumbbell size={22} />
            </span>

            <div>
              <p className="text-xs uppercase tracking-widest text-yellow-400">
                New record
              </p>

              <h2 className="text-xl font-black">Submit Lift</h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            aria-label="Close"
            className="p-2 text-zinc-500 hover:text-white"
          >
            <X size={22} />
          </button>
        </header>

        <form onSubmit={handleSubmit} className="space-y-5">
          <label className="block">
            <span className="mb-2 block text-sm font-bold">Main Lift</span>

            <select
              name="exerciseId"
              required
              defaultValue=""
              disabled={isLoading}
              className={`${inputClass} appearance-none text-zinc-700 valid:text-white`}
            >
              <option value="" disabled>
                {placeholder}
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
            <label>
              <span className="mb-2 block text-sm font-bold">Weight (kg)</span>

              <input
                type="text"
                name="weight"
                inputMode="decimal"
                pattern="[0-9]+([.][0-9]+)?"
                placeholder="e.g. 100.5"
                required
                className={inputClass}
              />
            </label>

            <label>
              <span className="mb-2 block text-sm font-bold">Reps</span>

              <input
                type="text"
                name="reps"
                inputMode="numeric"
                pattern="[1-9][0-9]*"
                placeholder="e.g. 5"
                required
                className={inputClass}
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
              className={`${inputClass} resize-none placeholder:text-zinc-700`}
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-bold">
              Video URL
              <span className="ml-2 font-normal text-zinc-500">
                Required to verify
              </span>
            </span>

            <input
              type="url"
              name="videoUrl"
              placeholder="https://youtube.com/..."
              required
              className={`${inputClass} placeholder:text-zinc-700`}
            />
          </label>

          {error && (
            <p className="rounded-2xl border border-red-900/50 bg-red-950/30 px-4 py-3 text-sm text-red-400">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting || isLoading || exercises.length === 0}
            className="w-full rounded-2xl bg-yellow-400 py-4 font-black text-black disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? "Submitting..." : "Submit Lift"}
          </button>
        </form>
      </section>
    </div>
  );
}

export default SubmitLiftCard;
