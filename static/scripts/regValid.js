sendForm.name.setCustomValidity('Поле имя обязательно для ввода.');
sendForm.mail.setCustomValidity('Поле почты обязательно для ввода.');
sendForm.pass.setCustomValidity('Поле пароль не должно быть пустым.');


let validValue = {
    name:false,
    mail:false,
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
    console.log(obj);

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


// валидация имени
sendForm.name.addEventListener('input', ()=>{
    if (sendForm.name.value.length < 2) {
        sendForm.name.setCustomValidity('Имя должно занимать от двух символов.');
        sendForm.name.classList.add('input__incorrect');
        validValue.name = false;
    } else {
        sendForm.name.setCustomValidity('');
        sendForm.name.classList.remove('input__incorrect');
        validValue.name = true;
    };
    changeButton(validValue);

});

// валидация паролей
sendForm.pass.addEventListener('input', function(){
    sendForm.pass.classList.add('input__incorrect');
    validValue.pass = false;
    
    if (sendForm.pass.value.length < 6){
        sendForm.pass.setCustomValidity('Длина пароля должна быть от 6 до 10 символов.');
    } else if (sendForm.pass.value != sendForm.rePass.value){
        sendForm.pass.classList.remove('input__incorrect');
        sendForm.pass.setCustomValidity('');

        sendForm.rePass.classList.add('input__incorrect');
        sendForm.rePass.setCustomValidity('Пароль и подтверждение пароля не совпадают.');
        
    } else {
        sendForm.pass.setCustomValidity('');
        sendForm.rePass.setCustomValidity('');

        sendForm.pass.classList.remove('input__incorrect');
        sendForm.rePass.classList.remove('input__incorrect');

        validValue.pass = true;
    };
    changeButton(validValue);

});

sendForm.rePass.addEventListener('input', function(){
    validValue.pass = false;
    sendForm.pass.classList.add('input__incorrect');

    if (sendForm.rePass.value.length < 6){
        sendForm.pass.setCustomValidity('Длина пароля должна быть от 6 до 10 символов.');
    } else if (sendForm.pass.value != sendForm.rePass.value){
        sendForm.pass.setCustomValidity('Пароль и подтверждение пароля не совпадают.');
    } else {
        sendForm.rePass.classList.remove('input__incorrect');
        sendForm.pass.classList.remove('input__incorrect');

        sendForm.pass.setCustomValidity('');
        sendForm.rePass.setCustomValidity('');
        validValue.pass = true;
    };
    changeButton(validValue);

});


// валидация почты
sendForm.mail.addEventListener('input', ()=>{    
    let reg = new RegExp('^[a-zA-Z0-9._]+[@]{1}(mail|gmail|list|bk){1}[.]{1}(ua|com|ru){1}$');
    sendForm.mail.classList.add('input__incorrect');
    
    if (sendForm.mail.value.length == 0){
        validValue.mail = false;
        sendForm.mail.setCustomValidity('Поле почты обязательно для ввода.');
        
    }else if (!reg.test(sendForm.mail.value)){
        validValue.mail = false;
        sendForm.mail.setCustomValidity('Не правильный формат почты.');
        
    } else {
        validValue.mail = true;
        sendForm.mail.setCustomValidity('');
        sendForm.mail.classList.remove('input__incorrect');
    };
    changeButton(validValue);
});