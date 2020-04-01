const fs = require('fs');

class Ticket {

    constructor(numero, escritorio) {

        this.numero = numero;

        this.escritorio = escritorio;

    }
}

class TicketControl {

    constructor() {

        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.tickets = [];
        this.ultimos4 = [];

        let data = require('../data/data.json');

        if (data.hoy === this.hoy) {

            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.ultimos4 = data.ultimos4;

        } else {

            this.reiniciarConteo();

        }
    }

    reiniciarConteo() {

        this.ultimo = 0;
        this.tickets = [];
        this.ultimos4 = [];

        console.log('Se ha reinicializado el conteo');

    }

    getUltimoTicket() {

        return `Ticket ${this.ultimo}`;

    }

    getUltimos4() {

        return this.ultimos4;

    }

    atenderTicket(escritorio) {

        if (this.tickets.length === 0) {
            return "No quedan tickets";
        }

        let numeroTicket = this.tickets[0].numero; //cogemos el ticket que vamos a atender

        this.tickets.shift(); //Borra el primer elemento de un arreglo

        let atenderTicket = new Ticket(numeroTicket, escritorio);

        this.ultimos4.unshift(atenderTicket); //Esta instrucción lo agrega al inicio del array
        //Si llega a mas de cuatro tenemos que borrar los que salimos

        if (this.ultimos4.length > 4) {
            this.ultimos4.splice(-1, 1); //borra el último
        }

        console.log('Ultimos 4');
        console.log(this.ultimos4);

        this.grabarArchivo();

        return atenderTicket;
    }

    grabarArchivo() {

        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimos4: this.ultimos4
        }

        let jsonDataString = JSON.stringify(jsonData);

        fs.writeFileSync('./server/data/data.json', jsonDataString);

    }

    siguiente() {

        this.ultimo += 1;

        let ticket = new Ticket(this.ultimo, null);

        this.tickets.push(ticket);

        this.grabarArchivo();

        return `Ticket ${this.ultimo}`;

    }
}

module.exports = {
    TicketControl
}