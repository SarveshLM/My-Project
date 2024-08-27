document.getElementById('showPlayersBtn').addEventListener('click', showPlayers);
document.getElementById('addPlayerBtn').addEventListener('click', showAddPlayerForm);
document.getElementById('playerForm').addEventListener('submit', addPlayer);

let players = [];

// Fetch the players data from the JSON file
fetch('olympics_database.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        players = data.Players; // Access the Players array
        console.log('Players data loaded:', players); // Debugging
    })
    .catch(error => console.error('Error loading players data:', error));

function showPlayers() {
    const table = document.getElementById('playersTable');
    const tbody = document.getElementById('playersData');
    tbody.innerHTML = ''; // Clear existing data

    console.log('Showing players:', players); // Debugging

    players.forEach(player => {
        const row = document.createElement('tr');
        for (let key in player) {
            const cell = document.createElement('td');
            cell.textContent = player[key];
            row.appendChild(cell);
        }
        tbody.appendChild(row);
    });

    table.classList.remove('hidden');
    document.getElementById('addPlayerForm').classList.add('hidden');
}

function showAddPlayerForm() {
    document.getElementById('playersTable').classList.add('hidden');
    document.getElementById('addPlayerForm').classList.remove('hidden');
}

function addPlayer(event) {
    event.preventDefault();
    const player = {
        PlayerID: document.getElementById('playerId').value,
        Name: document.getElementById('playerName').value,
        Country: document.getElementById('playerCountry').value,
        Sport: document.getElementById('playerSport').value,
        Age: parseInt(document.getElementById('playerAge').value, 10),
        Gender: document.getElementById('playerGender').value
    };
    players.push(player);
    alert('Player added successfully!');
    document.getElementById('playerForm').reset();
}
