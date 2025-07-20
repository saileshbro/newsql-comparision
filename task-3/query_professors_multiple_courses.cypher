// Query: Professors who teach more than one course
MATCH (p:Professor)-[:TEACHES]->(c:Course)
WITH p, count(c) AS course_count
WHERE course_count > 1
RETURN p.name AS Professor, course_count
ORDER BY course_count DESC;