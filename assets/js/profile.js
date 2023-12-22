import { getCookie, setWithExpire } from "./util.js"


const $previewImage = document.querySelector('.preview-image')
const $userImage = document.querySelector('.image-input')
const $user_name = document.querySelector('.user-name')
const $address_num = document.querySelector('.address-num')
const $address = document.querySelector('.address')
const $address_relate = document.querySelector('.address-relate')
const $address_detail = document.querySelector('.address-detail')
const $insta = document.querySelector('.insta')
const $facebook = document.querySelector('.facebook')
const $twitter = document.querySelector('.twitter')
// const user = getWithExpire('user');
const userProfileData = JSON.parse(localStorage.getItem('profile'));
const $profile_save = document.querySelector('.profile-btn')


const myprofile = async() => {
    const access = getCookie('access')
    const url = 'http://api.gymsearch.shop/user/profile/'

    await fetch(url, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${access}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userProfileData),
    })
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
        console.log(data.image);
        if (data.image){
            $previewImage.src = 'https://myorgobucket.s3.ap-northeast-2.amazonaws.com'+data.image
        }
        else{
            $previewImage.src = '../assets/img/default.png'
        }
        $user_name.value = data.name;
        $address_num.value = data.address_num;
        $address.value = data.address;
        $address_relate.value = data.address_relate;
        $address_detail.value = data.address_detail;
        $insta.value = data.insta_url;
        $facebook.value = data.face_url;
        $twitter.value = data.twitter_url;
    })
    .catch((err) => {
        console.log(err);
    });
}
const name = $user_name.value
console.log(name);

const profile_save = async (event) => {
    event.preventDefault()

    const formData = new FormData();
    const name = $user_name.value
    const profileimage = $userImage.files[0]
    const access = getCookie('access')
    const address_num = $address_num.value
    const address = $address.value
    const address_relate = $address_relate.value
    const address_detail = $address_detail.value
    const insta_url = $insta.value
    const face_url = $facebook.value
    const twitter_url = $twitter.value
    if (profileimage) {
        formData.append('image', profileimage)
    }
    formData.append('name', name)
    formData.append('address_num', address_num)
    formData.append('address', address)
    formData.append('address_relate', address_relate)
    formData.append('address_detail', address_detail)
    formData.append('insta_url', insta_url)
    formData.append('face_url', face_url)
    formData.append('twitter_url', twitter_url)
    console.log(formData);

    const url = 'http://api.gymsearch.shop/user/profile/update/'

    await fetch(url, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${access}`,
        },
        body: formData,
    })
    .then((res) => res.json())
    .then((data) => {
        if (data) {
            // alert('프로필 변경이 완료되었습니다.')
            console.log(data);
            setWithExpire('profile',data)
            setWithExpire('user', data);
            location.href = '/index.html'

        }
    })
    .catch((err) => {
        console.log(err);
    });
}

const previewImage = (event) => {
    const file = event.target.files[0];
    console.log(file);
    if (file.size > 250000){
        alert('파일크기는 2.5MB 이내로 가능합니다.')
        event.target.value = ''
    } else{
        let reader = new FileReader();

        reader.onload = function (event) {
            $previewImage.setAttribute("src", event.target.result);
        };
        reader.readAsDataURL(file);
    }
    
};

$userImage.addEventListener('change', previewImage)
myprofile()
$profile_save.addEventListener('click', profile_save)