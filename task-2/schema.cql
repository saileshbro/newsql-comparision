-- Task 2: Wide-Column Database Schema for University Attendance System
-- Create keyspace
CREATE KEYSPACE IF NOT EXISTS university
WITH replication = {
    'class': 'SimpleStrategy',
    'replication_factor': 1
};

-- Use the keyspace
USE university;

-- Create attendance table
-- Partition key: student_id (groups attendance records by student)
-- Clustering keys: course_code, date (orders records within partition)
CREATE TABLE IF NOT EXISTS attendance (
    student_id text,
    course_code text,
    date date,
    present boolean,
    PRIMARY KEY (student_id, course_code, date)
) WITH CLUSTERING ORDER BY (course_code ASC, date DESC);

-- Create index for querying by course_code
CREATE INDEX IF NOT EXISTS idx_attendance_course
ON attendance (course_code);

-- Create index for querying by date
CREATE INDEX IF NOT EXISTS idx_attendance_date
ON attendance (date);

-- Display table schema
DESCRIBE TABLE attendance;