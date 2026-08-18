function newElement() {
    var input = document.getElementById("task");
    var value = input.value.trim();

    if (value === "") {
        $("#errorToast").toast("show");
        return;
    }

    var li = document.createElement("li");
    li.textContent = value;

    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");

    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);

    document.getElementById("list").appendChild(li);

    span.onclick = function () {
        this.parentElement.remove();
        saveTasks();
    };

    input.value = "";

    $("#liveToast").toast("show");

    saveTasks();
}


var list = document.getElementById("list");


function saveTasks() {
    localStorage.setItem("tasks", list.innerHTML);
}


function addCloseButton(item) {
    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");

    span.className = "close";
    span.appendChild(txt);

    item.appendChild(span);

    span.onclick = function () {
        this.parentElement.remove();
        saveTasks();
    };
}


list.addEventListener("click", function (event) {

    if (event.target.tagName === "LI") {

        event.target.classList.toggle("checked");

        saveTasks();
    }

});


var savedTasks = localStorage.getItem("tasks");

if (savedTasks) {

    list.innerHTML = savedTasks;

    var savedItems = list.getElementsByTagName("LI");

    for (var i = 0; i < savedItems.length; i++) {

        var closeButton =
            savedItems[i].getElementsByClassName("close")[0];

        if (closeButton) {

            closeButton.onclick = function () {
                this.parentElement.remove();
                saveTasks();
            };

        }
    }
}


var taskInput = document.getElementById("task");

taskInput.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {
        newElement();
    }

});