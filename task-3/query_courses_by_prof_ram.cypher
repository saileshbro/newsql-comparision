// Query: Courses taught by Dr. Ram Prasad
MATCH (p:Professor {name: 'Dr. Ram Prasad'})-[:TEACHES]->(c:Course)
RETURN p.name AS Professor, c.name AS Course;