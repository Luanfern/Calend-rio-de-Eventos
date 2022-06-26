import {
    showStatus
} from "./showAlerts.js";

function verifyIsLogged() {
    var currentUser = {
        "login": localStorage.getItem("login"),
        "id": localStorage.getItem("id")
    }

    console.log(currentUser);

    if (currentUser['login'] != null || currentUser['id'] != null) {
        showStatus('Bem Vindo, ' + currentUser['login'], 'info ');
        $('.menu-add-tile').html('');
        console.log('logado');
        var logado = "<li class=\"nav-item active\"><a class=\"nav-link\" href=\"#home\">Home</a></li><li class=\"nav-item active\"><a class=\"nav-link\" href=\"#events\">Meus Eventos</a></li><li class=\"nav-item active\"><a class=\"nav-link\" href=\"#notifications\">Notificações</a></li><li class=\"nav-item active btn-exit-account\"><a class=\"nav-link\" href=\"#home\" style=\" color: red;\">Sair</a></li>";
        $('.menu-add-tile').append(logado);
        
    } else {
        showStatus('Bem Vindo!', 'info ');
        $('.menu-add-tile').html('');
        console.log('deslogado');
        var deslogado = "<li class=\"nav-item active\"><a class=\"nav-link\" href=\"#home\">Home</a></li><li class=\"nav-item active\"><a class=\"nav-link\" href=\"#login\">Logar</a></li><li class=\"nav-item active\"><a class=\"nav-link\" href=\"#cadastro\">Cadastrar-se</a></li>";
        $('.menu-add-tile').append(deslogado);
        console.log('deslogado!');
    }
}

function saveAccountBrowser(login, id) {
    localStorage.setItem("login", login);
    localStorage.setItem("id", id);
}

function exit() {
    localStorage.removeItem("login");
    localStorage.removeItem("id");
    window.location.href = "#home";
    verifyIsLogged();
}

function getAccount(){
    var currentUser = {
        "login": localStorage.getItem("login"),
        "id": localStorage.getItem("id")
    }
    return currentUser;
}

export {
    getAccount,
    exit,
    verifyIsLogged,
    saveAccountBrowser
}