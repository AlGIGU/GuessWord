const toProfileButton = document.querySelector('.toProfile');
const exitButton = document.querySelector('.exitButton');
const headerBox = document.querySelector('.headerBox');


if (toProfileButton){
    toProfileButton.addEventListener('click', ()=>{
        window.location.href = "http://localhost:5000/api/profile";
    })
}

if (exitButton){
    exitButton.addEventListener('click', ()=>{
        showQuestion('Вы уверены, что хотите выйти из аккаунта?', ()=>{
            fetch('/api/exit', {
                method:'get'
            }).then(value=>{
                if (!value.ok) {
                    alert('Ошибка соединения');
                } else {
                    window.location.href = "http://localhost:5000/api/";
                    // window.location.href = window.location.href.split('/').slice(0, window.location.href.split('/').length-1).join('/');
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