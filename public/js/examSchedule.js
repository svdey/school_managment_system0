$(document).ready(function () {
    $('#tblSchedule').DataTable({
        autoFill: true
    });
    $("#submitform").submit(function (e) {
        e.preventDefault()
        let obj = {}
        let fd = new FormData(e.currentTarget)
        fd.forEach((val, key) => {
            obj[key] = val
        })
        console.log(obj);
        $.ajax({
            url: "/schedule-data",
            type: "POST",
            data: obj,
            success: function (res) {
                if (res.success) {
                    alert(res.success);
                    window.location.href =
                        window.location.pathname.split("/")[0] + "examSchedule";
                } else if (res.error) {
                    alert(res.error);
                    window.location.reload();
                }
            },
        });
    });
    $(document).on("click", ".btn_delete", function () {
        var check = confirm("Are you sure want to delete this record?");
        if (!check) {
            return;
        }
        var id = $(this).val();
        console.log("id--->", id);
        $.ajax({
            url: "/schedule-delete",
            type: "POST",
            data: { id: id },
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
    });
    $(document).on("click", ".btn_eye", function () {

    });
    $(document).on("click", ".btn_edit", function () {
        console.log("edit button click");
        var id = $(this).val();
        $(this)
            .removeClass("btn_edit fa-pencil-square-o ")
            .addClass("btn_update fa-check")
        var exam = $(this).closest("tr").find(".exam").text().trim();
        $(this)
            .closest("tr")
            .find(".exam")
            .html("<input type='text' class='txt txt_exam' value='" + exam + "' />");
        var subject = $(this).closest("tr").find(".subject").text().trim();
        $(this)
            .closest("tr")
            .find(".subject")
            .html("<input type='text' class='txt txt_subject' value='" + subject + "' />");
        var Class = $(this).closest("tr").find(".class").text().trim();
        $(this)
            .closest("tr")
            .find(".class")
            .html(
                "<input type='text' class='txt txt_class' value='" + Class + "' />");
        var section = $(this).closest("tr").find(".section").text().trim();
        $(this)
            .closest("tr")
            .find(".section")
            .html(
                "<input type='text' class='txt txt_section' value='" +
                section +
                "' />"
            );
        var duration = $(this).closest("tr").find(".duration").text().trim();
        $(this)
            .closest("tr")
            .find(".duration")
            .html(
                "<input type='text' class='txt txt_duration' value='" +
                duration +
                "' />"
            );
        var marks = $(this).closest("tr").find(".marks").text().trim();
        $(this)
            .closest("tr")
            .find(".marks")
            .html(
                "<input type='text' class='txt txt_marks' value='" +
                marks +
                "' />"
            );
        var time = $(this).closest("tr").find(".time").text().trim();
        $(this)
            .closest("tr")
            .find(".time")
            .html(
                "<input type='text' class='txt txt_time' value='" +
                time +
                "' />"
            );
        var date = $(this).closest("tr").find(".date").text().trim();
        $(this)
            .closest("tr")
            .find(".date")
            .html(
                "<input type='text' class='txt txt_date' value='" +
                date +
                "' />"
            );
    });
    $(document).on("click", ".btn_update", function () {
        var id = $(this).val();
        var exam = $(".txt_exam").val();
        var subject = $(".txt_subject").val();
        var Class = $(".txt_class").val();
        var duration = $(".txt_duration").val();
        var totalMarks = $(".txt_marks").val();
        var section = $(".txt_section").val();
        var time = $(".txt_time").val();
        var date = $(".txt_date").val();
        console.log("update clicked")
        var data = {
            id: id,
            exam: exam,
            subject: subject,
            Class: Class,
            section: section,
            time: time,
            totalMarks: totalMarks,
            duration: duration,
            date: date,
        };
        console.log("data---->", data);
        $.ajax({
            url: "/schedule-update",
            type: "POST",
            data: data,
            success: function (res) {
                if (res.success) {
                    alert(res.success);
                    window.location.href =
                        window.location.pathname.split("/")[0] + "examSchedule";
                } else if (res.error) {
                    alert(res.error);
                    window.location.reload();
                }
            },
        });
    });
    $(document).on("click", ".btn_refresh", function () {
        window.location.href =
            window.location.pathname;
    });

});