import { detail_page } from "./util.js"
import { create_post } from "./createElement.js"
const profile = JSON.parse(localStorage.getItem("profile"))

const $user_name = document.querySelector('.user-name')
const $user_about = document.querySelector('.user-description')
const $user_img = document.querySelector('.profile-image')
const $user_facebook = document.querySelector('.facebook')
const $user_twitter = document.querySelector('.twitter')
const $user_insta = document.querySelector('.instagram')
const post_list = async () => {
    const url = 'http://127.0.0.1:8000/blog/'
    await fetch(url, {
        method: "GET",
        headers: {
        },
    })
    .then((res) => res.json())
    .then((data) => {
        const $post_list = document.querySelector('.posts')
        const datas = data.posts
        datas.forEach(data => {
            const element = create_post(data.post, data.writer, 'board', data.likes);
            $post_list.append(element)
        })
        if (profile.image) {
            $user_img.src = 'https://myorgobucket.s3.ap-northeast-2.amazonaws.com' + profile.image
        }
        else{
            $user_img.src = '../assets/img/default.png'
        }
        $user_name.innerText = profile.name
        $user_about.innerText = profile.about
        if (profile.face_url){
            $user_facebook.href = `https://${profile.face_url}`
        }
        else{
            $user_facebook.href = '#'
        }
        if (profile.twitter_url){
            $user_twitter.href = `https://${profile.twitter_url}`
        }
        else{
            $user_twitter.href = '#'
        }
        if (profile.insta_url){
            $user_insta.href = `https://${profile.insta_url}`
        }
        else{
            $user_insta.href = '#'
        }
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