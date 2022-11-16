const animBox = document.querySelectorAll('.anim-box');

window.addEventListener('scroll', checkBoxes);

checkBoxes();

function checkBoxes(){
    const triggerBottom = window.innerHeight / 5 * 4;
    
    animBox.forEach( box =>{
        const boxTop = box.getBoundingClientRect().top;
        
        if(boxTop < triggerBottom ){
            box.classList.add('show');
        }else {
            box.classList.remove('show');
        }
        
    })
}