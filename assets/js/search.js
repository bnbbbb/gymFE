import { detail_page } from "./util.js"
import { create_post } from "./createElement.js"
const profile = JSON.parse(localStorage.getItem("profile"))

const $user_name = document.querySelector('.user-name')
const $user_about = document.querySelector('.user-description')
const $user_img = document.querySelector('.profile-image')
const $user_facebook = document.querySelector('.facebook')
const $user_twitter = document.querySelector('.twitter')
const $user_insta = document.querySelector('.instagram')
const $usprofile_link = document.querySelector('.profile-link')
const $search = document.querySelector('.search-input');
const $search_btn = document.querySelector('.search-btn');

$search_btn.addEventListener("click", function () {
    const searchTerm = $search.value;
    // 검색어를 URL 파라미터로 추가하고 search.html로 이동
    window.location.href = `../view/search.html?searchTerm=${searchTerm}`;
});
const urlParams = new URLSearchParams(window.location.search);
const searchTerm = urlParams.get('searchTerm');
sendSearchRequest(searchTerm)
// $search_btn.addEventListener("click", function () {
//     // 검색어를 입력 필드에서 가져옵니다.
//     const searchTerm = $search.value;
//     // console.log(searchTerm);
//     // 가져온 검색어를 서버로 전송합니다.
//     // window.location.href = '../view/search.html'
//     sendSearchRequest(searchTerm);
// });

function sendSearchRequest(searchTerm) {
    // 검색어를 서버로 보낼 URL을 구성합니다.
    const url = `http://127.0.0.1:8000/blog/search/${searchTerm}`;

    // fetch를 사용하여 GET 요청을 보냅니다.
    fetch(url, {
        method: "GET",
        headers: {
        },
    })
    .then((response) => response.json())
    .then((data) => {
        displaySearchResults(data)
    })
    .catch((error) => {
        console.error("검색 오류:", error);
    });
}

function displaySearchResults(data) {
    const $post_list = document.querySelector('.posts')
    const datas = data.posts
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
}