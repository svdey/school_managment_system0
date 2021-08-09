$(document).ready(function () {
    $("#submitform").submit(function (e) {
        e.preventDefault()
        let obj = {}
        let fd = new FormData(e.currentTarget)
        fd.forEach((val, key) => {
            obj[key] = val
        })
        console.log(obj)
        $.ajax({
            url: "/message-data",
            type: "POST",
            data: obj,
            success: function (res) {
                if (res.success) {
                    alert(res.success);
                    window.location.href =
                        window.location.pathname.split("/")[0] + "message";
                } else if (res.error) {
                    alert(res.error);
                    window.location.reload();
                }
            },
        });
    })
    $(document).on("click", ".btn_refresh", function () {
        window.location.href =
            window.location.pathname;
    });
});