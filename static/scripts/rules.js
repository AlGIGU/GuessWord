const horizontalLine = document.querySelector('.horizontalLine');
const liElements = document.querySelectorAll('li')

window.addEventListener('load', e=>{
    horizontalLine.style.opacity = '1';
    horizontalLine.style.width = '100%';

    for (let i of liElements){
        i.classList.add('stylized');
    }
})
