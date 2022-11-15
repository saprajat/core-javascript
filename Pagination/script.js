const container = document.getElementById('container');
const blogContent = document.querySelector('.blog-content');
const paginationEl = document.querySelector('.pagination');
const loading = document.querySelector('.loading');



let pageNumber;

const clearDataFromDom = () => {
    blogContent.innerHTML = '';
}

const fetchApi = async(pageNumber = 1 ) => {
    const resp = await fetch(`https://api.unsplash.com/photos/?page=${pageNumber}&client_id=KqPjtXttyzyuzxFTa6xaYUiTwaBE2NUztZLdCM5UbK8`);
    const data = await resp.json();
    addDataToDom(data);
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
        blogContent.append(div)
    });

    loading.classList.remove('show');
}

const showLoading = (pageNumber) => {
    loading.classList.add('show');
    setTimeout(() => fetchApi(pageNumber),1000);
}

paginationEl.addEventListener('click', event => { 
    const {tagName,innerText } = event.target;
    if ( tagName === 'LI') { 
        const updatePageNumber = parseInt(innerText);
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
          });
        clearDataFromDom();
        showLoading(updatePageNumber);
    }
  });


fetchApi(pageNumber);

