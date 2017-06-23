
var elem, popup, modalLayer;
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
        but.className = 'GULSEEC-f-a GULSEEC-f-r extension-popup';
        but.onclick = constructShowPopup;
        elem.parentNode.append(but);
        elem.style.display = 'none';
    }
}

function constructShowPopup() {
    popup = document.createElement("div");
    popup.style.position = 'fixed';
    popup.style.minWidth = '500px';
    popup.style.minHeight = '400px';
    popup.style.zIndex = 9999;
    popup.style.top = 'calc(50% - 200px)';
    popup.style.left = 'calc(50% - 250px)';
    popup.className = 'gwt-PopupPanel GULSEEC-j-A extension-popup';
    document.body.append(popup);

    var divContent = document.createElement("div");
    divContent.className = 'popupContent';
    divContent.style.padding = '50px';

    var textP = document.createElement('p');
    textP.innerText = 'Make sure you have done the following:';
    textP.style.fontSize = 'large';


    var ul = document.createElement('ul');
    ul.id = 'extension-taskList';
    ul.style.paddingTop = '15px';
    ul.innerHTML = '';

     var cancelBtn = document.createElement("button");
    cancelBtn.className = 'GULSEEC-f-a GULSEEC-f-p GULSEEC-Bf-a';
    cancelBtn.innerText = 'Cancel';
    cancelBtn.style.cssFloat = 'right';
    cancelBtn.style.marginTop = '50px';
    cancelBtn.onclick = hidePopup;

    modalLayer = document.createElement('div');
    modalLayer.className = 'gwt-PopupPanelGlass extension-popup';
    modalLayer.style.width = '100vw';
    modalLayer.style.height = '100vh';
    modalLayer.style.top = '0';
    modalLayer.style.left = '0';
    modalLayer.style.position = 'fixed'
    document.body.append(modalLayer);


    chrome.storage.sync.get({
	items: []
}, function (data) {
	console.log('data from chrome storage', data);

	var taskList = (data && data.items && data.items.length) ? data.items: [];
	
if(!taskList || taskList.length == 0){
    taskList = [{name:'APIs, etc pointed to production server'},{name:'Test cases were successful'}];
}

    taskList.forEach(function (task) {
        var listItem = document.createElement('li'),
            taskLabel = document.createElement('label'),
            chk = document.createElement('input');

        chk.className = 'task-Chk';
        chk.type = 'checkbox';
        chk.onchange = unlockReview;

        listItem.className = 'task';
        listItem.id = taskList.indexOf(task);
        listItem.style.paddingTop = '10px';

        taskLabel.className = 'taskLabel';
        taskLabel.textContent = task.name;
        taskLabel.style.paddingLeft = '10px';
        taskLabel.htmlFor = 'c' + taskList.indexOf(task);

        listItem.appendChild(chk);
        listItem.appendChild(taskLabel);
        ul.appendChild(listItem);
    });

   

    divContent.append(textP);
    divContent.append(ul);
    divContent.append(cancelBtn);
    popup.append(divContent);
    popup.style.display = 'block';
    
});

 

    


    

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

        hidePopup();

        elem.style.display = 'block';
        elem.nextElementSibling.style.display = 'none';

        elem.click();


    }
    else {
        console.log('couldnt proceed', elem, popup);
    }


}

function hidePopup() {
    popup.style.display = 'none';
    modalLayer.style.display = 'none';
}