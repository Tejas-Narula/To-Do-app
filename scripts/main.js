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

    //Add Completed Tasks to its list for future rendering in a superate area
    tasks.forEach((task, index) => {
        if (task.completed){
            completedTasks.push(task)
            console.log(completedTasks)
            return
        }
    })



    let sortedTasks = tasks.sort((a,b)=>{return b.stared-a.stared})
    sortedTasks = removeElements(sortedTasks, completedTasks); //ordering the starred tasks first

    sortedTasks.forEach((task, index) => {
        
        //html for each task
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

    document.querySelector(".js-Tasks").innerHTML = todoTasksHtml // putting the formed html on the page

    addEventListenerCheckBox(sortedTasks)
    addEventListenerStarCheckBox(sortedTasks)

}

function addEventListenerCheckBox(tasks){
    //Compleyed Task checkbox
    document.querySelectorAll(".js-checkBox").forEach((checkbox, index) =>{
        checkbox.addEventListener("change", () => {
            tasks[index].completed = checkbox.checked;
            renderTodoList()
    })
    })

}
function addEventListenerStarCheckBox(tasks){
    //Star checkBox
    document.querySelectorAll(".starCheckBox").forEach((checkbox, index)=>{
        checkbox.addEventListener("change", ()=>{
            tasks[index].stared = checkbox.checked
            renderTodoList()
        })
    })
}




// Add Task Button (main page)
addTaskBtn.addEventListener("click", () =>{
    addTask();
    taskInput.focus()
    
})

function addTask(){
    const taskPopUp = document.querySelector('.addTaskPopUp')
    taskPopUp.classList.add('addTaskPopUpShow')
}

const taskPopUp = document.querySelector('.addTaskPopUp');

