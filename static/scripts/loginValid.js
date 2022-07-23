let validValue = {
    login:false,
    pass:false,
}

function checkValid(value){
    for (let i of Object.keys(value)){
        if (!value[i]){
            return false;
        };
    };
    return true;
};

function changeButton(obj){    
    const submitButton = document.querySelector('#submit');

    if (checkValid(obj)){
        if (submitButton.classList.contains('submit__incorrect')){
            submitButton.classList.remove('submit__incorrect');
        };
        submitButton.classList.add('submit__correct');
    }else {
        if (submitButton.classList.contains('submit__correct')){
            submitButton.classList.remove('submit__correct')
            submitButton.classList.add('submit__incorrect');
        } 
    };
}


sendForm.login.setCustomValidity("Логин содержит минимум 2 символа.");
sendForm.pass.setCustomValidity('Пароль должен содержать от 6 до 10 символов.');

const loginInput = document.querySelector('input[name="login"]');
const passInput = document.querySelector('input[name="pass"]');


// валидация логина
sendForm.login.addEventListener('input', ()=>{
    if (sendForm.login.value.length < 2){

        sendForm.login.setCustomValidity("Логин содержит минимум 2 символа.");
        validValue.login = false;
        loginInput.classList.add('incorrect__area');
    } else {
        loginInput.classList.remove('incorrect__area');
        sendForm.login.setCustomValidity('');
        validValue.login = true;
    };

    changeButton(validValue);
});

// валидация пароля
sendForm.pass.addEventListener('input', ()=>{
    if (sendForm.pass.value.length < 6 || sendForm.pass.value.length > 10){
        sendForm.pass.setCustomValidity('Пароль должен содержать от 6 до 10 символов.');
        passInput.classList.add('incorrect__area');
        validValue.pass = false;
    } else {
        passInput.classList.remove('incorrect__area');
        sendForm.pass.setCustomValidity('');
        validValue.pass = true;
    };
    changeButton(validValue);
});

