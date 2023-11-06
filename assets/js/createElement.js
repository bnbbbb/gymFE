export const create_post = (post, owner, where, likes) => {
    const post_li = document.createElement('li');
    const post_a = document.createElement('a');
    const post_art = document.createElement('article');
    const post_img = document.createElement('img');
    const post_div = document.createElement('div');
    const post_category = document.createElement('dl');
    const post_dt = document.createElement('dt');
    const post_title = document.createElement('h3');
    // const post_author = document.createElement('author');
    const post_dl = document.createElement('dl');
    const post_author = document.createElement('dd');
    const author_img = document.createElement('img');
    const post_date = document.createElement('dd');
    const post_content = document.createElement('p');
    const post_writer = document.createElement('p');
    const post_url = '../view/detail.html'
    const originDate = post.created_at
    const date = new Date(originDate);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 월은 0부터 시작하므로 1을 더하고 두 자리로 포맷팅
    const day = date.getDate().toString().padStart(2, '0');
    
    const lines = post.content.split('\n'); // 줄 바꿈 문자를 기준으로 문자열을 나눕니다.
    // console.log(lines);
    // const htmlContent = marked(post.content);
    // console.log(htmlContent);
    // console.log(post);
    
    post_a.id = post.id
    post_a.href = post_url
    post_a.className = 'post'
    post_div.className = 'contents-wrap'
    post_category.className = 'category'
    post_dt.className = 'a11y-hidden'
    post_author.className = 'author'
    post_date.className = 'created'
    post_content.className = 'post-description';
    post_dl.className = 'author-wrap'
    author_img.className = 'profile_img'
    post_title.innerText = post.title
    // post_content.innerHTML = firstThreeLines
    post_content.innerHTML = post.content
    post.tags.forEach(data => {
        const post_tag = document.createElement('dd');

        post_tag.innerText = data.name
        // const element = create_post(data.post, data.writer, 'board', data.likes);
        // $post_list.append(element)
        post_category.append(post_tag)
    })
    // let owner_name = owner.name
    if (owner.image){
        let profile_url;
        profile_url = 'https://myorgobucket.s3.ap-northeast-2.amazonaws.com'
        author_img.src = profile_url + owner.image
    }else {
        author_img.src = 'assets/img/default.png';
    }
    // 이미지와 닉네임을 순서대로 추가
    post_date.innerText = `${year}-${month}-${day}`;
    post_writer.innerText = owner.name
    post_author.appendChild(author_img)
    post_author.appendChild(post_writer)


    // author_img.outerText = post.name;
    post_li.append(post_a)
    post_dl.append(post_author, post_date)
    post_category.append(post_dt)
    post_div.append(post_category, post_title, post_dl, post_content)
    post_art.append(post_img, post_div)
    post_a.append(post_art)
    post_li.append(post_a)


    // post_li 엘리먼트를 반환
    return post_li;
}


// export const create_view = (post_id, owner, likes) => {
//     // const $post_view = document.createElement('div')
//     const $post_width = document.createElement('div')
//     const $post_box = document.createElement('section')
//     const $post_inner = document.createElement('div')
//     const $owner = document.createElement('dl')
//     const $owner_hidden = document.createElement('dt')
//     const $owner_author = document.createElement('dd')
//     const $created_hidden = document.createElement('dt')
//     const $created_time = document.createElement('dd')
//     const $tag = document.createElement('dl')
//     const $tag_hidden = document.createElement('dl')
//     const $tag = document.createElement('dl')

// }