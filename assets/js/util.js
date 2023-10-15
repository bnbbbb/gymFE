
/**
 * @param {string} cookie_name 저장될 쿠키 이름
 * @param {string} value 저장될 value
 */
export const setCookie = (cookie_name, value) => {
    let exdate = new Date();
    exdate.setDate(exdate.getMinutes() + 30);
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