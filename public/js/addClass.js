$(document).ready(function () {
  $('#tbladdClass').DataTable({
    autoFill: true
  });
  $(document).on("click", ".btn_save", function () {
    console.log("btn clcik");
    var teacherName = $("#teacherName").val();
    var subject = $("#subject").val();
    var mobile = $("#mobile").val();
    var idno = $("#idno").val();
    var section = $("#section").val();
    var email = $("#email").val();
    var gender = $("#gender").val();
    var time = $("#time").val();
    var sclass = $("#sclass").val();
    var date = $("#date").val();

    var data = {
      teacherName: teacherName,
      subject: subject,
      mobile: mobile,
      idno: idno,
      section: section,
      email: email,
      sclass: sclass,
      gender: gender,
      time: time,
      date: date,
    };
    $.ajax({
      url: "class-add",
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
    console.log(data);
  });

  $(document).on("click", ".btn_delete", function () {
    var check = confirm("Are you sure want to delete this record?");
    if (!check) {
      return;
    }
    var id = $(this).val();
    console.log("id--->", id);
    $.ajax({
      url: "/class-delete",
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
});
