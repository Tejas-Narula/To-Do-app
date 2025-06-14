const side_bar = document.querySelector('.js-sideBar')
const burger = document.querySelector('.js-burger')
sideBarShown = stringToBoolean(localStorage.getItem('sideBarShown')) || false




if (sideBarShown){
    side_bar.classList.add('show')
    document.body.classList.add('showSideBar')
    burger.classList.add('showSideBar')
}

burger.addEventListener('click', ()=>{
    sideBarShown = !sideBarShown
    localStorage.setItem('sideBarShown', sideBarShown)
    side_bar.classList.toggle('show')
    document.body.classList.toggle('showSideBar')
    burger.classList.toggle('showSideBar')
})


//Side Bar





//random Functions

function stringToBoolean(str) {
    if (str === 'false') {
        return false;
    }
    return true;
}