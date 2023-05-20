function envoi() {
  const requete = document.getElementById('search-input') || document.getElementById('search-navbar'); // Obtention de la requête
  const date = new Date(); // Obtention du temps actuel
  dictHis = JSON.parse(localStorage.getItem('history')) || {} // Obtention de l'historique
  dictHis[requete.value] = date.getTime() // Obtention du temps actuel en ms depuis 1970
  localStorage.setItem('history', JSON.stringify(dictHis)) // Mise à jour de l'historique dans le stockage
  window.location.href = 'recherche.html?requete=' + encodeURIComponent(requete.value); // Redirection de l'utilisateur
}

function checkEnter(event) {
  if (event.keyCode === 13 && event.target.nodeName === "INPUT") { // Si l'utilisateur appuie sur Entrée
    envoi(); // Envoi de la requête
  }
}

document.addEventListener("keydown", checkEnter); // Pour chaque touche pressée