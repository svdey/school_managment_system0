$(document).on("click", ".btn_submit", function () {
     var subjectname = $("#subjectname").val();
     var subjecttype = $("#subjecttype").val();
     var subjectclass = $("#subjectclass").val();
     var subjectcode = $("#subjectcode").val();
     var data = {
       subjectname: subjectname,
       subjecttype: subjecttype,
       subjectclass: subjectclass,
       subjectcode: subjectcode
     };
     console.log("data-->",data)
     $.ajax({
       url: "/classRoutine",
       type: "POST",
       data: data,
       success: function (res) {
         if (res.success) {
           alert(res.success);
           window.location.reload()
         } else if (res.error) {
           alert(res.error);
           window.location.reload();
         }
       },
     });
   });