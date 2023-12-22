import { getCookie, setWithExpire } from "./util.js";


const $pw_password = document.querySelector('.user-pw-password')
const $pw_confirm = document.querySelector('.user-confirm')
const $pw_form = document.querySelector('.user-password')
const $pw_current = document.querySelector('.user-current-password')
const $pw_unfirm = document.createElement('p')
const $pw_btn = document.querySelector('.pw-btn')

$pw_password.addEventListener('input', checkPasswordMatch);
$pw_confirm.addEventListener('input', checkPasswordMatch);

function checkPasswordMatch() {
    if ($pw_password.value !== $pw_confirm.value) {
        // 비밀번호가 일치하지 않는 경우 메시지 표시
        $pw_unfirm.innerText = '비밀번호가 일치하지 않습니다.';

        $pw_unfirm.style.color = 'red';
        $pw_form.appendChild($pw_unfirm)
        $pw_btn.disabled = true
    } else {
        // 비밀번호가 일치하는 경우 메시지 제거
        $pw_unfirm.innerText = '';
        $pw_btn.disabled = false
    }
}

const password_chang = async (event) => {
    event.preventDefault()
    const formData = new FormData()
    formData.append('cur_password', $pw_current.value)
    formData.append('new_password', $pw_confirm.value)

    const url = 'http://api.gymsearch.shop/user/password/'
    const access = getCookie('access');

    await fetch(url, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${access}`,
        },
        body: formData
    })
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
        $pw_unfirm.innerText = data.message;

        $pw_unfirm.style.color = 'red';
        $pw_form.appendChild($pw_unfirm)
    })
    .catch((err) => {
        console.log(err);
    })
}

$pw_btn.addEventListener('click',password_chang)