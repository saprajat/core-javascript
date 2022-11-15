const container = document.getElementById('container');
const blogContent = document.querySelector('.blog-content');
const paginationEl = document.querySelector('.pagination');
const loading = document.querySelector('.loading');

const postData = [];
const pageSize = 10;
const currentPage = 1; 

const clearDataFromDom = () => {
    blogContent.innerHTML = '';
}

const fetchApi = async() => {
    const resp = await fetch(`https://jsonplaceholder.typicode.com/posts`);
    const data = await resp.json();
    postData.push(...data);
    postData.pop();
    createPagination(postData);
    addDataToDom(postData);
}

const addDataToDom = (data,currentPage=1,pageSize=10) => {
    let start = (currentPage - 1) * pageSize;
    let end = currentPage * pageSize;
    data.slice(start,end).map(({title,body,id})=>{
        const div = document.createElement('div');
        div.classList.add('blog-post');
        const h2 = document.createElement('h2');
        h2.innerText = id || 'Hello';
        div.append(h2)
        const pEl = document.createElement('p');
        pEl.classList.add('img-container');
        pEl.innerText = body;
        div.append(pEl);
        blogContent.append(div);
    })
    loading.classList.remove('show');
}

const createPagination = (postData) => {
    let postLength = postData.length;
    let paginationNo = postLength % pageSize === 0 ? (postLength / pageSize) : Math.ceil(postLength / pageSize) ;

    for (let i=1 ; i <= paginationNo ; i++){
        const liEl = document.createElement('li');
        liEl.innerText = i;
        paginationEl.append(liEl);
    }   
}

const showLoading = (pageNumber) => {
    loading.classList.add('show');
    setTimeout(() => addDataToDom(postData,pageNumber),1000);
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
        showLoading(updatePageNumber)
    }
});


fetchApi();

