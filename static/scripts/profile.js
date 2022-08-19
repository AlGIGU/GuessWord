const userStatus = document.querySelector('#userStatus');
const hrLine = document.querySelector('.horizontalLine');

userStatus.classList.add(RULES_HIERARCHY[userStatus.textContent].styleSet);
userStatus.textContent = RULES_HIERARCHY[userStatus.textContent][CURRENT_LANG];

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

    
    document.querySelector('[name="submitButton"]').addEventListener('click', async e=>{
        e.preventDefault();

        if (!checkUserName(mainForm.userName.value)){
            showWrong('Неправильный формат имени');
            return;
        };

        if (!checkMail(mainForm.userMail.value)){
            showWrong('Неправильный формат почты');
            return;
        };

        const userData = {
            name: mainForm.userName.value,
            mail: mainForm.userMail.value,
        };

        if (mainForm.querySelector('input[name="userCoins"]')){   
            if (!checkCoins(mainForm.userCoins.value)){
                showWrong('Неправильный формат счёта');
                return;
            } else {
                userData.coins = mainForm.userCoins.value;
            };
        };

        if (mainForm.userNewPass.value.length > 0){
            if (checkPass(mainForm.userNewPass.value)){
                userData.newPassword = mainForm.userNewPass.value;
            } else {
                showWrong('Неправильный формат пароля');
                return;
            };
        };

            fetch('/profile', {
                method:"put",
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(userData)
            }).then(value=>{
                if (value.ok){
                    showCorrect('Данные успешно обновлены', ()=>{
                        window.location.href = window.location.href;
                    });
                } else {
                    showWrong('Ошибка при обновлении данных');
                };
            });
    });

});

// удаление пользователя
deleteButton.addEventListener('click', async e=>{
    showQuestion('Вы точно хотите удалить свой аккаунт?', ()=>{
        try{
            fetch('/profile', {
            method:"delete",
            headers:{
                'Content-Type': 'application/json;charset=utf-8'
            },
        }).then(res=>{
            if (res.ok){
                showCorrect('Аккаунт спешно удален', ()=>{
                    window.location.href = window.location.href.slice(0, window.location.href.length-7);
                })
            } else {
                throw new Error('Ошибка на сервере.');
            };
        });
        }catch(e){
            showWrong(e.message);
        };
    });
});