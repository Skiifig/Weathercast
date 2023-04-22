function reception() {
    var queryString = window.location.search;
    var params = new URLSearchParams(queryString);
    var requete = params.get('requete');
    console.log(requete);
}