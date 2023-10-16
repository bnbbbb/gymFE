import { getCookie, setWithExpire } from "./util.js";

const $view = document.querySelector('.view');
const formData = new FormData();
const $title = document.querySelector('.form-title')
const $toast_ui = document.querySelector('#toast-editor')
const $saveBtn = document.querySelector('.post-save');


const postWrite = async () => {
    const url = 'http://127.0.0.1:8000/blog/write/';
    const access = getCookie('access');
    formData.append('title', $title.value);
    formData.append('content', $toast_ui.value);
    await fetch(url, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${access}`,
        },
        body: formData,
    })
    .then((response) => response.json())
    .then((data) => {
        alert(data.message);
        location.href = '/index.html'
    })
    .catch((error) => {
        console.log(error);
    });
}

$saveBtn.addEventListener('click', postWrite);
