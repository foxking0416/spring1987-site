<?php include('incl/header.php'); ?>

        <div class="row wrapper border-bottom white-bg page-heading">
            <div class="col-sm-4">
                <h2>編輯使用者資料</h2>
            </div>
        </div>



     <div class="row">
        <div class="col-md-6 col-md-offset-3">
        <form role="form" id="form" action="useradd.php" method="post">
            <div class="wrapper wrapper-content animated fadeInUp">

                <div class="ibox">
                    
                    
                    <div class="ibox-content">
                      <div class="form-group"><label>使用者帳號</label> <input type="text" class="form-control" id="user_name" name="user_name" value="<?php echo $user_name ?>"></div>
                      <div class="form-group"><label>使用者姓名</label> <input type="text" class="form-control" name="name" value="<?php echo $name ?>"></div>
                      <div class="form-group"><label>使用者群組</label> 
                        <select name="user_group" class="form-control m-b">
                            <option value="9" <?php echo $sa?>>管理者</option>
                            <option value="7" <?php echo $sb?>>職員</option>
                          </select>
                      </div>
                      <input type="hidden" name="stop" value="yes">
                      <div class="form-group"><label>設定新密碼</label> <input type="text" class="form-control" name="newpass" ></div>

                      <input type="hidden"  name="edit">
                      <input type="hidden"  name="keyid" value="<?php echo $user_id ?>">
                      <input type="hidden"  name="ousername" value="<?php echo $user_name ?>" id="ousername">

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
             name: {
                 required: true
             }
         },
         submitHandler: function (form, event) {
              var sim = 5;
              var xyz = $('#user_name').val();
              var ousername = $("#ousername").val();

              $.ajax({async: false, url: 'ajaxact.php?val=8&username='+xyz,
                     success: function(output) {
                            console.log(output);
                            if (output < 1 && xyz != ousername) {
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