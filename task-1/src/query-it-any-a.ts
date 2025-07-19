// query-it-any-a.ts
// Find Information Technology students with any 'A' grade course
// Run: bun run query-it-any-a.ts

import { mongoClient } from "./db.ts";

async function main() {
  const students = mongoClient.db("university").collection("students");
  const result = await students
    .find({ program: "Information Technology", "courses.grade": "A" })
    .toArray();
  console.log(
    `Found ${result.length} students who took any 'A' grade course in Information Technology`,
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
