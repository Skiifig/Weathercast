function envoi() {
    var requete = document.getElementById('search-input');
    window.location.href = 'recherche.html?requete=' + encodeURIComponent(requete.value);
}

document.addEventListener("keyup", function(event) {
    if (event.key == "Enter") {
        envoi();
    }
});