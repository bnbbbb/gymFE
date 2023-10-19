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
        datas.forEach(data => {
            const element = create_post(data.posts, data.writer, 'board', data.likes);
            $post_list.append(element)
        })
    })
    .catch((err) => {
        console.log(err);
    })
}

post_list()