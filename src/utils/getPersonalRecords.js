const exercises = ["Bench Press", "Squat", "Deadlift"];

export const getPersonalRecords = (records = []) =>
  exercises.map((name) => ({
    name,

    record: records
      .filter(
        (item) =>
          item.status === "verified" &&
          item.exercise?.name?.toLowerCase() === name.toLowerCase(),
      )
      .sort((a, b) => b.weight - a.weight || b.reps - a.reps)[0],
  }));
