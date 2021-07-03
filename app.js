// Task List DOM project 
// Define UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// load all event listeners
loadEventListener();
function loadEventListener(){
  // Add Task Event 
  form.addEventListener('submit', addTask);
  // DOM event Loaded
  document.addEventListener('DOMContentLoaded', getTasks);
  // Remove Item 
  taskList.addEventListener('click', removeItem);
  // clear Tasks 
  clearBtn.addEventListener('click', clearTasks);
  // filter tasks
  filter.addEventListener('keydown', filterTasks);
}

// Get task from LS
function getTasks(task){
  let tasks;
  if(localStorage.getItem('tasks')=== null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  };

  tasks.forEach(function(task){
    //  create a link
  const li = document.createElement('li');
  // add className to li
  li.className = 'collection-item';
  // add textNode to li
  const value = document.createTextNode(task);
  // append value to li
  li.appendChild(value);
  // create link
  const link = document.createElement('a');
  // add ClassName to the link
  link.className = 'delete-item secondary-content';
  // add the icon to link
  link.innerHTML = '<li class="fa fa-remove"></li>';
  // append the link in li
  li.appendChild(link);
  // append the li in ul
  taskList.appendChild(li);
  });
};

// Add Task
function addTask(e){
 if(taskInput.value === ''){
   alert('Please Add a Task ');
 }

  //  create a link
  const li = document.createElement('li');
  // add className to li
  li.className = 'collection-item';
  // add textNode to li
  const value = document.createTextNode(taskInput.value);
  // append value to li
  li.appendChild(value);
  // create link
  const link = document.createElement('a');
  // add ClassName to the link
  link.className = 'delete-item secondary-content';
  // add the icon to link
  link.innerHTML = '<li class="fa fa-remove"></li>';
  // append the link in li
  li.appendChild(link);
  // append the li in ul
  taskList.appendChild(li);

  // add task to local storage
  storeTaskInLocalStorage(taskInput.value);

  // clear the Input 
  taskInput.value = '';
  // prevent the default 
  e.preventDefault();
}

// storeTaskInLocalStorage
function storeTaskInLocalStorage(task){
  let tasks;
  if(localStorage.getItem('tasks')=== null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  };

  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));
};


//  Remove Item 
function removeItem(e){
  if(e.target.parentElement.classList.contains('delete-item')){
    if(confirm('Are you sure?')){
    e.target.parentElement.parentElement.remove();}
  }

  removeTaskFromLocalStorage(e.target.parentElement.parentElement);
};
// remove tasks from local storage
function removeTaskFromLocalStorage(taskItem){
  let tasks;
  if(localStorage.getItem('tasks')=== null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  };
  tasks.forEach(function(task, index){
    if(taskItem.textContent === task){
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
// CLear Tasks
function clearTasks(e){
// first way
  // taskList.innerHTML = '';
// faster way
  while(taskList.firstChild){
    taskList.removeChild(taskList.firstChild);
  }

  // clear tasks from lcoal storage 
  clearTasksFromLocalStorage();
};
// clear Tasks form local storage
function clearTasksFromLocalStorage(){
  if(confirm('Are you sure?')){localStorage.clear();}
}
// Filter trough the tasks
function filterTasks(e){
  const inputValue = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach(
    function(task){
      const item = task.firstChild.textContent;
      if(item.toLowerCase().indexOf(inputValue) !=-1){
        task.style.display = 'block';
      } else {
        task.style.display = 'none';
      }
    }
  )
};