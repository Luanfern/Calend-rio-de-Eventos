import * as component from "./component.js";
import { verifyIsLogged, exit }  from "./functions/localStorage.js";
import {getEvents, getEventInformations} from "./controller.js";

$(window).on('hashchange', function () {
    changeContentHash();
});

function changeContentHash() {
    var hash = new URL(document.URL).hash;
    hash = hash.replace('#', '');
    if (hash.length == 0) {
        hash = 'home';
    }

     var acao = hash.split("=");

    if (acao[0] == 'event') {
        hash = acao[0];
        loadNewContent(hash);
        setTimeout( async function () {
            $('#content-event').hide();
            getEventInformations(acao[1]);
        }, 10);
        return;
    }

    loadNewContent(hash);

    setTimeout( async function () {
        await getEvents(hash);
    }, 200);
}

$('body').on('click', '.nav-item', function () {
    $('.navbar-toggler').click();
});

function loadNewContent(screen) {
    var componentInfo = new component.Component(
        "app-content",
        "componentes/Pages/" + screen + "/" + screen + ".html",
        "componentes/Pages/" + screen + "/" + screen + ".css",
    );
    var retContent = componentInfo.fileContent();
    loadOnTags(retContent);
}

var componentsLoad = [{
        "tag": "app-header",
        "html": "componentes/header/header.html",
        "css": "componentes/header/header.css"
    },
    {
        "tag": "app-footer",
        "html": "componentes/footer/footer.html",
        "css": "componentes/footer/footer.css"
    },
    {
        "tag": "app-content",
        "html": "componentes/Pages/home/home.html",
        "css": "componentes/Pages/home/home.css"
    },
];
document.head.appendChild(document.createElement('style'));
var stlSelection = document.querySelector('style');

$(window).load(function () {

    var hash = new URL(document.URL).hash;
    hash = hash.replace('#', '');

    //jQuery LOAD function
    componentsLoad.map(function (comp) {
        var componentInfo = new component.Component(comp.tag, comp.html, comp.css);
        var retContent = componentInfo.fileContent();
        loadOnTags(retContent);
    });
    setTimeout(function(){
        verifyIsLogged();
        changeContentHash();
       }, 50);
});

function loadOnTags(retContent) {
    retContent.then((value) => {
        document.querySelector(value.tag).innerHTML = value.contentHtml;
        stlSelection.innerHTML = stlSelection.textContent + value.contentCss;
    });
}

$('body').on('click', '.btn-exit-account', function(){
    console.log('sair da conta!');
    exit();
});