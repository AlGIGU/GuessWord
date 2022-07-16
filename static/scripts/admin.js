
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

        ul.lastElementChild.querySelector('.userId').textContent = user._id;
        ul.lastElementChild.querySelector('.userName').textContent = user.name;
        ul.lastElementChild.querySelector('.userMail').textContent = user.mail;
        ul.lastElementChild.querySelector('.userCoins').textContent = user.coins;
        ul.lastElementChild.querySelector('.userStatus').textContent = user.privilege;

    };

    for (let i of document.querySelectorAll('.userStatus')){
        if (i.textContent == "Admin"){
            i.textContent = "Барин"
            i.style.color = '#e74c4c'
            i.style.textShadow = '0px 0px 10px #e74c4c'
        } else {
            i.textContent = "Смерд"
            i.style.color = '#4fd976';
            i.style.textShadow = '0px 0px 10px #4fd976'
        }
    }
});