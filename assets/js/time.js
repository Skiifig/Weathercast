const axios = require('axios');
const xml2js = require('xml2js')

const TIMEZONE_API_KEY = "GHH8TI463XCM"
const GEOCODING_API_URL = "https://nominatim.openstreetmap.org/"

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

async function getCityTime(city) {
    const coordinates = await getCoordinatesCity(city)
    const url = `http://api.timezonedb.com/v2.1/get-time-zone?key=${TIMEZONE_API_KEY}&by=position&lat=${coordinates.lat}&lng=${coordinates.lng}`
    const response = await axios.get(url);
    data = response.data
    console.log(data)
    xml2js.parseString(data, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            const resultat = result.result.formatted[0]
            console.log(resultat.split(' ')[1])
        }
    })
}