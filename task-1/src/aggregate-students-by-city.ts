import { mongoClient } from "./db";

async function aggregateStudentsByCity() {
  const db = mongoClient.db("university");
  const students = db.collection("students");

  const pipeline = [
    {
      $group: {
        _id: "$address.city",
        student_count: { $sum: 1 },
        students: {
          $push: {
            student_id: "$student_id",
            name: { $concat: ["$name.first", " ", "$name.last"] },
            program: "$program",
          },
        },
      },
    },
    { $sort: { student_count: -1 } },
  ];

  const results = await students.aggregate(pipeline).toArray();
  console.log(`Found ${results.length} cities with students`);

  console.log("\n=== RAW AGGREGATION RESULTS ===");
  console.table(
    results.map((r) => ({
      city: r._id,
      student_count: r.student_count,
    })),
  );

  console.log("\n=== STUDENTS BY CITY ===");
  results.forEach((city) => {
    console.log(`\n${city._id} (${city.student_count} students):`);
    console.table(
      city.students.map((s) => ({
        student_id: s.student_id,
        name: s.name,
      })),
    );
  });
}

aggregateStudentsByCity()
  .catch(console.error)
  .finally(() => mongoClient.close());
