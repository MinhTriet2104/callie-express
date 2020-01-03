$(document).ready(function() {
    let validateUsername = false;
    let validateEmail = false;
    let validatePassword = false;

    $("#username").blur(function() {
        let username = $(this).val();
        $.get(
            "/be2-project/public/checkUsername",
            { username: username },
            function(data) {
                if (data == 1) {
                    $("#alert-username").text("Tên đăng nhập đã tồn tại!");
                    $("#alert-username").addClass("alert alert-danger");
                    validateUsername = false;
                } else {
                    $("#alert-username").text("");
                    $("#alert-username").removeClass("alert alert-danger");
                    validateUsername = true;
                }
            }
        );
    });

    $("#email").blur(function() {
        let email = $(this).val();
        $.get("/be2-project/public/checkEmail", { email: email }, function(
            data
        ) {
            if (data == 1) {
                $("#alert-email").text("Email đã được sử dụng!");
                $("#alert-email").addClass("alert alert-danger");
                validateEmail = false;
            } else {
                $("#alert-email").text("");
                $("#alert-email").removeClass("alert alert-danger");
                validateEmail = true;
            }
        });
    });

    $("#confirm-password").on("input", function() {
        if (
            $("#password").val() === "" ||
            $("#confirm-password").val() === ""
        ) {
            validatePassword = false;
        }
        if (
            $("#password").val() !== "" &&
            $("#confirm-password").val() !== "" &&
            $("#password").val() !== $("#confirm-password").val()
        ) {
            $("#alert-password").text("2 Password bạn nhập khác nhau!");
            $("#alert-password").addClass("alert alert-danger");
            validatePassword = false;
        } else {
            $("#alert-password").text("");
            $("#alert-password").removeClass("alert alert-danger");
            validatePassword = true;
        }
    });

    $("#username").on("input", function() {
        if (validateUsername && validateEmail && validatePassword) {
            $("#signup").removeClass("disabled");
        } else {
            if (!$("#signup").hasClass("disabled")) {
                $("#signup").addClass("disabled");
            }
        }
    });

    $("#email").on("input", function() {
        if (validateUsername && validateEmail && validatePassword) {
            $("#signup").removeClass("disabled");
        } else {
            if (!$("#signup").hasClass("disabled")) {
                $("#signup").addClass("disabled");
            }
        }
    });

    $("#confirm-password").on("input", function() {
        if (validateUsername && validateEmail && validatePassword) {
            $("#signup").removeClass("disabled");
        } else {
            if (!$("#signup").hasClass("disabled")) {
                $("#signup").addClass("disabled");
            }
        }
    });
});
