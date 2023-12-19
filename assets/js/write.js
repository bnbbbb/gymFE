import { getCookie, setWithExpire } from "./util.js";

const $view = document.querySelector('.view');
const formData = new FormData();
const $title = document.querySelector('.form-title')
const $toast_ui = document.querySelector('#toast-editor')
// const $toast_ui = document.querySelector('#toastui-editor-contents')
const $saveBtn = document.querySelector('.post-save');
const $tags = document.querySelector('.tag-title')
const Editor = toastui.Editor;


const editor = new Editor({
    el: document.querySelector("#toast-editor"),
    height: "600px",
    initialEditType: "markdown",
    previewStyle: "vertical",
    
});
const postWrite = async () => {
    const url = 'http://api.gymsearch.shop/blog/write/';
    const access = getCookie('access');
    formData.append('title', $title.value);
    // formData.append('content', $toast_ui.value);
    // formData.append('content', editor.getHTML());
    formData.append('content', editor.getMarkdown());
    formData.append('tags', $tags.value)
    // const htmlContent = marked(editor.getMarkdown());
    // console.log(htmlContent);
    // formData.append('content', editor.getMarkdown());
    // formData.append('content', htmlContent);
    
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
