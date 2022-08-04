
function showCorrect(text, callback){
    const upTime = 1500;

    const serverMessage = document.querySelector('.server__message');
    const server__message__correct = serverMessage.querySelector('.server__message__correct');

    server__message__correct.style.display = 'block';
    server__message__correct.querySelector('.server__message__text').textContent = text || 'Успешно';

    serverMessage.classList.remove('server__message__closed');
    serverMessage.classList.add('server__message__showed');
    
    setTimeout(() => {
        serverMessage.classList.remove('server__message__showed');
        serverMessage.classList.add('server__message__closed');
    }, upTime);

    setTimeout(() => {
        server__message__correct.style.display = 'none';

        if (callback){
            callback();
        }

        callback = null;
    }, upTime+500);
};

function showWrong(text, callback){
    const upTime = 1500;

    const serverMessage = document.querySelector('.server__message');
    const server__message__wrong = serverMessage.querySelector('.server__message__wrong');

    server__message__wrong.style.display = 'block';
    server__message__wrong.querySelector('.server__message__text').textContent = text || 'Ошибка';

    serverMessage.classList.remove('server__message__closed');
    serverMessage.classList.add('server__message__showed');

    setTimeout(() => {
        serverMessage.classList.remove('server__message__showed');
        serverMessage.classList.add('server__message__closed');
    }, upTime);

    setTimeout(() => {
        server__message__wrong.style.display = 'none';
        
        if (callback){
            callback();
        }
        callback = null;
    }, upTime+500);
};

function showQuestion(text, positive, negative){

    const downTime = 500;

    const autoQuestionCloser = setTimeout(()=>{
        serverMessage.classList.remove('server__message__showed');
        serverMessage.classList.add('server__message__closed');

        setTimeout(() => {
            server__message__choose.style.display = 'none';
        }, downTime);

        positive = null;
        negative = null;
    }, 7000);

    const serverMessage = document.querySelector('.server__message');
    const server__message__choose = serverMessage.querySelector('.server__message__choose');
    server__message__choose.querySelector('.question__text').textContent = text;

    serverMessage.classList.remove('server__message__closed');
    serverMessage.classList.add('server__message__showed');
    server__message__choose.style.display = 'block';

    const agreeButton = server__message__choose.querySelector('.server__agree__button');
    const disagreeButton = server__message__choose.querySelector('.server__disagree__button');

    agreeButton.addEventListener('click', ()=>{
        clearTimeout(autoQuestionCloser);

        serverMessage.classList.remove('server__message__showed');
        serverMessage.classList.add('server__message__closed');
        server__message__choose.style.display = 'none';

        if (positive){
            positive();
        };
        
        positive = null;
        negative = null;
    });
    
    disagreeButton.addEventListener('click', ()=>{
        clearTimeout(autoQuestionCloser);

        serverMessage.classList.remove('server__message__showed');
        serverMessage.classList.add('server__message__closed');

        setTimeout(() => {
            server__message__choose.style.display = 'none';
        }, downTime);

        if (negative){
            negative();
        };

        positive = null;
        negative = null;
    });

}