$(document).ready(function () {

  $(document).on("click", ".btn_delete", function () {
    var check = confirm("Are you sure want to delete this record?");
    if (!check) {
      return;
    }
    var id = $(this).val();
    console.log("id--->", id);
    $.ajax({
      url: "/expense-delete",
      type: "POST",
      data: {
        id: id
      },
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