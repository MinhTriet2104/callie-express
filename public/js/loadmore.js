$(document).ready(function() {
    let page = 1;
    let categoryId = $("#category-id").val();
    $.get(
        "/be2-project/public/loadmore",
        { page: page, category: categoryId },
        function(data) {
            $("#content").append(data);
        }
    );
    $("#load-more").click(function() {
        page++;
        $.get(
            "/be2-project/public/loadmore",
            { page: page, category: categoryId },
            function(data) {
                $("#content").append(data);
            }
        );
    });
});
