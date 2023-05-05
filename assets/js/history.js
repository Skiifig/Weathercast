function loadHistory() {
  const history = JSON.parse(localStorage.getItem('history'));
  const tabContainer = document.getElementsByTagName('tbody')[0]
  const tab = document.getElementsByTagName('table')[0];
  const entryContainer = tab.getElementsByClassName('animate-pulse')[0]
  entryContainer.classList.remove('animate-pulse')
  if (history) {
      fillEntry(history, entryContainer, 0)
      for (let i = 1; i < Object.keys(history).length; i++) {
        var entryClone = entryContainer.cloneNode(true)
        tabContainer.appendChild(entryClone)
        fillEntry(history, entryClone, i)
      }
    }
}

function fillEntry(history, entryContainer, index) {
  const cle = Object.keys(history)[index]
  const temps = new Date() - history[cle]
  entryContainer.children[0].innerHTML = cle
  entryContainer.children[2].children[0].setAttribute('href', 'recherche.html?requete=' + cle)
  switch (true) {
    case temps > 1000 && temps < 60000:
      entryContainer.children[1].innerHTML = Math.round(temps / 1000) + ' seconde(s)'
      break;
    case temps > 60000 && temps < 3600000:
      entryContainer.children[1].innerHTML = Math.round(temps / 60000) + ' minutes(s)'
      break;
    case temps > 3600000 && temps < 86400000:
      entryContainer.children[1].innerHTML = Math.round(temps / 3600000) + ' heure(s)'
      break;
    case temps > 86400000:
      entryContainer.children[1].innerHTML = Math.round(temps / 86400000) + ' jour(s)'
      break;
    default:
      entryContainer.children[1].innerHTML = 'Erreur'
      break;
  }
}