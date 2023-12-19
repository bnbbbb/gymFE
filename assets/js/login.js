import {setCookie, is_logined, setWithExpire} from "./util.js"

const $login_btn = document.querySelector('.login_btn')

const id_login = async (event) => {
    event.preventDefault()

    const username = document.querySelector('.user-login-username').value
    const password = document.querySelector('.user-login-password').value

    const formData = new FormData()

    formData.append('username', username)
    formData.append('password', password)

    const url = 'http://api.gymsearch.shop/user/login/'

    await fetch(url, {
        method: "POST",
        headers: {},
        body: formData,
    })
    .then((res) => res.json())
    .then((data) => {
        if (data.token){
            setCookie('access',data.token.access)
            setCookie('refresh',data.token.refresh)
            // localStorage.setItem('follow', JSON.stringify(data.follower));
            // localStorage.setItem('myNotify', JSON.stringify(data.notify));
            setWithExpire('user',data.user)
            setWithExpire('profile',data.profile)
            location.href= '/index.html'
        } else {
            alert(data.message)
        }
    })
    .catch((err) => {
        console.log(err);
        alert('아이디나 비밀번호가 일치하지 않습니다.')
    });
}

is_logined()

$login_btn.addEventListener('click',id_login)
