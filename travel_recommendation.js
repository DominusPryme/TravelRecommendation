document.getElementById('search-button').addEventListener('click', function() {
    const query = document.getElementById('search-input').value.toLowerCase();
    fetch('travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const results = data.filter(item => 
                item.name.toLowerCase().includes(query) ||
                item.description.toLowerCase().includes(query)
            );
            displayResults(results);
        });
});

document.getElementById('clear-button').addEventListener('click', function() {
    document.getElementById('search-input').value = '';
    document.getElementById('results').innerHTML = '';
});

function displayResults(results) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';
    results.slice(0, 2).forEach(result => {
        const resultItem = document.createElement('div');
        resultItem.innerHTML = `
            <h2>${result.name}</h2>
            <p>${result.description}</p>
            <img src="${result.imageUrl}" alt="${result.name}">
        `;
        resultsContainer.appendChild(resultItem);
    });
}

function displayTimeForCountry(timeZone) {
    const options = { timeZone, hour12: true, hour: 'numeric', minute: 'numeric', second: 'numeric' };
    const localTime = new Date().toLocaleTimeString('en-US', options);
    console.log(`Current time in ${timeZone}:`, localTime);
}
