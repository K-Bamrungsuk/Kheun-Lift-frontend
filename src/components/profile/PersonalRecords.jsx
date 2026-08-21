import { Dumbbell } from "lucide-react";
import { getPersonalRecords } from "../../utils/getPersonalRecords";

function PersonalRecords({ records = [] }) {
  const personalRecords = getPersonalRecords(records);

  return (
    <section className="rounded-3xl border border-zinc-800 bg-zinc-950 p-5">
      <h2 className="mb-3 font-bold">Personal Records</h2>

      <div className="grid gap-3 sm:grid-cols-3">
        {personalRecords.map(({ name, record }) => (
          <div key={name} className="rounded-2xl bg-black p-4">
            <Dumbbell size={18} className="mb-3 text-yellow-400" />

            <p className="text-xs text-zinc-500">{name}</p>

            <p className="mt-1 text-xl font-black">
              {record ? `${record.weight} kg` : "-"}
            </p>

            {record && (
              <p className="text-xs text-zinc-500">{record.reps} reps</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export default PersonalRecords;
