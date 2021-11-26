//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.

// Event handling, user interaction is what starts the code execution.

var taskInput = document.getElementById('new-task'); //Add a new task.
var addButton = document.getElementsByTagName('button')[0]; //first button
var incompleteTaskHolder = document.getElementById('incomplete-tasks'); //ul of #incomplete-tasks
var complTasksHolder = document.getElementById('compl-tasks'); //compl-tasks

//New task list item
var createNewTaskElement = function (taskString) {
  var listItem = document.createElement('li');

  //input (checkbox)
  var checkBox = document.createElement('input'); //checkbx
  //label
  var label = document.createElement('label'); //label
  //input (text)
  var editInput = document.createElement('input'); //text
  //button.edit
  var editButton = document.createElement('button'); //edit button

  //button.delete
  var deleteButton = document.createElement('button'); //delete button
  var deleteButtonImg = document.createElement('img'); //delete button image

  label.innerText = taskString;
  label.className = 'input-text';

  //Each elements, needs appending
  listItem.classList.add('tasks__item');
  checkBox.type = 'checkbox';
  checkBox.className = 'input-checkbox ';
  editInput.type = 'text';
  editInput.className = 'input-text--grow input-text--dark';

  editButton.innerText = 'Edit'; //innerText encodes special characters, HTML does not.
  editButton.className = 'edit btn';

  deleteButton.className = 'delete btn';
  deleteButtonImg.src = './remove.svg';
  deleteButtonImg.className = 'delete__img'
  deleteButton.appendChild(deleteButtonImg);

  //and appending.
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
};

var addTask = function () {
  console.log('Add Task...');
  //Create a new list item with the text from the #new-task:
  if (!taskInput.value) return;
  var listItem = createNewTaskElement(taskInput.value);

  //Append listItem to incompleteTaskHolder
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskcompl);

  taskInput.value = '';
};

//Edit an existing task.

var editTask = function () {
  console.log('Edit Task...');
  console.log("Change 'edit' to 'save'");

  var listItem = this.parentNode;

  var editInput = listItem.querySelector('input[type=text]');
  var label = listItem.querySelector('label');
  var editBtn = listItem.querySelector('.edit');
  var containsClass = listItem.classList.contains('edit-mode__tasks');
  //If class of the parent is .edit-mode__tasks
  if (containsClass) {
    //switch to .edit-mode__tasks
    //label becomes the inputs value.
    label.innerText = editInput.value;
    editBtn.innerText = 'Edit';
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = 'Save';
  }

  //toggle .edit-mode__tasks on the parent.
  listItem.classList.toggle('edit-mode__tasks');
};

//Delete task.
var deleteTask = function () {
  console.log('Delete Task...');

  var listItem = this.parentNode;
  var ul = listItem.parentNode;
  //Remove the parent list item from the ul.
  ul.removeChild(listItem);
};

//Mark task compl
var taskcompl = function () {
  console.log('Complete Task...');

  //Append the task list item to the #compl-tasks
  var listItem = this.parentNode;
  complTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
};

var taskIncomplete = function () {
  console.log('Incomplete Task...');
  //Mark task as incomplete.
  //When the checkbox is unchecked
  //Append the task list item to the #incomplete-tasks.
  var listItem = this.parentNode;
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskcompl);
};

var ajaxRequest = function () {
  console.log('AJAX Request');
};

//The glue to hold it all together.

//Set the click handler to the addTask function.
addButton.onclick = addTask;
addButton.addEventListener('click', addTask);
addButton.addEventListener('click', ajaxRequest);

var bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
  console.log('bind list item events');
  //select ListItems children
  var checkBox = taskListItem.querySelector('input[type=checkbox]');
  var editButton = taskListItem.querySelector('button.edit');
  var deleteButton = taskListItem.querySelector('button.delete');

  //Bind editTask to edit button.
  editButton.onclick = editTask;
  //Bind deleteTask to delete button.
  deleteButton.onclick = deleteTask;
  //Bind taskcompl to checkBoxEventHandler.
  checkBox.onchange = checkBoxEventHandler;
};

//cycle over incompleteTaskHolder ul list items
//for each list item
for (var i = 0; i < incompleteTaskHolder.children.length; i++) {
  //bind events to list items chldren(taskscompl)
  bindTaskEvents(incompleteTaskHolder.children[i], taskcompl);
}

//cycle over complTasksHolder ul list items
for (var i = 0; i < complTasksHolder.children.length; i++) {
  //bind events to list items chldren(tasksIncompl)
  bindTaskEvents(complTasksHolder.children[i], taskIncomplete);
}

// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.
