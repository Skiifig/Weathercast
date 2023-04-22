function envoi() {
    var requete = document.getElementById('search-input').value;
    window.location.href = 'recherche.html?requete=' + encodeURIComponent(requete);
}