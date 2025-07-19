import { Client } from 'cassandra-driver';

async function setupCassandra() {
  const client = new Client({
    contactPoints: ['127.0.0.1'],
    localDataCenter: 'datacenter1'
  });

  try {
    await client.connect();
    console.log('✅ Connected to Cassandra');

    // Create keyspace
    console.log('📊 Creating keyspace...');
    await client.execute(`
      CREATE KEYSPACE IF NOT EXISTS university
      WITH replication = {
        'class': 'SimpleStrategy',
        'replication_factor': 1
      }
    `);
    console.log('✅ Keyspace "university" created');

    // Use keyspace
    await client.execute('USE university');

    // Create attendance table
    console.log('📋 Creating attendance table...');
    await client.execute(`
      CREATE TABLE IF NOT EXISTS attendance (
        student_id text,
        course_code text,
        date date,
        present boolean,
        PRIMARY KEY (student_id, course_code, date)
      ) WITH CLUSTERING ORDER BY (course_code ASC, date DESC)
    `);
    console.log('✅ Table "attendance" created');

    // Create indexes
    console.log('🔍 Creating indexes...');
    try {
      await client.execute(`
        CREATE INDEX IF NOT EXISTS idx_attendance_course
        ON attendance (course_code)
      `);
      console.log('✅ Index on course_code created');
    } catch (error) {
      console.log('ℹ️  Index on course_code already exists');
    }

    try {
      await client.execute(`
        CREATE INDEX IF NOT EXISTS idx_attendance_date
        ON attendance (date)
      `);
      console.log('✅ Index on date created');
    } catch (error) {
      console.log('ℹ️  Index on date already exists');
    }

    console.log('🎉 Database setup completed successfully!');

  } catch (error) {
    console.error('❌ Error setting up database:', error);
  } finally {
    await client.shutdown();
    console.log('✅ Connection closed');
  }
}

// Run setup
setupCassandra().catch(console.error);