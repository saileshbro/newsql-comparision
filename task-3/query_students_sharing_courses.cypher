// Query: Students sharing the same course
MATCH (s1:Student)-[:ENROLLED_IN]->(c:Course)<-[:ENROLLED_IN]-(s2:Student)
WHERE s1.student_id < s2.student_id
RETURN c.name AS Course, s1.name AS Student1, s2.name AS Student2
ORDER BY Course, Student1, Student2;