app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
import express from 'express';
import bodyParser from 'body-parser';
import fetch from 'node-fetch';
// import { v4 as uuidv4 } from 'uuid';

// // Générer un identifiant de session unique
// const sessionId = uuidv4();
const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/dialogflow', async (req, res) => {
  const projectId = 'kenne-mqcu'; // Remplacez par votre ID de projet
  const sessionId = 'quickstart-session-id';
  const apiKey = 'AIzaSyB3ihja8YAMNUfiewSdOVxv-1lhu-5Za0I'; // Remplacez par votre clé API

    const url = `https://dialogflow.googleapis.com/v2/projects/${projectId}/agent/sessions/${sessionId}:detectIntent?key=${apiKey}`;

    const requestBody = req.body;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            throw new Error('Erreur réseau');
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});