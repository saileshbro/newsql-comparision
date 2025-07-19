import { mongoClient } from "./db";
import students from "./insert_students.json";

const res = await mongoClient
  .db("university")
  .collection("students")
  .insertMany(students);
console.log("Inserted", res.insertedCount, "students");
