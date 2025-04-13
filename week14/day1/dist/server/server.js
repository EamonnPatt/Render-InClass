"use strict";
import express from 'express';
import path from 'path';
import { fileURLToPath } from "url";
import contactRoutes from "./contactRoutes.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = process.env.PORT || 9999;
async function startServer() {
    try {
        app.listen(port, () => {
            console.log(`[INFO] Server started on http://localhost:${port}`);
        });
    }
    catch (error) {
        console.error("[ERROR] Failed to start server");
        process.exit(1);
    }
}
app.use(express.json());
app.use(express.static(path.join(__dirname, '../..')));
app.use('/node_modules/@fortawesome/fontawesome-free', express.static(path.join(__dirname, '../../node_modules/@fortawesome/fontawesome-free')));
app.use('/node_modules/bootstrap', express.static(path.join(__dirname, '../../node_modules/bootstrap')));
app.use('/api/contacts', contactRoutes);
const users = [
    {
        DisplayName: "user1",
        EmailAddress: "user1@gmail.com",
        Username: "user1",
        Password: "123"
    },
    {
        DisplayName: "user2",
        EmailAddress: "user2@gmail.com",
        Username: "user2",
        Password: "123"
    },
    {
        DisplayName: "admin",
        EmailAddress: "admin@gmail.com",
        Username: "admin",
        Password: "password"
    }
];
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../..', 'index.html'));
});
app.get('/users', (req, res) => {
    res.json({ users });
});
await startServer();
//# sourceMappingURL=server.js.map