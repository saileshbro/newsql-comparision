// Query: All students and their courses
MATCH (s:Student)-[:ENROLLED_IN]->(c:Course)
RETURN s.name AS Student, c.name AS Course
ORDER BY s.name, c.name;