document.getElementById('create-styles').onclick = function () {
    parent.postMessage({ pluginMessage: { type: 'create-styles' } }, '*');
};
document.getElementById('switch-styles').onclick = function () {
    var newThemeName = document.getElementById('themes').value;
    parent.postMessage({ pluginMessage: { type: 'switch-styles', newThemeName: newThemeName } }, '*');
};
// document.getElementById('create').onclick = () => {
//   const textbox = document.getElementById('count') as HTMLButtonElement;
//   const count = parseInt(textbox.value, 10);
//   parent.postMessage({ pluginMessage: { type: 'create-rectangles', count } }, '*')
// }
// document.getElementById('cancel').onclick = () => {
//   parent.postMessage({ pluginMessage: { type: 'cancel' } }, '*')
// }
