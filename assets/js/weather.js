const axios = require('axios');
const xml2js = require('xml2js')

const GEOCODING_API_URL = 'https://nominatim.openstreetmap.org/';
const METEO_API_URL = 'https://api.open-meteo.com/v1/forecast';
const TIMEZONE_API_URL = "http://api.timezonedb.com/v2.1"
const TIMEZONE_API_KEY = "GHH8TI463XCM";

// Partie index.html

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

async function fillIndex() {
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

// Partie recherche.html

async function getHours(requete, coordinates) {
  const hourRequest = await axios.get(TIMEZONE_API_URL + `/get-time-zone?key=${TIMEZONE_API_KEY}&by=position&lat=${coordinates.lat}&lng=${coordinates.lng}`)
  var hourData = hourRequest.data
  let res;

  xml2js.parseString(hourData, (err, result) => {
    if (err) {
      console.log(err)
    } else {
      const resultat = result.result.formatted[0]
      res = resultat.split(' ')[1].split(":")[0]
    }
  })
  return parseInt(res)
}

async function fillInfos(requete, dailyData) {
  var windSpeed = dailyData['daily']['windspeed_10m_max'][0];
  var precipitationProba = dailyData['daily']['precipitation_probability_mean'][0];
  var lowestTemp = dailyData['daily']['temperature_2m_min'][0];
  var higherTemp = dailyData['daily']['temperature_2m_max'][0];

  var infos = await determineWeather(requete);
  const title = document.getElementsByClassName('title')[0];
  const description = document.getElementsByClassName('description')[0];
  const temp = document.getElementsByClassName('temp')[0];
  const wind_field = document.getElementsByClassName('wind')[0];
  const precipitation_field = document.getElementsByClassName('precipitation')[0];
  const low_field = document.getElementsByClassName('low-temp')[0];
  const high_field = document.getElementsByClassName('high-temp')[0];
  const img = document.getElementById('img');
  const bg = document.getElementsByTagName('main')[0];

  title.innerHTML = requete
  description.innerHTML = infos[0];
  temp.innerHTML = Math.round(infos[1]) + '°C';
  wind_field.innerHTML = Math.round(windSpeed) + 'km/h';
  precipitation_field.innerHTML = Math.round(precipitationProba) + '%';
  low_field.innerHTML = Math.round(lowestTemp) + '°C';
  high_field.innerHTML = Math.round(higherTemp) + '°C';

  switch (infos[0]) {
    case 'Nuit':
      img.src = './assets/img/moon.png';
      bg.classList.add('from-blue-700', 'via-blue-800', 'to-blue-900');
      break;
    case 'Ensoleillé':
      img.src = './assets/img/sun.png';
      bg.classList.add('from-blue-400', 'via-blue-500', 'to-blue-600');
      break;
    case 'Partiellement ensoleillé':
      img.src = './assets/img/sun_cloud.png'
      bg.classList.add('from-blue-300', 'via-blue-400', 'to-blue-500');
      break;
    case 'Nuageux':
      img.src = './assets/img/cloud.png';
      bg.classList.add('from-gray-400', 'via-gray-500', 'to-gray-600');
      break;
    case 'Pluvieux':
      img.src = './assets/img/rain.png';
      bg.classList.add('from-blue-200', 'via-blue-300', 'to-blue-400');
      break;
    case 'Brouillard':
      img.src = './assets/img/fog.png';
      bg.classList.add('from-gray-300', 'via-gray-400', 'to-gray-500');
      break;
    case 'Averses':
      img.src = './assets/img/averse.png';
      bg.classList.add('from-blue-500', 'via-blue-600', 'to-blue-700');
      break;
    case 'Orageux':
      img.src = './assets/img/storm.png';
      bg.classList.add('from-blue-800', 'via-blue-900', 'to-blue-950');
      break;
  }
}

async function fillHourly(requete, coordinates, hourlyData) {
  var currentHour = await getHours(requete, coordinates)
  for (let i = 1; i <= 20; i++) {
    var container = document.getElementsByClassName('carousel-item')[i-1];
    var hourlyWeather = hourlyData['hourly']['time'][currentHour += 1];
    var hourlyTemp = hourlyData['hourly']['temperature_2m'][currentHour];
    container.children[0].innerHTML = currentHour + ':00'
    container.children[2].innerHTML = Math.round(hourlyTemp) + '°C';
    switch (hourlyData['hourly']['is_day'][currentHour]) {
      case 0:
        container.children[1].src = './assets/img/moon.png'
        break
      case 1:
        switch (hourlyData['hourly']['weathercode'][currentHour]) {
          case 0:
            container.children[1].src = './assets/img/sun.png'
            break
          case 1:
          case 2:
            container.children[1].src = './assets/img/sun_cloud.png'
            break
          case 3:
            container.children[1].src = './assets/img/cloud.png'
            break
          case 45:
          case 48:
            container.children[1].src = './assets/img/fog.png'
            break
          case 61:
          case 63:
          case 65:
            container.children[1].src = './assets/img/rain.png'
            break
          case 51:
          case 53:
          case 55:
          case 80:
          case 81:
          case 82:
            container.children[1].src = './assets/img/averse.png'
            break
          case 95:
          case 96:
          case 99:
            container.children[1].src = './assets/img/storm.png'
            break
        }
    }
    if (currentHour == 23) {currentHour = -1}
  }
}

async function fillDaily(dailyData) {
  const days = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
  const compoDays = document.getElementsByClassName('day-row');
  const compoSunrise = document.getElementsByClassName('sunrise');
  const compoSunset = document.getElementsByClassName('sunset');
  var currentDay = new Date().getDay() - 2;
  for (let i = 0; i < 7; i++) {
    compoDays[i].children[0].innerHTML = days[currentDay += 1] + '.'
    compoSunrise[i].children[1].innerHTML = dailyData['daily']['sunrise'][i].split('T')[1]
    compoSunset[i].children[1].innerHTML = dailyData['daily']['sunset'][i].split('T')[1]
    if (currentDay == 6) {currentDay = -1}
  }
}

async function fillSearch() {
  var requete = reception();
  var coordinates = await getCoordinatesCity(requete);
  var base_url = `https://api.open-meteo.com/v1/forecast?latitude=${coordinates.lat}&longitude=${coordinates.lng}`
  var dailyRequest = await axios.get(base_url + '&daily=temperature_2m_max,temperature_2m_min,windspeed_10m_max,precipitation_probability_mean,sunrise,sunset&timezone=CET')
  var hourlyRequest = await axios.get(base_url + '&hourly=temperature_2m,weathercode,is_day');
  var dailyData = dailyRequest.data;
  var hourlyData = hourlyRequest.data;

  fillInfos(requete, dailyData);
  fillHourly(requete, coordinates, hourlyData);
  fillDaily(dailyData);
}