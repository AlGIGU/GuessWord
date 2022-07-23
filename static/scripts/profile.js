const userStatus = document.querySelector('#userStatus');
const hrLine = document.querySelector('.horizontalLine');



if (userStatus.textContent == 'Admin'){
    userStatus.textContent = "Барин"
    userStatus.classList.add('adminStyle');
    // userStatus.style.color = '#e74c4c';
    // userStatus.style.textShadow = '0px 0px 10px #e74c4c'
} else {
    userStatus.textContent = "Смерд"
    userStatus.classList.add('userStyle');
    userStatus.style.color = '#4fd976';
    // userStatus.style.textShadow = '0px 0px 10px #4fd976'
};

const changeButton = document.querySelector('.changeButton');
const deleteButton = document.querySelector('.deleteButton');

changeButton.addEventListener('click', ()=>{

    document.querySelector(".userData").remove();
    let formTemplate = document.querySelector('.firstTemplate');

    document.querySelector(".firstTemplate").remove();
    document.querySelector('.pageData').parentElement.innerHTML += formTemplate.innerHTML;

    // кнопка возврата
    document.querySelector('.backButton').addEventListener('click',(e)=>{
        e.preventDefault();
        window.location.href = window.location.href;
    });


    // валидация
    const reg = new RegExp('^[a-zA-Z0-9._]+[@]{1}(mail|gmail|list|bk){1}[.]{1}(ua|com|ru){1}$');
    const mainForm = (document.querySelector('.newForm'));

    // имени
    mainForm.userName.addEventListener('input', ()=>{
        mainForm.userName.setCustomValidity("");

        if (mainForm.userName.value.length == 0){
            mainForm.userName.setCustomValidity('Поле имени не должно быть пустым.')
        };
    });

    // почты
    mainForm.userMail.addEventListener('input', ()=>{
        mainForm.userMail.setCustomValidity('');

        if (mainForm.userMail.value.length == 0){
            mainForm.userMail.setCustomValidity('Поле почты не должно быть пустым.');
        } else if (!reg.test(mainForm.userMail.value)) {
            mainForm.userMail.setCustomValidity('Не правильный формат почты.')
        };
    });

    // пароля
    mainForm.userPass.setCustomValidity('Поле пароля пустое.');
    mainForm.userPass.addEventListener('input', ()=>{
        mainForm.userPass.setCustomValidity('');

        if (mainForm.userPass.value.length < 6 || mainForm.userPass.value.length > 10){
            mainForm.userPass.setCustomValidity('Пароль должен быть длиной от 6 до 10 символов.');
        }
    });

    // нового пароля
    mainForm.userNewPass.setCustomValidity("LALLA")
    mainForm.userNewPass.addEventListener('input', ()=>{
        mainForm.userNewPass.setCustomValidity('');

        if (mainForm.userNewPass.value.length > 0){
            if (mainForm.userNewPass.value == mainForm.userPass.value){
                mainForm.userNewPass.setCustomValidity('Пароли не должны совпадать.')
            } else if (mainForm.userPass.value.length < 6 || mainForm.userPass.value.length > 10){
                    mainForm.userNewPass.setCustomValidity('Пароль должен быть длиной от 6 до 10 символов.');
            }
    }}); 

    
    document.querySelector('[name="submitButton"]').addEventListener('click', async e=>{
        e.preventDefault();
        
        const userData = {
            name: mainForm.userName.value,
            mail: mainForm.userMail.value,
            password: mainForm.userPass.value,
            newPassword: mainForm.userNewPass.value,
        };

        fetch('/api/checkPass',{
            method:"post",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({pass: userData.password}),

        }).then(value=>{
            if (value.ok){
                fetch('/api/profile', {
                    method:"put",headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify(userData)
                }).then(value=>{
                    console.log(value.status);
                    if (value.ok){
                        alert('Данные успешно обновлены!')
                        window.location.href = window.location.href;
                    } else {
                        alert('Ошибка при обновлении данных.')
                    };
                })
            } else {
                alert('Неправильный пароль')   
            };
        });

    });

});

// удаление пользователя
deleteButton.addEventListener('click', async e=>{
    if (!confirm('Вы точно хотите удалить аккаунт?')){
        return;
    };

    try{
        fetch('/api/profile', {
            method:"delete",
            headers:{
                'Content-Type': 'application/json;charset=utf-8'
            },
        }).then(res=>{
            if (res.ok){
                alert('Аккаунт успешно удален.');
                window.location.href = window.location.href.slice(0, window.location.href.length-7);
            } else {
                throw new Error('Ошибка на сервере.');
            };
        });
    }catch(e){
        alert(e.message);
    };
});