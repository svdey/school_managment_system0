$(document).ready(function () {
    $(document).on("click", ".btn_submit", function () {
        var title = $("#title").val();
        var details = $("#details").val();
        var posted_by = $("#posted_by").val();
        var date = $("#date").val();
        var data = {
            title: title,
            details: details,
            posted_by: posted_by,
            date: date,
        }
        $.ajax({
            url: "/notice-data",
            type: "POST",
            data: data,
            success: function (res) {
                if (res.success) {
                    alert(res.success);
                    window.location.reload();
                } else if (res.error) {
                    alert(res.error);
                    window.location.reload();
                }
            },
        });
    })
})
$(document).ready(function(){
    $(document).on("click",".btn_delete", function(){
        var check = confirm("Are you sure want to delete this record?");
        if (!check) {
            return;
        }
        var id = this.id;
        console.log("id-->",id);
    })
})