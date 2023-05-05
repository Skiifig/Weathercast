const fs = require('fs');

function getAllCities() {
    const fileContents = fs.readFileSync('./assets/data/cities15000.txt', 'utf8');
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

function copyLi(city) {
    const searchInput = document.getElementById('search-input');
    const suggestionsCities = document.getElementById('suggestions');
    searchInput.value = city;
    suggestionsCities.innerHTML = '';
    envoi();
}

function updateAutocomp() {
    const searchInput = document.getElementById('search-input');
    const input = searchInput.value.toLowerCase();
    const suggestionsCities = document.getElementById('suggestions');
    suggestionsCities.innerHTML = '';
    const cities = getAllCities();
    var matches = Array.from(new Set(cities.filter(suggestion => !/\d/.test(suggestion) && suggestion.toLowerCase().startsWith(input))))

    for (let i = 0; i < 3; i++) {
        const li = document.createElement('li');
        li.innerText = matches[i];
        li.classList.add('bg-gray-400', 'cursor-pointer', 'hover:bg-blue-600', 'text-left', 'p-3')
        li.setAttribute('onclick', `copyLi('${li.innerHTML}')`)
        if (matches[i] != undefined) {
            suggestionsCities.appendChild(li)
        }
    };

    if (!input) {
        suggestionsCities.innerHTML = '';
    }
}