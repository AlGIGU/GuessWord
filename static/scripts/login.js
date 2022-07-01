// обработка кнопки login form submit
console.log('Script Working!')

let btn = document.querySelector('.btnLogin');

btn.addEventListener('click', (e)=>{
    e.preventDefault();
    let loginForm = document.forms[0];

    let login = loginForm["login"];
    let pass = loginForm["pass"];

    console.log(login.value);
    console.log(pass.value); 
});