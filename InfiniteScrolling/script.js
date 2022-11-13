const container = document.getElementById('container');
const loading = document.querySelector('.loading')

let pageNumber = 1;

fetchPost(pageNumber);

window.addEventListener('scroll', ()=>{
    const {scrollTop, scrollHeight, clientHeight} = document.documentElement;
    
    if(scrollTop + clientHeight >= scrollHeight - 5){
        ++pageNumber;
        showLoading(pageNumber);
    }
})

const showLoading = (pageNumber) => {
    loading.classList.add('show');
    setTimeout(() => fetchPost(pageNumber),1000);
}


async function fetchPost(pageNumber){
    const postResponse = await fetch(`https://api.unsplash.com/photos/?page=${pageNumber}&client_id=KqPjtXttyzyuzxFTa6xaYUiTwaBE2NUztZLdCM5UbK8`);
    const postData = await postResponse.json();
    addDataToDom(postData);
}


const addDataToDom = (data) => {
    data.forEach(({ urls:{regular},user:{bio} }) => {
        const div = document.createElement('div');
        div.classList.add('blog-post');
        const h2 = document.createElement('h2');
        h2.innerText = bio || 'Hello';
        div.append(h2)
        const imgContainer = document.createElement('div');
        imgContainer.classList.add('img-container');
        const img = document.createElement('img');
        img.src = regular;
        imgContainer.appendChild(img);
        div.append(imgContainer);
        container.append(div)
    });
   
    loading.classList.remove('show');
}

