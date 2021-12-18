let logen = document.getElementById('login');
let passwort = document.getElementById('password');
let loginEnter = document.getElementById('loginEnter');
let passwordEnter = document.getElementById(`passwordEnter`);
let users = [];

document.getElementsByClassName('registerBtn')[0].addEventListener('click', function () {
    function checkNumInPass() {
        let logRegExp = /\d/;
        return logRegExp.test(passwort.value);
    }
    function correctLogin() {
        return logen.value.length > 3;
    }
    function correctness() {
        return passwort.value.length > 3 && checkNumInPass();
    }
    if (!correctLogin()) {
        return alert('Логин должен состоять более чем из 3х символов');
    } else if (!correctness()) {
        return alert('Пароль должен состоять более чем их 3х символов и включать в себя хотябы одну цифру!')
    } else if (correctLogin() && correctness()) {
        function addUser() {
            users.push([`${logen.value}`, `${passwort.value}`]);
        }
        addUser();
        alert('Вы зарегистрировались!');
        document.getElementsByClassName('registerForm')[0].style.display = 'none';
        document.getElementsByClassName('loginForm')[0].style.display = 'flex';
    }
});
function loginFn() {
    users.map(item => {
        if (item[0] === loginEnter.value && item[1] === passwordEnter.value) {
            alert('Вы вошли');
            document.getElementsByClassName('loginForm')[0].style.display = 'none';
            window.location.href = 'index.html';
        } else if (item[0] !== loginEnter.value) {
            return alert('Неверный логин');
        } else if (item[1] !== passwordEnter.value) {
            return alert('Неверный пароль');
        }
    })

}
document.getElementsByClassName(`loginBtn`)[0].addEventListener('click',loginFn);
document.getElementsByClassName(`loginBtn`)[0].addEventListener('keydown',loginFn);
