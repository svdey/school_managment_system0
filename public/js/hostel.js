$(document).ready(function(){
    $('#mytable').DataTable( {
        autoFill: true
    } );
    $(document).on("click", "#submit", function () {
      // console.log("btn clcik");
            var hname = $("#name").val();
            var rnumber = $("#number").val();
            var rtype = $("#type").val();
            var bednumber = $("#bed").val();
            var bedcost = $("#cost").val();
            
            var data = {
                hname: hname,
                rnumber: rnumber,
                rtype: rtype,
                bednumber: bednumber,
                bedcost: bedcost,
            };
            $.ajax({
              url:"/hostel-data",
              type:"POST",
              data:data,
              success:function(res){
                if(res.success){
                    alert(res.success)
                    // console.log(res.success)
                    window.location.href = window.location.pathname.split("/")[0] + "hostel";
                }if(res.error){
                    alert(res.error)
                // console.log(res.error);
                window.location.reload();
              }
              }
            })
            console.log(data);
          });
          $('.reset-btn').click(function(){
            $('#myForm')[0].reset();
        });
        $(document).on("click", ".btn_delete", function () {
          var check = confirm("Are you sure want to delete this record?");
          if (!check) {
              return;
          }
          var id = $(this).val();
          // console.log("id--->", id);
          $.ajax({
              url: "/hostel-delete",
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
    $(document).on("click", ".btn_edit", function () {
        console.log("edit button click");
        var id = $(this).val();
        $(this)
            .removeClass("btn_edit fa-pencil-square-o ")
            .addClass("btn_update fa-check")
        var hname = $(this).closest("tr").find(".hname").text().trim();
        // console.log("hname-->",hname);
        $(this)
            .closest("tr")
            .find(".hname")
            .html("<input type='text' class='txt txt_hname' value='" + hname + "' />");
        var rnumber = $(this).closest("tr").find(".rnumber").text().trim();
        $(this)
            .closest("tr")
            .find(".rnumber")
            .html("<input type='text' class='txt txt_rnumber' value='" + rnumber + "' />");
        var rtype = $(this).closest("tr").find(".rtype").text().trim();
        $(this)
            .closest("tr")
            .find(".rtype")
            .html(
                "<input type='text' class='txt txt_rtype' value='" + rtype + "' />"
            );
        var bednumber = $(this).closest("tr").find(".bednumber").text().trim();
        $(this)
            .closest("tr")
            .find(".bednumber")
            .html(
                "<input type='text' class='txt txt_bednumber' value='" +
                bednumber +
                "' />"
            );
        var bedcost = $(this).closest("tr").find(".bedcost").text().trim();
        $(this)
            .closest("tr")
            .find(".bedcost")
            .html(
                "<input type='text' class='txt txt_bedcost' value='" +
                bedcost +
                "' />"
            );
    });
    $(document).on("click", ".btn_update", function () {
        var id = $(this).val();
        var hname = $(".txt_hname").val();
        var rnumber = $(".txt_rnumber").val();
        var rtype = $(".txt_rtype").val();
        var bednumber = $(".txt_bednumber").val();
        var bedcost = $(".txt_bedcost").val();
        // console.log("update clicked")
        var data = {
            id: id,
            hname: hname,
            rnumber: rnumber,
            rtype: rtype,
            bednumber: bednumber,
            bedcost: bedcost,
        };
        // console.log("data---->", data);
        $.ajax({
            url: "/hostel-update",
            type: "POST",
            data: data,
            success: function (res) {
                if (res.success) {
                    alert(res.success);
                    window.location.href =
                        window.location.pathname.split("/")[0] + "hostel";
                } else if (res.error) {
                    alert(res.error);
                    window.location.reload();
                }
            },
        });
    });

    