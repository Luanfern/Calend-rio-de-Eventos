import {
    Login
} from "./app/login.js";
import {
    Cadastro
} from "./app/cadastro.js";
import {
    showStatus
} from "./functions/showAlerts.js";
import {
    saveAccountBrowser,
    verifyIsLogged,
    getAccount
} from "./functions/localStorage.js";
import {
    Events
} from "./app/Events.js";
import {
    loadEventsOnScreen,
    loadOneEventOnMyEvents,
    clearNewEventForm,
    loadAboutUniqueEvent
} from "./manipulations.js";

//Codigo login
$('body').on('click', 'button.btn-entrar-login', async function () {
    var str = $("form#login-form").serializeArray();

    var loginString = $('#login').val();
    var passwordString = $('#password').val();

    if (loginString === '' || passwordString === '') {
        showStatus('Campos em Branco!', 'danger');

    } else {
        var lg = new Login(str);
        try {
            var rt = await lg.loginAction();
            var reponse = rt['return'];
            if (reponse['status'] == 'ci') {
                showStatus('Credenciais Inválidas...', 'danger');
            } else {
                showStatus('Entando...', 'success');
                saveAccountBrowser(loginString, reponse['id']);
                verifyIsLogged();
                window.location.href = '#home';
            }
        } catch (error) {
            console.log(error);
            showStatus('Erro inesperado aconteceu...', 'danger');
        }
    }
});

//Codigo Cadastro
$('body').on('click', 'button.btn-entrar-cadastro', async function () {
    var str = $("form#cadastro-form").serializeArray();

    var emailString = $('#email').val();
    var loginString = $('#login').val();
    var passwordString = $('#password').val();

    if (loginString === '' || passwordString === '' || emailString === '') {
        showStatus('Campos em Branco!', 'danger');
    } else {
        var lg = new Cadastro(str);
        try {
            var rt = await lg.cadastroAction();
            var reponse = rt['return'];
            if (reponse['status'] == 'du') {
                showStatus('Dados já utilizados. Tente outros...', 'danger');
            } else {
                showStatus('Cadastrado Com sucesso!<br>Entrando...', 'success');
                saveAccountBrowser(loginString, reponse['id']);
                verifyIsLogged();
                window.location.href = '#home';
            }
        } catch (error) {
            console.log(error);
            showStatus('Erro inesperado aconteceu...', 'danger');
        }
    }
});

//get events
async function getEvents(hash) {
    var screen = hash ?? 'home';
    if (hash == 'home' || hash == null) {
        console.log('carregar eventos gerais');
        await loadEvents(screen);
    } else if (hash == 'events') {
        console.log('carregar meus eventos');
        await loadEvents(screen, getAccount()['id']);
    }
}

async function loadEvents(screen, idAccountMyEvents = '') {
    var getE = new Events(idAccountMyEvents, '', '');
    try {
        var rt = await getE.listEvents();
        if (rt['status'] == 'erro') {
            var classAddList = $('.list-events');
            classAddList.html('<br><br><div class="spinner-border" role="status"><span class="sr-only">Loading...</span></div><br><p>Erro ao buscar dados. Tetando novamente...</p>');
            loadEvents(idAccountMyEvents);
        } else {
            loadEventsOnScreen(screen, rt['return']);
        }
    } catch (error) {
        console.log(error);
        showStatus('Erro inesperado aconteceu...', 'danger');
    }
}

$('body').on('click', '.btn-novo-evento', function () {
    $('.modalsevent-content').find("input[type=text], textarea").val("");
});

//create event
$('body').on('click', '.btn-create-event', async function () {
    var str = $('form#newevent-form').serializeArray();
    var verifyEmpty = 0;
    for (let i = 0; i < str.length; i++) {
        if (str[i]['value'] == '') {
            verifyEmpty++;
        }
    }
    if (verifyEmpty >= 1) {
        showStatus('Campos em Branco!', 'danger');
    } else {
        var getE = new Events(getAccount()['id'] ?? '', '', str);
        try {
            var rt = await getE.createEvent();
            if (rt['status'] == 'ok') {
                showStatus('Evento Criado com sucesso!', 'success');
                loadOneEventOnMyEvents(str, rt['idEvent'], true);
                clearNewEventForm();
                $('#createModal').modal('hide');
            }else{
                showStatus('Evento já criado!', 'warning');
            }
        } catch (error) {
            console.log(error);
            showStatus('Erro inesperado aconteceu...', 'danger');
        }
    }
});

//show modal delete event
$('body').on('click', '.btn-delete-event', function () {
    var info = $(this).attr('rel');
    info = info.split('|');
    $('.modal-body-default').html('<p>Deletar evento: <b>' + info[1] + '</b></p>');
    $('.modal-footer-default').html('<button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button><button type="button" class="btn btn-danger btn-delete-sure-event" rel="' + info[0] + '">Deletar</button>');
});

