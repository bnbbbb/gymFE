import { getCookie, setWithExpire } from "./util.js";

const renderPage = JSON.parse(localStorage.getItem("postPage"))
const $view = document.querySelector('.view');
const formData = new FormData();
const $title = document.querySelector('.form-title')
const $toast_ui = document.querySelector('#toast-editor')
// const $toast_ui = document.querySelector('#toastui-editor-contents')
const $saveBtn = document.querySelector('.post-save');
const $tags = document.querySelector('.tag-title')
const Editor = toastui.Editor;

function stripHTML(html) {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
}
const editor = new Editor({
    el: document.querySelector("#toast-editor"),
    // initialValue: data.post.content, // 'initialEditType' 대신 'initialValue' 사용
    initialEditType: "markdown", // 'initialEditType' 대신 'initialValue' 사용
    previewStyle: "vertical",
    height: "600px"
});

const postData = async () => {
    const url = `http://127.0.0.1:8000/blog/detail/${renderPage.page}/`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('게시글 데이터를 가져오는 중 오류 발생');
        }
        const data = await response.json();
        
        editor.setMarkdown(data.post.content);
        $title.value = data.post.title;
        let tag_array = []
        data.tags.forEach(d => {
            // $tags.value = `#${d.name} `
            tag_array.push(`${d.name}`)
            // console.log(d.name);
        })
        $tags.value = tag_array.join(' ')

        // 제목 표시
    } catch (error) {
        console.error(error);
    }
}




const postEdit = async () => {
    const url = `http://127.0.0.1:8000/blog/detail/${renderPage.page}/edit/`;
    const access = getCookie('access');
    formData.append('title', $title.value);
    formData.append('content', editor.getMarkdown());
    formData.append('tags', $tags.value)
    console.log(editor.getMarkdown());
    console.log(editor.getHTML());
    console.log($toast_ui.value);
    
    await fetch(url, {
        method: "PUT",
        headers: {
            "Authorization": `Bearer ${access}`,
        },
        body: formData,
    })
    .then((response) => response.json())
    .then((data) => {
        alert(data.message);
        window.location.href = './detail.html'
    })
    .catch((error) => {
        console.log(error);
    });
}

$saveBtn.addEventListener('click', postEdit);
postData();
// const url = `http://127.0.0.1:8000/blog/detail/${renderPage.page}/edit`;
