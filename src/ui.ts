document.getElementById('create-styles').onclick = () => {
  let icon = <HTMLElement>document.getElementById('create-styles').querySelector('.icon-loader')
  let text = <HTMLElement>document.getElementById('create-styles').querySelector('.text')
  icon.style.display = "block"
  text.style.display = "none"

  let themes = []
  let themeItems = document.querySelectorAll('input[type=checkbox]:checked');
  themeItems.forEach(t => {
    themes.push(t.id)
  })
  
  setTimeout(function(){
    parent.postMessage({ pluginMessage: { type: 'create-styles', themes }}, '*')
  }, 100)
}

document.getElementById('switch-styles').onclick = () => {
  const newThemeName = (document.getElementById('themes') as HTMLOptionElement).value
  document.getElementById('swap-validation').classList.add('hidden')
  parent.postMessage({ pluginMessage: { type: 'switch-styles', newThemeName } }, '*')
}

document.getElementById('relink-styles').onclick = () => {
  let icon = <HTMLElement>document.getElementById('relink-styles').querySelector('.icon-loader')
  let text = <HTMLElement>document.getElementById('relink-styles').querySelector('.text')
  icon.style.display = "block"
  text.style.display = "none"
  document.getElementById('swap-validation').classList.add('hidden')
  const newThemeName = (document.getElementById('themes') as HTMLOptionElement).value
  setTimeout(function () {
    parent.postMessage({ pluginMessage: { type: 'relink-styles', newThemeName } }, '*')
  }, 100)
}

document.getElementById('create-custom').onclick = () => {
  let icon = <HTMLElement>document.getElementById('create-custom').querySelector('.icon-loader')
  let text = <HTMLElement>document.getElementById('create-custom').querySelector('.text')
  icon.style.display = "block"
  text.style.display = "none"
  const newTheme = <any>(document.getElementById('custom-theme'))
  const newThemeCode = newTheme.value
  setTimeout(function () {
    parent.postMessage({ pluginMessage: { type: 'create-custom', newThemeCode } }, '*')
  }, 100)
}

document.getElementById('load-themes').onclick = () => {
  parent.postMessage({ pluginMessage: { type: 'load-themes' } }, '*')
}

document.getElementById('all').onclick = () => {
  toggleCheckboxes()
}

const tabButtonGenerate = document.getElementById('tab-button-generate')
const tabButtonTheme = document.getElementById('tab-button-theme')
const tabButtonCreate = document.getElementById('tab-button-create')
const tabButtonGuide = document.getElementById('tab-button-guide')

const tabContentGenerate = document.getElementById('contentGenerate')
const tabContentTheme = document.getElementById('contentTheme')
const tabContentCreate = document.getElementById('contentCreate')
const tabContentGuide = document.getElementById('contentGuide')

function addActive(button, content) {
  button.classList.add('active')
  content.classList.add('active')

  // let page = button.id
  // page = page.substr(11)
  // parent.postMessage({ pluginMessage: { type: 'update-size', page } }, '*')
}

function removeActive() {
  var activeItems = document.querySelectorAll('.active');
  [].forEach.call(activeItems, function (el) {
    el.classList.remove('active');
  });
}

tabButtonGenerate.onclick = function () {
  removeActive()
  addActive(tabButtonGenerate, tabContentGenerate)
}

tabButtonTheme.onclick = function () {
  removeActive()
  addActive(tabButtonTheme, tabContentTheme)
}

tabButtonCreate.onclick = function () {
  removeActive()
  addActive(tabButtonCreate, tabContentCreate)
}

tabButtonGenerate.click()
document.getElementById('load-themes').click()

let dropdown = <HTMLSelectElement>document.getElementById('themes')
let validation = document.getElementById('swap-validation')

onmessage = (event) => {
  const pluginMessage = event.data.pluginMessage
  if (pluginMessage.type == 'loadThemes') {

    let themeNames = pluginMessage.themeNames[0]
    if (themeNames.length > 0) {
      // Remove placeholder item
      dropdown.options[0] = null
      document.getElementById('switch-styles').classList.remove('disabled')
      document.getElementById('relink-styles').classList.remove('disabled')

      themeNames.forEach((t: any, index: number) => {
        // add options to select dropdown
        let option = document.createElement('option')
        let name = t
        name = name.replace(/-+/g, ' ')
        name = name.replace(/\b\w/g, (l: any) => l.toUpperCase())
        option.text = name
        option.value = t
        dropdown.add(option, index);
      })
    }

  }

  if (pluginMessage.type === 'relinkStyles' && pluginMessage.complete == true) {
    let icon = <HTMLElement>document.getElementById('relink-styles').querySelector('.icon-loader')
    let text = <HTMLElement>document.getElementById('relink-styles').querySelector('.text')
    icon.style.display = "none"
    text.style.display = "block"
  }

  if (pluginMessage.type === 'relinkStyles' && pluginMessage.selectionEmpty == true) {
    validation.classList.remove('hidden')
    let icon = <HTMLElement>document.getElementById('relink-styles').querySelector('.icon-loader')
    let text = <HTMLElement>document.getElementById('relink-styles').querySelector('.text')
    icon.style.display = "none"
    text.style.display = "block"
  }

}

function toggleCheckboxes() {
  let checkboxes = document.getElementsByName('checkbox')
  let toggleButton = <HTMLInputElement>document.getElementById('all')
  if(toggleButton.checked){
    console.log('Check everything')
    checkboxes.forEach(c => {
      let check = <HTMLInputElement>document.getElementById(c.id);
      check.checked = true
    })
  } else {
    console.log('Uncheck everything')
    checkboxes.forEach(c => {
      let check = <HTMLInputElement>document.getElementById(c.id);
      check.checked = false
    })
    
  }
}