 $(document).ready(function(){
  
  $(document).on("click", ".btn_submit", function () {
      var book = $("#bookName").val();
      var subject = $("#subjectName").val();
      var writer = $("#writerName").val();
      var myclass = $("#class").val();
      var year = $("#publishingYear").val();
      var date = $("#uploadDate").val();
      var id = $("#idNo").val();
      var data = {
        book: book,
        subject: subject,
        writer: writer,
        myclass: myclass,
        year: year,
        date: date,
        id: id
      };
      console.log("data-->",data)
      $.ajax({
        url: "/add_Expenses",
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
  
    $(document).on('click','.btn_delete',function(){
      var id=$(this).val();
      console.log(id)
      })
  });