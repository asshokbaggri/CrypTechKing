import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const mongoUrl = process.env.MONGO_URL;

if (!mongoUrl) {
    console.error("❌ MONGO_URL missing in Railway env");
    process.exit(1);
}

const client = new MongoClient(mongoUrl);

await client.connect();

const db = client.db("cryptechking");

export default db;
