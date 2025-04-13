import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();
dotenv.config();
const USER_NAME = process.env.USER_NAME;
const PASSWORD = process.env.PASSWORD;
const DB_NAME = process.env.DB_NAME;
const CLUSTER = process.env.CLUSTER;
const MONGO_URI = process.env.MONGO_URI;
class Database {
    constructor() {
        this.db = null;
        this.client = new MongoClient(MONGO_URI);
    }
    static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }
    async connect() {
        if (!this.db) {
            try {
                await this.client.connect();
                console.log(`[INFO] Connected to MongoDb Atlas Database: ${DB_NAME}`);
                this.db = this.client.db(DB_NAME);
            }
            catch (error) {
                console.error("[ERROR] Could not connect to MongoDb Atlas Database:", error);
                throw error;
            }
        }
        return this.db;
    }
    async disconnect() {
        await this.client.close();
        console.log("[INFO] Disconnected from MongoDb Atlas Database:");
        this.db = null;
    }
}
export default Database;
//# sourceMappingURL=database.js.map