// обработка кнопки reg
let sendForm = document.querySelector('#loginForm');

function getFormObj(form){
    let {login, pass} = form;
    let res = {
        login: login.value,
        pass: pass.value,
    }

    return res;
};



sendForm.addEventListener('submit', async (e)=>{
    e.preventDefault();

    // делает кнопку неактивной
    sendForm.submit.setAttribute('disabled', true);
    
    let postContent = getFormObj(sendForm);

    let res = await fetch('/login', {
        method:"post",
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(postContent)
    });
    
    
    if (res.ok){
        // в случае успеха возвращаемся на главную страницу
        showCorrect('Успешный вход' , ()=>{
            window.location.href = window.location.href.slice(0, window.location.href.length - 5); 
        })
    } else {
        sendForm.pass.value = '';
        sendForm.pass.setCustomValidity('Пароль должен содержать от 6 до 10 символов.');
        passInput.classList.add('incorrect__area');

        validValue.pass = false;
        sendForm.submit.removeAttribute('disabled');
        changeButton(validValue);
        
        showWrong('Неправильный логин или пароль');
    }
});
