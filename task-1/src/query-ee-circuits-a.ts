// query-ee-circuits-a.ts
// Find Electrical Engineering students with 'A' in Circuits (EE150)
// Run: bun run query-ee-circuits-a.ts

import { mongoClient } from "./db.ts";

async function main() {
  const students = mongoClient.db("university").collection("students");
  const result = await students
    .find({
      program: "Electrical Engineering",
      courses: { $elemMatch: { code: "EE150", grade: "A" } },
    })
    .toArray();
  console.log(
    `Found ${result.length} students who took Circuits (EE150) with 'A'`,
  );
  console.table(
    result.map((s) => ({
      student_id: s.student_id,
      name: s.name,
      program: s.program,
    })),
  );
}

main();
