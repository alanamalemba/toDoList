const newTaskInput = document.querySelector("#new-task");
const createTaskButton = document.querySelector("#create-task-button");
const tasksList = document.querySelector(".tasks-list");
const activeTaskName = document.querySelector(".active-task-name");

const activeTab = document.querySelector(".active-tab");

const taskToDoList = document.querySelector(".to-do-list");

const newItemInput = document.querySelector("#new-item");
const addToDOItemButton = document.querySelector("#add-todo-item-button");

class Task {
  constructor(id, name, toDoList) {
    this.id = id;
    this.name = name;
    this.toDoList = toDoList;
    this.currentItemIndex = 0;
  }
}

class ToDoItem {
  constructor(id, name, done) {
    this.name = name;
    this.done = done;
    this.id = id;
  }
}

const tasksItems = []; //Array of task objects
let currentTasksIndex = 0; // track current index of next items to be added to taskItems array
let allTasks; //NodeList of tasks will be stored here
let allToDoItems;

let activeTask;

createTaskButton.addEventListener("click", () => {
  if (newTaskInput.value === "") {
    return;
  }
  // create task object and add to tasks array
  id = currentTasksIndex;
  taskName = newTaskInput.value;

  tasksItems[currentTasksIndex] = new Task(id, taskName, []);

  newTaskInput.value = "";
  currentTasksIndex++;

  //   display new task to tasks list in ui
  const newTask = document.createElement("li");
  newTask.innerText = taskName;
  newTask.id = id;
  newTask.classList.add("task");

  tasksList.append(newTask);

  //updates NodeList of task Items
  allTasks = document.querySelectorAll(".task");
  newTask.addEventListener("click", () => {
    allToDoItems = document.querySelectorAll(".to-do-item");
    allToDoItems.forEach((toDoItem) => {
      toDoItem.remove();
    });
    createTaskClickHandler(newTask);
  });
});

// add to do items to todo items array of to do item objects
// when add button is clicked
addToDOItemButton.addEventListener("click", () => {
  if (newItemInput.value === "") {
    return;
  }
  tasksItems[activeTask].toDoList[tasksItems[activeTask].currentItemIndex] =
    new ToDoItem(
      tasksItems[activeTask].currentItemIndex, //id
      newItemInput.value, //name
      false //done
    );

  const toDoItem = document.createElement("li");
  toDoItem.innerText = newItemInput.value;
  toDoItem.classList.add("to-do-item");
  toDoItem.dataset.toDoId = tasksItems[activeTask].currentItemIndex;
  taskToDoList.append(toDoItem);

  toDoItem.addEventListener("click", () => {
    tasksItems[activeTask].toDoList[parseInt(toDoItem.dataset.toDoId)].done =
      !tasksItems[activeTask].toDoList[parseInt(toDoItem.dataset.toDoId)].done;

    toDoItem.classList.toggle("isDone");
  });

  tasksItems[activeTask].currentItemIndex++;

  newItemInput.value = "";
});

// FUNCTIONS...
const createTaskClickHandler = (task) => {
  //When task is clicked do this...
  allTasks.forEach((task) => {
    task.classList.remove("active-task");
  });
  task.classList.add("active-task");
  activeTab.style.display = "flex";
  activeTaskName.innerText = task.innerText; // change name of active task on active tab

  activeTask = parseInt(task.id);

  for (let i = 0; i < tasksItems[activeTask].toDoList.length; i++) {
    const toDoItem = document.createElement("li");
    toDoItem.innerText = tasksItems[activeTask].toDoList[i].name;
    toDoItem.classList.add("to-do-item");
    taskToDoList.append(toDoItem);

    if (tasksItems[activeTask].toDoList[i].done === true) {
      toDoItem.classList.add("isDone");
    }

    toDoItem.addEventListener("click", () => {
      tasksItems[activeTask].toDoList[i].done =
        !tasksItems[activeTask].toDoList[i].done;

      toDoItem.classList.toggle("isDone");
    });
  }
};
