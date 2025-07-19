// Query: Professors and their students (indirect via courses)
MATCH (p:Professor)-[:TEACHES]->(c:Course)<-[:ENROLLED_IN]-(s:Student)
RETURN p.name AS Professor, c.name AS Course, s.name AS Student
ORDER BY Professor, Course, Student;