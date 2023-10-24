
/**
 * @param {string} cookie_name 저장될 쿠키 이름
 * @param {string} value 저장될 value
 */
export const setCookie = (cookie_name, value) => {
    let exdate = new Date();
    exdate.setMinutes(exdate.getMinutes() + 30);
    // 설정 일수만큼 현재시간에 만료값으로 지정
    const cookie_value = value + '; expires=' + exdate.toUTCString();
    document.cookie = cookie_name + '=' + cookie_value;
}

/**
 * @param {string} cookie_name 가져올 쿠키 이름
 */
export const getCookie = function(name){
    const value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return value? value[2] : null;
}

export const deleteCookie = (name) => {
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

// 로그인이 되있으면 홈으로
export const is_logined = () => {
    if (localStorage.getItem('user')) {
        location.href= '/index.html'
    }
}

export const setWithExpire = (key, data) => {
    let now = new Date()
    let item = data
    item['expires'] = now.getTime() + (2*60*60*1000) - 1000
    localStorage.setItem(key,JSON.stringify(item))
}

export const getWithExpire = (key) => {
    
    const itemStr = localStorage.getItem(key)

    if(!itemStr){
        return null
    }

    const item = JSON.parse(itemStr)
    const now = new Date()

    if(now.getTime() > item.expires) {
        localStorage.removeItem(key)
        deleteCookie('access')
        deleteCookie('refresh')
        alert('로그인 시간이 만료되어 로그아웃 되었습니다.')
        return null
    }
    return itemStr
}

export const detail_page = (event) => {
    let target = event.target;
    console.log('Clicked element ID:', target.id);
    while (target.classList != 'post'){
        target = target.parentNode
    }
    const post_page = {
        'page': target.id
    };
    localStorage.setItem("postPage", JSON.stringify(post_page));
}