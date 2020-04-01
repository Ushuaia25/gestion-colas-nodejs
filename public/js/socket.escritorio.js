var socket = io();

var searchParams = new URLSearchParams(window.location.search); //parámetros por la barra de url

if (!searchParams.has('escritorio')) { //si no existe la variable escritorio

    window.location = 'index.html'; //Nos manda a index.htlm
    throw new Error('El escritorio es necesario');

}

var escritorio = searchParams.get('escritorio');
var label = $('small');

$('h1').text('Escritorio: ' + escritorio);

$('button').on('click', function() {

    socket.emit('atenderTicket', { escritorio: escritorio }, function(resp) {

        if (resp === "No quedan tickets") {
            label.text(resp);
            alert(resp);
            return;
        }

        label.text(resp.numero);
    });

});