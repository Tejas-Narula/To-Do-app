const taskInput = document.querySelector('.js-taskInput');
const addTaskBtn = document.querySelector('.taskInputBtn')



// todo list
const tasks = [{name :"Exercise", description: '', stared: false, completed: false},{name :"Gym", description: '', stared: false, completed: false},{name :"Walk", description: '', stared: true, completed: false}]



renderTodoList()

function removeElements(arr1, arr2) {
  return arr1.filter(element => !arr2.includes(element));
}


// render todo list by creating the html and putting it on the page
function renderTodoList(){
    let todoTasksHtml = ''
    const completedTasks = [];

    tasks.forEach((task, index) => {
        if (task.completed){
            completedTasks.push(task)
            console.log(completedTasks)
            return
        }
    })



    let sortedTasks = tasks.sort((a,b)=>{return b.stared-a.stared})

    sortedTasks = removeElements(sortedTasks, completedTasks);

    sortedTasks.forEach((task, index) => {
        
        html = `
            <div class="task">
                <div class="taskInfo">
                    <input type="checkbox" class="js-checkBox checkBox" ${task.completed ? "checked" : ""}>

                    <p>${task.name}</p>
                    
                </div>

                <div class = "checkBoxes">
                    <input type="checkbox" id="starcheckbox${index+1}" class="starCheckBox" ${task.stared ? "checked" : ""}>
                    <label for="starcheckbox${index+1}" class="starLabel">${task.stared ? "&#x2605" : "&#x2606;"}</label>

                    <div class="moreInfoBtn">
                        <div class="dot">&#9679;</div>
                        <div class="dot">&#9679;</div>
                        <div class="dot">&#9679;</div>
                    </div>
                    
                </div>
            </div>
            `
        todoTasksHtml += html
    });

    document.querySelector(".js-Tasks").innerHTML = todoTasksHtml

    //Compleyed Task checkbox
    document.querySelectorAll(".js-checkBox").forEach((checkbox, index) =>{
        checkbox.addEventListener("change", () => {
            sortedTasks[index].completed = checkbox.checked;
            renderTodoList()
    })
    })

    //Star checkBox
    document.querySelectorAll(".starCheckBox").forEach((checkbox, index)=>{
        checkbox.addEventListener("change", ()=>{
            sortedTasks[index].stared = checkbox.checked
            renderTodoList()
        })
    })


}




// Add Task Button
addTaskBtn.addEventListener("click", () =>{
    addTask();
    taskInput.focus()
    
})

function addTask(){
    const taskPopUp = document.querySelector('.addTaskPopUp')
    taskPopUp.classList.add('addTaskPopUpShow')
}

const taskPopUp = document.querySelector('.addTaskPopUp');

// Detect outside clicks
document.addEventListener('click', function(event) {
    const isPopUpOpen = taskPopUp.classList.contains('addTaskPopUpShow');
    const clickedInsidePopUp = taskPopUp.contains(event.target);
    const clickedButton = addTaskBtn.contains(event.target);

    if (isPopUpOpen && !clickedInsidePopUp && !clickedButton) {
        hideInputPopUp()
    }
});

function hideInputPopUp(){
    taskPopUp.classList.remove('addTaskPopUpShow')
}


//add Task

const confirmAddTaskBtn = document.querySelector('.js-addTaskConfirm')

confirmAddTaskBtn.addEventListener('click', ()=>{
    const taskName = taskInput.value

    const task = {name :taskName, description: '', stared: false, completed: false};

    tasks.push(task);  

    taskInput.value = '';

    hideInputPopUp()
    renderTodoList()
})