//delete event
$('body').on('click', '.btn-delete-sure-event', async function () {
    var idCardEvent = $(this).attr('rel');

    var getE = new Events(getAccount()['id'] ?? '', idCardEvent);
    try {
        var rt = await getE.deleteEvent();
        if (rt['status'] == 'ok') {
            $('.added-id-' + idCardEvent).hide('slow');
            $('.added-id-' + idCardEvent).addClass('deleting-event');
            setTimeout(function () {
                $('.added-id-' + idCardEvent).remove();
                var quantityEvents = document.querySelector('.list-events');
                if (quantityEvents.childElementCount == 0) {
                    quantityEvents.innerHTML = "Você não criou nenhum Evento ainda <br> clique no botão acima para começar!";
                }
            }, 400);
            $('#genericModal').modal('hide');
        }else{
            showStatus('Erro ao deletar evento!', 'warning');
        }
    } catch (error) {
        console.log(error);
        showStatus('Erro inesperado aconteceu...', 'danger');
    }
});

//show modal update Event
$('body').on('click', '.btn-update-event', async function () {
    var idEvent = $(this).attr('rel');

    var getE = new Events(getAccount()['id'] ?? '', idEvent, '');
    var rt = await getE.getUniqueEvent();
    rt = rt['return'];

    console.log(rt);

    var moreOne;
    $('#updateevent-form').hide('fast');
    $('.modalsevent-content').prepend('<div class="spinner-border" role="status"><span class="sr-only">Loading...</span></div>');
    $('#updateevent-form').html('<input class="input" type="hidden" name="id" id="id"><input class="input" type="text" name="title" id="title" placeholder="title"><textarea style="height: 150px;" class="input" type="text" name="description" id="description" placeholder="description"></textarea>');

    rt['datestimes'].map(function (data, i) {
        moreOne = i + 1;
        console.log(moreOne);
        $('#updateevent-form').append('<p><b>DIA ' + moreOne + '</b></p>Dia do Evento: <input class="input data-camp-for-count" name="date-' + moreOne + '" id="date-' + moreOne + '" type="date">Início: <input class="input" name="time-inicio-' + moreOne + '" id="time-inicio-' + moreOne + '" type="time">Termino: <input class="input" name="time-termino-' + moreOne + '" id="time-termino-' + moreOne + '" type="time">');
    });

    var serialization = $('#updateevent-form').serializeArray();

    serialization.map(function (camps, i) {
        $('#updateevent-form #' + camps['name']).val(rt[camps['name']]);
    });

    rt['datestimes'].map(function (data, i) {
        for (var key in data) {
            $('#updateevent-form #date-' + (i + 1)).val(key);
            var timeSplit = data[key].split(' até ');
            console.log(key);
            $('#updateevent-form #time-inicio-' + (i + 1)).val(timeSplit[0]);
            $('#updateevent-form #time-termino-' + (i + 1)).val(timeSplit[1]);
         }
    });


    setTimeout(function () {
        $('.spinner-border').remove();
        $('#updateevent-form').show();
    }, 300);
});

$('body').on('click', '.btn-update-work', async function () {
    var serialization = $('#updateevent-form').serializeArray();
    var idCardEvent = serialization[0]['value'];

    var verifyEmpty = 0;
    for (let i = 0; i < serialization.length; i++) {
        if (serialization[i]['value'] == '') {
            verifyEmpty++;
        }
    }
    if (verifyEmpty >= 1) {
        showStatus('Algum Campo em Branco!', 'danger');
    } else {
        var getE = new Events(getAccount()['id'] ?? '', '',serialization);
        try {
            var rt = await getE.updateEvent();
            if (rt['status'] == 'ok') {
                serialization.splice(0, 1);
                showStatus('Atualizado com Sucesso!', 'success');
                $('.added-id-' + idCardEvent).remove();
                loadOneEventOnMyEvents(serialization, idCardEvent, false);
                $('#updateModal').modal('hide'); 
            }else{
                showStatus('Erro ao Atualizar!', 'danger');
            }
        } catch (error) {
            console.log(error);
            showStatus('Erro inesperado aconteceu...', 'danger');
        }
    }
    $('#updateevent-form').html("");
});

async function getEventInformations(idEvent) {
    var getE = new Events(getAccount()['id'] ?? '', idEvent, '');
    try {
        var rt = await getE.getUniqueEvent();
        if (rt['status'] == 'erro') {
            $('#loading-informations-event').html('<br><br><div class="spinner-border" role="status"><span class="sr-only">Loading...</span></div><br><p>Erro ao carregar Evento. Tetando novamente...</p>');
            await getEventInformations(idEvent);
        } else {
            loadAboutUniqueEvent(rt['return']);
        }
    } catch (error) {
        showStatus('Erro inesperado aconteceu...', 'danger');
    }
}

export {
    getEvents,
    getEventInformations
}