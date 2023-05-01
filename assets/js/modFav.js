import { getCityTime, determineWeather, fillFavCard, fillModal } from './time.js'

const tabFav = JSON.parse(localStorage.getItem("favoris")) || [];
const container = document.getElementById('container');
const listContainer = document.getElementById('list-container')

if (tabFav.length == 0) {
    const speedDial = document.getElementById('speed-dial');
    const message = document.createElement('h1')
    message.classList.add('text-gray-200', 'text-center', 'text-2xl', 'pt-24')
    message.innerHTML = "Vous n'avez pas de favoris" 
    container.innerHTML = ''
    container.appendChild(message)
    speedDial.classList.add('hidden')
} else if (tabFav.length == 1) {
    const modele = document.getElementById('favorite-card-0');
    const city = tabFav[0];
    const time = await getCityTime(city);
    const weather = await determineWeather(city);
    modele.classList.remove('hidden');
    fillFavCard(city, time, weather);
    fillModal(city)
} else {
    var modele = document.getElementById('favorite-card-0');
    var fav = document.getElementById('element-0');
    const city = tabFav[0];
    const time = await getCityTime(city);
    const weather = await determineWeather(city);
    fillFavCard(city, time, weather);
    fillModal(city)
    modele.classList.remove('hidden');
    for (let index = 1; index < tabFav.length ;index++) {
        const cloneCard = modele.cloneNode(true);
        const cloneCheckbox = fav.cloneNode(true);
        const fields = cloneCard.getElementsByClassName('field');
        cloneCard.id = 'favorite-card-' + index;
        cloneCheckbox.id = 'element-' + index;
        for (const field of fields) {
            field.id = field.id.split('-')[0] + '-' + index;
        }
        container.appendChild(cloneCard);
        listContainer.appendChild(cloneCheckbox);
        const city = tabFav[index];
        const time = await getCityTime(city);
        const weather = await determineWeather(city);
        fillFavCard(city, time, weather, index);
        fillModal(city, index)
    }
}