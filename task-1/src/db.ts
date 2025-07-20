import { MongoClient } from "mongodb";

export const mongoClient = new MongoClient("mongodb://localhost:27017");
await mongoClient.connect();
