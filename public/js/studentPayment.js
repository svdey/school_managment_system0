$(document).ready(function(){
  $(document).on("click", ".btn_submit", function () {
       var name = $("#name").val();
       var id = $("#myid").val();
       var myclass = $("#class").val();
       var section = $("#section").val();
       var totalfee = $("#totalfee").val();
       var paymentMethod = $("#paymentMethod").val();
       var status = $("#status").val();
       var date = $("#date").val();
       var data = {
         name: name,
         id: id,
         myclass: myclass,
         section: section,
         totalfee: totalfee,
         paymentMethod: paymentMethod,
         status: status,
         date: date
       };
       console.log("data-->",data)
       $.ajax({
         url: "/student-payment",
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
});