var days = 1;

//manipulation quantity add days on create
$('body').on('click', '.add-day-new-event', function () {
    if (days < 1) {
        days = 1;
    }
    days++;
    $('body #newevent-form').append('<p class="day-'+days+'"><b>DIA '+days+'</b>  <button data-toggle="modal" data-target="#genericModal" class="icon remove-day-new-event" rel="'+days+'" type="button"><ion-icon name="remove" size="small"></ion-icon></button></p><div class="day-'+days+'">Dia do Evento: </div><input class="input" name="date-'+days+'" id="date-'+days+'" type="date"><div class="day-'+days+'">Início: </div><input class="input" name="time-inicio-'+days+'" id="time-inicio-'+days+'" type="time"><div class="day-'+days+'">Termino: </div><input class="input" name="time-termino-'+days+'" id="time-termino-'+days+'" type="time">');
});

//manipulation quantity remove days on create
$('body').on('click', '.remove-day-new-event', function () {
    var day = $(this).attr('rel');
    $('.modal-body-default').html('<p>Deletar configurações do dia: <b>'+day+'</b></p>');
    $('.modal-footer-default').html('<button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button><button type="button" class="btn btn-danger btn-remove-sure-day-form-create" rel="'+day+'" data-dismiss="modal">Deletar</button>');
});

$('body').on('click','.btn-remove-sure-day-form-create', function () {
    days--;
    console.log('removendo!!!');
    var day = $(this).attr('rel');
    $('#date-'+day).remove();
    $('#time-inicio-'+day).remove();
    $('#time-termino-'+day).remove();
    $('.day-'+day).remove(); 
});


//manipulation quantity add days on update
$('body').on('click', '.add-day-update-event', function () {
    var form = $('body #updateevent-form');
    var newDate = form.children('.data-camp-for-count').length + 1;
    form.append('<p class="day-'+newDate+'"><b>DIA '+newDate+'</b>  <button data-toggle="modal" data-target="#genericModal" class="icon remove-day-update-event" rel="'+newDate+'" type="button"><ion-icon name="remove" size="small"></ion-icon></button></p><div class="day-'+newDate+'">Dia do Evento: </div><input class="input" name="date-'+newDate+'" id="date-'+newDate+'" type="date"><div class="day-'+newDate+'">Início: </div><input class="input" name="time-inicio-'+newDate+'" id="time-inicio-'+newDate+'" type="time"><div class="day-'+newDate+'">Termino: </div><input class="input" name="time-termino-'+newDate+'" id="time-termino-'+newDate+'" type="time">');
});

//manipulation quantity remove days on update
$('body').on('click', '.remove-day-update-event', function () {
    var day = $(this).attr('rel');
    $('.modal-body-default').html('<p>Deletar configurações do dia: <b>'+day+'</b></p>');
    $('.modal-footer-default').html('<button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button><button type="button" class="btn btn-danger btn-remove-sure-day-form-update" rel="'+day+'" data-dismiss="modal">Deletar</button>');
});

$('body').on('click', '.btn-remove-sure-day-form-update', function () {
    var day = $(this).attr('rel');
    $('#date-'+day).remove();
    $('#time-inicio-'+day).remove();
    $('#time-termino-'+day).remove();
    $('.day-'+day).remove();
});

//load all events when start screen
function loadEventsOnScreen(screen, arrayInfo) {
    var classAddList = $('.list-events');
    classAddList.html("");
    arrayInfo.map(function (info, i) {
        var datetime = '';
        info['datestimes'].map(function (info2, i2) {
            for (var key in info2) {
                datetime += '<div class="date-event-card"><div><b>' + key + '</b></div><div>' + info2[key] + '</div></div>';
            }
        });
        var stringAddedEvents = '<div class="card-event added-id-' + info['id'] + '"><div class="card-top"><div>' + info['title'] + '</div></div><div class="detail-divisor"></div><div class="description"><b>Descrição: </b>' + info['description'].substring(0, 20) + '...<p><b class="author-event">Criador: ' + info['author'] + '</b></p></div><div class="detail-divisor"></div><div class="informations-hour-date">' + datetime + '</div><div class="options-card-event"><div class="more-option-card-event btn-delete-event delete-event" rel="' + info['id'] + '|' + info['title'] + '" data-toggle="modal" data-target="#genericModal">Deletar</div><div class="more-option-card-event btn-update-event update-event" data-toggle="modal" data-target="#updateModal" rel="' + info['id'] + '">Editar</div></div></div>';
        var stringAddedHome = '<div class="card-event added-id-' + info['id'] + '"><div class="card-top"><div>' + info['title'] + '</div></div><div class="detail-divisor"></div><div class="description"><b>Descrição: </b>' + info['description'].substring(0, 20) + '...<p><b class="author-event">Criador: ' + info['author'] + '</b></p></div><div class="detail-divisor"></div><div class="informations-hour-date">' + datetime + '</div><div class="options-card-event"><a href="#event='+info['id']+'" class="more-option-card-event default-event about-more-event" rel="' + info['id'] + '"><div>Saiba mais</div></a><div class="more-option-card-event default-event" rel="' + info['id'] + '">Participar</div></div></div>';
        classAddList.append(screen == 'home' ? stringAddedHome : stringAddedEvents);
    });
}

