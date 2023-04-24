const axios = require('axios');

const GEOCODING_API_URL = 'https://api.opencagedata.com/geocode/v1/json';
const GEOCODING_API_KEY = '55a4700a22db425fbf6fb9c1e7ea4b8c';
const METEO_API_URL = 'https://api.open-meteo.com/v1/forecast';

async function getCoordinatesForCity(cityName) {
  const url = `${GEOCODING_API_URL}?q=${encodeURIComponent(cityName)}&key=${GEOCODING_API_KEY}`;

  const response = await axios.get(url);
  const data = response.data;

  if (data.results.length > 0) {
    const city = data.results[0];
    return {
      lat: city.geometry.lat,
      lng: city.geometry.lng
    };
  } else {
    throw new Error(`Impossible de trouver les coordonnées de ${cityName}`);
  }
}

// Fonction pour récupérer les prévisions météorologiques pour une ville donnée
async function getWeatherForCity(cityName) {
  const coordinates = await getCoordinatesForCity(cityName);

  const url = `${METEO_API_URL}?latitude=${coordinates.lat}&longitude=${coordinates.lng}&current_weather=True`;

  const response = await axios.get(url);
  const data = response.data;

  res = data['current_weather']['temperature'];

  return data
}

async function determineWeather(cityName) {
  const data = await getWeatherForCity(cityName);
  const temp = data['current_weather']['temperature']
  const time = data['current_weather']['is_day']
  if (time == 1) {
    return 'Jour'
  } else {
    return 'Nuit'
  }
}

async function fillWeather() {
  const nb = document.querySelectorAll('.weather-card').length;
  for (let index = 0; index < nb; index++) {
    var temp_field = document.querySelectorAll('span')[index];
    var city = document.querySelectorAll('p')[index].innerHTML;
    var bg = document.querySelectorAll('.pt-10')[index];
    var time = await determineWeather(city);
      if (time == 'Jour') {
        bg.src = './assets/img/sun.png';
        bg.classList.add('bg-blue-500');
      } else {
        temp_field.classList.remove('text-white');
        bg.src = './assets/img/moon.png';
        bg.classList.add('bg-blue-900');
      }
    };
}