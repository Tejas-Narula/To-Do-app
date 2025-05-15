// todo list
const tasks = ["Exercise", "Walk"]
renderTodoList()


// render todo list by creating the html and putting it on the page
function renderTodoList(){
    let todoTasksHtml = ''
    tasks.forEach(task => {
        html = `<div class="task">${task} <input type="checkbox" class="js-checkBox"></div>`
        todoTasksHtml += html
    });

    document.querySelector(".js-Tasks").innerHTML = todoTasksHtml

    //checkbox
    document.querySelectorAll(".js-checkBox").forEach((checkbox, index) =>{
        checkbox.addEventListener("change", () => {
        if (checkbox.checked){
            tasks.splice(index,1)
            renderTodoList()
        }
    })
    })


}






// Add Task Button
document.querySelector(".js-taskInputBtn").addEventListener("click", () =>{
    addTask();
})

function addTask(){
    const taskInput = document.querySelector('.js-taskInput');

    const task = taskInput.value;

    tasks.push(task);  

    taskInput.value = '';

    renderTodoList()
}