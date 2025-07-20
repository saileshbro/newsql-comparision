
import { types } from 'cassandra-driver';
// Sample attendance data
export const attendanceData = [
  // Student CS001 attendance
  { student_id: 'CS001', course_code: 'CS101', date: types.LocalDate.fromString('2024-01-15'), present: true },
  { student_id: 'CS001', course_code: 'CS101', date: types.LocalDate.fromString('2024-01-16'), present: false },
  { student_id: 'CS001', course_code: 'CS101', date: types.LocalDate.fromString('2024-01-17'), present: true },
  { student_id: 'CS001', course_code: 'CS102', date: types.LocalDate.fromString('2024-01-15'), present: true },
  { student_id: 'CS001', course_code: 'CS102', date: types.LocalDate.fromString('2024-01-16'), present: true },

  // Student CS002 attendance
  { student_id: 'CS002', course_code: 'CS101', date: types.LocalDate.fromString('2024-01-15'), present: false },
  { student_id: 'CS002', course_code: 'CS101', date: types.LocalDate.fromString('2024-01-16'), present: true },
  { student_id: 'CS002', course_code: 'CS101', date: types.LocalDate.fromString('2024-01-17'), present: true },
  { student_id: 'CS002', course_code: 'CS103', date: types.LocalDate.fromString('2024-01-15'), present: true },
  { student_id: 'CS002', course_code: 'CS103', date: types.LocalDate.fromString('2024-01-16'), present: false },

  // Student IT001 attendance
  { student_id: 'IT001', course_code: 'IT201', date: types.LocalDate.fromString('2024-01-15'), present: true },
  { student_id: 'IT001', course_code: 'IT201', date: types.LocalDate.fromString('2024-01-16'), present: true },
  { student_id: 'IT001', course_code: 'IT202', date: types.LocalDate.fromString('2024-01-15'), present: false },
  { student_id: 'IT001', course_code: 'IT202', date: types.LocalDate.fromString('2024-01-16'), present: true },

  // Student EE001 attendance
  { student_id: 'EE001', course_code: 'EE301', date: types.LocalDate.fromString('2024-01-15'), present: true },
  { student_id: 'EE001', course_code: 'EE301', date: types.LocalDate.fromString('2024-01-16'), present: true },
  { student_id: 'EE001', course_code: 'EE302', date: types.LocalDate.fromString('2024-01-15'), present: true },
  { student_id: 'EE001', course_code: 'EE302', date: types.LocalDate.fromString('2024-01-16'), present: false },

  // Student ME001 attendance
  { student_id: 'ME001', course_code: 'ME401', date: types.LocalDate.fromString('2024-01-15'), present: false },
  { student_id: 'ME001', course_code: 'ME401', date: types.LocalDate.fromString('2024-01-16'), present: true },
  { student_id: 'ME001', course_code: 'ME402', date: types.LocalDate.fromString('2024-01-15'), present: true },
  { student_id: 'ME001', course_code: 'ME402', date: types.LocalDate.fromString('2024-01-16'), present: true },
];