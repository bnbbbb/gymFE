import {deleteCookie} from "./util.js"

const $logout_btn = document.querySelector('.button_logout')


const logout = (event) => {
    event.preventDefault()
    localStorage.removeItem('user');
    localStorage.removeItem('profile');
    deleteCookie('access')
    deleteCookie('refresh')
    location.href = '/index.html'
    alert('로그아웃')
}

$logout_btn.addEventListener('click',logout)
