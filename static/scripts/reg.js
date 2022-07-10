// обработка кнопки reg
const sendForm = document.querySelector('#mainForm');

function getFormObj(form){
    let res = {
        name: form.name.value,
        mail: form.mail.value,
        password : form.pass.value,
        coins: 0
    };

    // res.password = bcrypt.hashSync(pass.value, 7);
    return res;
};


// отправка запроса
sendForm.addEventListener('submit', (e)=>{
    e.preventDefault();

    let postContent = getFormObj(sendForm);

    fetch('/api/reg', {
        method:"post",
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(postContent)
    })
    .then(res=>{
        if (res.ok){
            
            // в случае успеха возвращаемся на главную страницу
            alert('Успешная регистрация');
            window.location.href = window.location.href.slice(0, window.location.href.length - 3); 
        } else {
            alert(res.statusText);
        }
    })
});
