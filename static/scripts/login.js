// обработка кнопки reg
let sendForm = document.querySelector('#loginForm');

function getFormObj(form){
    let {login, pass} = form;
    let res = {
        name: login.value,
        password: pass.value,
    }

    return res;
};


sendForm.addEventListener('submit', async (e)=>{
    e.preventDefault();

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
        alert('Успешный вход');
        window.location.href = window.location.href.slice(0, window.location.href.length - 5); 
    } else {
        alert(res.text);
    }
});
