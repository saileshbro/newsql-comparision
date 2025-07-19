// Query: All professors and their courses
MATCH (p:Professor)-[:TEACHES]->(c:Course)
RETURN p.name AS Professor, c.name AS Course
ORDER BY p.name, c.name;