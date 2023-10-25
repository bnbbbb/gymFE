// import { getCookie, getWithExpirec } from "./util.js";

const renderPage = JSON.parse(localStorage.getItem("postPage"))
// const $post_view = document.querySelector('div')
// const $post_width = document.querySelector('div')
// const $post_box = document.querySelector('section')
// const $post_inner = document.querySelector('div')
const $day = document.querySelector('.today')
const $owner_img = document.querySelector('.author-img')
const $owner_name = document.querySelector('.author-name')
const $created = document.querySelector('.created')
const $post_category = document.querySelector('.category')
const $post_title = document.querySelector('.post-title')
const $post_content = document.querySelector('.view-contents')
const $btn_like = document.querySelector('.btn-like')
const $btn_modify = document.querySelector('.btn-modify')
const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];
const daysOfWeeks = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const currentDate = new Date();
const monthName = months[currentDate.getMonth()];
const dayOfMonth = currentDate.getDate();
const dayOfWeek = daysOfWeeks[currentDate.getDay()];
$btn_modify.href = './edit.html'
console.log(renderPage);
// const Editor = toastui.Editor;

const Viewer = toastui.Editor;

const postLoad = async () => {
    const url = `http://127.0.0.1:8000/blog/detail/${renderPage.page}/`
    const formData = new FormData()
    formData.append('post_id', renderPage.page);

    await fetch(url, {
        method: "get",
    })
    .then((res) => res.json())
    .then((data) => {
        const originDate = data.post.created
        const date = new Date(originDate);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 월은 0부터 시작하므로 1을 더하고 두 자리로 포맷팅
        const day = date.getDate().toString().padStart(2, '0');
        // const days = new Date(`${year}-${month}-${day}`);
        const viewer = new Viewer({
            el: $post_content,
            viewer: true,
            height: '600px',
            initialValue: data.post.content
        });
        $day.innerHTML = `${monthName} <em>${dayOfMonth}</em> ${dayOfWeek}`
        $owner_name.innerText = data.writer.name
        $created.innerText = `${year}-${month}-${day}`
        $post_title.innerText = data.post.title
        data.tags.forEach(d => {
            console.log(d);
            const tag = document.createElement('dd');
            tag.innerText = d.name
            $post_category.append(tag)
        })
        console.log(data.tags);
    })
    .catch((err) => {
        console.log(err);
    })
}

postLoad()