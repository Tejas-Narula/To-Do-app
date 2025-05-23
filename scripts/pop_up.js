function hideInputPopUp(){
    taskPopUp.classList.remove('addTaskPopUpShow')
}

const taskInput = document.querySelector('.js-taskInput');
const taskInputDesc = document.querySelector('.js-taskInputDesc')


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
    const taskDesc = taskInputDesc.value

    const task = {name :taskName, description: taskDesc, stared: false, completed: false};

    activeList.tasks.push(task);  

    taskInput.value = '';
    taskInputDesc.value = ''

    hideInputPopUp()
}


// Detect outside clicks
document.addEventListener('click', function(event) {
    if (taskPopUp !== undefined){

    const isPopUpOpen = taskPopUp.classList.contains('addTaskPopUpShow');
    const clickedInsidePopUp = taskPopUp.contains(event.target);
    const clickedButton = addTaskBtn.contains(event.target);

    if (isPopUpOpen && !clickedInsidePopUp && !clickedButton) {
        hideInputPopUp()
    }
}
});

