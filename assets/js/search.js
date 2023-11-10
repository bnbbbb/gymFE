import { detail_page } from "./util.js";
import { create_post, create_page } from "./createElement.js";

const profile = JSON.parse(localStorage.getItem("profile"));

const $user_name = document.querySelector('.user-name');
const $user_about = document.querySelector('.user-description');
const $user_img = document.querySelector('.profile-image');
const $user_facebook = document.querySelector('.facebook');
const $user_twitter = document.querySelector('.twitter');
const $user_insta = document.querySelector('.instagram');
const $usprofile_link = document.querySelector('.profile-link');
const $search = document.querySelector('.search-input');
const $search_btn = document.querySelector('.search-btn');

const urlParams = new URLSearchParams(window.location.search);
const searchTermParam = urlParams.get('searchTerm') || '';
const pageParam = parseInt(urlParams.get('page')) || 1;
console.log(searchTermParam);
// $search.value = searchTermParam;

$search_btn.addEventListener("click", function () {
    const searchTerm = $search.value;
    
    // 현재 URL의 매개변수를 읽어옴
    const urlParams = new URLSearchParams(window.location.search);
    
    // 매개변수에 검색어 추가
    if (searchTerm) {
        urlParams.set('searchTerm', searchTerm);
    } else {
        // 검색어가 비어있다면 매개변수 제거
        urlParams.delete('searchTerm');
    }
    // 현재 페이지의 상태를 변경하고 새로운 URL을 생성
    const newUrl = `${window.location.pathname}?${urlParams.toString()}`;
    
    // 페이지 이동
    window.location.href = newUrl;
});

const sendSearchRequest = async (searchTermParam, page) => {
    const url = `http://127.0.0.1:8000/blog/search/${searchTermParam}`;
    
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {},
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        displaySearchResults(data);
    } catch (error) {
        console.error("검색 오류:", error);
    }
};

function displaySearchResults(data) {
    const $post_list = document.querySelector('.posts')
    // console.log(data.post_len);
    const page_count = Math.ceil(data.post_len/12)
    create_page(page_count, searchTermParam)
    const cur_page = document.querySelector(`.page${pageParam}`)
    console.log(cur_page);
    cur_page.style.border = '2px solid #3498db'
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
sendSearchRequest(searchTermParam, pageParam);