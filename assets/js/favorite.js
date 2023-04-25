function addFav(event) {
  event.target.setAttribute('fill', 'red');
  idFav.push(event.target.dataset.id)
}

function removeFav(event) {
  event.target.setAttribute('fill', 'none');
  let index = idFav.indexOf(event.target.dataset.id)
  if (index != -1) {
    idFav.splice(index, 1)
  }
}

function changeFav(event) {
  if (!idFav.includes(event.target.dataset.id)) {
    addFav(event)
  } else {
    removeFav(event)
  }
  localStorage.setItem('Favoris', idFav)
  console.log(idFav)
}

function getFav() {
  try {
    var idFav = localStorage.getItem('Favoris')
  } catch (error) {
    var idFav = []
  }
  console.log(idFav)
}