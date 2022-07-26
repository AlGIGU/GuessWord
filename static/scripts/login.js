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

    let res = await fetch('/api/login', {
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
        sendForm.submit.removeAttribute('disabled');
        showWrong('Неправильный логин или пароль');
    }
});
