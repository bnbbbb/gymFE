import { getCookie, setWithExpire } from "./util.js";

const profile = JSON.parse(localStorage.getItem("profile"))

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
const $btn_delete = document.querySelector('.btn-delete')
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

const Viewer = toastui.Editor;

const postLoad = async () => {
    const url = `http://127.0.0.1:8000/blog/detail/${renderPage.page}/`
    $btn_modify.style.display='none'
    $btn_delete.style.display='none'
    // const formData = new FormData()
    // formData.append('post_id', renderPage.page);

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
        const owner_name = data.writer.name
        const owner_img = data.writer.image
        $owner_name.innerText = owner_name
        if (owner_img) {
            $owner_img.src ='https://myorgobucket.s3.ap-northeast-2.amazonaws.com'+ owner_img
        }
        else{
            $owner_img.src = '../assets/img/default.png'
        }
        if (profile && (owner_name === profile.name)){
            $btn_modify.style.display=''
            $btn_delete.style.display=''
        }
        $created.innerText = `${year}-${month}-${day}`
        $post_title.innerText = data.post.title
        data.tags.forEach(d => {
            const tag = document.createElement('dd');
            tag.innerText = d.name
            $post_category.append(tag)
        })
    })
    .catch((err) => {
        console.log(err);
    })
}


const deletePost = async () => {
    const url = `http://127.0.0.1:8000/blog/detail/${renderPage.page}/delete/`
    const access = getCookie('access');
    
    await fetch(url, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${access}`,
        },
        // body: formData,
    })
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
        window.location.href = '../index.html'
    })
    .catch((err) => {
        console.log(err);
    });
}   

postLoad()

$btn_delete.addEventListener('click', deletePost)