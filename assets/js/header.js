import {getWithExpire,deleteCookie} from "./util.js"

const $button_logout = document.querySelector('.button_logout')
const login_btn = document.querySelector('.login')
const join_btn = document.querySelector('.join')
const profile_img = document.querySelector('.profile-img')
const write_btn = document.querySelector('.write')

const is_logined = async() => {
    if (getWithExpire('user')) {
        login_btn.style.display='none'
        join_btn.style.display='none'
    }
    else{
        $button_logout.style.display='none'
        profile_img.style.display='none'
        write_btn.style.display='none'
    }
}

is_logined()