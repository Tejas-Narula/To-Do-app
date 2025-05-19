function hideInputPopUp(){
    taskPopUp.classList.remove('addTaskPopUpShow')
}


//add Task - popup

const confirmAddTaskBtn = document.querySelector('.js-addTaskConfirm')

confirmAddTaskBtn.addEventListener('click', ()=>{
    const taskName = taskInput.value

    const task = {name :taskName, description: '', stared: false, completed: false};

    tasks.push(task);  

    taskInput.value = '';

    hideInputPopUp()
    renderTodoList()
})


// Detect outside clicks
document.addEventListener('click', function(event) {
    const isPopUpOpen = taskPopUp.classList.contains('addTaskPopUpShow');
    const clickedInsidePopUp = taskPopUp.contains(event.target);
    const clickedButton = addTaskBtn.contains(event.target);

    if (isPopUpOpen && !clickedInsidePopUp && !clickedButton) {
        hideInputPopUp()
    }
});

