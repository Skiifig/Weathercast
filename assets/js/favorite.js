function showAlert(id, type) {
  var alert = document.getElementById('alert-' + type);
  var text = document.getElementById('alert-text')
  alert.classList.replace('opacity-0', 'opacity-1');
  if (type == 'danger') {
    text.innerHTML = "Cette ville n'a pas pu être ajouter à votre liste de favoris."
  } else {
    text.innerHTML = id + " a bien été ajouté à votre liste de favoris."
  }
  setTimeout(() => {
    alert.classList.replace('opacity-1', 'opacity-0');
  }, 5000);
}

function loadFav() {
  tabFav = localStorage.getItem('favoris');
  buttons = document.querySelectorAll('.btn-fav');
  for (const button of buttons) {
    if (tabFav.includes(button.dataset.id)) {
      button.setAttribute('fill', 'red');
    }
  }
}

function changeFav(event) {
  var tabFav = JSON.parse(localStorage.getItem("favoris")) || [];
  var id = event.target.dataset.id;
  if (id == undefined) {
    showAlert(id, 'danger')
  }
  else if (!tabFav.includes(id)) {
    event.target.setAttribute('fill', 'red');
    tabFav.push(id)
    showAlert(id, 'success')
  }
  localStorage.setItem("favoris", JSON.stringify(tabFav))
}