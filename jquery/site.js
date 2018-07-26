$(document).ready(function() {
    // jQuery methods go here...
    var count = 0;
    var active = 0;
    var completed = 0;
    var toggle_all = 0;
    reload_info();
    $('#new').keypress(function(e) {
        if (e.which == 13 && $("input[name='content']").val() != "") {
            // var new_text = $("#ss").val();
            count++;
            active++;
            $("#toggle-all").prop("checked", false);
            reload_info();
            var new_text = $("input[name='content']").val();
            // document.getElementById('ss').value = '';
            // var new_item = document.createElement("div");
            $('<div></div>').attr({
                class: 'item active',
                id: count
            }).appendTo($('#list'));
            // new_item.addClass('item');
            // // new_item.addClass("item");
            $('<input/>').attr({
                type: 'checkbox',
            }).appendTo("#" + count);
            // console.log($("input[name='content']").val());
            $('<span>' + $("input[name='content']").val() + '</span>').attr({}).appendTo("#" + count);
            // $('<span></span>').appendTo(new_item);
            // var text = document.createTextNode(new_text);
            // console.log(new_item);
            // document.getElementById("list").append(new_item);
            $('<i aria-hidden: "true"></i>').attr({
                class: "fa fa-times",
                name: "close"
            }).appendTo("#" + count);
            $("input[name='content']").val("");
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
            reload_info();
        }
    });
    $("#all").on("click", function() {
        $("div.item").each(function() {
            $(this).removeClass('hide');
            $(this).addClass('show');
        });
    });
    $("#active").on("click", function() {
        $("div.item").each(function() {
            if ($(this).hasClass('completed')) {
                $(this).removeClass('show');
                $(this).addClass('hide');
            }
            if ($(this).hasClass('active')) {
                $(this).removeClass('hide')
                $(this).addClass('show');
            }
        });
        if (active == 0) {
            $("#toggle-all").prop("checked", false);
        }
    });
    $("#completed").on("click", function() {
        $("div.item").each(function() {
            if ($(this).hasClass('completed')) {
                $(this).removeClass('hide');
                $(this).addClass('show');
            }
            if ($(this).hasClass('active')) {
                $(this).removeClass('show');
                $(this).addClass('hide');
            }
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
        $(this).find('i').css('opacity', '0.5');
        // or $(this).children("i:first")
    });
    $('#list').on("mouseleave", ".item", function() {
        $(this).find('i').css('opacity', '0');
        // or $(this).children("i:first")
    });
    $('#footer').on("click", ".btn", function() {
        $(this).parent().find("div.btn").each(function() {
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
    };
});