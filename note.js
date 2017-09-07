var notelist = [];
function fade(element) {
    var op = 1;
    var timer = setInterval(function () {
        if (op <= 0.1){
            clearInterval(timer);
            element.style.visibility = "hidden";
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * 0.1;
    }, 30);
}
function delNote(id) {
    id = id[0];
    var note = document.getElementById(id);
    var notediv = note.parentNode
    console.log(notediv);
    var div = document.getElementById("notepage");
    div.removeChild(notediv);
    notelist.splice(id, 1);
}
function showBtn(id) {
    var btn = document.getElementById(id + "btn");
    btn.style.visibility = "visible";
    btn.style.opacity = 1;
    setTimeout(function() {fade(btn);}, 1500);
}
function displayNotes() {
    var retnotelist = localStorage.getItem('Notelist');
    if (retnotelist !== null) {
        retnotelist = JSON.parse(retnotelist);
    }
    var div = document.getElementById("notepage");
    for (var notes in retnotelist) {
        var notediv = document.createElement("div");
        notediv.className = "noteholder";
        div.appendChild(notediv);
        var notespan = document.createElement("span");
        notespan.className = "notebuttons";
        notediv.appendChild(notespan);
        var text = document.createElement("textarea");
        text.name = "notes"
        text.cols = 45;
        text.rows = 5;
        text.className = "notelist";
        text.onfocus = function() {showBtn(this.id);};
        text.id = notes;
        if (retnotelist[notes].title != "") {
            text.value = retnotelist[notes].title.toUpperCase() + '\n' + retnotelist[notes].note;
        }
        else { text.value = retnotelist[notes].note;}
        notediv.appendChild(text);
        var xBtn = document.createElement("button");
        xBtn.innerHTML = "X";
        xBtn.id = notes + "btn";
        xBtn.onfocus = function() {delNote(this.id);};
        xBtn.style.visibility = "hidden";
        notespan.appendChild(xBtn);
    }
}
function loadOld() {
    displayNotes();
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
    if (head !== "" || text !== "") {
        saveNote(head, text);
        clearNotes();
    }
}
function saveNote(head, text) {
    notelist.unshift({"title": head, "note": text});
    localStorage.setItem('Notelist', JSON.stringify(notelist));
    var head = document.getElementById("notehead");
    var body = document.getElementById("note");
    head.value = "";
    body.value = "";
}
function clearWall() {
    var div = document.getElementById("notepage");
    while (div.hasChildNodes()) {
        div.removeChild(div.lastChild);
    }
}
function clearNotes() {
    clearWall();
    displayNotes();
}
function regoSW() {
    if('serviceWorker' in navigator) {
      navigator.serviceWorker
               .register('/sw.js');
    }
}