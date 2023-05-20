const fs = require('fs');

function getAllCities() {
    const fileContents = fs.readFileSync('./assets/data/cities15000.txt', 'utf8'); // Lecture de la base de données
    const cityNames = [];

    const lines = fileContents.split('\n'); // Traitement de la base de données pour obtenir toutes le nom de toutes les villes
    for (let i = 0; i < lines.length; i++) {
        const fields = lines[i].split('\t');
        const cityName = fields[1];
        cityNames.push(cityName); // Ajout de chaque ville dans un tableau
    }
    cityNames.pop()
    return cityNames;
}

function copyLi(city) { // Copie du résultat dans la barre de recherche
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
    var matches = Array.from(new Set(cities.filter(suggestion => !/\d/.test(suggestion) && suggestion.toLowerCase().startsWith(input)))) // Filtrage des villes

    for (let i = 0; i < 3; i++) { // Maximum 3 résultats
        const li = document.createElement('li'); // Création d'un élément de suggestion
        li.innerText = matches[i];
        li.classList.add('bg-gray-400', 'cursor-pointer', 'hover:bg-blue-600', 'text-left', 'p-3')
        li.setAttribute('onclick', `copyLi('${li.innerHTML}')`)
        if (matches[i] != undefined) {
            suggestionsCities.appendChild(li) // Ajout de l'élément li aux suggestions
        }
    };

    if (!input) {
        suggestionsCities.innerHTML = ''; // Réinitalisation des recommendations si l'utilisateur efface sa recherche
    }
}