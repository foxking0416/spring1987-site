<?php include('incl/header.php'); ?><link href="css/plugins/iCheck/custom.css" rel="stylesheet">

        <div class="row wrapper border-bottom white-bg page-heading">
            <div class="col-sm-4">
                <h2>編輯管制中提案</h2>
            </div>
        </div>

<!--inquiry list -->

    <div class="row">
        <div class="col-lg-8 col-lg-offset-2">
            <div class="wrapper wrapper-content animated fadeInUp">
              <form role="form" id="form" action="" method="post" class="form-horizontal form-inline-tight">
                <div class="ibox">
                    <div class="ibox-content">

                      <div class="form-group">
                        <div class="col-md-6 form-inline-labeltight">
                          <p><label>工地名稱</label></p>
                          <input class="form-control" name="wname" value="<?=$wname?>" readonly="readonly">
                        </div>
                      </div>

                      <div class="form-group">
                        <div class="col-md-12 form-inline-labeltight">
                          <p><label>主旨</label></p>
                          <input class="form-control" name="subject" value="<?=$subject?>" readonly="readonly">
                        </div>
                      </div>

                      <div class="form-group">
                        <div class="col-md-12 form-inline-labeltight">
                          <p><label>說明</label></p>
                          <div style="padding:6px 12px;border:1px solid #e5e6e7"><?=$detail?></div>
                        </div>
                      </div>

                      <div class="form-group">
                        <div class="col-md-6 form-inline-labeltight">
                          <p><label>提案人</label></p>
                          <input class="form-control" name="proposer" value="<?=$proposer?>" readonly="readonly">
                        </div>
                        <div class="col-md-6 form-inline-labeltight">
                          <p><label>提案日期</label></p> 
                          <input class="form-control" name="pdate" value="<?=$pdate?>" readonly="readonly">
                        </div>
                      </div>

                      <div class="form-group">
                        <div class="col-md-2 form-inline-labeltight">
                          <p><label>急迫性</label></p>
                          <input class="form-control" id="urgency" value="<?=$urgency?>" readonly="readonly">
                        </div>
                        <div class="col-md-2 form-inline-labeltight">
                          <p><label>重要性</label></p>
                          <input class="form-control" id="importance" value="<?=$importance?>" readonly="readonly">
                        </div>
                        <div class="col-md-2 form-inline-labeltight">
                          <p><label>計分</label></p>
                          <input type="text" class="form-control" id="score" readonly="readonly" value="">
                        </div>
                        <div class="col-md-6 form-inline-labeltight">
                          <p><label>決議日期</label></p>
                          <input type="text" class="form-control" name="ddate" size="12" value="<?=$ddate?>" readonly="readonly">
                        </div>
                      </div>

                      <div class="form-group">
                        
                        <div class="col-md-6 form-inline-labeltight">
                          <p><label>擔當者</label></p>
                          <input type="text" class="form-control" name="r_name" value="<?=$r_name?>" readonly="readonly">
                          <!--
                          <select class="form-control" name="r_uid" id="r_uid">
                            <option value="0">請選擇</option>
                            <?=show_select_option_users($permission,$uid,$r_uid);?>
                          </select>
                          -->
                        </div>
                        <div class="col-md-6 form-inline-labeltight">
                          <p><label>預計完成日期</label></p> 
                          <div class="input-group date">                          
                            <span class="input-group-addon"><i class="fa fa-calendar"></i></span>
                            <input type="text" class="form-control" name="exp_date" size="12" value="<?=$exp_date?>">
                          </div>
                        </div>
                      </div>

                      <div class="form-group">
                        <div class="col-md-6 form-inline-labeltight">
                          <p><label>進度管制</label></p> 
                          <select class="form-control" name="progress" id="progress">
                            <option value="1">超前</option>
                            <option value="3">落後</option>
                            <option value="2">準時</option>
                            <option value="4">完成</option>
                          </select>
                        </div>
						
                        <div class="col-md-6 form-inline-labeltight" >
                          <p><label>完成日期</label></p> 
                          <div class="input-group date">                          
                            <span class="input-group-addon"><i class="fa fa-calendar"></i></span>
                            <input type="text" class="form-control" name="cdate" size="12" value="<?=$cdate?>">
							
                          </div>
                        </div>
					
                      </div>

