import { Login } from "./app/login.js";
import { Cadastro }  from "./app/cadastro.js";
import { showStatus }  from "./functions/showAlerts.js";
import { saveAccountBrowser , verifyIsLogged, getAccount }  from "./functions/localStorage.js";
import { Events } from "./app/Events.js";
import { loadEventsOnScreen, loadOneEventOnMyEvents, clearNewEventForm, loadAboutUniqueEvent } from "./manipulations.js";

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
            var sts = rt['status'];
            var reponse = rt['return'];
            showStatus('Entando...', 'success');
            saveAccountBrowser(loginString, reponse['id']);
            verifyIsLogged();
            window.location.href = '#home';
        } catch (error) {
            console.log(error);
            showStatus('Erro inesperado aconteceu...','danger');
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
            var sts = rt['status'];
            var reponse = rt['return'];
            showStatus('Cadastrado Com sucesso!<br>Entrando...', 'success');
            saveAccountBrowser(loginString, reponse['id']);
            verifyIsLogged();
            window.location.href = '#home';
            //do cookies
        } catch (error) {
            console.log(error);
            showStatus('Erro inesperado aconteceu...','danger');
        }
    }
});

//get events
function getEvents(hash) {
    var screen = hash ?? 'home';
    if(hash == 'home' || hash == null){
        console.log('carregar eventos gerais');
    } else if (hash == 'events'){
        console.log('carregar meus eventos');
    }

    var getE = new Events(getAccount()['id'] ?? '', '', '');
    var rt = getE.listEvents();
    
    loadEventsOnScreen(screen ,rt['return']);
}

$('body').on('click', '.btn-novo-evento', function(){
    $('.modalsevent-content').find("input[type=text], textarea").val("");
});

//create event
$('body').on('click','.btn-create-event', function () {
    var str = $('form#newevent-form').serializeArray();
    var verifyEmpty = 0;
    for (let i = 0; i < str.length; i++) {
         if (str[i]['value'] == '') {
             verifyEmpty++;
         }
    }
    if (verifyEmpty >= 1) {
        showStatus('Campos em Branco!', 'danger');
        clearNewEventForm();
    }else {
        showStatus('OK!', 'success');
        loadOneEventOnMyEvents(str, 4, true);
        clearNewEventForm();
        $('#createModal').modal('hide');

    }
});

//show modal delete event
$('body').on('click','.btn-delete-event', function () {
    var info = $(this).attr('rel');
    info = info.split('|');
    $('.modal-body-default').html('<p>Deletar evento: <b>'+info[1]+'</b></p>');
    $('.modal-footer-default').html('<button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button><button type="button" class="btn btn-danger btn-delete-sure-event" rel="'+info[0]+'" data-dismiss="modal">Deletar</button>');
});

//delete event
$('body').on('click', '.btn-delete-sure-event', function () {
   var idCardEvent = $(this).attr('rel');
   $('.added-id-'+idCardEvent).hide('slow');
   $('.added-id-'+idCardEvent).addClass('deleting-event');
   setTimeout(function () {
    $('.added-id-'+idCardEvent).remove();
    var quantityEvents = document.querySelector('.list-events');
    if (quantityEvents.childElementCount == 0) {
        quantityEvents.innerHTML = "Você não criou nenhum Evento ainda <br> clique no botão acima para começar!";
    }
   }, 400);
});

//show modal update Event
$('body').on('click', '.btn-update-event', function () {
   var idEvent = $(this).attr('rel');

   var getE = new Events(getAccount()['id'] ?? '', idEvent, '');
   var rt = getE.getUniqueEvent();

   var moreOne;
   $('#updateevent-form').hide('fast');
   $('.modalsevent-content').prepend('<div class="spinner-border" role="status"><span class="sr-only">Loading...</span></div>');
   $('#updateevent-form').html('<input class="input" type="hidden" name="id" id="id"><input class="input" type="text" name="title" id="title" placeholder="title"><textarea style="height: 150px;" class="input" type="text" name="description" id="description" placeholder="description"></textarea>');
   rt['datestimes'].map(function (data, i) {
    moreOne = i+1;
        $('#updateevent-form').append('<p><b>DIA '+moreOne+'</b></p>Dia do Evento: <input class="input data-camp-for-count" name="date-'+moreOne+'" id="date-'+moreOne+'" type="date">Início: <input class="input" name="time-inicio-'+moreOne+'" id="time-inicio-'+moreOne+'" type="time">Termino: <input class="input" name="time-termino-'+moreOne+'" id="time-termino-'+moreOne+'" type="time">');
   });

   var serialization = $('#updateevent-form').serializeArray();

   serialization.map(function (camps, i) {
    $('#updateevent-form #'+camps['name']).val(rt[camps['name']]);
   });

   rt['datestimes'].map(function (data, i) {
    $('#updateevent-form #date-'+(i+1)).val(data['day']);
    $('#updateevent-form #time-inicio-'+(i+1)).val(data['inicio']);
    $('#updateevent-form #time-termino-'+(i+1)).val(data['termino']);
   });


   setTimeout(function () {
    $('.spinner-border').remove();
    $('#updateevent-form').show();
   }, 300);
});

$('body').on('click', '.btn-update-work', function () {
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
    }else {
        serialization.splice(0,1);
        showStatus('Atualizado com Sucesso!', 'success');
        $('.added-id-'+idCardEvent).remove();
        loadOneEventOnMyEvents(serialization, idCardEvent, false);
        $('#updateModal').modal('hide');

    }

});

function getEventInformations(idEvent) {
    var getE = new Events(getAccount()['id'] ?? '', idEvent, '');
    var rt = getE.getUniqueEvent();
    loadAboutUniqueEvent(rt);
}

export{getEvents, getEventInformations}