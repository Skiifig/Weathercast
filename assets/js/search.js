function reception() { // Retrouver la requête à partir des paramètres d'URL
    var queryString = window.location.search;
    var params = new URLSearchParams(queryString);
    var requete = params.get('requete');
    return requete
}