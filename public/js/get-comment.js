$(document).ready(function() {
    let id = $("#newsId").val();
    let userId = $("#user-id").val();
    $.get("/be2-project/public/comment", { newsId: id }, function(data) {
        $("#comment").append(data);
    });

    $("#send").click(function() {
        let content = $("#message").val();
        $.get(
            "/be2-project/public/comment",
            { content: content, userId: userId, newsId: id },
            function(data) {
                $("#comment").prepend(data);
            }
        );
    });
});
