const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (HTML, CSS, JS)
app.use(express.static('public'));

// Endpoint to handle adding a new athlete
app.post('/add-athlete', (req, res) => {
    const athlete = req.body;

    // Append the new athlete to the CSV file
    const csvLine = `${athlete.athleteID},${athlete.firstName},${athlete.lastName},${athlete.gender},${athlete.birthDate},${athlete.country},${athlete.sport},${athlete.event},${athlete.medals}\n`;
    fs.appendFile(path.join(__dirname, 'athletes.csv'), csvLine, (err) => {
        if (err) {
            return res.status(500).send('Failed to save athlete.');
        }
        res.send('Athlete added successfully.');
    });
});

// Endpoint to get all athletes
app.get('/athletes', (req, res) => {
    fs.readFile(path.join(__dirname, 'athletes.csv'), 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Failed to read athletes.');
        }

        const rows = data.split('\n').filter(row => row.trim() !== '');
        const athletes = rows.map(row => {
            const [athleteID, firstName, lastName, gender, birthDate, country, sport, event, medals] = row.split(',');
            return { athleteID, firstName, lastName, gender, birthDate, country, sport, event, medals };
        });

        res.json(athletes);
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
