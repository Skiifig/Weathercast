function loadHistory() {
  const history = JSON.parse(localStorage.getItem('history'));
  const tab = document.getElementsByTagName('table')[0];
  const firstEntry = tab.getElementsByClassName('animate-pulse')[0]
  firstEntry.classList.remove('animate-pulse')
  if (history) {
    const cle = Object.keys(history)[0]
    const temps = new Date() - history[cle]
    firstEntry.children[0].innerHTML = cle
    firstEntry.children[2].children[0].setAttribute('href', 'recherche.html?requete=' + cle)
    switch (true) {
      case temps > 1000 && temps < 60000:
        firstEntry.children[1].innerHTML = Math.round(temps / 1000) + ' seconde(s)'
        break;
      case temps > 60000 && temps < 3600000:
        firstEntry.children[1].innerHTML = Math.round(temps / 60000) + ' minutes(s)'
        break;
      case temps > 3600000 && temps < 86400000:
        firstEntry.children[1].innerHTML = Math.round(temps / 3600000) + ' heure(s)'
        break;
      case temps > 86400000:
        firstEntry.children[1].innerHTML = Math.round(temps / 86400000) + ' jour(s)'
        break;
      default:
        firstEntry.children[1].innerHTML = 'Erreur'
        break;
    }
    console.log(Object.keys(history).length)
  }
}