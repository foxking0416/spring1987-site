<?php include('incl/header.php'); ?>

        <div class="row wrapper border-bottom white-bg page-heading">
            <div class="col-sm-4">
                <h2>尚未決議提案列表</h2>
            </div>
        </div>

<!--inquiry list -->

     <div class="row">
        <div class="col-lg-12">
            <div class="wrapper wrapper-content animated fadeInUp">

                <div class="ibox">
                    <div class="ibox-title" style="height:55px;padding:10px 15px 7px">
                        <div style="display:inline-block">
                          <form class="form-inline" role="form" method="post" style="display:inline-block" action="">
                              <div class="form-group">
                                <select class="form-control" name="query">
                                  <option value="0">請選擇工地</option>
                                  <?=show_option_sites($permission, $uid);?>
                                </select>
                              </div>
                              <button type="submit" class="btn btn-primary btn-outline"><i class="fa fa-search"></i> Search</button>
                          </form>
                        </div>
                    </div>
                    <!-- end ibox title -->

                    <div class="ibox-content">

                        <div class="proposal-list" style="padding-bottom:40px">

                            <?php include("incl/pager.php") ?>

                            
                            <!-- main table -->
                            <?php foreach ($pids as $key => $pid): ?>
                            <table class="table table-bordered proposal-table" style="font-size:14px" data-pid="<?=$pid?>">

                              <tbody class="proposal-row">
                                <tr>
                                  <td class="text-center" style="width:10%">工程編號</td><td colspan="2">提案單位: <?=$proposers[$key]?></td><td class="text-center" style="width:10%">提案日期</td><td rowspan="6" style="width:1%;vertical-align:middle"><button type="button" class="btn btn-primary decide_btn"> 決議 </button><?=$del_btn?></td>
                                </tr>
                                <tr>
                                  <td class="text-center">序號</td><td colspan="2">主旨: <?=$subjects[$key]?></td><td rowspan="5" style="vertical-align: middle;"><?=$pdates[$key]?></td>
                                </tr>
                                <tr>
                                  <td class="text-center">總號</td><td colspan="2" rowspan="4"><div class="td-detail">說明:<BR><?=nl2br($details[$key])?> </div></td>
                                </tr>
                                <tr>
                                  <td rowspan="3" class="text-center"><span class="text-border"><?=$wnums[$key]?></span><span class="text-border_twin_up"><?=($key+1)?></span><span class="text-border_twin_down"><?=$wpids[$key]?></span></td>
                                </tr>
                                <tr>
                                  
                                </tr>
                                <tr>
                                  
                                </tr>
                              </tbody>
                            </table>
                            <?php endforeach; ?>
                            <!-- end main table -->

                            <?php include("incl/pager.php") ?>

                        </div><!-- end project list -->
                    </div><!-- end ibox content -->
                </div><!-- end ibox -->
            </div>
        </div>
    </div><!-- end row -->
<!--end  -->



<?php include('incl/footer.php'); ?>
<!-- Data picker -->
<script src="js/plugins/datapicker/bootstrap-datepicker.js"></script>
<script>
$(document).ready(function(){
  //pager
  $('.pager').change(function() {
    var newpage = $(this).val();
    location.href='proposals.php?page='+newpage;
  });

  //decide btn
  $('.decide_btn').click(function() {
    var pid = $(this).closest('.proposal-table').data('pid');
    console.log(pid);
    location.href = "decision.php?pid="+pid;
  });

  //del btn
  $('.del_btn').click(function() {
    var pid = $(this).closest('.proposal-table').data('pid');
    console.log(pid);
    var tr = $(this).closest('.proposal-table');
   
    bootbox.confirm("確定要刪除提案嗎?", function(result) {
      $('#mainbody').removeAttr( 'style' );
      if (result) { 
        console.log("ok");
        
        $.ajax({async: false, url: 'ajaxact.php?val=9&pid='+pid,
             success: function(output) {
                      //alert(output);
                      location.href="proposals.php?msgnum=7";
                      /*
                      console.log(output);
                      toastr.success("提案刪除成功!");
                      tr.fadeOut(400, function(){
                            tr.remove();
                        });
                      */
                   },
             error: function (xhr, ajaxOptions, thrownError) {
                     alert(xhr.status + " "+ thrownError);
        }});
        
    } else { console.log("no") }
    });
  });

});
</script>
