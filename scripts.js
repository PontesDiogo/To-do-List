const button = document.querySelector('.btn-add-task')
const input = document.querySelector('.input-task')
const listTasks = document.querySelector('.list-task')




let itemsList = []

function addTask(){
    if (input.value.trim() === '') { 
        alert('Por favor, insira uma tarefa antes de adicionar!'); 
        return; 
    }
    itemsList.push({
        task: input.value,
        complete: false
    })
    input.value = ''

    showTask()

}

function showTask() {
    let newTask = '';

    itemsList.forEach((item, index) => {
        newTask += `
        <li class="task ${item.complete ? 'done' : ''}">
            <img src="./img/checked.png" alt="Check-na-tarefa" onclick="completeItem(${index})">
            <p>${item.task}</p>
            <button class="edit-task-btn" onclick="editTask(${index})">Editar</button>
            <img class="delete" src="./img/trash.png" alt="Tarefa-para-o-lixo" onclick="deleteItem(${index})">
        </li>`;
    });

    listTasks.innerHTML = newTask;

    localStorage.setItem('list', JSON.stringify(itemsList));
}


function deleteItem(index){
    itemsList.splice(index,1)
    showTask()

}

function completeItem(index){
    itemsList[index].complete = !itemsList[index].complete
    console.log(index)
    showTask()
    
}

function reloadTasks(){
    const localStorageTasks = localStorage.getItem('list')

    if(localStorageTasks){
         itemsList = JSON.parse(localStorageTasks)
    }
   
    showTask()
}

function editTask(index) {
    const taskElement = document.querySelectorAll('.task')[index];
    const taskTextElement = taskElement.querySelector('p');

    const isEditing = taskElement.querySelector('.edit-input');
    if (isEditing) return; 

    const originalTask = taskTextElement.textContent;

    taskTextElement.innerHTML = `
        <div class="edit-input-container">
            <input type="text" class="edit-input" value="${originalTask}" />
            <div class="icon-container">
                <i class="fas fa-check save-task-icon" onclick="saveTask(${index})"></i>
                <i class="fas fa-times cancel-task-icon" onclick="cancelEdit(${index}, '${originalTask}')"></i>
            </div>
        </div>
    `;
}

function saveTask(index) {
    const taskElement = document.querySelectorAll('.task')[index];
    const editInput = taskElement.querySelector('.edit-input');

    if (!editInput.value.trim()) {
        alert('Por favor, insira uma tarefa válida!');
        return;
    }

    itemsList[index].task = editInput.value.trim();

    showTask();
}

function cancelEdit(index, originalTask) {
    const taskElement = document.querySelectorAll('.task')[index];
    const taskTextElement = taskElement.querySelector('p');

    taskTextElement.innerHTML = originalTask;
}

reloadTasks()
button.addEventListener('click',addTask)


input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        addTask(); 
    }
});








