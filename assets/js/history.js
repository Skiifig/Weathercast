function loadHistory() {
  const history = JSON.parse(localStorage.getItem('history'));
  const tabContainer = document.getElementsByTagName('tbody')[0]
  const tab = document.getElementsByTagName('table')[0];
  const entryContainer = tab.getElementsByClassName('animate-pulse')[0]
  entryContainer.classList.remove('animate-pulse')
  if (history) { // S'il y a un historique
      fillEntry(history, entryContainer, 0) // Remplissage de la première ligne
      for (let i = 1; i < Object.keys(history).length; i++) { // Pour chaque entrée de l'historique
        var entryClone = entryContainer.cloneNode(true) // Clonage de la première ligne
        tabContainer.appendChild(entryClone) // Ajout de la nouvelle ligne au tableau 
        fillEntry(history, entryClone, i) // Remplissage de la nouvelle ligne
      }
    }
}

function fillEntry(history, entryContainer, index) {
  const cle = Object.keys(history)[index]
  const temps = new Date() - history[cle] // Calcul de la différence en ms entre maintenant et le moment de la recherche
  entryContainer.children[0].innerHTML = cle
  entryContainer.children[2].children[0].setAttribute('href', 'recherche.html?requete=' + cle) // Mise en place du lien
  switch (true) {
    case temps > 1000 && temps < 60000:
      entryContainer.children[1].innerHTML = Math.round(temps / 1000) + ' seconde(s)' // Calcul + affichage en secondes
      break;
    case temps > 60000 && temps < 3600000:
      entryContainer.children[1].innerHTML = Math.round(temps / 60000) + ' minutes(s)' // Calcul + affichage en minutes
      break;
    case temps > 3600000 && temps < 86400000:
      entryContainer.children[1].innerHTML = Math.round(temps / 3600000) + ' heure(s)' // Calcul + affichage en heures
      break;
    case temps > 86400000:
      entryContainer.children[1].innerHTML = Math.round(temps / 86400000) + ' jour(s)' // Calcul + affichage en jours
      break;
    default:
      entryContainer.children[1].innerHTML = 'Erreur'
      break;
  }
}