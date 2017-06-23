document.querySelector('#taskInput').addEventListener('keypress', function (e) {
	var key = e.which || e.keyCode;
	if ((key == 13) && (document.querySelector('#taskInput').value.length > 0)) // 13 is enter
		addToList(this.value.trim());
});

var taskList = [],
	completedTasks = [];


chrome.storage.sync.get({
	items: [{name:'APIs, etc pointed to production server'},{name:'Test cases were successful'}]
}, function (data) {
	console.log('data from chrome storage', data);
	taskList = data.items;


updateListView();
});



function addToList(task) {
	if (checkDuplicate(task)) {
		// animateInvalid(); // Animates input field with red outline if an invalid input is given
		return;
	}

	taskList.push({
		name: task
	});

	updateListView();

	saveLocalList();

	//localStorage.setItem('taskList', JSON.stringify( taskList ));

	document.querySelector('#taskInput').value = '';
}

function updateListView() {
	var ul = document.getElementById('taskList');

	ul.innerHTML = '';

	taskList.forEach(function (task) {
		var listItem = document.createElement('li'),
			taskLabel = document.createElement('label'),
			delBtn = document.createElement('span');

		listItem.className = 'task';
		listItem.id = taskList.indexOf(task);

		taskLabel.className = 'taskLabel';
		taskLabel.textContent = task.name;
		taskLabel.htmlFor = 'c' + taskList.indexOf(task);

		delBtn.className = 'deleteTaskBtn';
		delBtn.textContent = 'x';
		delBtn.onclick = deleteThisTask;

		listItem.appendChild(taskLabel);
		listItem.appendChild(delBtn);
		ul.appendChild(listItem);
	});
}


function checkDuplicate(task) {
	var matchFound = false;

	taskList.forEach(function (t) {
		if (t.name === task)
			matchFound = true;
	});

	return matchFound;
}

function deleteThisTask(e) {
	taskList.splice(e.target.parentElement.id, 1);

	saveLocalList();
	updateListView();
}

function saveLocalList() {

	chrome.storage.sync.set({
		items: taskList
	}, function () {
		
	});

	//localStorage.setItem("taskList", JSON.stringify( taskList ));
}