const form = document.querySelector('#cadastro-tarefas');
const search = document.querySelector('#pesquisar');
const filter = document.querySelector('#filtrar');
const addInput = form.querySelector('#add-tarefa');
const formEdit = document.querySelector('#edicao-tarefas');
const editInput = formEdit.querySelector('#edite-tarefa');
const cancelButton = formEdit.querySelector('#cancelar-edicao');
const list = document.querySelector('.listagem-tarefas');

let oldTitle;

const saveTask = (title) => {
    const taskData = document.createElement('div');
    taskData.classList.add('dados-tarefa')

    const taskTitle = document.createElement('h3');
    taskTitle.innerText = title;
    taskData.appendChild(taskTitle);

    const checkButton = document.createElement('button');
    checkButton.classList.add('checagem-tarefa');
    checkButton.innerHTML = '<i class="fa-solid fa-check"></i>';
    taskData.appendChild(checkButton);

    const editButton = document.createElement('button');
    editButton.classList.add('editar-tarefa');
    editButton.innerHTML = '<i class="fa-solid fa-pen"></i>';
    taskData.appendChild(editButton);

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('excluir-tarefa');
    deleteButton.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    taskData.appendChild(deleteButton);

    list.appendChild(taskData);

    addInput.value = '';
    addInput.focus();
};

const formStatus = () => {
    formEdit.classList.toggle('esconder');
    form.classList.toggle('esconder');
    list.classList.toggle('esconder');    
};

const updateTask = (titleUpdate) => {
    const tasks = document.querySelectorAll('.dados-tarefa');

    tasks.forEach((task) => {
        let todoTitle = task.querySelector('h3');

        if (todoTitle.innerText === oldTitle) {
            todoTitle.innerText = titleUpdate;
        }
    })
}

form.addEventListener('submit', function (e) {
    e.preventDefault();

    const valueTask = addInput.value;

    if (valueTask) {
        saveTask(valueTask);
    }
})

document.addEventListener('click', function (e) {
    const target = e.target;  // Pegando o elemento que foi clicado
    const parentElement = target.closest('div');
    let title;

    if (parentElement && parentElement.querySelector('h3')) {
        title = parentElement.querySelector('h3').innerText;
    }

    if (target.classList.contains('checagem-tarefa')) {
       parentElement.classList.toggle('done'); // Pode fazer a troca. Se clicar adiciona a classe, mas se "desclicar", retira a classe (toggle).
    } 
    
    if (target.classList.contains('excluir-tarefa')) {
        parentElement.remove();
    } 

    if (target.classList.contains('editar-tarefa')) {
        formStatus();

        editInput.value = title;
        oldTitle = title;
    }
});

cancelButton.addEventListener('click', function (e) {
    e.preventDefault();

    formStatus();
});

formEdit.addEventListener('submit', function (e) {
    e.preventDefault();

    const editInputValue = editInput.value;

    if (editInputValue) {
        updateTask(editInputValue);
    }

    formStatus();

})