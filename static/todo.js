$(function() {
    $.get('/tasks', updateList);

    // Write code here
    $("#form").keypress(function(event) {
        if (event.keyCode == 13) {
            event.preventDefault();
            var data = $("#new-task").serialize();
            $.post('/add_task', data, function() {});
            $("ul").empty();
            $.get('/tasks', updateList);
            $("#new-task").val("")
        };
    });
    $(document).on('click', '#check', function() {
        var task_done = $(this).prop("checked");
        var task_id = $(this).parent().attr("id");
        var data = {
            id: task_id,
            done: task_done
        };
        $.post('/mark_task', data, function() {
            if (data.done === true) {
                $("#" + data.id).addClass("done")
            } else if (data.done === false) {
                $("#" + data.id).removeClass("done")
            }
        });
    });
    $('#remove-completed').on('click', function(){
        $.post('/remove_complete');
        $("ul").empty();
        $.get('/tasks', updateList);
    });
});
var updateList = function(resultsArr) {
    resultsArr.forEach(function(results) {
        var html = "<li id='" + results.id + "'>" + results.description + "<input id='check' type='checkbox'></li>"
        $("#task-list").append(html)
    });
};
