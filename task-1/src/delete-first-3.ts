// delete-first-3.ts
// Deletes the first 3 students by creation order (ascending created_at)
// Run: bun run delete-first-3.ts

import { mongoClient } from "./db.ts";

async function main() {
  const students = mongoClient.db("university").collection("students");

  // Fetch first 3 by created_at ascending
  const firstThree = await students
    .find({})
    .sort({ created_at: 1 })
    .limit(3)
    .toArray();
  if (firstThree.length === 0) {
    console.log("No students found to delete.");
    return;
  }
  console.log("Deleting the following students:");
  console.table(
    firstThree.map((s) => ({
      student_id: s.student_id,
      name: s.name,
      created_at: s.created_at,
    })),
  );

  // Delete by _id
  const ids = firstThree.map((s) => s._id);
  const { deletedCount } = await students.deleteMany({ _id: { $in: ids } });
  console.log(`Deleted ${deletedCount} students.`);
}

main();
