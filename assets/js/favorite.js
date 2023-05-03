var tabFav = JSON.parse(localStorage.getItem("favoris")) || [];

function showAlert(type, status_code=0, id=null) {
  var alert = document.getElementById('alert-' + type);
  var text = document.getElementById('alert-text');
  alert.classList.replace('opacity-0', 'opacity-1');
  if (type == 'warning') {
    text.innerHTML = "L'historique est vide."
  } else if (type == 'success') {
      if (status_code == 1) {
        text.innerHTML = id + " a bien été ajouté à votre liste de favoris."
      } else if (status_code == -1) {
        text.innerHTML = id + " a bien été retiré de votre liste de favoris."
      }
  }
  setTimeout(() => {
    alert.classList.replace('opacity-1', 'opacity-0');
  }, 3000);
}

function loadFav() {
  buttons = document.querySelectorAll('.btn-fav');
  for (const button of buttons) {
    if (tabFav.includes(button.dataset.id)) {
      button.setAttribute('fill', 'red');
    }
  }
}

function cleanFav() {
  localStorage.clear()
  window.location.href = 'index.html'
}

function changeFav(event) {
  var tabFav = JSON.parse(localStorage.getItem("favoris")) || [];
  var id = event.target.dataset.id;
  if (tabFav.includes(id)) {
    event.target.setAttribute('fill', 'none')
    index = tabFav.indexOf(id)
    tabFav.splice(index, 1)
    localStorage.setItem("favoris", JSON.stringify(tabFav))
    showAlert('success', -1, id)
  }
  else if (!tabFav.includes(id)) {
    event.target.setAttribute('fill', 'red');
    tabFav.push(id)
    localStorage.setItem("favoris", JSON.stringify(tabFav))
    showAlert('success', 1, id)
  }
}

function removeFavF() {
  const checkedBoxes = document.querySelectorAll('input[type="checkbox"]:checked');
  for (const checkedBox of checkedBoxes) {
    index = checkedBox.id.split('-')[1];
    var cityToRemove = tabFav[index];
    tabFav.splice(cityToRemove, 1);
  }
  localStorage.setItem('favoris', JSON.stringify(tabFav));
  location.reload();
}

function updateDelBtn() {
  button = document.getElementById('del-button');
  const checkedBoxes = document.querySelectorAll('input[type="checkbox"]:checked');
  if (checkedBoxes.length >= 1) {
    button.removeAttribute('disabled')
    button.classList.remove('cursor-not-allowed')
    button.innerHTML = `Retirer ${checkedBoxes.length} élément(s)`
  } else {
    button.setAttribute('disabled', true)
    button.classList.add('cursor-not-allowed')
    button.innerHTML = 'Retirer'
  }
}