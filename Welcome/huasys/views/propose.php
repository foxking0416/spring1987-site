<?php include('incl/header.php'); ?>

        <div class="row wrapper border-bottom white-bg page-heading">
            <div class="col-sm-4">
                <h2>新增提案</h2>
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
                        <div class="col-lg-6 form-inline-labeltight">
                          <p><label>工地名稱</label></p>
						  <!--
                          <select class="form-control" name="wkeyid" id="wkeyid">
                            <option value="0">請選擇工地</option>
                            <  =show_option_sites($permission, $uid);?>   value="<?=$wname?>"
                          </select>-->
						  <input class="form-control" id="wname1"  readonly="readonly">
                        </div>
                      </div>

                      <div class="form-group">
                        <div class="col-lg-12 form-inline-labeltight">
                          <p><label>主旨</label></p>
                          <select class="form-control" id="subtext">
                            <option value="0">請選擇主旨</option>
                            <?=show_select_option_subjects();?><!-- 查看functions.php -->
                          </select>
                        </div>
                        <div class="col-lg-12">
                          <input class="form-control" type="text" name="subject" id="subject" style="margin-bottom:20px">
                        </div>
                      </div>

                      <div class="form-group">
                        <div class="col-lg-12 form-inline-labeltight">
                          <p><label>說明</label></p>
                          <textarea class="form-control" rows="12" name="detail"></textarea>
                        </div>
                      </div>

                      <div class="form-group">
                        <div class="col-lg-6 form-inline-labeltight">
                          <p><label>提案人</label></p>
                          <select class="form-control" name="p_uid" id="p_uid">
                            <option value="0">請選擇</option>
                            <?=show_select_option_users($permission,$uid);?>
                          </select>
                        </div>
                        <div class="col-lg-6 form-inline-labeltight">
                          <p><label>或輸入</label></p>
                          <input type="text" name="p_name" id="p_name" class="form-control">
                        </div>
                      </div>

                      <div class="form-group">
                        <div class="col-lg-6 form-inline-labeltight">
                          <p><label>提案日期</label></p> 
                          <div class="input-group date">                          
                            <span class="input-group-addon"><i class="fa fa-calendar"></i></span>
                            <input type="text" class="form-control" name="pdate" size="12" value="<?=date('Y-m-d')?>">
                          </div>
                        </div>
                      </div>

                      <div class="form-group">
                        <div class="col-lg-4 form-inline-labeltight">
                          <p><label>急迫性</label></p>
                          <select class="form-control subscore" name="urgency" id="urgency">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                          </select>
                        </div>
                        <div class="col-lg-4 form-inline-labeltight">
                          <p><label>重要性</label></p>
                          <select class="form-control subscore" name="importance" id="importance">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                          </select>
                        </div>
                        <div class="col-lg-4 form-inline-labeltight">
                          <p><label>計分</label></p>
                          <input type="text" class="form-control" id="score" readonly="readonly" value="1">
                        </div>
                      </div>

                      <input type="hidden" name="add_date" value="<?=date("Y-m-d")?>">  

                      <div>
                          <button class="btn btn-sm btn-primary m-t-n-xs" type="submit"><strong>儲存提案</strong></button>
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
<script>
$(document).ready(function(){

  //$('#wname1').value = '123';
  document.getElementById("wname1").value = '123';//window.sessionStorage["SiteSelection"];
	
  //計分功能
  $('.subscore').change(function() {
    var score = Number($('#urgency').val()) * Number($('#importance').val());
    $('#score').val(score);
  });

  //主旨
  $('#subtext').change(function() {
    var subject = $('#subtext').val();
    $('#subject').val(subject);
  });

  //提案人
  $('#p_uid').change(function() {
    var value = $('#p_uid').val();
    if (value != 0) {
      $('#p_name').val('');
      $('#p_name').prop('readonly', true);
    } else {
      $('#p_name').prop('readonly', false);
    }
  });

  //取消按鈕
  $('#cancel-btn').click(function(){
    location.href="proposals.php";
  });

});

//form validate
$(document).ready(function(){

     $("#form").validate({
         rules: {
             detail: {
                 required: true
             }
         },
         submitHandler: function (form, event) {
              var correct = 1;
              var wkeyid = $('#wkeyid').val();
              var subject = $('#subject').val();
              var p_uid = $('#p_uid').val();
              var p_name = $('#p_name').val();
              
              if (wkeyid == 0) {
                $('#wkeyid').addClass("error");
                $('#wkeyid').after('<label class="error">請選擇工地</label>');
                correct = 0;
              }
              if (subject == 0) {
                $('#subject').addClass("error");
                $('#subject').after('<label class="error">請選擇主旨</label>');
                correct = 0;
              }
              if (p_uid == 0 && p_name == "") {
                $('#p_uid').addClass("error");
                $('#p_uid').after('<label class="error">請輸入提案人</label>');
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
