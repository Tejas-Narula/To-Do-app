const addTaskBtn = document.querySelector('.taskInputBtn')
const heading = document.querySelector('.js-heading')

// todo list
//const lists = [{heading: "Daily", tasks: [{name :"Exercise", description: '', stared: false, completed: false},{name :"Gym", description: '', stared: false, completed: false},{name :"Walk", description: '', stared: true, completed: false}]},{heading: "Masti Plan", tasks: [{name :"mazeee", description: '', stared: false, completed: false}]}]

//setItem("lists", JSON.stringify(lists))

const lists = JSON.parse(localStorage.getItem("lists"))||[{"heading":"Daily","showCompletedTasks":true,"tasks":[{"name":"Gym","description":"You Got This","stared":true,"completed":false},{"name":"Study","description":"","stared":false,"completed":false},{"name":"Drink water","description":"","stared":false,"completed":true}]},{"heading":"Monthly","showCompletedTasks":true,"tasks":[{"name":"Water Bill","description":"Due","stared":false,"completed":false},{"name":"Electricity Bill","description":"","stared":false,"completed":false}]}];

let activeListIndex = parseInt(JSON.parse(localStorage.getItem('activeListIndex'))) || 0
let activeList
setActiveList(activeListIndex)

function setActiveList(index){
    activeList = lists[index]
}


localStorage.setItem("activeListIndex", '0');



function renderSideBar(){
    let sideBarListsHtml = ''
    lists.forEach((list, index) =>{
        html = `<div class="list" onClick="setActiveList('${index}');renderTodoList();"> <p>${list.heading}</p><div class="js-trashBinList trashBinList"><img src="Graphics/trash-1.png"></div> </div>`
        sideBarListsHtml += html
    })

    document.querySelector('.lists').innerHTML = sideBarListsHtml

    document.querySelectorAll(".js-trashBinList").forEach((bin, index) =>{
        bin.addEventListener("click", () => {
            lists.splice(index,1)
            renderSideBar()
    })
    })
    
}
renderSideBar()





function removeElements(arr1, arr2) {
  return arr1.filter(element => !arr2.includes(element));
}
if (lists.length !== 0){
renderTodoList()
}
// render todo list by creating the html and putting it on the page
function renderTodoList(){
    localStorage.setItem("activeListIndex", JSON.stringify(lists.indexOf(activeList)));
    if (lists.length === 0){
        return
    }
    heading.value = activeList.heading
    let todoTasksHtml = ''
    const completedTasks = [];

    //Add Completed Tasks to its list for future rendering in a superate area
    activeList.tasks.forEach((task) => {
        if (task.completed){
            completedTasks.push(task)
            return
        }
    })

    let sortedTasks = activeList.tasks.sort((a,b)=>{return b.stared-a.stared})
    sortedTasks = sortedTasks.sort((a,b)=>a.completed-b.completed)


    //sortedTasks = removeElements(sortedTasks, completedTasks); //ordering the starred tasks first

    //sortedTasks.forEach((task, index) => {
    
    for (let i = 0; i<sortedTasks.length; i++){
        
        //html for each task
        html = `
            <div class="task ${sortedTasks[i].completed ? "completed" : ""  }">
                <div class="taskInfo">
                    <input type="checkbox" class="js-checkBox checkBox" ${ sortedTasks[i].completed ? "checked" : ""}>

                    <p>${sortedTasks[i].name}</p>
                    <p>${sortedTasks[i].description !== '' ? '|' : ''}</p>
                    <p class="desc">${sortedTasks[i].description}</p>
                    
                </div>

                <div class = "checkBoxes">
                    <input type="checkbox" id="starcheckbox${i+1}" class="starCheckBox" ${sortedTasks[i].stared ? "checked" : ""}>
                    
                    <label for="starcheckbox${i+1}" class="starLabel">${sortedTasks[i].stared ? "&#x2605" : "&#x2606;"}</label>

                    <div class="moreInfoBtn">
                        <div class="dot">&#9679;</div>
                        <div class="dot">&#9679;</div>
                        <div class="dot">&#9679;</div>
                    </div>

                    <div class="js-trashBin trashBin"> <img src="Graphics/trash-1.png"> </div>
                    
                </div>
            </div>
            ` 
        
        //line
        if (i === sortedTasks.length-completedTasks.length){
            todoTasksHtml += `
            <div class="js-line line">
            <div class="line-close js-line-close">${activeList.showCompletedTasks ? "&#9660;" : "&#9650;"}</div>
            <div class="line-x"></div>
            <p>Completed Tasks</p>
            <div class="line-x"></div>
            </div>`

            if (!activeList.showCompletedTasks){
                break
        }
        }
        todoTasksHtml += html
    };

    document.querySelector(".js-Tasks").innerHTML = todoTasksHtml // putting the formed html on the page

    addEventListenerCheckBox(sortedTasks)
    addEventListenerStarCheckBox(sortedTasks)


    localStorage.setItem("lists", JSON.stringify(lists))
    

    //line between completed and non completed tasks
    if (sortedTasks.length >= 1 && completedTasks.length > 0){
        document.querySelector(".line").classList.toggle('show');
        document.querySelectorAll(".line-x").forEach((line)=>{
            line.classList.toggle('show')
        })

        //close/open completed tasks
        document.querySelector('.js-line').addEventListener('click', ()=>{
            activeList.showCompletedTasks = !activeList.showCompletedTasks
            renderTodoList();
        })
    }

    document.querySelectorAll('.js-trashBin').forEach((bin, index)=>{
        bin.addEventListener('click', ()=>{
            activeList.tasks.splice(index, 1)
            renderTodoList()
        })
    })

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


//add List

const addListBtn = document.querySelector('.addList')
addListBtn.addEventListener('click', ()=>{
    addList()
})

function addList(){
    const list = {heading: `list #${lists.length+1}`,showCompletedTasks: true, tasks: []}
    lists.push(list)
    setActiveList(lists.length -1)
    
    

    renderTodoList()
    renderSideBar()

    heading.focus()
    heading.select()
}


heading.addEventListener('input', (event)=>{
    activeList.heading = heading.value
    renderSideBar()
})

heading.addEventListener('blur', () => {
    if (heading.value === "" || heading.value === "UnNamed"){
        activeList.heading = `list #${lists.length}`
    }
        renderSideBar()
        renderTodoList()
});

heading.addEventListener('focus', ()=>{
    heading.select()
})


