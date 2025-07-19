import { attendanceData } from './attendance_data';
import { connectToCassandra, disconnectFromCassandra } from './db';


async function insertAttendanceData() {
  let client: any;
  try {
    client = await connectToCassandra();

    console.log('📝 Inserting attendance data...');

    // Prepare the insert statement
    const insertQuery = `
      INSERT INTO attendance (student_id, course_code, date, present)
      VALUES (?, ?, ?, ?)
    `;

    // Insert each record
    for (const record of attendanceData) {
      await client.execute(insertQuery, [
        record.student_id,
        record.course_code,
        record.date,
        record.present
      ]);
      console.log(`✅ Inserted: ${record.student_id} - ${record.course_code} - ${record.date} - ${record.present ? 'Present' : 'Absent'}`);
    }

    console.log(`🎉 Successfully inserted ${attendanceData.length} attendance records!`);

    // Display total count
    const countResult = await client.execute('SELECT COUNT(*) FROM attendance');
    console.log(`📊 Total attendance records in database: ${countResult.rows[0].count}`);

  } catch (error) {
    console.error('❌ Error inserting data:', error);
  } finally {
    if (client) {
      await disconnectFromCassandra(client);
    }
  }
}

// Run the insertion
insertAttendanceData().catch(console.error);