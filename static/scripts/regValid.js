sendForm.name.setCustomValidity('Поле имя обязательно для ввода.');
sendForm.mail.setCustomValidity('Поле почты обязательно для ввода.');
sendForm.pass.setCustomValidity('Пароль и подтверждение пароля не совпадают.');


// валидация имени
sendForm.name.addEventListener('input', ()=>{
    if (sendForm.name.value.length == 0) {
        sendForm.name.setCustomValidity('Поле имя не должно быть пустым');
    } else {
        sendForm.name.setCustomValidity('');
    };
});

// валидация паролей
sendForm.pass.addEventListener('input', function(){
    if (sendForm.pass.value.length < 6 || sendForm.pass.value.length > 10){
        sendForm.pass.setCustomValidity('Длина пароля должна быть от 6 до 10 символов.');

    } else if (sendForm.pass.value != sendForm.rePass.value){
        sendForm.pass.setCustomValidity('Пароль и подтверждение пароля не совпадают.');

    } else {
        sendForm.pass.setCustomValidity('');
    };
});

sendForm.rePass.addEventListener('input', function(){
    if (sendForm.pass.value != sendForm.rePass.value){
        sendForm.pass.setCustomValidity('Пароль и подтверждение пароля не совпадают.');
    } else {
        sendForm.pass.setCustomValidity('');
    };
});


// валидация почты
sendForm.mail.addEventListener('input', ()=>{    
    let reg = new RegExp('[a-zA-Z]+[@]{1}[a-zA-Z]+[.]{1}[a-zA-Z]+');
    console.log(sendForm.mail.value.length);

    if (sendForm.mail.value.length == 0){
        sendForm.mail.setCustomValidity('Поле почты обязательно для ввода.');

    }else if (!reg.test(sendForm.mail.value)){
        sendForm.mail.setCustomValidity('Не правильный формат почты.');

    } else {
        sendForm.mail.setCustomValidity('');
    };
});

