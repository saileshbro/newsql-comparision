import { db } from "./db";
import students from "./insert_students.json";

const res = await db.collection("students").insertMany(students);
console.log("Inserted", res.insertedCount, "students");