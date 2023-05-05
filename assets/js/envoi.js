function envoi() {
  const requete = document.getElementById('search-input') || document.getElementById('search-navbar');
  const date = new Date();
  dictHis = JSON.parse(localStorage.getItem('history')) || {}
  console.log(dictHis)
  dictHis[requete.value] = date.getTime()
  localStorage.setItem('history', JSON.stringify(dictHis))
  window.location.href = 'recherche.html?requete=' + encodeURIComponent(requete.value);
}

function checkEnter(event) {
  if (event.keyCode === 13 && event.target.nodeName === "INPUT") {
    envoi();
  }
}

document.addEventListener("keydown", checkEnter);