// burger menu
function burgerMenu() {
    const button = document.querySelector('.header__menu-hamburger');
    const menu = document.querySelector('.header__menu');
    button.onclick = function() {
        menu.classList.toggle("header__menu_active");
    };
}

// subscribe submit
function subscribe(event) {
    event.preventDefault();
    const email = event.target.email;

    if (validateEmail(email.value)) {
        console.log('Form sent');

        return true;
    } else {
        email.classList.add('error-field');
        errorMessage("Invalid email!", email);

        return false;
    }
}

// contact submit
function contact(event) {
    event.preventDefault();
    const email = event.target.user_email;
    const name = event.target.user_name;
    const message = event.target.user_message;
    let isValid = true;

    if (!validateEmail(email.value)) {
        isValid = false;
        email.classList.add('error-field');
        errorMessage("Invalid email!", email);
    }

    if (!name.value) {
        isValid = false;
        name.classList.add('error-field');
        errorMessage("Invalid name!", name);
    }

    if (message.value.length < 20) {
        isValid = false;
        message.classList.add('error-field');
        errorMessage("Message length has to be > 20", message);
    }

    if (isValid) console.log('Form sent');

    return isValid;

}

// tools
function errorMessage(text, input) {
    const messageEl = input.nextElementSibling;
    if (!messageEl) {
        const errorMessageElement = document.createElement('span');
        input.after(Object.assign(errorMessageElement, {textContent: text, className: 'error-message'}));
    }
}

function validateEmail(email) {

    const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    return email.match(validRegex);

}

function deleteError(item) {
    item.target.classList.remove('error-field');
    const messageEl = item.target.nextElementSibling;

    if(messageEl) {
        messageEl.remove();
    }

}


// run
document.addEventListener("DOMContentLoaded", function(event) {
    burgerMenu();

    document.querySelectorAll('form.subform').forEach(item => {
        item.addEventListener('submit', subscribe);
        item.email.addEventListener('keypress', deleteError);
    })

    const contactForm = document.querySelector('form.contact__form');
    contactForm.addEventListener('submit', contact);
    const fields = contactForm.querySelectorAll('input, textarea');
    Array.from(fields).forEach((item) => {
        item.addEventListener('keypress', deleteError);
    })

});
