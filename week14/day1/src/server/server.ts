"use strict";

import express, { Request, Response } from 'express';
import path from 'path';
import {fileURLToPath}  from "url";

import contactRoutes from "./contactRoutes.js";

//Convert module path to __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize express application
const app  = express();
const port = process.env.PORT || 9999;

async function startServer() {
    try{
        app.listen(port, () => {
            console.log(`[INFO] Server started on http://localhost:${port}`);
        });
    }catch(error){
        console.error("[ERROR] Failed to start server");
        process.exit(1);
    }
}

//Middleware to parse incoming JSON payloads
app.use(express.json());

//Serve static files (HTML, CSS etc...) from project root
app.use(express.static(path.join(__dirname, '../..')));

//Serve static resources (fontawesome and bootstrap)
app.use('/node_modules/@fortawesome/fontawesome-free',
    express.static(path.join(__dirname, '../../node_modules/@fortawesome/fontawesome-free')));
app.use('/node_modules/bootstrap',
    express.static(path.join(__dirname, '../../node_modules/bootstrap')));

//Mounting the contacts endpoints
app.use('/api/contacts', contactRoutes);

const users = [
    {
        DisplayName : "user1",
        EmailAddress : "user1@gmail.com",
        Username : "user1",
        Password : "123"
    },
    {
        DisplayName : "user2",
        EmailAddress : "user2@gmail.com",
        Username : "user2",
        Password : "123"
    },
    {
        DisplayName : "admin",
        EmailAddress : "admin@gmail.com",
        Username : "admin",
        Password : "password"
    }];
//Route to server the SPA page (index.html)
app.get('/', (req:Request, res:Response) => {
    res.sendFile(path.join(__dirname, '../..', 'index.html'));
});

//API endpoint to return the list of users as JSON
app.get('/users', (req:Request, res:Response) => {
    res.json({ users });
});

await startServer();


