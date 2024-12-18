var taskInput = document.querySelector(".todo__input_type_new");
var addButton = document.querySelector(".todo__button_type_add");
var incompleteTaskHolder = document.querySelector(".todo__section_type_incomplete .todo__list");
var completedTasksHolder = document.querySelector(".todo__section_type_completed .todo__list");

var createNewTaskElement = function(taskString) {
  var listItem = document.createElement("li");
  listItem.className = "todo__item";

  var checkBox = document.createElement("input");
  var label = document.createElement("label");
  var editInput = document.createElement("input");
  var editButton = document.createElement("button");
  var deleteButton = document.createElement("button");
  var deleteButtonImg = document.createElement("img");

  checkBox.type = "checkbox";
  checkBox.className = "todo__checkbox";

  editInput.type = "text";
  editInput.className = "todo__input";

  label.className = "todo__task";
  label.innerText = taskString;

  editButton.className = "todo__button todo__button_type_edit";
  editButton.innerText = "Edit";

  deleteButton.className = "todo__button todo__button_type_delete";
  deleteButtonImg.className = "todo__icon";
  deleteButtonImg.src = "./remove.svg";
  deleteButtonImg.alt = "Delete task";
  deleteButton.appendChild(deleteButtonImg);

  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);

  return listItem;
};

var addTask = function() {
  if (!taskInput.value) {
    return;
  }
  var listItem = createNewTaskElement(taskInput.value);
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
  taskInput.value = "";
};

var editTask = function() {
  var listItem = this.parentNode;
  var editInput = listItem.querySelector(".todo__input");
  var label = listItem.querySelector(".todo__task");
  var button = listItem.querySelector(".todo__button_type_edit");
  var isEditMode = listItem.classList.contains("todo__item_edit-mode");

  if (isEditMode) {
    label.innerText = editInput.value;
    button.innerText = "Edit";
  } else {
    editInput.value = label.innerText;
    button.innerText = "Save";
  }

  listItem.classList.toggle("todo__item_edit-mode");
};

var deleteTask = function() {
  var listItem = this.parentNode;
  var ul = listItem.parentNode;
  ul.removeChild(listItem);
};

var taskCompleted = function() {
  var listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
};

var taskIncomplete = function() {
  var listItem = this.parentNode;
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
};

var bindTaskEvents = function(taskListItem, checkBoxEventHandler) {
  var checkBox = taskListItem.querySelector(".todo__checkbox");
  var editButton = taskListItem.querySelector(".todo__button_type_edit");
  var deleteButton = taskListItem.querySelector(".todo__button_type_delete");

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.onchange = checkBoxEventHandler;
};

addButton.onclick = addTask;

for (var i = 0; i < incompleteTaskHolder.children.length; i++) {
  bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

for (var i = 0; i < completedTasksHolder.children.length; i++) {
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}
