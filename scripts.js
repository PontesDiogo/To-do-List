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

function  showTask(){
    let newTask = ''

    itemsList.forEach( (item, index) => {
        newTask = newTask + `
        <li class="task ${item.complete && 'done'}">
        <img src="./img/checked.png" alt="Check-na-tarefa" onclick="completeItem(${index})">
        <p>${item.task}</p>
        <img class="delete" src="./img/trash.png" alt="Tarefa-para-o-lixo" onclick="deleteItem(${index})">
        </li>`
    } )

    listTasks.innerHTML = newTask

    localStorage.setItem('list',JSON.stringify(itemsList))

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

reloadTasks()
button.addEventListener('click',addTask)

input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        addTask(); // Chama a função de adicionar tarefa
    }
});








