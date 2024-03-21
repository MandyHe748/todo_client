//task3 task4
const BACKEND_ROOT_URL = 'http://localhost:3001'; // Added missing single quote and closing semicolon
//task4
import { Todos } from "./class/Todos.js"; // Added missing semicolon and closing quote
const todos = new Todos(BACKEND_ROOT_URL); // Added missing semicolon
//task1 task3 task4
const list = document.querySelector("ul");
const input = document.querySelector("input");
//task3 task4
input.disabled = true;
// task4 task5
const renderTask = (task) => {
   // console.log(task);
    const li = document.createElement('li');
    li.setAttribute('class', 'list-group-item');
    li.setAttribute('data-key', task.getId().toString());
    li.innerHTML= task.getText();
    renderSpan(li, task.getText());
    renderLink(li,task.getId())
    // li.innerHTML = task.getText();
    list.append(li);
};
//task5
const renderSpan =(li,text) => {
    const span =li.appendChild(document.createElement('span'))
    span.innerHTML = text
}
//task5
const renderLink = (li,id) => {
    const a = li.appendChild(document.createElement('a'))
    a.innerHTML = '<i class="bi bi-trash"></i>';
    a.setAttribute('style','float: right')
    a.addEventListener('click',(event)=> {
        todos.removeTask(id).then((removed_id)=>{
            const li_to_remove = document.querySelector(`[data-key='${removed_id}']`)
            if (li_to_remove) {
                list.removeChild(li_to_remove)
            }
        }).catch((error)=>{
            alert(error)
        })
    })
}

const getTasks = async () => {
    todos.getTasks().then((tasks) => {
        tasks.forEach(task => {
            renderTask(task);
        });
       input.disabled= false;
    }).catch((error) => {
        alert("Error retrieving tasks: " + error.message); // Concatenated the error message
    });
};
//task3 // Save a new task
const saveTask = async (task) => {
    try {
        const json = JSON.stringify({ description: task }); // Added missing curly braces
        const response = await fetch(BACKEND_ROOT_URL + '/new', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: json
        });
        return response.json();
    } catch (error) {
        alert("Error saving task: " + error.message);
    }
};
//task4
input.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        const task = input.value.trim();
        if (task !== '') {
            saveTask(task).then(() => {
                renderTask(task);
                input.value = "";
                input.focus();
            });
        }
    }
});

getTasks();