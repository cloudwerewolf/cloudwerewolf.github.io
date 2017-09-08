var timer = [];
var delay_timers = [];
var notelist = [];
function fade(element) {
    var op = 1;
    var id = element.id;
    timer[id] = setInterval(function () {
        if (op <= 0.1) {
            clearInterval(timer[id]);
            timer[id] = null;
            element.style.visibility = "hidden";
            return;
        }
        element.style.opacity = op;
        op -= op * 0.1;
        }, 30);
}
function delNote(id) {
    var note = document.getElementById(id);
    var notediv = note.parentNode;
    var div = document.getElementById("notepage");
    div.removeChild(notediv);
    notelist.splice(id, 1);
    localStorage.setItem('Notelist', JSON.stringify(notelist));
    clearNotes();
}
function shareNote(id) {
    var notes = document.getElementById(id);
    if (typeof navigator.share !== 'undefined') {
        event.preventDefault();
        navigator.share({ title: "NotePen Note", text: notes.value });
    }
}
function showBtn(id, time) {
    var span = document.getElementById(id + "span");
    clearInterval(timer[id + "span"]);
    timer[id + "span"] = null;
    clearTimeout(delay_timers[id + "span"]);
    delay_timers[id + "span"] = null;
    span.style.visibility = "visible";
    span.style.opacity = 1;
    delay_timers[id + "span"] = setTimeout(function() {fade(span)}, time);
}
function displayNotes() {
    var retnotelist = localStorage.getItem('Notelist');
    if (retnotelist !== null) {
        retnotelist = JSON.parse(retnotelist);
        notelist = retnotelist;
    }
    var div = document.getElementById("notepage");
    for (var notes in retnotelist) {
        var notediv = document.createElement("div");
        notediv.className = "noteholder";
        notediv.style.contentEditable = "false";
        div.appendChild(notediv);
        var notespan = document.createElement("span");
        notespan.className = "notebuttons";
        notespan.id = notes + "span";
        notespan.style.visibility = "hidden";
        notediv.appendChild(notespan);
        var text = document.createElement("textarea");
        text.name = "notes"
        text.cols = 45;
        text.rows = 5;
        text.className = "notelist";
        text.onclick = function() {showBtn(this.id, 2500);};
        text.onmousemove = function() {showBtn(this.id, 1000);};
        text.id = notes;
        text.readOnly = "true";
        if (retnotelist[notes].title != "") {
            text.value = retnotelist[notes].title.toUpperCase() + '\n' + retnotelist[notes].note;
        }
        else { text.value = retnotelist[notes].note;}
        notediv.appendChild(text);
        var xBtn = document.createElement("input");
        xBtn.type = "Submit";
        xBtn.className = "delBtn";
        xBtn.value = "✖";
        xBtn.id = notes + "btn";
        xBtn.noteid = notes;
        xBtn.onmouseup = function() {delNote(this.noteid);};
        if (typeof navigator.share == 'undefined') {
            xBtn.style.right = '0px';
        }
        notespan.appendChild(xBtn);
        if (typeof navigator.share !== 'undefined') {
            var shrBtn = document.createElement("input");
            shrBtn.type = "Submit";
            shrBtn.className = "share";
            shrBtn.value = "➥";
            shrBtn.id = notes + "shr";
            shrBtn.noteid = notes;
            shrBtn.onmouseup = function() {shareNote(this.noteid);};
            notespan.appendChild(shrBtn); 
        }
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
    document.getElementById("notehead").value = "";
    document.getElementById("note"). value = "";
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