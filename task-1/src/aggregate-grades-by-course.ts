import { mongoClient } from "./db";

async function aggregateGradesByCourse() {
  const db = mongoClient.db("university");
  const students = db.collection("students");

  const pipeline = [
    { $unwind: "$courses" },
    {
      $group: {
        _id: { code: "$courses.code", grade: "$courses.grade" },
        count: { $sum: 1 },
      },
    },
    {
      $group: {
        _id: "$_id.code",
        grades: {
          $push: { grade: "$_id.grade", count: "$count" },
        },
      },
    },
    { $sort: { _id: 1 } },
  ];

  const results = await students.aggregate(pipeline).toArray();
  console.log(`Found ${results.length} courses`);
  console.table(results.map((r) => ({ course: r._id, grades: r.grades })));
}

aggregateGradesByCourse()
  .catch(console.error)
  .finally(() => mongoClient.close());
