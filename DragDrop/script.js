const container = document.getElementById('container');
const imgBox = document.querySelector('.img-box');
const whiteBoxes = document.querySelectorAll('.white-box');

imgBox.addEventListener('dragstart',(e)=>{
    console.log("Drag Start")
    e.target.className += ' hold';
    setTimeout(()=>{
        e.target.className = 'hide';
    },0)
});

imgBox.addEventListener('dragend',(e)=>{
    console.log("Drag End");
    e.target.className = 'img-box';
})


for(whiteBox of whiteBoxes){
    whiteBox.addEventListener('dragover', (e) => {
        e.preventDefault();
    });

    whiteBox.addEventListener('dragenter', (e) => {
        e.target.className += ' dashed' 
    })

    whiteBox.addEventListener('dragleave', (e) => {
        e.target.className = 'white-box'
    })

    whiteBox.addEventListener('drop', (e) => {
        e.target.append(imgBox);      
    })
}
