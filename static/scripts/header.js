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
        if (!confirm('Вы уверены, что хотите выйти из аккаунта?')){
            return;
        }

        fetch('/api/exit', {
            method:'get'
        }).then(value=>{
            if (!value.ok) {
                alert('Ошибка соединения');
            } else {
                window.location.href = "http://localhost:5000/api/";
            }
        });
    });
};

if (headerBox.querySelectorAll('*').length == 3){
    headerBox.classList.add('for__three__items__style');
} else {
    headerBox.classList.add('for__two__items__style');
}