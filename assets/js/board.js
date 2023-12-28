import { detail_page } from "./util.js"
import { create_post, create_page } from "./createElement.js"
const profile = JSON.parse(localStorage.getItem("profile"))
const $page_num = document.querySelector('.posts')
const $user_name = document.querySelector('.user-name')
const $user_about = document.querySelector('.user-description')
const $user_img = document.querySelector('.profile-image')
const $user_facebook = document.querySelector('.facebook')
const $user_twitter = document.querySelector('.twitter')
const $user_insta = document.querySelector('.instagram')
const $usprofile_link = document.querySelector('.profile-link')
const $search = document.querySelector('.search-input');
const $search_btn = document.querySelector('.search-btn');
const urlParams = new URLSearchParams(window.location.search);
const pageParam = urlParams.get('page') || 1;
$search_btn.addEventListener("click", function () {
    const searchTerm = $search.value;
    // 검색어를 URL 파라미터로 추가하고 search.html로 이동
    window.location.href = `../view/search.html?searchTerm=${searchTerm}`;
});
const post_list = async (page = pageParam) => {
    
    const url = `http://api.gymsearch.shop/blog/?page=${page}`
    await fetch(url, {
        method: "GET",
        headers: {
        },
    })
    .then((res) => res.json())
    .then((data) => {
        const $post_list = document.querySelector('.posts')
        const page_count = Math.ceil(data.post_len/12)
        create_page(page_count)
        const cur_page = document.querySelector(`.page${pageParam}`)
        console.log(cur_page);
        cur_page.style.border = '2px solid #3498db'
        const datas = data.posts
        $post_list.innerHTML = '';
        datas.forEach(data => {
            const element = create_post(data.post, data.writer, 'board', data.likes);
            $post_list.append(element)
        })
        if (profile){
            $usprofile_link.href = '../view/profile.html'
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
        }
        else {
            $user_img.src = '../assets/img/default.png'
            $user_name.innerText = '로그인 해주세요.'
            $user_about.innerText = ''
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



post_list()