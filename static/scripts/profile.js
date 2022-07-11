const userStatus = document.querySelector('#userStatus');

if (userStatus.value == 'Admin'){
    console.log("POC!");
    userStatus.style.color = 'red'
} else {
    console.log("REAL POC!");
    userStatus.style.color = 'green'
}
