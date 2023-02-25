const form = document.querySelector('form')
const input = form.querySelector('input')
const ul = document.querySelector('.todo_list')

let todos = []

function saveTodo(){
    localStorage.setItem('todos', JSON.stringify(todos))
}

function removeTodo(e){
    const li = e.target.parentNode
    li.remove()

    //e.target.parentNode.remove()
    const newTodos = todos.filter(todo => todo.id !== parseInt(li.id))
    todos = newTodos

    //console.log(typeof parseInt(li.id));

    saveTodo()
    console.log(todos);
}

function paintTodo(text){
    const li = document.createElement('li')
    const span = document.createElement('span')

    li.innerText = text
    li.id = todos.length + 1
    span.innerText = 'x'
    span.addEventListener('click', removeTodo)

    li.appendChild(span)
    ul.appendChild(li)

    todos.push({id:todos.length + 1, text})

    saveTodo()

    console.log(todos);
}

function handleSubmit(e){
    e.preventDefault()
    if(input.value === '') return

    paintTodo(input.value);
    input.value = ''
}

function loadTodo(){
    const localTodos = localStorage.getItem('todos')
    if(localTodos !== null){
        const parselTodos = JSON.parse(localTodos)
        parselTodos.forEach(todo => paintTodo(todo.text))
    }
}

function init(){
    loadTodo()
    form.addEventListener('submit', handleSubmit)
}

init()