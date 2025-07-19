import { mongoClient } from "./db.ts";

async function main() {
  const students = mongoClient.db("university").collection("students");

  const initialCount = await students.countDocuments({
    university: "Kathmandu University",
  });
  console.log(
    `Initial count of students with university "Kathmandu University": ${initialCount}`,
  );

  console.log("Updating all students to add university field");
  const updateResult = await students.updateMany(
    {},
    {
      $set: {
        university: "Kathmandu University",
        updated_at: new Date().toISOString(),
      },
    },
  );

  console.log("Updated", updateResult.modifiedCount, "students");

  const finalCount = await students.countDocuments({
    university: "Kathmandu University",
  });
  console.log(
    `Final count of students with university "Kathmandu University": ${finalCount}`,
  );
}

main();
