// form => submit => create new todo => {id, createdAt, title:, isCompleted}
// const todos = [] => todos.push(...)

// let todos = [];
let filterValue = "all";
// selecting

const todoInput = document.querySelector(".todo-input");
let todoEdit = document.querySelector(".todo-input-edit");
const todoForm = document.querySelector(".todo-form");
const todoFormEdit = document.querySelector(".todo-form-edit");
const todolist = document.querySelector(".todolist");
const selectFilter = document.querySelector(".filter-todos");
const showModalBtn = document.querySelector("todo__edit");
const backdrop = document.querySelector(".backdrop");
const modal = document.querySelector(".modal");
const closeModalBtn = document.querySelector(".close-modal");

// events

todoForm.addEventListener("submit", addNewTodo);
selectFilter.addEventListener("change", (e) => {
  filterValue = e.target.value;
  filterTodos();
});

closeModalBtn.addEventListener("click", closeModal);
backdrop.addEventListener("click", closeModal);
// console.log(todoEdit);

// todoFormEdit.addEventListener("submit", editTodo);

//   const todos = todoEdit;
//   console.log(todos);
//   const todoId = Number(e.target.dataset.todoId);
//   console.log(todoId);
//   const todo = todos.find((t) => t.id === todoId);

//   // let todos = getAllTodos();
//   // const todoId = Number(e.target.dataset.todoId);
//   // todos = todos.filter((t) => t.id === todoId);

//   console.log(todo);

//   //   // const todoId = Number(e.target.dataset.todoId);
//   //   // const todo = todos.find((t) => t.id === todoId);
//   //   // console.log(todo.title);
// });

// removeBtns.addEventListener("click", )

document.addEventListener("DOMContentLoaded", (e) => {
  const todos = getAllTodos();
  createTodos(todos);
});

// functions
function addNewTodo(e) {
  e.preventDefault();

  if (!todoInput.value) return null;

  const newTodo = {
    id: Date.now(),
    createdAt: new Date().toISOString(),
    title: todoInput.value,
    isCompleted: false,
  };
  //   console.log(newTodo);
  //   todos.push(newTodo);
  saveTodo(newTodo);
  filterTodos();
  //   console.log(todos);
}

function createTodos(todos) {
  // create todos on DOM
  let result = "";
  todos.forEach((todo) => {
    result += `<li class="todo">
      <p class="todo__title ${todo.isCompleted && "completed"}">${
      todo.title
    }</p>
      <span class="todo__createdAt">${new Date(
        todo.createdAt
      ).toLocaleDateString("fa-IR")}</span>
      <button class="todo__check" data-todo-id=${
        todo.id
      } ><i class="far fa-check-square"></i></button>
      <button class="todo__remove" data-todo-id=${
        todo.id
      } ><i class="far fa-trash-alt"></i></button>
      <button class="todo__edit" data-todo-id=${
        todo.id
      } ><i class="far fa-edit"></i></button>
    </li>`;
  });
  todolist.innerHTML = result;
  todoInput.value = "";

  const removeBtns = [...document.querySelectorAll(".todo__remove")];
  removeBtns.forEach((btn) => btn.addEventListener("click", removeTodo));

  const checkBtns = [...document.querySelectorAll(".todo__check")];
  checkBtns.forEach((btn) => btn.addEventListener("click", checkTodo));

  const editBtns = [...document.querySelectorAll(".todo__edit")];
  editBtns.forEach((btn) => btn.addEventListener("click", openModal));
}

function filterTodos() {
  //   console.log(e.target.value);
  //   const filter = e.target.value;
  const todos = getAllTodos();
  switch (filterValue) {
    case "all": {
      // todos
      createTodos(todos);
      break;
    }
    case "completed": {
      const filteredTodos = todos.filter((t) => t.isCompleted);
      createTodos(filteredTodos);
      break;
    }
    case "uncompleted": {
      const filteredTodos = todos.filter((t) => !t.isCompleted);
      createTodos(filteredTodos);
      break;
    }
    default:
      createTodos(todos);
  }
}

function removeTodo(e) {
  //   console.log(e.target);
  //   console.log(e.target.dataset);
  //   // data-todo-id => todoId
  //   console.log(e.target.dataset.todoId);
  let todos = getAllTodos();
  const todoId = Number(e.target.dataset.todoId);
  todos = todos.filter((t) => t.id !== todoId);
  saveAllTodos(todos);
  filterTodos();
}

function checkTodo(e) {
  //   console.log(e.target.dataset.todoId);
  const todos = getAllTodos();
  const todoId = Number(e.target.dataset.todoId);
  const todo = todos.find((t) => t.id === todoId);
  todo.isCompleted = !todo.isCompleted;
  saveAllTodos(todos);
  filterTodos();
}

let changeValue;

function editTodo(e) {
  changeValue = Number(e.target.dataset.todoId);
  const todos = getAllTodos();
  const todo = todos.find((t) => t.id === changeValue);
  todo.title = todoEdit.value;
  saveAllTodos(todos);
  // filterTodos();
}

// localStorage => web API

// localStorage.setItem("todos", JSON.stringify(todos));
// JSON.parse(localStorage.getItem("todos"));

function getAllTodos() {
  //first way
  //   const savedTodos = JSON.parse(localStorage.getItem("todos"))
  //     ? JSON.parse(localStorage.getItem("todos"))
  //     : [];
  // simpler way
  const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
  return savedTodos;
}

function saveTodo(todo) {
  //   const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
  const savedTodos = getAllTodos();
  savedTodos.push(todo);
  localStorage.setItem("todos", JSON.stringify(savedTodos));
  return savedTodos;
}

function saveAllTodos(todos) {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function openModal(e) {
  backdrop.classList.remove("hidden");
  modal.classList.remove("hidden");
  const todos = getAllTodos();
  const todoId = Number(e.target.dataset.todoId);
  const todo = todos.find((t) => t.id === todoId);
  todoEdit.value = todo.title;
  return todoEdit;
}

function closeModal() {
  backdrop.classList.add("hidden");
  modal.classList.add("hidden");
}
