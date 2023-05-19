function reception() {
    var queryString = window.location.search;
    var params = new URLSearchParams(queryString);
    var requete = params.get('requete');
    return requete
}

// windspeed_10m_max, precipitation_probability_mean, temperature_2m_max, temperature_2m_min, weathercode

// async function test() {
//     const request = await axios.get('https://api.open-meteo.com/v1/forecast?latitude=50.6&longitude=3.03&daily=weathercode&timezone=CET')
//     console.log(request.data)
// }