function toggleWindow() {
  var nouvelleFenetre = window.open('colors.html', 'Choix du thème' , 'width=500,height=500, autoHideMenuBar=true');
}

function loadTheme() {
  const theme = localStorage.getItem('theme') || 'bg-gray-900'
  const body = document.body
  body.classList.replace('bg-black', theme)
  const selected = document.getElementsByClassName(theme)[1]
  selected.classList.add('border-2', 'border-white')
}

function updateTheme(event) {
  const newTheme = event.target.classList[0];
  const body = document.body;
  const oldTheme = body.classList[0];
  const oldCompo = document.getElementsByClassName(oldTheme)[1]
  body.classList.replace(oldTheme, newTheme);
  event.target.classList.add('border-2', 'border-white');
  event.target.setAttribute('onclick', '')
  oldCompo.classList.remove('border-2', 'border-white');
  oldCompo.setAttribute('onclick', 'updateTheme(event)')
}

function triggerConf(event) {
  const theme = event.target.classList[0]
  const choice = confirm("Voulez-vous vraiment utiliser ce thème ?")
  if (choice) {
    localStorage.setItem('theme', theme)
    loadTheme()
    window.close()
  }
}

function getTheme() {
  const newTheme = localStorage.getItem('theme')
  const oldtheme = document.getElementsByTagName('nav')[0].classList[0]
  const components = document.querySelectorAll('.' + oldtheme)
  for (const component of components) {
    component.classList.replace(oldtheme, newTheme)
  }
}