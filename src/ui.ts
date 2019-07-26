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

document.getElementById('load-themes').onclick = () => {
  parent.postMessage({ pluginMessage: { type: 'load-themes'} }, '*')
  
}

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
document.getElementById('load-themes').click()

let dropdown = <HTMLSelectElement>document.getElementById('themes')
onmessage = (event) => {

  if (event.data.pluginMessage.type == 'loadThemes') {
    
    let themeNames = event.data.pluginMessage.themeNames[0]
    console.log(themeNames)
    themeNames.forEach((t:any, index:number) => {
      
        // add options to select dropdown
        let option = document.createElement('option')
        let name = t
        name = name.replace(/-+/g, ' ')
        name = name.replace(/\b\w/g, (l:any) => l.toUpperCase())
				option.text = name
				option.value = t
				dropdown.add(option, index);
    })

  }

}