// ENROLLED_IN relationships
MATCH (s:Student {student_id: 'S1'}), (c:Course {code: 'CS204'})
CREATE (s)-[:ENROLLED_IN]->(c);
MATCH (s:Student {student_id: 'S2'}), (c:Course {code: 'CS204'})
CREATE (s)-[:ENROLLED_IN]->(c);
MATCH (s:Student {student_id: 'S3'}), (c:Course {code: 'EE101'})
CREATE (s)-[:ENROLLED_IN]->(c);
MATCH (s:Student {student_id: 'S4'}), (c:Course {code: 'CS230'})
CREATE (s)-[:ENROLLED_IN]->(c);

// TEACHES relationships
MATCH (p:Professor {professor_id: 'P1'}), (c:Course {code: 'CS204'})
CREATE (p)-[:TEACHES]->(c);
MATCH (p:Professor {professor_id: 'P1'}), (c:Course {code: 'CS230'})
CREATE (p)-[:TEACHES]->(c);
MATCH (p:Professor {professor_id: 'P2'}), (c:Course {code: 'EE101'})
CREATE (p)-[:TEACHES]->(c);