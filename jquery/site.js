// $.fn.selectRange = function(start, end) {
//     if(end === undefined) {
//         end = start;
//     }
//     return this.each(function() {
//         if('selectionStart' in this) {
//             this.selectionStart = start;
//             this.selectionEnd = end;
//         } else if(this.setSelectionRange) {
//             this.setSelectionRange(start, end);
//         } else if(this.createTextRange) {
//             var range = this.createTextRange();
//             range.collapse(true);
//             range.moveEnd('character', end);
//             range.moveStart('character', start);
//             range.select();
//         }
//     });
// };
$(document).ready(function() {
    // jQuery methods go here...
    $('#ss').focus();
    // $('#new').focus();
    var count = 0;
    var max = 0;
    var active = 0;
    var completed = 0;
    var toggle_all = 0;
    reload_info();

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

    function active_tab(el) {
        var els = document.getElementsByClassName('btn');
        for(var i = 0; i < els.length; i++){
            els[i].classList.remove('active');
        }
        el.classList.add('active');
    }

    $('#new').keypress(function(e) {
        if (e.which == 13 && $("input[name='content']").val() != "") {
            // var new_text = $("#ss").val();
            count++;
            max++;
            active++;
            $("#toggle-all").prop("checked", false);
            reload_info();
            var new_text = $("input[name='content']").val();
            // document.getElementById('ss').value = '';
            // var new_item = document.createElement("div");
            $('<div></div>').attr({
                class: 'item active',
                id: max
            }).appendTo($('#list'));
            // new_item.addClass('item');
            // // new_item.addClass("item");
            $('<input/>').attr({
                type: 'checkbox',
            }).appendTo("#" + max);
            // console.log($("input[name='content']").val());
            $('<span>' + $("input[name='content']").val() + '</span>').attr({}).appendTo("#" + max);
            // $('<span></span>').appendTo(new_item);
            // var text = document.createTextNode(new_text);
            // console.log(new_item);
            // document.getElementById("list").append(new_item);
            $('<i aria-hidden: "true"></i>').attr({
                class: "fa fa-times",
                name: "close"
            }).appendTo("#" + max);
            $("input[name='content']").val("");
            show_active(document.getElementById('active'));
        }
    });
    $("#list").on("click", ".item input", function() {
        if ($(this).parent().hasClass('active')) {
            $(this).parent().removeClass("active");
            $(this).parent().addClass("completed");
            active -= 1;
            completed = count - active;
            reload_info();
        } else {
            $(this).parent().removeClass("completed");
            $(this).parent().addClass("active");
            active += 1;
            completed = count - active;
            $("#toggle-all").prop("checked", false);
            reload_info();
        }
    });
    $("#all").on("click", function() {
        $("div.item").each(function() {
            // $(this).removeClass('hide');
            // $(this).addClass('show');
            $(this).removeClass('stt_a');
            $(this).removeClass('stt_c');
        });
    });
    $("#active").on("click", function() {
        $("div.item").each(function() {
            // if ($(this).hasClass('completed')) {
            //     $(this).removeClass('show');
            //     $(this).addClass('hide');
            // }
            // if ($(this).hasClass('active')) {
            //     $(this).removeClass('hide')
            //     $(this).addClass('show');
            // }
            $(this).removeClass('stt_c');
            $(this).addClass('stt_a');
        });
        if (active == 0) {
            $("#toggle-all").prop("checked", false);
        }
    });
    $("#completed").on("click", function() {
        $("div.item").each(function() {
            // if ($(this).hasClass('completed')) {
            //     $(this).removeClass('hide');
            //     $(this).addClass('show');
            // }
            // if ($(this).hasClass('active')) {
            //     $(this).removeClass('show');
            //     $(this).addClass('hide');
            // }
            $(this).removeClass('stt_a');
            $(this).addClass('stt_c');
        });
        reload_info();
    });
    $("#clear").on("click", function() {
        $("div.item").each(function() {
            if ($(this).hasClass('completed')) {
                $(this).remove();
            }
        });
        count = active;
        reload_info();
    });
    $('#toggle-all').on("click", function() {
        toggle_all = 1 - toggle_all;
        if (toggle_all) {
            $("input[type=checkbox]").each(function() {
                $(this).prop("checked", true);
                $(this).parent().removeClass("active");
                $(this).parent().addClass("completed");
                active = 0;
                reload_info();
            });
        } else {
            $("input[type=checkbox]").each(function() {
                $(this).prop("checked", false);
                $(this).parent().removeClass("completed");
                $(this).parent().addClass("active");
                active = count;
                reload_info();
            });
        }
    });
    $("#list").on("click", ".item i", function() {
        if ($(this).parent().hasClass('active')) {
            active -= 1;
            count -= 1;
        } else {
            count -= 1;
        }
        $(this).parent().remove();
        reload_info();
    });
    $('#list').on("mouseenter", ".item", function() {
        $(this).find('i').css('opacity', '0.2');
        $(this).find('i').on("mouseenter", function() {
            $(this).css('opacity','0.5');
        });
        $(this).find('i').on("mouseleave", function() {
            $(this).css('opacity','0.2');
        });
        // or $(this).children("i:first")
    });
    $('#list').on("mouseleave", ".item", function() {
        $(this).find('i').css('opacity', '0');
        // or $(this).children("i:first")
    });
    $('#list').on("dblclick", "div.item span", function() {
        var th = this;
        $(this).attr({
            contenteditable: "true",
        });
        $(this).focus();
        // $(this).setCursorPosition(1);
        // $(this).css('outline-style', 'solid 1px');
        $(this).keypress(function(e) {
            if (e.which == 13) {
                if ($(this).text() == "") {
                    $(this).parent().remove();
                }
                $(this).attr({
                    contenteditable: "false",
                });
            };
        });
        $(this).click(function(event) {
            event.stopPropagation();
        });
        $(document).click(function() {
            $(th).attr({
                contenteditable: "false",
            });
        });
    });
    $('#tri-btn').on("click", ".btn", function() {
        $('#footer div.btn').each(function() {
            $(this).removeClass("active");
        });
        $(this).addClass("active");
    });

    function reload_info() {
        if (active > 1) {
            $("#info").html(active + " items left");
        } else if (active == 1) {
            $("#info").html(active + " item left");
        } else {
            $("#info").html("Nothing to complete");
        }
        if (count > 0) {
            $('.footer').removeClass("hide");
            $('.footer').addClass("show");
        } else {
            $('.footer').removeClass("show");
            $('.footer').addClass("hide");
            $("#toggle-all").prop("checked", false);
        }
        if (active == 0 && count > 0) {
            $("#toggle-all").prop("checked", true);
            toggle_all = 1;
        } else if (active == count) {
            $("#toggle-all").prop("checked", false);
            toggle_all = 0;
        }
        if (active < count) {
            $('#clear').css('opacity', '1');
        } else {
            $('#clear').css('opacity', '0');
        }
    };
});