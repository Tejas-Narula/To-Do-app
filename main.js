// todo list
const tasks = ["Exercise", "Walk", "gym", "Games"]

renderTodoList()


// render todo list by creating the html and putting it on the page
function renderTodoList(){
    let todoTasksHtml = ''
    tasks.forEach((task, index) => {
        html = `
            <div class="task">
                <p>${task}</p>

                <div>
                    <input type="checkbox" id="starcheckbox${index+1}" class="starCheckBox">
                    <label for="starcheckbox${index+1}" class="starLabel">&#9733;</label> 
                    <input type="checkbox" class="js-checkBox checkBox">
                </div>
            </div>
            `
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

    //Star checkBox
    document.querySelectorAll(".starCheckBox").forEach((checkbox, index)=>{
        checkbox.addEventListener("change", ()=>{
            if (checkbox.checked){
                staredTaks.push()
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