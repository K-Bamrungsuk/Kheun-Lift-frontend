import { useState } from "react";
import { Pencil } from "lucide-react";

import { apiEditLiftRecord } from "../api/mainApi";

function EditLiftDetail({ lift, canEdit }) {
  const [caption, setCaption] = useState(lift.caption ?? "");
  const [draft, setDraft] = useState(caption);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  const handleSave = async () => {
    try {
      setIsSaving(true);
      setError("");

      const newCaption = draft.trim();

      await apiEditLiftRecord(lift.id, {
        caption: newCaption,
      });

      setCaption(newCaption);
      setIsEditing(false);
    } catch (err) {
      setError(err.response?.data?.message ?? "Unable to update caption.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setDraft(caption);
    setError("");
    setIsEditing(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-xs text-zinc-500">Caption</p>

        {canEdit && !isEditing && (
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-1 text-xs font-bold text-yellow-400 hover:text-yellow-300"
          >
            <Pencil size={13} />
            Edit
          </button>
        )}
      </div>

      {isEditing ? (
        <>
          <input
            type="text"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder="Write a caption..."
            className="mt-3 w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-4 text-sm text-white outline-none focus:border-yellow-400"
          />

          {error && <p className="mt-2 text-xs text-red-400">{error}</p>}

          <div className="mt-3 flex justify-end gap-2">
            <button
              type="button"
              onClick={handleCancel}
              disabled={isSaving}
              className="rounded-xl border border-zinc-700 px-3 py-2 text-xs font-bold text-zinc-300 hover:border-zinc-500 disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleSave}
              disabled={isSaving}
              className="rounded-xl bg-yellow-400 px-3 py-2 text-xs font-black text-black hover:bg-yellow-300 disabled:opacity-50"
            >
              {isSaving ? "Saving..." : "Save"}
            </button>
          </div>
        </>
      ) : (
        <p className="mt-1 text-sm text-zinc-200">{caption || "No caption"}</p>
      )}
    </div>
  );
}

export default EditLiftDetail;
