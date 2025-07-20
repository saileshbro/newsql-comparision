import { Client } from 'cassandra-driver';

// Connect to Cassandra
export async function connectToCassandra(): Promise<Client> {
  const client = new Client({
    contactPoints: ['127.0.0.1'],
    localDataCenter: 'datacenter1',
    keyspace: 'university'
  });

  try {
    await client.connect();
    console.log('✅ Connected to Cassandra');
    return client;
  } catch (error) {
    console.error('❌ Error connecting to Cassandra:', error);
    throw error;
  }
}

// Shutdown connection
export async function disconnectFromCassandra(client: Client): Promise<void> {
  try {
    await client.shutdown();
    console.log('✅ Disconnected from Cassandra');
  } catch (error) {
    console.error('❌ Error disconnecting from Cassandra:', error);
    throw error;
  }
}
