const toProfileButton = document.querySelector('.toProfile');
const exitButton = document.querySelector('.exitButton');

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