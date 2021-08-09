$(document).ready(function () {
    $("#profile_setting").submit(function (e) {
        e.preventDefault()
        let obj = {}
        let fd = new FormData(e.currentTarget)
        fd.forEach((val, key) => {
            obj[key] = val
        })
        $.ajax({
            url: "custom-url",
            type: "POST",
            data: obj,
            success: function (res) {
                if (res.success) {
                  alert(res.success);
                  window.location.reload();
                } else if (res.error) {
                  alert(res.error);
                  window.location.reload();
                }
              },
        })
    })
});