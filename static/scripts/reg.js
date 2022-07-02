// обработка кнопки reg
console.log('Script!');

let sendForm = document.querySelector('#mainForm');


function getFormObj(form){
    let {mail, pass, name} = form;
    let res = {
        name: name.value,
        password: pass.value,
        mail: mail.value,
        coins:0
    }
    return res;

};


sendForm.addEventListener('submit', async (e)=>{
    e.preventDefault();

    let postContent = getFormObj(sendForm);

    let res = await fetch('/api/reg', {
        method:"post",
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(postContent)
    });

    console.log("Response", res);

    if (res.ok){
        // в случае успеха возвращаемся на главную страницу
        alert('Успешная регистрация');
        window.location.href = window.location.href.slice(0, window.location.href.length - 3); 
    } else {
        alert('Произошла ошибка');
    }
});
