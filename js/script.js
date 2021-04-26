// 1. Visualizzazione dinamica della lista contatti: tramite la direttiva v-for, visualizzare nome e immagine di ogni contatto
// 2. Visualizzazione dinamica dei messaggi: tramite la direttiva v-for, visualizzare tutti i messaggi relativi al contatto attivo all’interno del pannello della conversazione
//    Click sul contatto mostra la conversazione del contatto cliccato
// 3. Aggiunta di un messaggio: l’utente scrive un testo nella parte bassa e digitando “enter” il testo viene aggiunto al thread sopra, come messaggio verde
//    Risposta dall’interlocutore: ad ogni inserimento di un messaggio, l’utente riceverà un “ok” come risposta, che apparirà dopo 1 secondo.
// 4. Ricerca utenti: scrivendo qualcosa nell’input a sinistra, vengono visualizzati solo i contatti il cui nome contiene le lettere inserite
// 5. Cancella messaggio: cliccando sul messaggio appare un menu a tendina che permette di cancellare il messaggio selezionato
//    Visualizzazione ora e ultimo messaggio inviato/ricevuto nella lista dei contatti

var app = new Vue (
    {
        el: '#root',
        data: {
            // Contatto attivo, numero che rappresenta l'indice del contatto attivo
            activeContact: 0,

            // V-model per input scrivi nuovo messaggio
            newMessage: '',

            // V-model per input search
            filterInput: '',

            // Indica l'indice del messaggio attivo, di default è false perchè nessun messaggio è attivo
            activeMessage: false,

            contacts: [
                {
                    name: 'Michele',
                    avatar: '_1',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            text: 'Hai portato a spasso il cane?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            text: 'Ricordati di dargli da mangiare',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 16:15:22',
                            text: 'Tutto fatto!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Fabio',
                    avatar: '_2',
                    visible: true,
                    messages: [
                        {
                            date: '20/03/2020 16:30:00',
                            text: 'Ciao come stai?',
                            status: 'sent'
                        },
                        {
                            date: '20/03/2020 16:30:55',
                            text: 'Bene grazie! Stasera ci vediamo?',
                            status: 'received'
                        },
                        {
                            date: '20/03/2020 16:35:00',
                            text: 'Mi piacerebbe ma devo andare a fare la spesa.',
                            status: 'sent'
                        }
                    ],
                },
                {
                    name: 'Samuele',
                    avatar: '_3',
                    visible: true,
                    messages: [
                        {
                            date: '28/03/2020 10:10:40',
                            text: 'La Marianna va in campagna',
                            status: 'received'
                        },
                        {
                            date: '28/03/2020 10:20:10',
                            text: 'Sicuro di non aver sbagliato chat?',
                            status: 'sent'
                        },
                        {
                            date: '28/03/2020 16:15:22',
                            text: 'Ah scusa!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Luisa',
                    avatar: '_4',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            text: 'Lo sai che ha aperto una nuova pizzeria?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            text: 'Si, ma preferirei andare al cinema',
                            status: 'received'
                        }
                    ],
                },
            ]
            
        },
        methods: {
            // Funzione che mostra la conversazione del contatto cliccato
            showChat(index) {
                this.activeContact = index;
                this.activeMessage = false;
            },

            // Funzione che crea un nuovo oggetto messaggio e lo pusha nell'array messages corrispondente all'utente attivo poi svuota la input
            sendMessage () {
                if ( this.newMessage != '' ) {
                    // Creo un nuovo oggetto con date corrente e text uguale al messaggio inserito dall'utente
                    let newMessageObj = {
                        date: dayjs().format('DD/MM/YYYY HH:mm:ss'),
                        text: this.newMessage,
                        status: 'sent'
                    };

                    // Pusho l'oggetto nell'array di messaggi dell'utente corrente
                    this.contacts[this.activeContact].messages.push(newMessageObj);
                    
                    // Svuoto la input
                    this.newMessage = '';

                    // Creo una variabile e ci salvo il contatto attuale da inserire poi nel setTimeout
                    const NewActiveContact = this.activeContact;

                    // Funzione setTimeout che dopo 1 secondo manda un messaggio di risposta
                    setTimeout( () => {
                        // Creo un nuovo oggetto
                        let newUserMessageObj = {
                            date: dayjs().format('DD/MM/YYYY HH:mm:ss'),
                            text: 'Ok',
                            status: 'received'
                        };
                        
                        // Pusho l'oggetto nell'array dei messaggi dell'utente attivo
                        this.contacts[NewActiveContact].messages.push(newUserMessageObj);
                    } ,1000 );
                }
            },

            // Funzione che filtra i contatti
            filterContacts() {
                // Itero ogni contatto e confronto il nome con le lettere inserite dall'utente, se la lettera è contenuta nel nome il nome verrà mostrato altrimenti no
                this.contacts.forEach((element) => {
                    if( element.name.toLowerCase().includes(this.filterInput.toLowerCase()) ) {
                        element.visible = true;
                    } else {
                        element.visible = false;
                    }
                });
            },

            // Mostra o nasconde l'option menu per ogni messaggio
            toggleOptionMenu(indexMsg) {
                if ( this.activeMessage === false ) {
                    this.activeMessage = indexMsg;
                } else {
                    this.activeMessage = false;
                }
            },

            // Funzione che elimina il messaggio selezionato da i messaggi dell'activeContact
            deleteMessage(indexMsg) {
                this.contacts[this.activeContact].messages.splice(indexMsg, 1);
                this.activeMessage = false;
            }
        }
    }
);