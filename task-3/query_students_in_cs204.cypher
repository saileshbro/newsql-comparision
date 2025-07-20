// Query: Students enrolled in CS204
MATCH (s:Student)-[:ENROLLED_IN]->(c:Course {code: 'CS204'})
RETURN s.name AS Student, c.name AS Course;