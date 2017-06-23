
var elem, popup;
window.addEventListener("hashchange", applyOnPage, false);


function applyOnPage() {
    if (window.location.hash.indexOf("PrepareReleasePlace") != -1)
        restrictButton();
}

function restrictButton() {
    elem = null;
    for (var i = 0; i < document.querySelectorAll("div.GULSEEC-f-m").length; i++) { if (document.querySelectorAll("div.GULSEEC-f-m")[i].innerText == 'REVIEW') { elem = document.querySelectorAll("div.GULSEEC-f-m")[i].parentNode; } }
    if (elem) {
        //elem.disabled = true;
        var but = document.createElement("button");
        but.id = "extension-main-button";
        but.innerText = 'Review';
        but.className = 'GULSEEC-f-a GULSEEC-f-r';
        but.onclick = constructShowPopup;
        elem.parentNode.append(but);
        elem.style.display = 'none';
    }
}

function constructShowPopup() {
    popup = document.createElement("div");
    popup.id = "extension-popup";
    popup.style.position = 'fixed';
    popup.style.width = '200px';
    popup.style.height = '200px';
    popup.style.zIndex = 9999;
    popup.style.top = 'calc(50% - 100px)';
    popup.style.left = 'calc(50% - 100px)';
    popup.style.border = '2px solid black';
    popup.style.backgroundColor = 'white';
    document.body.append(popup);

    var ul = document.createElement('ul');
    ul.id = 'extension-taskList';

    ul.innerHTML = '';

    var taskList = [{ name: 'test 1 ' }, { name: 'test 2 ' }];

    taskList.forEach(function (task) {
        var listItem = document.createElement('li'),
            taskLabel = document.createElement('label'),
            chk = document.createElement('input');

        chk.className = 'task-Chk';
        chk.type = 'checkbox';
        chk.onchange = unlockReview;

        listItem.className = 'task';
        listItem.id = taskList.indexOf(task);

        taskLabel.className = 'taskLabel';
        taskLabel.textContent = task.name;
        taskLabel.htmlFor = 'c' + taskList.indexOf(task);

        listItem.appendChild(chk);
        listItem.appendChild(taskLabel);
        ul.appendChild(listItem);
    });

    popup.append(ul);
    popup.style.display = 'block';

}

function unlockReview() {

    var listDone = true;

    for (var i = 0; i < document.querySelectorAll(".task-Chk").length; i++) {
        if (document.querySelectorAll(".task-Chk")[i].checked == false) {
            listDone = false;
            break;
        }
    }

    if (listDone && elem) {


        popup.style.display = 'none';
        elem.style.display = 'block';
        elem.click();


    }
    else {
        console.log('couldnt proceed', elem, popup);
    }


}