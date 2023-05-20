// Obligation d'écrire en paradigme impératif car nous sommes dans un module qui permet l'importation de fonction
import { getCityTime, determineWeather, fillFavCard, fillModal } from './time.js'

const tabFav = JSON.parse(localStorage.getItem("favoris")) || [];
const container = document.getElementById('container');
const listContainer = document.getElementById('list-container')

if (tabFav.length == 0) { // Cas où il n'y a pas de favoris
    const speedDial = document.getElementById('speed-dial');
    const message = document.createElement('h1')
    message.classList.add('text-gray-200', 'text-center', 'text-2xl', 'pt-24')
    message.innerHTML = "Vous n'avez pas de favoris" 
    container.innerHTML = ''
    container.appendChild(message)
    speedDial.classList.add('hidden') // Disparition du bouton de suppression
} else if (tabFav.length == 1) { // Cas où il n'y a qu'un seul favoris
    const modele = document.getElementById('favorite-card-0');
    const city = tabFav[0];
    const time = await getCityTime(city);
    const weather = await determineWeather(city);
    modele.classList.remove('hidden'); // Apparition de la carte "modèle"
    fillFavCard(city, time, weather); // Remplissage de la carte de favoris
    fillModal(city) // Remplissage du modal
} else { // Cas où il y a plusieurs favoris
    var modele = document.getElementById('favorite-card-0');
    var fav = document.getElementById('element-0');
    const city = tabFav[0];
    const time = await getCityTime(city); // Obtention de l'heure locale
    const weather = await determineWeather(city); // Obtention du temps
    fillFavCard(city, time, weather);
    fillModal(city)
    modele.classList.remove('hidden');
    for (let index = 1; index < tabFav.length ;index++) { // Pour chaque favoris
        const cloneCard = modele.cloneNode(true); // Clonage de la carte favori
        const cloneCheckbox = fav.cloneNode(true); // Clonage de la case dans le modal
        const fields = cloneCard.getElementsByClassName('field');
        cloneCard.id = 'favorite-card-' + index; // Sélection de la carte
        cloneCheckbox.id = 'element-' + index; // Sélection de la case
        for (const field of fields) {
            field.id = field.id.split('-')[0] + '-' + index; // Mise à jour de tous les champs à remplir
        }
        container.appendChild(cloneCard); // Clonage de la carte
        listContainer.appendChild(cloneCheckbox); // Ajout de la carte
        const city = tabFav[index];
        const time = await getCityTime(city);
        const weather = await determineWeather(city);
        fillFavCard(city, time, weather, index);
        fillModal(city, index)
    }
}