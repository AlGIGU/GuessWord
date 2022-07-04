sendForm.login.setCustomValidity("Логин содержит минимум 2 символа.");
sendForm.pass.setCustomValidity('Пароль должен содержать от 6 до 10 символов.');

// валидация логина
sendForm.login.addEventListener('input', ()=>{
    if (sendForm.login.value.length < 2){
        sendForm.login.setCustomValidity("Логин содержит минимум 2 символа.");
    } else {
        sendForm.login.setCustomValidity('');
    }
});

// валидация пароля
sendForm.pass.addEventListener('input', ()=>{
    if (sendForm.pass.value.length < 6 || sendForm.pass.value.length > 10){
        sendForm.pass.setCustomValidity('Пароль должен содержать от 6 до 10 символов.');
    } else {
        sendForm.pass.setCustomValidity('');
    };
});

