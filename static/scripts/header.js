const toProfileButton = document.querySelector('.toProfile');
const exitButton = document.querySelector('.exitButton');
const headerBox = document.querySelector('.headerBox');

const burgerButton = document.querySelector('.burger__svg');
const burger = document.querySelector('.burger');
const closeBurger = document.querySelector('.close__svg');

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
};

if (headerBox.querySelectorAll('*').length == 3){
    headerBox.classList.add('for__three__items__style');
} else {
    headerBox.classList.add('for__two__items__style');
}

burgerButton.addEventListener('click', e=>{
    const pageWidth = document.documentElement.scrollWidth; 
    console.log(pageWidth);
    burger.classList.remove('closed__burger');
    burger.classList.add('showed__burger');
})

closeBurger.addEventListener('click', e=>{
    burger.classList.add('closed__burger');
    burger.classList.remove('showed__burger');
})