var count = 0;
var active = 0;
var completed = 0;
var toggle_all = 0;

function reload_info() {
    if (active > 1) {
        document.getElementById("info").innerHTML = active + " items left";
    } else if (active === 1) {
        document.getElementById("info").innerHTML = active + " item left";
    } else {
        document.getElementById("info").innerHTML = "Nothing to complete";
    }
    if (count > 0) {
        document.getElementById('footer').classList.remove("hide");
        document.getElementById('footer').classList.add("show");
    } else {
        // var el = document.getElementsByClassName('footer')[0].classList;
        // console.log(document.getElementById('footer').classList);
        document.getElementById('footer').classList.remove("show");
        //or
        /*document.getElementById("MyID").className =
            document.getElementById("MyID").className
                .replace(new RegExp('(?:^|\\s)'+ 'My-Class' + '(?:\\s|$)'), ' ');*/
        document.getElementById('footer').classList.add("hide");
        document.getElementById("toggle-all").checked = false;

    }
    if (active === 0 && count > 0) {
        document.getElementById("toggle-all").checked = true;
        toggle_all = 1;
    } else if (active === count) {
        document.getElementById("toggle-all").checked = false;
        toggle_all = 0;
    }
    if (active < count) {
        document.getElementById('clear').style.opacity = 1;
    } else {
        document.getElementById('clear').style.opacity = 0;
    }
}

function add(e) {
    if (e.keyCode == 13 && document.getElementById('ss').value != "") {
        // or
        //     document.querySelectorAll("input[name='content']")[0].value;
        count++;
        active++;
        document.getElementById("toggle-all").checked = false;
        reload_info();
        var new_text = document.getElementById('ss').value;
        // document.getElementById('ss').value = '';
        var new_item = document.createElement("div");
        new_item.setAttribute("class", "item active");
        new_item.setAttribute("id", count);
        new_item.setAttribute("onmouseenter", "show_close_btn(event)");
        new_item.setAttribute("onmouseleave", "hide_close_btn(event)");
        var new_checkbox = document.createElement("input");
        new_checkbox.setAttribute("type", "checkbox");
        new_checkbox.setAttribute("onclick", "check(event)");
        new_item.append(new_checkbox);
        var new_span = document.createElement("span");
        new_span.innerHTML = new_text;
        new_span.setAttribute("ondblclick", "edit(event)");
        new_item.append(new_span);
        var new_i = document.createElement("i");
        new_i.setAttribute("class", "fa fa-times");
        new_i.setAttribute("name", "close");
        new_i.setAttribute("onclick", "remove(event)");
        new_item.append(new_i);

        document.getElementById('list').append(new_item);
        document.getElementById('ss').value = "";

        show_active(document.getElementById('active'));
        return false;
    }
}

function check(e) {
    var el = e.currentTarget;
    var par = el.parentElement;

    if (par.classList.contains("active")) {
        par.classList.remove("active");
        par.classList.add("completed");
        active -= 1;
    } else {
        par.classList.remove("completed");
        par.classList.add("active");
        active += 1;
    }

    completed = count - active;
    reload_info();
}

function show_all(e) {
    var els = document.getElementsByClassName('item');
    for (var i = 0; i < els.length; i++) {
        els[i].classList.remove('stt_a');
        els[i].classList.remove('stt_c');
    }
    active_tab(e);
}

function show_active(e) {
    var els = document.getElementsByClassName('item');
    for (var i = 0; i < els.length; i++) {
        els[i].classList.remove('stt_c');
        els[i].classList.add('stt_a');
    }
    if (active === 0) {
        document.getElementById("toggle-all").checked = false;
    }
    reload_info();
    active_tab(e);
}

function show_completed(e) {
    var els = document.getElementsByClassName('item');
    for (var i = 0; i < els.length; i++) {
        els[i].classList.remove('stt_a');
        els[i].classList.add('stt_c');
    }
    reload_info();
    active_tab(e);
}

function clear_completed() {
    var els = document.getElementsByClassName('item');
    for (var i = 0; i < els.length; i++) {
        if (els[i].classList.contains('completed')) {
            document.getElementById('list').removeChild(els[i]);
            i--;
        }
    }
    count = active;
    reload_info();
}

function check_all(e) {
    toggle_all = 1 - toggle_all;
    var els = document.querySelectorAll("input[type=checkbox]");
    var i = 0;
    if (toggle_all) {
        for (i = 0; i < els.length; i++) {
            els[i].checked = true;
            els[i].parentElement.classList.remove("active");
            els[i].parentElement.classList.add("completed");
            active = 0;
        }

    } else {
        for (i = 0; i < els.length; i++) {
            els[i].checked = false;
            els[i].parentElement.classList.remove("completed");
            els[i].parentElement.classList.add("active");
            active = count;
        }

    }
    reload_info();
}

function remove(e) {
    var el = e.currentTarget;
    var par = el.parentElement;
    var gra = par.parentElement;
    if (par.classList.contains('active')) {
        active -= 1;
    }
    count -= 1;
    gra.removeChild(par);
    reload_info();
}

function show_close_btn(e) {
    var par = e.currentTarget;
    var el = par.getElementsByTagName('i')[0];
    el.style.opacity = 0.2;
}

function hide_close_btn(e) {
    var par = e.currentTarget;
    var el = par.getElementsByTagName('i')[0];
    el.style.opacity = 0;
}
function keypress_edit(e) {
    var el = e.currentTarget;
    if(e.keyCode == 13){
        // why the following doesn't work?
        // console.log(el.value);
        if(el.innerHTML == "") {
            var par =  el.parentElement;
            var gra = par.parentElement;
            gra.removeChild(par);
        }
        el.setAttribute("contenteditable", "false");
        el.setAttribute("onkeypress","");
    }
}
function click_edit(e) {
    e.stopPropagation();
}
function body_click() {
    var els = document.getElementsByTagName('span');
    for(var i = 0; i < els.length; i++){
        els[i].setAttribute("contenteditable","false");
    }
}
function edit(e) {
    var el = e.currentTarget;
    el.setAttribute("contenteditable", "true");
    el.focus();
    el.setAttribute("onkeypress","keypress_edit(event)");
    el.setAttribute("onclick","click_edit(event)");
}

function active_tab(el) {
    var els = document.getElementsByClassName('btn');
    for(var i = 0; i < els.length; i++){
        els[i].classList.remove('active');
    }
    el.classList.add('active');
}

// function () {
//     $('#tri-btn').on("click", ".btn", function() {
//         $('#footer div.btn').each(function() {
//             $(this).removeClass("active");
//         });
//         $(this).addClass("active");
//     });
// }

// $(document).ready(function() {
//     // jQuery methods go here...




//

// });