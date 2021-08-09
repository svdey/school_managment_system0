$(document).ready(function () {
    $('#tblallStudent').DataTable( {} );
    // $(document).on("click", ".btn_add_student", function () {
    //     window.location.href=window.location.pathname.split("/")[0]+"/addmissionForm";
    // })
        $(document).on("click", ".btn_submit", function () {
        console.log("btn clcik");
        var std_name = $("#std_name").val();
        var lastname = $("#lastname").val();
        var class_study = $("#class_study").val();
        var section = $("#section").val();
        var dob = $("#dob").val();
        var roll = $("#roll").val();
        var add_no = $("#add_no").val();
        var religon = $("#religon").val();
        var gender = $("#gender").val();
        var email = $("#email").val();
        var father_name = $("#father_name").val();
        var mother_name = $("#mother_name").val();
        var father_occup = $("#father_occup").val();
        var mother_occup = $("#mother_occup").val();
        var mobile = $("#mobile").val();
        var nationality = $("#nationality").val();
        var address = $("#address").val();
        var permt_address = $("#permt_address").val();
        
        var data = {
            std_name: std_name,
            lastname: lastname,
            class_study: class_study,
            section: section,
            dob: dob,
            roll: roll,
            add_no: add_no,
            religon: religon,
            email: email,
            father_name: father_name,
            mother_name: mother_name,
            father_occup: father_occup,
            mother_occup: mother_occup,
            mobile: mobile,
            nationality: nationality,
            address: address,
            permt_address: permt_address,
            gender: gender
        };
        console.log(data);
        
        $.ajax({
            url: "/addmissionForm-add",
            type: "POST",
            data: {studentDetail:JSON.stringify(data)},
            success: function (res) {
                if (res.success) {
                    alert(res.success);
                    window.location.href=window.location.pathname.split("/")[0]+"/allStudent";
                } else if (res.error) {
                    alert(res.error);
                    window.location.reload();
                }
            },
        });
        // console.log(data);
    });
//  delete
   $(document).on("click", ".btn_delete", function () {
      var check = confirm("Are you sure want to delete this record?");
      if (!check) {
        return;
      }
      var id = $(this).val();
      console.log("id--->", id);

      $.ajax({
        url: "/student-delete",
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
    var std_name = $(this).closest("tr").find(".std_name").text().trim();
    console.log("std_name-->",std_name);
    $(this)
        .closest("tr")
        .find(".std_name")
        .html("<input type='text' class='txt txt_std_name' value='" + std_name + "' />");
    
    var gender = $(this).closest("tr").find(".gender").text().trim();
    $(this)
        .closest("tr")
        .find(".gender")
        .html(
            "<input type='text' class='txt txt_gender' value='" + gender + "' />"
        );
    var dob = $(this).closest("tr").find(".dob").text().trim();
    $(this)
        .closest("tr")
        .find(".dob")
        .html(
            "<input type='text' class='txt txt_dob' value='" +
            dob +
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
        var class_study = $(this).closest("tr").find(".class_study").text().trim();
    $(this)
        .closest("tr")
        .find(".class_study")
        .html(
            "<input type='text' class='txt txt_class_study' value='" +
            class_study +
            "' />"
        );
        var roll = $(this).closest("tr").find(".roll").text().trim();
    $(this)
        .closest("tr")
        .find(".roll")
        .html(
            "<input type='text' class='txt txt_roll' value='" +
            roll +
            "' />"
        );
        var mobile = $(this).closest("tr").find(".mobile").text().trim();
    $(this)
        .closest("tr")
        .find(".mobile")
        .html(
            "<input type='text' class='txt txt_mobile' value='" +
            mobile +
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
        var father_name = $(this).closest("tr").find(".father_name").text().trim();
    $(this)
        .closest("tr")
        .find(".father_name")
        .html(
            "<input type='text' class='txt txt_father_name' value='" +
            father_name +
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
    var std_name = $(".txt_std_name").val();
    var gender = $(".txt_gender").val();
    var father_name = $(".txt_father_name").val();
    var dob = $(".txt_dob").val();
    var email = $(".txt_email").val();
    var class_study = $(".txt_class_study").val();
    var roll = $(".txt_roll").val();
    var mobile = $(".txt_mobile").val();
    var section = $(".txt_section").val();
    var address = $(".txt_address").val();

    //console.log("update clicked")
    var data = {
        id: id,
        std_name: std_name,
        gender: gender,
        email: email,
        class_study: class_study,
        father_name: father_name,
        mobile: mobile,
        dob: dob,
        section: section,
        roll: roll,
        address: address,
    };
    // console.log("data---->", data);
    $.ajax({
        url: "/student-update",
        type: "POST",
        data: data,
        success: function (res) {
            if (res.success) {
                alert(res.success);
                window.location.href =
                    window.location.pathname.split("/")[0] + "AllStudent";
            } else if (res.error) {
                alert(res.error);
                window.location.reload();
            }
         },
       });
    });

});