//Load event when create|update in events
function loadOneEventOnMyEvents(arrayInfo, idEvent, isCreated) {
    var classAddList = $('.list-events');

    var info = {'title': arrayInfo[0]['value'], 'description': arrayInfo[1]['value']};

    var datestimes = arrayInfo.splice(2);
    var datetime = '';
    var oneDateInfo = [];
    datestimes.map(function(date, i){
        oneDateInfo.push(date);
        if ((i+1) % 3 == 0) {
            datetime += '<div class="date-event-card"><div><b>' + oneDateInfo[0]['value'] + '</b></div><div>' + oneDateInfo[1]['value'] + ' - ' + oneDateInfo[2]['value'] + '</div></div>';
            oneDateInfo = [];
        }
    });

    var stringAddedMyEvents = '<div class="card-event added-id-' + idEvent + '"><div class="card-top"><div>' + info['title'] + '</div></div><div class="detail-divisor"></div><div class="description"><b>Descrição: </b>' + info['description'].substring(0, 20) + '...<p><b class="author-event">Criador: Você</b></p></div><div class="detail-divisor"></div><div class="informations-hour-date">' + datetime + '</div><div class="options-card-event"><div class="more-option-card-event btn-delete-event delete-event" rel="' + idEvent + '|' + info['title'] + '" data-toggle="modal" data-target="#genericModal">Deletar</div><div class="more-option-card-event btn-update-event update-event" data-toggle="modal" data-target="#updateModal" rel="' + idEvent + '">Editar</div></div></div>';
    classAddList.prepend(stringAddedMyEvents);
    var animateEventShow = '';
    if (isCreated == true) {
        animateEventShow += 'animation-new-Event-created';
    }else{
        animateEventShow += 'animation-new-Event-updated';
    }
    $('.added-id-'+idEvent).addClass(animateEventShow);
    console.log(animateEventShow);
    setTimeout(function(){
        $('.added-id-'+idEvent).removeClass(animateEventShow);
    }, 2100);
}

//clear new event form
function clearNewEventForm() {
    $('#newevent-form').html('<input class="input" type="text" name="title" id="title" placeholder="title"><textarea style="height: 150px;" class="input" type="text" name="description" id="description"placeholder="description"></textarea><p><b>DIA 1</b></p>Dia do Evento: <input class="input" name="date-1" id="date-1" type="date">Início: <input class="input" name="time-inicio-1" id="time-inicio-1" type="time">Termino: <input class="input" name="time-termino-1" id="time-termino-1" type="time">');
}

//clear new event form when click on close
$('.close-form-create-event').click(function () {
    clearNewEventForm();
});

$('body').on('click', '.about-more-event', function () {
   var idEvent = $(this).attr('rel');
   
});

function loadAboutUniqueEvent(arrayInfo) {
    $('#content-event').hide();

    var datetime = '';
    arrayInfo['datestimes'].map(function(date, i){
        for (var key in date) {
           datetime += '<div class="date-event-card"><div><b>' + key + '</b></div><div>' + date[key] + '</div></div>';
        }
    });

    for(var k in arrayInfo){
        $('#'+k).html(arrayInfo[k]);
        if (k == 'datestimes') {
            $('#'+k).html(datetime);
        }  
    }

    $('#content-event').show();
    $('#loading-informations-event').hide();
}
export {
    loadAboutUniqueEvent,
    loadEventsOnScreen,
    loadOneEventOnMyEvents,
    clearNewEventForm
}