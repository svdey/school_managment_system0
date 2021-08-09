$(document).ready(function () {
  $('#tblTeacher').DataTable( {
    autoFill: true
});
  $(document).on("click", ".btn_save", function () {
    //console.log("btn clcik");
    var firstName = $("#firstname").val();
    var lastName = $("#lastname").val();
    var gender = $("#gender").val();
    var religion = $("#religion").val();
    var dateofbirth = $("#dateofbirth").val();
    var email = $("#email").val();
    var sclass = $("#sclass").val();
    var idno = $("#idno").val();
    var phone = $("#phone").val();
    var section = $("#section").val();
    var subject = $("#subject").val();
    var address = $("#address").val();

    var data = {
      firstName: firstName,
      lastName: lastName,
      gender: gender,
      religion: religion,
      dateofbirth: dateofbirth,
      email: email,
      sclass: sclass,
      idno: idno,
      phone: phone,
      section: section,
      subject: subject,
      address: address,
    };
    $.ajax({
      url: "teacher-add",
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
    //console.log(data);
  });

  $(document).on("click", ".btn_delete", function () {
    var check = confirm("Are you sure want to delete this record?");
    if (!check) {
        return;
    }
    var id = $(this).val();
    console.log("id--->", id);
    $.ajax({
        url: "/teacher-delete",
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
  $(document).on("click", ".btn_edit", function () {
    console.log("edit button click");
    var id = $(this).val();
    $(this)
        .removeClass("btn_edit fa-pencil-square-o ")
        .addClass("btn_update fa-check")
    var firstName = $(this).closest("tr").find(".firstName").text().trim();
    console.log("firstName-->",firstName);
    $(this)
        .closest("tr")
        .find(".firstName")
        .html("<input type='text' class='txt txt_firstName' value='" + firstName + "' />");
    
    var gender = $(this).closest("tr").find(".gender").text().trim();
    $(this)
        .closest("tr")
        .find(".gender")
        .html(
            "<input type='text' class='txt txt_gender' value='" + gender + "' />"
        );
    var religion = $(this).closest("tr").find(".religion").text().trim();
    $(this)
        .closest("tr")
        .find(".religion")
        .html(
            "<input type='text' class='txt txt_religion' value='" +
            religion +
            "' />"
        );
    var dateofbirth = $(this).closest("tr").find(".dateofbirth").text().trim();
    $(this)
        .closest("tr")
        .find(".dateofbirth")
        .html(
            "<input type='text' class='txt txt_dateofbirth' value='" +
            dateofbirth +
            "' />"
        );
        var email = $(this).closest("tr").find(".email").text().trim();
    $(this)
        .closest("tr")
        .find(".email")
        .html(
            "<input type='text' class='txt txt_email' value='" +
            email +
            "' />"
        );
        var sclass = $(this).closest("tr").find(".sclass").text().trim();
    $(this)
        .closest("tr")
        .find(".sclass")
        .html(
            "<input type='text' class='txt txt_sclass' value='" +
            sclass +
            "' />"
        );
        var idno = $(this).closest("tr").find(".idno").text().trim();
    $(this)
        .closest("tr")
        .find(".idno")
        .html(
            "<input type='text' class='txt txt_idno' value='" +
            idno +
            "' />"
        );
        var phone = $(this).closest("tr").find(".phone").text().trim();
    $(this)
        .closest("tr")
        .find(".phone")
        .html(
            "<input type='text' class='txt txt_phone' value='" +
            phone +
            "' />"
        );
        var section = $(this).closest("tr").find(".section").text().trim();
    $(this)
        .closest("tr")
        .find(".section")
        .html(
            "<input type='text' class='txt txt_section' value='" +
            section +
            "' />"
        );
        var subject = $(this).closest("tr").find(".subject").text().trim();
    $(this)
        .closest("tr")
        .find(".subject")
        .html(
            "<input type='text' class='txt txt_subject' value='" +
            subject +
            "' />"
        );
        var address = $(this).closest("tr").find(".address").text().trim();
    $(this)
        .closest("tr")
        .find(".address")
        .html(
            "<input type='text' class='txt txt_address' value='" +
            address +
            "' />"
        );
  });

  $(document).on("click", ".btn_update", function () {
    var id = $(this).val();
    var firstName = $(".txt_firstName").val();
    var gender = $(".txt_gender").val();
    var religion = $(".txt_religion").val();
    var dateofbirth = $(".txt_dateofbirth").val();
    var email = $(".txt_email").val();
    var sclass = $(".txt_sclass").val();
    var idno = $(".txt_idno").val();
    var phone = $(".txt_phone").val();
    var section = $(".txt_section").val();
    var subject = $(".txt_subject").val();
    var address = $(".txt_address").val();

    //console.log("update clicked")
    var data = {
        id: id,
        firstName: firstName,
        gender: gender,
        religion: religion,
        email: email,
        sclass: sclass,
        idno: idno,
        phone: phone,
        dateofbirth: dateofbirth,
        section: section,
        subject: subject,
        address: address,
    };
    // console.log("data---->", data);
    $.ajax({
        url: "/teacher-update",
        type: "POST",
        data: data,
        success: function (res) {
            if (res.success) {
                alert(res.success);
                window.location.href =
                    window.location.pathname.split("/")[0] + "allTeachers";
            } else if (res.error) {
                alert(res.error);
                window.location.reload();
            }
         },
       });
    });

});

