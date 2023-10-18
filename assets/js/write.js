import { getCookie, setWithExpire } from "./util.js";

const $view = document.querySelector('.view');
const formData = new FormData();
const $title = document.querySelector('.form-title')
const $toast_ui = document.querySelector('#toast-editor')
// const $toast_ui = document.querySelector('#toastui-editor-contents')
const $saveBtn = document.querySelector('.post-save');

const Editor = toastui.Editor;


const editor = new Editor({
    el: document.querySelector("#toast-editor"),
    height: "500px",
    initialEditType: "markdown",
    previewStyle: "vertical",
    
});
const postWrite = async () => {
    const url = 'http://127.0.0.1:8000/blog/write/';
    const access = getCookie('access');
    formData.append('title', $title.value);
    // formData.append('content', $toast_ui.value);
    formData.append('content', editor.getHTML());
    console.log(editor.getMarkdown());
    console.log(editor.getHTML());
    console.log($toast_ui.value);
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
        // location.href = '/index.html'
    })
    .catch((error) => {
        console.log(error);
    });
}

$saveBtn.addEventListener('click', postWrite);
