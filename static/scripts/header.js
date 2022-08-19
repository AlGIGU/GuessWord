const toProfileButton = document.querySelector('.toProfile');
const exitButton = document.querySelector('.exitButton');
const headerBox = document.querySelector('.headerBox');

const burgerButton = document.querySelector('.burger__svg');
const burger = document.querySelector('.burger');
const closeBurger = document.querySelector('.close__svg');

let loginedUserInfo = undefined;
// переделать после добавления coockies
fetch('/getCurrentUser',{
    method:"get",
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
}).then(value=>{
    value.json().then(res=>{
        loginedUserInfo = res;
    });
});

const CURRENT_LANG = 'RU';
const RULES_HIERARCHY = {
    User : {
        privilegeLevel : 1,
        EN : 'User',
        RU : 'Смерд',
        UA : 'Холоп',
        color: 'rgb(79, 217, 118)', 
        'text-shadow': 'rgb(79, 217, 118) 0px 0px 10px',
        styleSet : 'user__status__style',
    
    },
    Admin : {
        privilegeLevel : 50,
        EN : 'Admin',
        RU : 'Барин',
        UA : 'Кошовий',
        color: 'rgb(231, 76, 76)',
        "text-shadow": 'rgb(231, 76, 76) 0px 0px 10px',
        styleSet : 'admin__status__style',
    },

    Owner : {
        privilegeLevel : 100,
        EN : 'Owner',
        RU : 'Хозяин',
        UA : 'Атаман',
        color: 'rgb(231, 202, 73)',
        'text-shadow': 'rgb(231, 202, 73) 0px 0px 10px',
        styleSet : 'owner__status__style',
    },
}


const mailReg = new RegExp(/^[a-zA-Z]+[0-9.-_]{0,}[@]{1}(mail|gmail|list|bk){1}[.]{1}(ua|com|ru){1}$/);
const nameReg = /^[a-zA-Z_-]{2,20}$/;
const scoreReg = /^[0-9]{1,10}$/;
const passReg = /^[a-zA-Z0-9*_-]{6,30}$/;

function checkMail(mail){
    return (mail.length >= 4 & mail.length < 30 & mailReg.test(mail));
};

function checkCoins(coins){
    return scoreReg.test(coins);
};

function checkUserName(name){
    return nameReg.test(name);
};

function checkPass(pass){
    return passReg.test(pass);
};

function findPrivilege(value, lang = 'EN'){
    for (let i of Object.keys(RULES_HIERARCHY)){
        if (value == RULES_HIERARCHY[i][CURRENT_LANG]){
            return RULES_HIERARCHY[i][lang];
        };
    };
    return 'User';
}

function toCorrectLink(url=window.location.href, way=''){
    url = url.split('').reverse().join('');
    url = url.slice(url.indexOf('/'));
    
    return (url.split('').reverse().join('')+way);
}

if (toProfileButton){
    toProfileButton.addEventListener('click', ()=>{

        window.location.href = toCorrectLink(window.location.href, 'profile');
    })
}

if (exitButton){
    exitButton.addEventListener('click', ()=>{
        showQuestion('Вы уверены, что хотите выйти из аккаунта?', ()=>{
            fetch('/exit', {
                method:'get'
            }).then(value=>{
                if (!value.ok) {
                    alert('Ошибка соединения');
                } else {
                    window.location.href = toCorrectLink();
                }
            });
        })
    });
}

if (document.querySelector('.burger__exit__button')){
    const burgerExitButton = document.querySelector('.burger__exit__button');    


    burgerExitButton.addEventListener('click', ()=>{

        burger.classList.add('closed__burger');
        burger.classList.remove('showed__burger');
        
        showQuestion('Вы уверены, что хотите выйти из аккаунта?', ()=>{
            fetch('/exit', {
                method:'get'
            }).then(value=>{
                if (!value.ok) {
                    alert('Ошибка соединения');
                } else {
                    window.location.href = toCorrectLink();
                }
            });
        })
    });
}

if (headerBox.querySelectorAll('*').length == 3){
    headerBox.classList.add('for__three__items__style');
} else {
    headerBox.classList.add('for__two__items__style');
}

burgerButton.addEventListener('click', e=>{
    burger.classList.toggle('closed__burger');
    burger.classList.toggle('showed__burger');

    burgerButton.classList.toggle('burger__svg__action');
})

// closeBurger.addEventListener('click', e=>{
//     burger.classList.add('closed__burger');
//     burger.classList.remove('showed__burger');
// })