//comando para establecer la conexión
var socket = io();

var label = $('#lblNuevoTicket');

socket.on('connect', function() {

    console.log('Conectado al servidor');

});

socket.on('disconnect', function() {

    console.log('Desconectado del servidor');

});

socket.on('estadoActual', function(resp) {

    label.text(resp.actual);

});

socket.on('atenderTicket', (data, callback) => {

    if (!data.escritorio) {
        return callback({
            err: true,
            mensaje: 'El escritorio es necesario'
        });
    }

    let atenderTicket = ticketControl.atenderTicket(data.escritorio);

    callback(atenderTicket);

    //Acualizar / notificar cambios en los últimos 4

});


$('button').on('click', function() {

    socket.emit('siguienteTicket', null, function(siguienteTicket) {

        label.text(siguienteTicket);

    });

});