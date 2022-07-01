// обработка кнопки login form submit
console.log('Script Working!')

let btn = document.querySelector('.btnForm');

btn.addEventListener('click', (e)=>{
    e.preventDefault();
    let loginForm = document.forms[0];

    let image = loginForm["img"];

    console.log(image.value); 
});