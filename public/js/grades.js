$(document).ready(function(){
    $('#mytable').DataTable( {
        autoFill: true
    } );
    $(document).on("click", "#submit", function () {
      // console.log("btn clcik");
            var gname = $("#name").val();
            var gpoint = $("#point").val();
            var pfromt = $("#pfrom").val();
            var pupto = $("#pupto").val();
            var comemnts = $("#Comemnts").val();
            
            var data = {
                gname: gname,
                gpoint: gpoint,
                pfromt: pfromt,
                pupto: pupto,
                comemnts: comemnts,
            };
            $.ajax({
              url:"/grades-data",
              type:"POST",
              data:data,
              success:function(res){
                if(res.success){
                    alert(res.success)
                    // console.log(res.success)
                    window.location.href = window.location.pathname.split("/")[0] + "examGrades";
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
              url: "/grades-delete",
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
        // console.log("edit button click");
        var id = $(this).val();
        $(this)
            .removeClass("btn_edit fa-pencil-square-o ")
            .addClass("btn_update fa-check")
        var gname = $(this).closest("tr").find(".gname").text().trim();
        // console.log("gname-->",gname);
        $(this)
            .closest("tr")
            .find(".gname")
            .html("<input type='text' class='txt txt_gname' value='" + gname + "' />");
        var gpoint = $(this).closest("tr").find(".gpoint").text().trim();
        $(this)
            .closest("tr")
            .find(".gpoint")
            .html("<input type='text' class='txt txt_gpoint' value='" + gpoint + "' />");
        var pfromt = $(this).closest("tr").find(".pfromt").text().trim();
        $(this)
            .closest("tr")
            .find(".pfromt")
            .html(
                "<input type='text' class='txt txt_pfromt' value='" + pfromt + "' />"
            );
        var pupto = $(this).closest("tr").find(".pupto").text().trim();
        $(this)
            .closest("tr")
            .find(".pupto")
            .html(
                "<input type='text' class='txt txt_pupto' value='" +
                pupto +
                "' />"
            );
        var comemnts = $(this).closest("tr").find(".comemnts").text().trim();
        $(this)
            .closest("tr")
            .find(".comemnts")
            .html(
                "<input type='text' class='txt txt_comemnts' value='" +
                comemnts +
                "' />"
            );
    });
    $(document).on("click", ".btn_update", function () {
        var id = $(this).val();
        var gname = $(".txt_gname").val();
        var gpoint = $(".txt_gpoint").val();
        var pfromt = $(".txt_pfromt").val();
        var pupto = $(".txt_pupto").val();
        var comemnts = $(".txt_comemnts").val();
        // console.log("update clicked")
        var data = {
            id: id,
            gname: gname,
            gpoint: gpoint,
            pfromt: pfromt,
            pupto: pupto,
            comemnts: comemnts,
        };
        // console.log("data---->", data);
        $.ajax({
            url: "/grades-update",
            type: "POST",
            data: data,
            success: function (res) {
                if (res.success) {
                    alert(res.success);
                    window.location.href =
                        window.location.pathname.split("/")[0] + "examGrades";
                } else if (res.error) {
                    alert(res.error);
                    window.location.reload();
                }
            },
        });
    });
    