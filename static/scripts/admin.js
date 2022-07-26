fetch('/api/getAllUsers', {
    method:"GET",
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    }
}).then(async value=>{
    
    // извлечение тела ответа
    value = await value.json();
    
    if (!value || value.length == 0){
        let h1 = document.createElement('h1');

        h1.textContent = 'Список пользователей пуст.';
        document.querySelector('.mainContainer').append(h1);
        return;
    };


    let ul = document.createElement('ul');
    document.querySelector('.mainContainer').append(ul);
    let userElement = document.querySelector('template').innerHTML;
    ul = document.querySelector('ul');

    for (let user of value){
        let li = document.createElement('li');
        li.innerHTML = userElement;
        ul.append(li);

        ul.lastElementChild.querySelector('.userId').textContent = user._id ?? 'undefined';
        ul.lastElementChild.querySelector('.userName').textContent = user.name ?? 'undefined';
        ul.lastElementChild.querySelector('.userMail').textContent = user.mail ?? 'undefined';
        ul.lastElementChild.querySelector('.userCoins').textContent = user.coins ?? 'undefined';
        ul.lastElementChild.querySelector('.userStatus').textContent = user.privilege ?? 'undefined';
    };

    for (let i of document.querySelectorAll('.userStatus')){
        if (i.textContent == "Admin"){
            i.textContent = "Барин";
            i.classList.add('admin__status__style');
        } else {
            i.textContent = "Смерд";
            i.classList.add('user__status__style');
        };
    };
}).then(()=>{
        document.querySelector('ul').addEventListener('click', e=>{
        if (e.target.classList.contains('changeButton')){

            let dataUser = {};
            let newData = {};

            const INPUT_TITLES = {
                'ID:' : 'userId',
                'Имя:' : 'userName',
                'Почта:' : 'userMail',
                'Счёт:' : 'userCoins',
            };

            // изменения данных пользователя
            let point = e.target.parentElement.parentElement.firstElementChild.nextElementSibling;

            while (point != null & point.querySelector('p') != null){

                let defaultValue = point.querySelector('p').textContent;
                console.log(point.querySelector('p').className);
                dataUser[point.querySelector('p').className] = defaultValue;


                if (point.querySelector('p').classList.contains('userStatus')){
                    const selectorList = [
                        'User',
                        'Admin',
                    ];

                    let selectElem = document.createElement('select');
                    point.append(selectElem);

                    selectElem = point.querySelector('select');
                    selectElem.classList.add('userStatus');

                    // Селекторы выбора
                    for (let i of selectorList){
                        selectElem.append(document.createElement('option'));
                        let optionElem = selectElem.lastElementChild;

                        optionElem.textContent = i;
                        optionElem.value = i;
                    };
                } else {

                    point.append(document.createElement('input'));

                    let input = point.querySelector('input');
                    
                    
                    if (point.firstElementChild.textContent=='Счёт:'){
                        input.setAttribute('type', 'number');
                    }
                    input.classList.add(INPUT_TITLES[point.firstElementChild.textContent]);
                    input.value = defaultValue;
                };

                point.querySelector('p').remove();
                point = point.nextElementSibling;
            };

            point = e.target.parentElement.parentElement.lastElementChild;
            point.append(document.createElement('button'));
            point.append(document.createElement('button'));

            // кнопки взаимодействия с изменениями
            let saveButton = point.lastElementChild.previousElementSibling;
            let cancelButton = point.lastElementChild;

            // скрытие старых кнопок
            point.querySelector('.changeButton').style.display = 'none';
            point.querySelector('.deleteButton').style.display = 'none';

            // сохранение изменений
            saveButton.classList.add('saveButton');
            saveButton.textContent = 'Сохранить';

            saveButton.addEventListener('click', e=>{

                let envir = e.target.parentElement.parentElement;
                let inputValues = envir.querySelectorAll('input');

                for (let i of inputValues){
                    newData[i.className.slice(4).toLowerCase()] = i.value;
                    i.remove();
                };

                newData.privilege = envir.querySelector('.userStatus').value;
                envir.querySelector('.userStatus').remove();

                envir = envir.firstElementChild.nextElementSibling;

                for (let i of Object.keys(newData)){
                    envir.append(document.createElement('p'));
                    let parag = envir.lastElementChild;

                    if (i == 'privilege'){
                        parag.classList.add(`userStatus`);
                        if (newData[i] == 'Admin'){
                            newData[i] = 'Барин';
                            parag.classList.add('admin__status__style');
                        } else {
                            newData[i] = 'Смерд';
                            parag.classList.add('user__status__style');
                        }
                    } else {
                        parag.classList.add(`user${i[0].toUpperCase()+i.slice(1)}`);
                    };

                    parag.textContent = newData[i];

                    envir = envir.nextElementSibling;
                };

                cancelButton.remove();
                saveButton.remove();

                point.querySelector('.changeButton').style.display = 'block';
                point.querySelector('.deleteButton').style.display = 'block';

                newData.id = point.parentElement.parentElement.querySelector('.userId').textContent;

                // отправка запроса в БД
                fetch('/api/profile', {
                    method:"put",
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body : JSON.stringify(newData)
                });
            });
            
            
            // отмена изменений
            cancelButton.classList.add('cancelButton');
            cancelButton.textContent = 'Отмена';

            cancelButton.addEventListener('click', e=>{
                let envir = e.target.parentElement.parentElement.firstElementChild.nextElementSibling;
                for (let i of Object.keys(dataUser)){
                    envir.lastElementChild.remove();
                    envir.append(document.createElement('p'));

                    let parag = envir.querySelector('p');
                    parag.classList.add(i);
                    parag.textContent = dataUser[i];

                    envir = envir.nextElementSibling;

                    saveButton.remove();
                    cancelButton.remove();

                    point.querySelector('.changeButton').style.display = 'block';
                    point.querySelector('.deleteButton').style.display = 'block';
                };
            });


        } else if (e.target.classList.contains('deleteButton')){

            // удаление пользователя
            showQuestion('Вы уверены, что хотите удалить пользователя?', ()=>{
                const userId = {
                    id: e.target.parentElement.parentElement.querySelector('.userId').textContent
                };
                fetch('/api/profile', {
                    method:'delete',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify(userId)
                }).then(res=>{
                    if (res.ok){
                        showCorrect(`Пользователь с ID ${userId.id} успешно удален`);

                        e.target.parentElement.parentElement.classList.add('deletedUser');
                        setTimeout(() => {
                            e.target.parentElement.parentElement.remove();
                        }, 800);

                    } else {
                        showWrong('Ошибка на сервере');
                    };
                });
            }, ()=>{

            })
        };
    });
    
}).then(value=>{
    
    // действия после загрузки сайта
    // стилизация
    // li
    document.querySelector('.users__title').classList.add('titleStyle');
    const liList = document.querySelectorAll('li');
    let animationTime = 0.5;

    for(let i of liList){
        i.classList.add('liStyle');
        i.style.animation = `liStart 1.5s 1 forwards ease ${animationTime}s`;

        if (animationTime <= 1.5){
            animationTime += 0.35;
        } else if (animationTime >= 2){
            animationTime = 0.2;
        } else {
            animationTime += 0.05;
        }
    };
});

