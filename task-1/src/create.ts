// create.ts
// Inserts a single student document into the students collection and prints the result.
// Run: bun run create.ts

import { mongoClient } from "./db.ts";

async function main() {
  const students = mongoClient.db("university").collection("students");

  const newStudent = {
    student_id: 101,
    name: { first: "Arjun", last: "Karki" },
    program: "Information Technology",
    year: 2,
    address: { street: "Putalisadak", city: "Kathmandu", country: "Nepal" },
    courses: [
      { code: "IT100", title: "Programming Fundamentals", grade: "A" },
      { code: "IT220", title: "Networking", grade: "A-" },
    ],
    contacts: [
      { type: "mobile", value: "9801234567" },
      { type: "email", value: "arjun.karki@example.com" },
    ],
    guardian: {
      name: "Sita Karki",
      relation: "mother",
      contact: "9807654321",
    },
    scholarships: [{ name: "IT Excellence", amount: 15000, year: 2024 }],
    attendance: [
      { date: "2024-06-01", status: "present" },
      { date: "2024-06-02", status: "present" },
    ],
    extra_curriculars: [
      { activity: "Hackathon", level: "National", year: 2023 },
    ],
    profile_photo_url: "https://randomuser.me/api/portraits/men/50.jpg",
    enrollment_status: "active",
    notes: ["Participated in national hackathon.", "Excellent in networking."],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  const { acknowledged, insertedId } = await students.insertOne(newStudent);
  console.log("Inserted?", acknowledged, "ID:", insertedId);
  const doc = await students.findOne({ _id: insertedId });
  console.log(JSON.stringify(doc, null, 2));
}

main();
