document.querySelector('#taskInput').addEventListener('keypress', function (e) {
	var key = e.which || e.keyCode;
	if ((key == 13) && (document.querySelector('#taskInput').value.length > 0)) // 13 is enter
		addToList(this.value.trim());
});

var taskList = [],
	completedTasks = [];


chrome.storage.sync.get({
	items: []
}, function (data) {
	console.log('data from chrome storage', data);
	taskList = JSON.parse(data.items);
	console.log('taskList', taskList);


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
		items: JSON.stringify(taskList)
	}, function () {
		// Update status to let user know options were saved.
		var status = document.getElementById('status');
		status.textContent = 'Options saved.';
		setTimeout(function () {
			status.textContent = '';
		}, 750);
	});

	//localStorage.setItem("taskList", JSON.stringify( taskList ));
}

// function save_options() {
//   var color = document.getElementById('color').value;
//   var likesColor = document.getElementById('like').checked;
//   chrome.storage.sync.set({
//     favoriteColor: color,
//     likesColor: likesColor
//   }, function() {
//     // Update status to let user know options were saved.
//     var status = document.getElementById('status');
//     status.textContent = 'Options saved.';
//     setTimeout(function() {
//       status.textContent = '';
//     }, 750);
//   });
// }

// // Restores select box and checkbox state using the preferences
// // stored in chrome.storage.
// function restore_options() {
//   // Use default value color = 'red' and likesColor = true.
//   chrome.storage.sync.get({
//     favoriteColor: 'red',
//     likesColor: true
//   }, function(items) {
//    var list = items.list;

//    for(var i=0; i< list.length; i++){




//    }

//   });
// }
// document.addEventListener('DOMContentLoaded', restore_options);
// document.getElementById('save').addEventListener('click',
//     save_options);