<!--
                      
-->
                      <div class="form-group">
                        <div class="col-md-12 form-inline-labeltight">
                          <p><label>決議內容</label></p>
                          <div style="padding:6px 12px;border:1px solid #e5e6e7"><?=$decision?></div>
                        </div>
                      </div>

                      <div class="form-group">
                        <div class="col-md-12 form-inline-labeltight">
                          <p><label>現況</label></p>
                          <textarea class="form-control" rows="10" name="status"><?=$status?></textarea>
                        </div>
                      </div>

                      

                      <input type="hidden" name="d_recorddate" value="<?=date("Y-m-d")?>"> 
                      <input type="hidden" name="pid" value="<?=$pid?>">
                      <input type="hidden" name="wkeyid" value="<?=$wkeyid?>">
                      <input type="hidden" name="decision_recorder" value="<?=$uid?>">
                      <input type="hidden" name="is_monitor" id="is_monitor"> 

                      <div style="margin-top:25px">
                          <button class="btn btn-sm btn-primary m-t-n-xs" type="submit"><strong>儲存決議</strong></button>
                          <button class="btn btn-sm btn-danger m-t-n-xs" type="button" id="cancel-btn" style="float:right"><strong>取消</strong></button>
                      </div>

                    </div><!-- end ibox content -->
                </div><!-- end ibox -->
              </form>
            </div>
        </div>
    </div><!-- end row -->
<!--end  -->



<?php include('incl/footer.php'); ?>
<!-- Data picker -->
<script src="js/plugins/datapicker/bootstrap-datepicker.js"></script>
<!-- iCheck -->
<script src="js/plugins/iCheck/icheck.min.js"></script>
<script>
    $(document).ready(function () {
        $('.i-checks').iCheck({
            checkboxClass: 'icheckbox_square-green',
            radioClass: 'iradio_square-green',
        });

        $('.i-checks').on('ifChecked', function(event){
          $("#is_monitor").val('yes');
        });
        $('.i-checks').on('ifUnchecked', function(event){
          $("#is_monitor").val('');
        });

       //取消按鈕
        $('#cancel-btn').click(function(){
          location.href="monitors.php";
        });

        $('#progress').val('<?=$progress?>');

        <?php if ($progress != 4): ?>  
        $('#complete_date_div').hide();
        <?php endif ?>
        
        $('#progress').change(function() {
          if ($(this).val() == 4) {
            $('#complete_date_div').show();
          } else {
            $('#complete_date_div').hide();
          }
        });
    });
</script>
<script>
//form validate
$(document).ready(function(){

  var score = Number($('#urgency').val()) * Number($('#importance').val());
  $('#score').val(score);

     $("#form").validate({
         rules: {
             detail: {
                 required: true
             }
         },
         submitHandler: function (form, event) {
              var correct = 1;
              var is_monitor = $('#is_monitor').val();
              var r_uid = $('#r_uid').val();
              
              if (is_monitor == "yes" && r_uid == 0) {
                $('#r_uid').addClass("error");
                $('#r_uid').after('<label class="error">請選擇擔當者</label>');
                correct = 0;
              }

              if (correct == 1) {
                form.submit();
              }

              
         }
     });
});

//bind datepicker
jQuery(function($){
  $('.input-group.date').datepicker({
          format: "yyyy-mm-dd",
          todayBtn: "linked",
          keyboardNavigation: false,
          forceParse: false,
          calendarWeeks: true,
          autoclose: true,
          todayHighlight: true
  });
});
</script>
