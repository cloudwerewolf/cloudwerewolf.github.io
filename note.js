var notelist = [];

function loadOld() {
    var retnotelist = localStorage.getItem('Notelist');
    retnotelist = JSON.parse(retnotelist);
    notelist = retnotelist;
    var div = document.getElementById("notepage");
    for (var notes in retnotelist){
        var text = document.createElement("textarea");
        text.name = "notes"
        text.cols = 45;
        text.rows = 5;
        text.className = "notelist";
        this.id = notes;
        if (retnotelist[notes].title != "") {
            text.value = retnotelist[notes].title.toUpperCase() + '\n' + retnotelist[notes].note;
        }
        else { text.value = retnotelist[notes].note;}
        div.appendChild(text);
    }
}
function noteListen() {
    document.getElementById('note').addEventListener("keydown", function (event) {
    if (event.keyCode == 13 && event.ctrlKey) {
        document.getElementById('save').click();
        event.preventDefault();
    }
    });
    document.getElementById('notehead').addEventListener("keydown", function (event) {
    if (event.keyCode == 13 && event.ctrlKey) {
        document.getElementById('save').click();
        event.preventDefault();
    }
    });
}
function addNote(head, text) {
    saveNote(head, text);
    displayNotes();
}
function saveNote(head, text) {
    notelist.unshift({"title": head, "note": text});
    localStorage.setItem('Notelist', JSON.stringify(notelist));
    var head = document.getElementById("notehead");
    var body = document.getElementById("note");
    head.value = "";
    body.value = "";
}
function displayNotes() {
    var retnotelist = localStorage.getItem('Notelist');
    retnotelist = JSON.parse(retnotelist);
    var div = document.getElementById("notepage");
    while (div.hasChildNodes()) {
        div.removeChild(div.lastChild);
    }
    for (var notes in retnotelist){
        var text = document.createElement("textarea");
        text.name = "notes"
        text.cols = 45;
        text.rows = 5;
        text.className = "notelist";
        this.id = notes;
        if (retnotelist[notes].title != "") {
            text.value = retnotelist[notes].title.toUpperCase() + '\n' + retnotelist[notes].note;
        }
        else { text.value = retnotelist[notes].note;}
        div.appendChild(text);
    }
}
function deleteNotes() {
    localStorage.removeItem('Notelist');
    notelist = [];
    localStorage.setItem('Notelist', JSON.stringify(notelist));
    retnotelist = [];
    var div = document.getElementById("notepage");
    while (div.hasChildNodes()) {
        div.removeChild(div.lastChild);
    }
}