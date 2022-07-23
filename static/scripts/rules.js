const horizontalLine = document.querySelector('.horizontalLine');
const liElements = document.querySelectorAll('li')

window.addEventListener('load', e=>{
    let pointAnimTime = 0.3;

    for (let i of liElements){
        i.classList.add('stylized');
        i.style.animation = `li__anim 1.5s 1 forwards ease ${pointAnimTime}s`;
        pointAnimTime+=0.6;
    }
    document.querySelector('.getLucky').style.animation = `li__anim 1.5s 1 forwards ease ${pointAnimTime}s`;
})