// добавление нового пользователя(popup)
const addUserButton = document.querySelector('.create__new__user');
const popup = document.querySelector('#popup');
const popupContent = document.querySelector('.popup__content');

const popupCloseButton = document.querySelector('.popup__close__button');
const popupSendButton = document.querySelector('.popup__send__button');

const userForm = popupContent.querySelector('form');

addUserButton.addEventListener('click', e=>{
    e.preventDefault();
    popup.style.opacity = '1';
    popup.style.visibility = 'visible';
    
    popupContent.style.transform = "perspective(600px) translate(0px, 0px) rotateX(0)";
    popupContent.style.opacity = '1';
});


// закрытие popup
function closePopup(e){
    e.preventDefault();

    // очистка формы
    userForm.reset();

    popup.style.opacity = '0';
    popup.style.visibility = 'hidden';
    
    popupContent.style.transform = "perspective(600px) translate(0px, -100%) rotateX(45deg)";
    popupContent.style.opacity = '0';    
};

popupCloseButton.addEventListener('click', e=>closePopup(e));

// валидация формы
userForm.name.setCustomValidity('Поле имени не должно быть пустым.');
userForm.mail.setCustomValidity('Поле почты не должно быть пустым.');
userForm.password.setCustomValidity('Поле пароля не должно быть пустым.');
userForm.rePassword.setCustomValidity('Поле пароля не должно быть пустым.');

userForm.name.addEventListener('input', e=>{
    if (userForm.name.value.length > 2){
        userForm.name.setCustomValidity('');
    } else {
        userForm.name.setCustomValidity('Поле имени не должно быть пустым.');
    };
});

userForm.mail.addEventListener('input', e=>{
    
    let reg = new RegExp('^[a-zA-Z0-9._]+[@]{1}(mail|gmail|list|bk){1}[.]{1}(ua|com|ru){1}$');
    userForm.mail.setCustomValidity('');
    
    if (userForm.mail.value.length == 0){
        userForm.mail.setCustomValidity('Поле почты не должно быть пустым.');
    } else if (!reg.test(userForm.mail.value)){
        userForm.mail.setCustomValidity('Неправильный формат почты.');
    }
});

userForm.password.addEventListener('input', e=>{
    userForm.password.setCustomValidity('');
    if (userForm.password.value.length < 6){
        userForm.password.setCustomValidity('Поле пароля должно быть длиной от 6 символов.');
    };
});

userForm.rePassword.addEventListener('input', e=>{
    userForm.rePassword.setCustomValidity('');
    
    if (userForm.rePassword.value != userForm.password.value){
        userForm.rePassword.setCustomValidity('Пароли не совпадают');
    };
});

// отправка новых данных
popupSendButton.addEventListener("click", e=>{
    e.preventDefault();
    
    const dataUser = {
        name : userForm.name.value,
        mail : userForm.mail.value,
        password : userForm.password.value,
        coins : userForm.coins.value || 0,        
        privilege: userForm.status.value ?? "User",
        fromAdmin : true
    };
    

    fetch('/api/reg', {
        method:"post",
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(dataUser)

    }).then(response=>{
        if (response.ok){
            showCorrect('Пользователь успешно зарегистрирован', ()=>{
                window.location.href = window.location.href; 
            })
        } else {
            showWrong('Ошибка на сервере');
        };
    });
});
