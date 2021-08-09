$(document).ready(function () {
    $('#tblTransport').DataTable({
        autoFill: true
    });
    $(document).on("submit", "#submitform", function (ev) {
        ev.preventDefault();
        var ruteName = $(".rutename").val();
        var vechileNumber = $(".vechilenumber").val();
        var driverName = $(".drivername").val();
        var licenseNumber = $(".licensenumber").val();
        var phNumber = $(".phnumber").val();
        var data = {
            ruteName: ruteName,
            vechileNumber: vechileNumber,
            driverName: driverName,
            licenseNumber: licenseNumber,
            phNumber: phNumber,
        };
        console.log("data---->", data);
        $.ajax({
            url: "/transport-data",
            type: "POST",
            data: data,
            success: function (res) {
                if (res.success) {
                    alert(res.success);
                    window.location.href =
                        window.location.pathname.split("/")[0] + "transport";
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
            url: "/transport-delete",
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
        var ruteName = $(this).closest("tr").find(".ruteName").text().trim();
        console.log("ruteName--->", ruteName);
        $("#ruteName").val(ruteName);
        var vechileNumber = $(this).closest("tr").find(".vechileNumber").text().trim();
        $("#vechileNumber").val(vechileNumber);
        var driverName = $(this).closest("tr").find(".driverName").text().trim();
        $("#driverName").val(driverName);
        var licenseNumber = $(this).closest("tr").find(".licenseNumber").text().trim();
        $("#licenseNumber").val(licenseNumber);
        var phNumber = $(this).closest("tr").find(".phNumber").text().trim();
        $("#phNumber").val(phNumber);

    });
    $(document).on("click", ".btn_edit", function () {
        console.log("edit button click");
        var id = $(this).val();
        $(this)
            .removeClass("btn_edit fa-pencil-square-o ")
            .addClass("btn_update fa-check")
        var ruteName = $(this).closest("tr").find(".ruteName").text().trim();
        console.log("ruteName-->", ruteName);
        $(this)
            .closest("tr")
            .find(".ruteName")
            .html("<input type='text' class='txt txt_ruteName' value='" + ruteName + "' />");
        var vechileNumber = $(this).closest("tr").find(".vechileNumber").text().trim();
        $(this)
            .closest("tr")
            .find(".vechileNumber")
            .html("<input type='text' class='txt txt_vechileNumber' value='" + vechileNumber + "' />");
        var driverName = $(this).closest("tr").find(".driverName").text().trim();
        $(this)
            .closest("tr")
            .find(".driverName")
            .html(
                "<input type='text' class='txt txt_driverName' value='" + driverName + "' />"
            );
        var licenseNumber = $(this).closest("tr").find(".licenseNumber").text().trim();
        $(this)
            .closest("tr")
            .find(".licenseNumber")
            .html(
                "<input type='text' class='txt txt_licenseNumber' value='" +
                licenseNumber +
                "' />"
            );
        var phNumber = $(this).closest("tr").find(".phNumber").text().trim();
        $(this)
            .closest("tr")
            .find(".phNumber")
            .html(
                "<input type='text' class='txt txt_phNumber' value='" +
                phNumber +
                "' />"
            );
    });
    $(document).on("click", ".btn_update", function () {
        var id = $(this).val();
        var ruteName = $(".txt_ruteName").val();
        var vechileNumber = $(".txt_vechileNumber").val();
        var driverName = $(".txt_driverName").val();
        var licenseNumber = $(".txt_licenseNumber").val();
        var phNumber = $(".txt_phNumber").val();
        console.log("update clicked")
        var data = {
            id: id,
            ruteName: ruteName,
            vechileNumber: vechileNumber,
            driverName: driverName,
            licenseNumber: licenseNumber,
            phNumber: phNumber,
        };
        // console.log("data---->", data);
        $.ajax({
            url: "/transport-update",
            type: "POST",
            data: data,
            success: function (res) {
                if (res.success) {
                    alert(res.success);
                    window.location.href =
                        window.location.pathname.split("/")[0] + "transport";
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
