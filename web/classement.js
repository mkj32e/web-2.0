fetch('/scores')
    .then(response => response.json())
    .then(scores => {
        const tbody = document.getElementById('tableau');
        if (scores.length === 0) {
            tbody.innerHTML = '<tr><td colspan="3">Aucun score enregistré</td></tr>';
        } else {
            scores.forEach((s, i) => {
                tbody.innerHTML += '<tr><td>' + (i+1) + '</td><td>' + s.pseudo + '</td><td>' + s.kills + '</td></tr>';
            });
        }
    });