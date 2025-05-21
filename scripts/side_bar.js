const side_bar = document.querySelector('.js-sideBar')
const burger = document.querySelector('.js-burger')

burger.addEventListener('click', ()=>{
    side_bar.classList.toggle('show')
    document.body.classList.toggle('showSideBar')
    burger.classList.toggle('showSideBar')
})


//Side Bar
