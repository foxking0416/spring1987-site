<?php include('incl/header.php'); ?>

        <div class="row wrapper border-bottom white-bg page-heading">
            <div class="col-sm-4">
                <h2>新增使用者帳號</h2>
            </div>
        </div>



     <div class="row">
        <div class="col-md-6 col-md-offset-3">
        <form role="form" id="form" action="useradd.php" method="post">
            <div class="wrapper wrapper-content animated fadeInUp">

                <div class="ibox">
                    
                    
                    <div class="ibox-content">
                      <div class="form-group"><label>使用者帳號</label> <input type="text" class="form-control" name="user_name" id="user_name"></div>
                      <div class="form-group"><label>使用者姓名</label> <input type="text" class="form-control" name="name"></div>
                      <div class="form-group"><label>使用者密碼</label> <input type="text" class="form-control" name="user_password" ></div>
                      <div class="form-group"><label>使用者群組</label> 
                        <select name="user_group" class="form-control m-b">
                            <option value="9" >管理者</option>
                            <option value="7" selected="">職員</option>
                          </select>
                      </div>

                      <input type="hidden"  name="usernew">

                      <div style="margin-top:30px">
                          <button class="btn btn-sm btn-primary m-t-n-xs" type="submit"><strong> 儲存資料 </strong></button>
                      </div> 

                      

                    </div>
                </div>
            </div>
        </form>  
        </div>
    </div>






<?php include('incl/footer.php'); ?>        
<script>
$(document).ready(function(){

     
    $("#form").validate({
         rules: {
             user_name: {
                 required: true
             },
             user_password: {
                 required: true
             },
             name: {
                 required: true
             }
         },
         submitHandler: function (form, event) {
              var sim = 5;
              var xyz = $('#user_name').val();

              $.ajax({async: false, url: 'ajaxact.php?val=8&username='+xyz,
                     success: function(output) {
                            console.log(output);
                            if (output < 1) {
                              sim = sim -1;
                              $('#user_name').addClass("error");
                              $('#user_name').after('<label class="error">帳號重複</label>');
                            }
                           },
                     error: function (xhr, ajaxOptions, thrownError) {
                             alert(xhr.status + " "+ thrownError);
              }});


              if (sim == 5) {
                    console.log(sim);
                    form.submit();
              }
                        
         }
     }); 
});
</script>
 