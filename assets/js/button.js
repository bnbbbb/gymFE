const $top_btn = document.querySelector('.top-button')

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'  // 부드럽게 스크롤되도록 설정
    });
}

$top_btn.addEventListener('click', scrollToTop)