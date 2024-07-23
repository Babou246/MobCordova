function ajouterTache() {
    const task = document.getElementById('task');

    if (task.value) {
        const taskList = document.getElementById('taskList');
        const newItem = document.createElement('li');
        newItem.innerHTML = task.value;
        /*taskList.innerHTML += <li>${task.value}</li>;
        $(taskList).listview('refresh');
        task.selected();*/
        
        $(newItem).on('swiperight', function() {
            $(this).addClass('termine'); 
            $('#completedTaskList').append(this); 
            $('#completedTaskList').listview('refresh');
        });

        /*$(newItem).on('swiperight', function() {
            $(this).toggleClass('taskList')
        });*/
        
        $(newItem).on('swipeleft', function() {
            $(this).hide('slow')
        });

        taskList.append(newItem);
        $(taskList).Listview('refresh');

        
        task.selected();
    }
}

function reinitialiserListe() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    const task = document.getElementById('task');
    task.value = ""; 
    task.focus();
}

$(document).ready(function() {
    // Charger les contacts à partir du localStorage
    function loadContacts() {
        const contacts = JSON.parse(localStorage.getItem('contacts')) || [];
        const contactList = $('#contactList');
        contactList.empty();

        contacts.forEach((contact, index) => {
            const listItem = $(`<li><a href="#detailsContactPage" data-contact-index="${index}">${contact.nom} ${contact.prenom}</a></li>`);
            listItem.find('a').on('click', function() {
                const contactIndex = $(this).data('contact-index');
                const selectedContact = contacts[contactIndex];
                $('#detailNom').val(selectedContact.nom);
                $('#detailPrenom').val(selectedContact.prenom);
                $('#detailAddress').val(selectedContact.address);
                $('#detailNumero').val(selectedContact.numero);
                $('#detailEmail').val(selectedContact.email);
                $('#btn-update').data('contact-index', contactIndex);
                $('#btn-delete').data('contact-index', contactIndex);
            });
            contactList.append(listItem);
        });
        contactList.listview('refresh');
    }

    loadContacts();

    // Ajouter un contact
    $('#addContactButton').on('click', function(event) {
        event.preventDefault();
        const nom = $('#nom').val();
        const prenom = $('#prenom').val();
        const address = $('#address').val();
        const numero = $('#numero').val();
        const email = $('#email').val();

        if (nom && prenom && numero) {
            const contacts = JSON.parse(localStorage.getItem('contacts')) || [];
            contacts.push({ nom, prenom, address, numero, email });
            localStorage.setItem('contacts', JSON.stringify(contacts));
            $('#nom').val('');
            $('#prenom').val('');
            $('#address').val('');
            $('#numero').val('');
            $('#email').val('');
            loadContacts();
            $.mobile.changePage('#hompage');
        }
    });

    // Mettre à jour un contact
    $('#btn-update').on('click', function() {
        const index = $(this).data('contact-index');
        const contacts = JSON.parse(localStorage.getItem('contacts')) || [];
        const contact = contacts[index];
        contact.nom = $('#detailNom').val();
        contact.prenom = $('#detailPrenom').val();
        contact.address = $('#detailAddress').val();
        contact.numero = $('#detailNumero').val();
        contact.email = $('#detailEmail').val();
        localStorage.setItem('contacts', JSON.stringify(contacts));
        loadContacts();
        $.mobile.changePage('#hompage');
    });

    // Supprimer un contact
    $('#btn-delete').on('click', function() {
        const index = $(this).data('contact-index');
        const contacts = JSON.parse(localStorage.getItem('contacts')) || [];
        contacts.splice(index, 1);
        localStorage.setItem('contacts', JSON.stringify(contacts));
        loadContacts();
        $.mobile.changePage('#hompage');
    });
});
