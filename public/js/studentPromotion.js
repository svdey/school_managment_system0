$(document).ready( function () {
    $('#tblallStudent').DataTable();
} );
$(document).ready(function () {
    $(document).on("click", ".btn_save", function () {
      console.log("btn_clcik");
      var current_session = $("#promotiontosession").val();
      var promotiontosession = $("#promotiontosession").val();
      var promotionfromsession = $("#promotionfromsession").val();
      var promotionsession = $("#promotionsession").val();

      var data = {
        current_session: current_session,
        promotiontosession:  promotiontosession,
        promotionfromsession:promotionfromsession,
        promotionsession: promotionsession,
      };
$.ajax({
    url: "/studentPromotion-data",
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
});
