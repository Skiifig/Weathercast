const axios = require('axios');
const xml2js = require('xml2js');

// Variables génériques

const TIMEZONE_API_KEY = "GHH8TI463XCM";
const TIMEZONE_API_URL = "http://api.timezonedb.com/v2.1"
const GEOCODING_API_URL = "https://nominatim.openstreetmap.org/";
const METEO_API_URL = 'https://api.open-meteo.com/v1/forecast';

async function getCoordinatesCity(cityName) { // Transformation de la ville en coordonnées GPS
  const url = `${GEOCODING_API_URL}?q=${encodeURIComponent(cityName)}&format=json`; // Url de la requête
  const response = await axios.get(url); // Requête HTTP
  const data = response.data; // Obtention des données

  if (data.length > 0) {
    const city = data[0];
    return { // Défintion d'un dictionnaires avec les coordonnées
      lat: city.lat,
      lng: city.lon
    };
  } else {
    throw new Error(`Impossible de trouver les coordonnées de ${cityName}`);
  }
}

export async function getCityTime(city) { // Obtenir l'heure local à partir de la ville
  const coordinates = await getCoordinatesCity(city) // Obtention des coordonnées
  const url = TIMEZONE_API_URL + `/get-time-zone?key=${TIMEZONE_API_KEY}&by=position&lat=${coordinates.lat}&lng=${coordinates.lng}`
  const response = await axios.get(url);
  var data = response.data

  let res;
  xml2js.parseString(data, (err, result) => { // Transformation du format du résultat en JSON
    if (err) {
      console.log(err)
    } else {
      const resultat = result.result.formatted[0]
      res = resultat.split(' ')[1].split(':')[0] + 'h' + resultat.split(' ')[1].split(':')[1] // Reformatage pour obtenir l'heure
    }
  })
  return res
}

async function getWeatherForCity(cityName) { // Obtention du temps actuel
  const coordinates = await getCoordinatesCity(cityName);
  const url = `${METEO_API_URL}?latitude=${coordinates.lat}&longitude=${coordinates.lng}&current_weather=True`;

  const response = await axios.get(url);
  const data = response.data;

  return data
}

export async function determineWeather(cityName) {
  var data = await getWeatherForCity(cityName);
  var temp = data['current_weather']['temperature'];
  var time = data['current_weather']['is_day']; // Moment de la journée
  var weather_code = data['current_weather']['weathercode']; // Code permettant d'avoir la météo
  switch (time) {
    case 0:
      return ['Nuit', temp]
    case 1:
      switch (weather_code) {
        case 0:
          return ['Ensoleillé', temp]
        case 1:
        case 2:
          return ['Partiellement ensoleillé', temp]
        case 3:
          return ['Nuageux', temp]
        case 45:
        case 48:
          return ['Brouillard', temp]
        case 61:
        case 63:
        case 65:
          return ['Pluvieux', temp]
        case 51:
        case 53:
        case 55:
        case 80:
        case 81:
        case 82:
          return ['Averses', temp]
        case 95:
        case 96:
        case 99:
          return ['Orageux', temp]
      }
    default:
      console.log('Impossible de déterminer la météo', weather_code)
  }
}

export async function fillFavCard(city, time, weather, index=0) { // Remplissage de la carte de favori
  const background = document.getElementById('background-'+ index);
  const cityField = document.getElementById('city-' + index);
  const weatherField = document.getElementById('weather-' + index);
  const timeField = document.getElementById('hour-' + index);
  const tempField = document.getElementById('temperature-' + index);
  const modele = document.getElementById('favorite-card-' + index);
  cityField.innerHTML = city;
  weatherField.innerHTML = weather[0];
  timeField.innerHTML = time;
  tempField.innerHTML = weather[1] + '°C';
  modele.lastChild.previousSibling.firstChild.nextSibling.href = 'recherche.html?requete=' + city; // Mise à jour du lien de la carte
  switch (weather[0]) {
    case 'Nuit':
      background.src = './assets/img/moon.png'; // Changement de l'image
      modele.classList.add('bg-blue-900'); // Changement de la couleur du fond
      break;
    case 'Ensoleillé':
      background.src = './assets/img/sun.png';
      modele.classList.add('bg-blue-500');
      break;
    case 'Partiellement ensoleillé':
      background.src = './assets/img/sun_cloud.png';
      modele.classList.add('bg-blue-400');
      break;
    case 'Nuageux':
      background.src = './assets/img/cloud.png';
      modele.classList.add('bg-gray-500');
      break;
    case 'Pluvieux':
      background.src = './assets/img/rain.png';
      modele.classList.add('bg-blue-300');
      break;
    case 'Brouillard':
      background.src = './assets/img/fog.png'
      modele.classList.add('bg-gray-400');
      break;
    case 'Averses':
      background.src = './assets/img/averse.png';
      modele.classList.add('bg-blue-600');
      break;
    case 'Orageux':
      background.src = './assets/img/storm.png';
      modele.classList.add('bg-blue-900');
      break;
  }
}

export function fillModal(city, index=0) { // Remplissage du modal de suppression
  var fav = document.getElementById('element-' + index);
  var checkbox = fav.getElementsByClassName('checkbox');
  checkbox[0].id = 'checkbox-' + index;
  checkbox[1].setAttribute('for', 'checkbox-' + index);
  checkbox[1].innerHTML = city;
}