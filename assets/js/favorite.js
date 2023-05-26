var tabFav = JSON.parse(localStorage.getItem("favoris")) || []; // Obtention des favoris

function showAlert(type, status_code=0, id=null) {
  var alert = document.getElementById('alert-' + type);
  var text = document.getElementById('alert-text');
  alert.classList.replace('opacity-0', 'opacity-1'); // Affichage de l'alerte
  if (type == 'warning') {
    text.innerHTML = "L'historique est vide." // Contenu de l'alerte
  } else if (type == 'success') {
      if (status_code == 1) {
        text.innerHTML = id + " a bien été ajouté à votre liste de favoris." // Contenu de l'alerte
      } else if (status_code == -1) {
        text.innerHTML = id + " a bien été retiré de votre liste de favoris." // Contenu de l'alerte
      }
  }
  setTimeout(() => { // 3 secondes plus tard
    alert.classList.replace('opacity-1', 'opacity-0'); // Cacher l'alerte
  }, 3000);
}

function loadFav() {
  buttons = document.querySelectorAll('.btn-fav');
  for (const button of buttons) { // Pour chaque bouton
    if (tabFav.includes(button.dataset.id) || tabFav.includes(reception())) { // Si la ville fait partie des favoris
      button.setAttribute('fill', 'red'); // Mettre à jour la couleur du coeur
    }
  }
}

function cleanFav() {
  localStorage.removeItem("favoris") // Nettoyage des favoris
  window.location.href = 'index.html' // Actualisation de la page
}

function changeFav(event) {
  var tabFav = JSON.parse(localStorage.getItem("favoris")) || []; // Récupération des favoris
  var id = event.target.dataset.id; // Récupération du nom de la ville
  if (id == null) {id = reception()}
  console.log(id)
  if (tabFav.includes(id)) { // Si la ville fait partie des favoris
    event.target.setAttribute('fill', 'none') // Mettre à jour la couleur du coeur
    index = tabFav.indexOf(id) // Récupération de l'index du favoris
    tabFav.splice(index, 1) // Suppression du favori
    localStorage.setItem("favoris", JSON.stringify(tabFav)) // Actualisation des favoris dans le stockage
    showAlert('success', -1, id)
  }
  else if (!tabFav.includes(id)) { // Si la ville ne fait pas partie des favoris
    event.target.setAttribute('fill', 'red'); // Mettre à jour la couleur du coeur
    tabFav.push(id) // Mise à jour du tableau
    localStorage.setItem("favoris", JSON.stringify(tabFav)) // Actualisation des favoris dans le stockage
    showAlert('success', 1, id)
  }
}

function removeFavF() {
  const checkedBoxes = document.querySelectorAll('input[type="checkbox"]:checked'); // Sélection de toutes les cases cochées
  for (const checkedBox of checkedBoxes) {
    index = checkedBox.id.split('-')[1]; // Récupération de l'index
    var cityToRemove = tabFav[index]; // Récupération de la ville à retirer
    tabFav.splice(cityToRemove, 1); // Suppression de la ville
  }
  localStorage.setItem('favoris', JSON.stringify(tabFav)); // Mise à jour du tableau de favoris
  location.reload(); // Raffraichissement de la page
}

function updateDelBtn() {
  button = document.getElementById('del-button');
  const checkedBoxes = document.querySelectorAll('input[type="checkbox"]:checked'); // Sélection des boutons cochés
  if (checkedBoxes.length >= 1) { // Si plus d'une case est cochée
    button.removeAttribute('disabled') // Activation du bouton
    button.classList.remove('cursor-not-allowed')
    button.innerHTML = `Retirer ${checkedBoxes.length} élément(s)`
  } else {
    button.setAttribute('disabled', true) // Désactivation du bouton
    button.classList.add('cursor-not-allowed')
    button.innerHTML = 'Retirer'
  }
}

function selectAll() {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]')
  for (const checkbox of checkboxes) {
    if (!checkbox.checked) {
      checkbox.checked = true
    }
  }
  updateDelBtn();
}