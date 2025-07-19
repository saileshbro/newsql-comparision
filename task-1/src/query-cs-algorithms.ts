// query-cs-algorithms.ts
// Find Computer Science students who took Algorithms (CS204)
// Run: bun run query-cs-algorithms.ts

import { mongoClient } from "./db.ts";

async function main() {
  const students = mongoClient.db("university").collection("students");
  const result = await students
    .find({ program: "Computer Science", "courses.code": "CS204" })
    .toArray();
  console.log(`Found ${result.length} students who took Algorithms (CS204)`);
  console.table(
    result.map((s) => ({
      student_id: s.student_id,
      name: s.name,
      program: s.program,
    })),
  );
}

main();
