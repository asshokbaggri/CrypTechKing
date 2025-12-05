import { MongoClient } from "mongodb";
import config from "../config/env.js";

const client = new MongoClient(config.mongoUrl);

await client.connect();

const db = client.db("cryptechking");

export default db;
