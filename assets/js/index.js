const axios = require('axios');

const GEOCODING_API_URL = 'https://nominatim.openstreetmap.org/';
const METEO_API_URL = 'https://api.open-meteo.com/v1/forecast';

async function getCoordinatesCity(cityName) {
  const url = `${GEOCODING_API_URL}?q=${encodeURIComponent(cityName)}&format=json`;

  const response = await axios.get(url);
  const data = response.data;

  if (data.length > 0) {
    const city = data[0];
    return {
      lat: city.lat,
      lng: city.lon
    };
  } else {
    throw new Error(`Impossible de trouver les coordonnées de ${cityName}`);
  }
}

async function getWeatherForCity(cityName) {
  const coordinates = await getCoordinatesCity(cityName);
  const url = `${METEO_API_URL}?latitude=${coordinates.lat}&longitude=${coordinates.lng}&current_weather=True`;

  const response = await axios.get(url);
  const data = response.data;

  return data
}

async function determineWeather(cityName) {
  var data = await getWeatherForCity(cityName);
  var temp = data['current_weather']['temperature'];
  var time = data['current_weather']['is_day'];
  var weather_code = data['current_weather']['weathercode']
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

async function fillWeather() {
  const nb = document.querySelectorAll('.weather-card').length;
  for (let index = 0; index < nb; index++) {
    var temp_field = document.querySelectorAll('.temperature')[index];
    var city = document.querySelectorAll('p')[index].innerHTML;
    var bg = document.querySelectorAll('.pt-10')[index];
    var infos = await determineWeather(city);
    switch (infos[0]) {
      case 'Nuit':
        temp_field.classList.remove('text-white');
        bg.src = './assets/img/moon.png';
        bg.classList.add('bg-blue-900');
        break;
      case 'Ensoleillé':
        bg.src = './assets/img/sun.png';
        bg.classList.add('bg-blue-500');
        break;
      case 'Partiellement ensoleillé':
        bg.src = './assets/img/sun_cloud.png';
        bg.classList.add('bg-blue-400');
        break;
      case 'Nuageux':
        temp_field.classList.remove('text-white');
        bg.src = './assets/img/cloud.png';
        bg.classList.add('bg-gray-500');
        break;
      case 'Pluvieux':
        temp_field.classList.remove('text-white')
        bg.src = './assets/img/rain.png';
        bg.classList.add('bg-blue-300');
        break;
      case 'Brouillard':
        bg.src = './assets/img/fog.png'
        bg.classList.add('bg-gray-400');
        break;
      case 'Averses':
        temp_field.classList.remove('text-white');
        bg.src = './assets/img/averse.png';
        bg.classList.add('bg-blue-600');
        break;
      case 'Orageux':
        bg.src = './assets/img/storm.png';
        bg.classList.add('bg-blue-900');
        break;
      }
    temp_field.innerHTML = Math.round(infos[1]) + '°C' 
  };
}