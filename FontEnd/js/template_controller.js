import * as component from "./component.js";

var componentsLoad = [
    {"tag": "app-header","html": "componentes/header/header.html", "css": "componentes/header/header.css"},
];
document.head.appendChild(document.createElement('style'));
componentsLoad.map(function (comp, index) {
    var styleComplete = '';
    var componentInfo = new component.Component(comp.tag,comp.html,comp.css);
    var retContent = componentInfo.fileContent();
    retContent.then((value) => {
        document.querySelector(value.tag).innerHTML  = value.contentHtml;
        styleComplete += value.contentCss;

        if (componentsLoad.length == index+1) {
            var stlSelection = document.querySelector('style');
            stlSelection.innerHTML = styleComplete;
        }
    }); 
});