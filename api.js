import { get } from 'axios';
// Requêter un utilisateur avec un ID donné.
get('https://open-meteo.com/en/docs/meteofrance-api')
  .then(function (response) {
    // en cas de réussite de la requête
    console.log(response);
  })
  .catch(function (error) {
    // en cas d’échec de la requête
    console.log(error);
  })
