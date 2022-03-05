'use strict';
// ------- functions -------
const getS = selector => document.querySelector(selector);
const getSA = selector => document.querySelectorAll(selector);

function clearInputStyles() {
    getS('input[type="text"]').classList.remove('success');
    getS('input[type="text"]').classList.remove('error');
    getS('input[type="password"]').classList.remove('success');
    getS('input[type="password"]').classList.remove('error');
    getS('input[type="email"]').classList.remove('success');
    getS('input[type="email"]').classList.remove('error');
}
// ------- variables -------
let logSuccess, passwordSuccess, emailSuccess;
const num = document.querySelector('input[type="number"]');
const log = document.querySelector('input[type="text"]');
const email = document.querySelector('input[type="email"]');
const pas = document.querySelector('input[type="password"]');
const add = document.querySelector('.btn-add');
const tableEl = document.querySelector('table');
const tbodyEl = document.querySelector('tbody');
// ------------regExp--------------
const loginRegExp = /^[a-zA-Z]{4,16}$/;
const passwordRegExp = /^\S{4,16}$/;
const emailRegExp = /^[a-zA-Z._]{1,}@[a-zA-Z.]{1,}$/;
// --------validation---------------

log.oninput = function() {
    let testLogin = loginRegExp.test(log.value);
    if (testLogin) {
        getS('input[type="text"]').classList.add('success');
        getS('input[type="text"]').classList.remove('error');
        logSuccess = 'ok';
    } else {
        getS('input[type="text"]').classList.add('error');
        getS('input[type="text"]').classList.remove('success');
        logSuccess = '';
    }
    return logSuccess;
};
pas.oninput = function() {
    let testPassword = passwordRegExp.test(pas.value);
    if (testPassword) {
        getS('input[type="password"]').classList.add('success');
        getS('input[type="password"]').classList.remove('error');
        passwordSuccess = 'ok';
    } else {
        getS('input[type="password"]').classList.add('error');
        getS('input[type="password"]').classList.remove('success');
        passwordSuccess = '';
    }
    return passwordSuccess;
};
email.oninput = function() {
    let testEmail = emailRegExp.test(email.value);
    if (testEmail) {
        getS('input[type="email"]').classList.add('success');
        getS('input[type="email"]').classList.remove('error');
        emailSuccess = 'ok';
    } else {
        getS('input[type="email"]').classList.add('error');
        getS('input[type="email"]').classList.remove('success');
        emailSuccess = '';
    }
    return emailSuccess;
};
// ------- addEventListener -------
// ------- add user ----------------
add.addEventListener('click', () => {
    if (!num.value) {
        if (
            logSuccess === 'ok' &&
            emailSuccess === 'ok' &&
            passwordSuccess === 'ok'
        ) {
            tbodyEl.innerHTML += `<tr>
                    <td></td>
                     <td>${log.value}</td>
                     <td>${pas.value}</td>
                     <td>${email.value}</td>
                     <td><button class='edit-btn btn'>Edit</button></td>
                     <td><button class='del-btn btn'>Delete</button></td>
                 </tr>`;
            num.value = '';
            log.value = '';
            pas.value = '';
            email.value = '';
            clearInputStyles();
            for (let i = 1; i < 10; i++) {
                tableEl.rows[i].cells[0].innerHTML = `${i}`;
            }
        }
    } else {
        tableEl.rows[num.value].cells[1].innerHTML = log.value;
        tableEl.rows[num.value].cells[2].innerHTML = pas.value;
        tableEl.rows[num.value].cells[3].innerHTML = email.value;
        num.value = '';
        log.value = '';
        pas.value = '';
        email.value = '';
        clearInputStyles();
    }
});
// ------- edit & delete btn --------------
tableEl.addEventListener('click', e => {
    if (e.target.classList.contains('del-btn')) {
        const btn = e.target;
        btn.closest('tr').remove();
        num.value = '';
        log.value = '';
        pas.value = '';
        email.value = '';
        for (let i = 1; i < 10; i++) {
            tableEl.rows[i].cells[0].innerHTML = `${i}`;
        }
    }
    if (e.target.classList.contains('edit-btn')) {
        const btn = e.target;
        num.value = btn.closest('tr').cells[0].innerHTML;
        log.value = btn.closest('tr').cells[1].innerHTML;
        pas.value = btn.closest('tr').cells[2].innerHTML;
        email.value = btn.closest('tr').cells[3].innerHTML;
    }
});
// ---------------------------------