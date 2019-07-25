document.getElementById('create-styles').onclick = () => {
  const createTheme = (document.getElementById('generateThemes') as HTMLOptionElement).value
  parent.postMessage({
    pluginMessage: {
      type: 'create-styles', createTheme } }, '*' )
}

document.getElementById('switch-styles').onclick = () => {
  const newThemeName = (document.getElementById('themes') as HTMLOptionElement).value
  parent.postMessage({ pluginMessage: { type: 'switch-styles', newThemeName } }, '*')
}

document.getElementById('relink-styles').onclick = () => {
  const newThemeName = (document.getElementById('themes') as HTMLOptionElement).value
  parent.postMessage({ pluginMessage: { type: 'relink-styles', newThemeName } }, '*')
}

document.getElementById('create-custom').onclick = () => {
  const newTheme = <any>(document.getElementById('custom-theme'))
  const newThemeCode = newTheme.value
  parent.postMessage({ pluginMessage: { type: 'create-custom', newThemeCode } }, '*')
}

// document.getElementById('load-themes').onclick = () => {
//   parent.postMessage({ pluginMessage: { type: 'load-themes'} }, '*')
// }

const tabButtonGenerate = document.getElementById('tab-button-generate')
const tabButtonTheme = document.getElementById('tab-button-theme')
const tabButtonCreate = document.getElementById('tab-button-create')
const tabButtonGuide = document.getElementById('tab-button-guide')

const tabContentGenerate = document.getElementById('contentGenerate')
const tabContentTheme = document.getElementById('contentTheme')
const tabContentCreate = document.getElementById('contentCreate')
const tabContentGuide = document.getElementById('contentGuide')

function addActive(button, content){
  button.classList.add('active')
  content.classList.add('active')

  // let page = button.id
  // page = page.substr(11)
  // parent.postMessage({ pluginMessage: { type: 'update-size', page } }, '*')
}

function removeActive(){
  var activeItems = document.querySelectorAll('.active');
  [].forEach.call(activeItems, function (el) {
    el.classList.remove('active');
  });
}

tabButtonGenerate.onclick = function() {
  removeActive()
  addActive(tabButtonGenerate, tabContentGenerate)
}

tabButtonTheme.onclick = function() {
  removeActive()
  addActive(tabButtonTheme, tabContentTheme)
}

tabButtonCreate.onclick = function() {
  removeActive()
  addActive(tabButtonCreate, tabContentCreate)
}

tabButtonGenerate.click()