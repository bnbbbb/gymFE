import { detail_page } from "./util.js"
import { create_post } from "./createElement.js"

const post_list = async () => {
    const url = 'http://127.0.0.1:8000/blog/'

    await fetch(url, {
        method: "GET",
        headers: {},
    })
    .then((res) => res.json())
    .then((data) => {
        const $post_list = document.querySelector('.posts')
        const datas = data.posts
        console.log(datas);
        console.log(datas);
        datas.forEach(data => {
            console.log(data.post.tags);
            const element = create_post(data.post, data.writer, 'board', data.likes);
            $post_list.append(element)
        })
        const posts = document.querySelectorAll('.post');
        posts.forEach(post => {
            post.addEventListener('click', detail_page);
        });
    })
    .catch((err) => {
        console.log(err);
    })
}



// posts.forEach(post => {
//     post.addEventListener('click', detail_page);
// });

post_list()