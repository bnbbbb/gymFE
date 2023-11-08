import { getCookie, setWithExpire } from "./util.js";

const $view = document.querySelector('.view');
const formData = new FormData();
const $title = document.querySelector('.form-title')
const $toast_ui = document.querySelector('#toast-editor')
// const $toast_ui = document.querySelector('#toastui-editor-contents')
const $saveBtn = document.querySelector('.post-save');
const $tags = document.querySelector('.tag-title')
const Editor = toastui.Editor;
const img_list = []
const editor = new Editor({
    el: document.querySelector("#toast-editor"),
    height: "300px",
    initialEditType: "markdown",
    previewStyle: "vertical",
    hooks: {
        addImageBlobHook(blob, callback) {
            console.log(blob);
            console.log(callback);
            const url = 'http://127.0.0.1:8000/blog/write/image/';
            const access = getCookie('access');
            // console.log(post_img)
            formData.append('image', blob);
            
            fetch(url, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${access}`,
                },
                body: formData,
            })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                // for (let i in data){

                // }
                if (data.length > 0) {
                    // Add the uploaded image to the editor
                    for (let imageUrl of data) {
                        console.log(imageUrl);
                        img_list.push(imageUrl)
                        callback(imageUrl, blob.name);
                    }
                }
                // callback(data[0], 'altText');; // 이미지를 에디터에 추가 (옵션: alt 텍스트)
            })
            .catch((error) => {
                console.log("error", error);
            })
        },
    },
});
// console.log(img_list);
const postWrite = async () => {
    const url = 'http://127.0.0.1:8000/blog/write/';
    const access = getCookie('access');
    // console.log(post_img)
    formData.append('title', $title.value);
    formData.append('image', img_list)
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
