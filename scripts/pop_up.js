function hideInputPopUp(){
    taskPopUp.classList.remove('addTaskPopUpShow')
}

const taskInput = document.querySelector('.js-taskInput');


//add Task - popup

const confirmAddTaskBtn = document.querySelector('.js-addTaskConfirm')

taskInput.addEventListener('keydown', (event)=>{
    if (event.key === 'Enter'){
        confirmAddTask()
        renderTodoList()
    }
})

confirmAddTaskBtn.addEventListener('click', ()=>{
    confirmAddTask()
    renderTodoList()
})

function confirmAddTask(){
    const taskName = taskInput.value

    const task = {name :taskName, description: '', stared: false, completed: false};

    tasks.push(task);  

    taskInput.value = '';

    hideInputPopUp()
}


// Detect outside clicks
document.addEventListener('click', function(event) {
    const isPopUpOpen = taskPopUp.classList.contains('addTaskPopUpShow');
    const clickedInsidePopUp = taskPopUp.contains(event.target);
    const clickedButton = addTaskBtn.contains(event.target);

    if (isPopUpOpen && !clickedInsidePopUp && !clickedButton) {
        hideInputPopUp()
    }
});

