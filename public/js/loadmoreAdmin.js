$(document).ready(function() {
    let page = 1;
    let categoryId = $("#category-id").val();

    $.get(
        "/be2-project/public/loadmoreAdmin",
        { page: page, category: categoryId },
        function(data) {
            $("#content").append(data);
        }
    );

    $("#load-more").click(function() {
        page++;
        categoryId = $("#category-id").val();
        if (categoryId == 0) categoryId = undefined;
        $.get(
            "/be2-project/public/loadmoreAdmin",
            { page: page, category: categoryId },
            function(data) {
                $("#content").append(data);
            }
        );
    });

    $(".category-btn").each(function() {
        $(this).on("click", function() {
            $("#content").empty();
            page = 1;
            if ($(this).attr("id") == 0) {
                categoryId = undefined;
                $("#category-id").val(0);
            } else {
                $("#category-id").val($(this).attr("id"));
                categoryId = $("#category-id").val();
            }

            $.get(
                "/be2-project/public/loadmoreAdmin",
                { page: page, category: categoryId },
                function(data) {
                    $("#content").append(data);
                }
            );
        });
    });
});
