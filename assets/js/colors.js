function toggleWindow() {
  var nouvelleFenetre = window.open('colors.html', 'Choix du thème' , 'width=500,height=500, autoHideMenuBar=true'); // Création d'une nouvelle fenêtre de sélection de couleur
}

function loadTheme() {
  const theme = localStorage.getItem('theme') || 'bg-gray-900' // Sélection du thème actuel
  const body = document.body
  body.classList.replace('bg-black', theme) // Mise à jour des classes
  const selected = document.getElementsByClassName(theme)[1]
  selected.classList.add('border-2', 'border-white') // Mise à jour dans la fenêtre du thème
}

function updateTheme(event) {
  const newTheme = event.target.classList[0];
  const body = document.body;
  const oldTheme = body.classList[0];
  const oldCompo = document.getElementsByClassName(oldTheme)[1];
  body.classList.replace(oldTheme, newTheme);
  event.target.classList.add('border-2', 'border-white');
  event.target.setAttribute('onclick', '');
  oldCompo.classList.remove('border-2', 'border-white');
  oldCompo.setAttribute('onclick', 'updateTheme(event)');
}

function triggerConf(event) {
  const theme = event.target.classList[0]
  const choice = confirm("Voulez-vous vraiment utiliser ce thème ?");
  if (choice) { // Si oui
    localStorage.setItem('theme', theme); // Mise à jour dans le stockage local
    loadTheme(); // Chargement du nouveau thème
    window.close(); // Fermeture de la fenêtre
  }
}

function getTheme() {
  const newTheme = localStorage.getItem('theme')
  const oldtheme = document.getElementsByTagName('nav')[0].classList[0] // Recherche de l'ancien thème
  const components = document.querySelectorAll('.' + oldtheme) // Séléction des composants à changer
  for (const component of components) {
    component.classList.replace(oldtheme, newTheme) // Mise à jour du thème
  }
}