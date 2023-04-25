const fs = require('fs');

function getAllCities() {
    const fileContents = fs.readFileSync('./assets/data/cities1000.txt', 'utf8');
    const cityNames = [];

    const lines = fileContents.split('\n');
    for (let i = 0; i < lines.length; i++) {
    const fields = lines[i].split('\t');
    const cityName = fields[1];
    cityNames.push(cityName);
    }
    cityNames.pop()
    return cityNames;
}

function updateAutocomp() {
    const searchInput = document.getElementById('search-input');
    const input = searchInput.value.toLowerCase();
    const suggestionsCities = document.getElementById('suggestions');
    suggestionsCities.innerHTML = '';
    const cities = getAllCities();
    var matches = cities.filter(suggestion => suggestion.toLowerCase().startsWith(input));
    console.log(matches)

    for (let i = 0; i < 3; i++) {
        const li = document.createElement('li');
        li.innerText = matches[i];
        li.classList.add('bg-gray-900', 'cursor-pointer')
        if (matches[i] != undefined) {
            suggestionsCities.appendChild(li)
        }
    };
    if (!input) {
        suggestionsCities.innerHTML = '';
    }
}