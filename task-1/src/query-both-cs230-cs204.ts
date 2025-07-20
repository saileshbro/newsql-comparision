// query-both-cs230-cs204.ts
// Find students who took both Databases (CS230) and Algorithms (CS204)
// Run: bun run query-both-cs230-cs204.ts

import { mongoClient } from "./db.ts";

async function main() {
  const students = mongoClient.db("university").collection("students");
  const result = await students
    .find({ "courses.code": { $all: ["CS230", "CS204"] } })
    .toArray();
  console.log(`Found ${result.length} students who took both CS230 and CS204`);
  console.table(
    result.map((s) => ({
      student_id: s.student_id,
      name: s.name,
      program: s.program,
    })),
  );
}

main();
