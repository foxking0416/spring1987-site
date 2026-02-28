<?php include('incl/header.php'); ?>

        <div class="row wrapper border-bottom white-bg page-heading">
            <div class="col-sm-4">
                <h2>管制中提案列表</h2>
            </div>
        </div>

<!--inquiry list -->

     <div class="row">
        <div class="col-lg-12">
            <div class="wrapper wrapper-content animated fadeInUp">

                <div class="ibox">
                    <div class="ibox-title" style="height:55px;padding:10px 15px 7px">
                        <div style="display:inline-block">
                          <form class="form-inline" role="form" method="post" style="display:inline-block" action="<?=$thispagename?>">
                              <div class="form-group">
                                <select class="form-control" name="query">
                                  <option value="0">請選擇工地</option>
                                  <?=show_option_sites($permission, $uid);?>
                                </select>
                              </div>
                              <button type="submit" class="btn btn-primary btn-outline"><i class="fa fa-search"></i> Search</button>
                          </form>
                        </div>

                        <div class="ibox-tools">
                          <form class="form-inline" role="form" method="post" style="display:inline-block">
                            <a href="<?=$thispagename?>" class="btn btn-success">檢視所有</a>
                            <a href="<?=$thispagename?>&self_p" class="btn btn-success">檢視個人提案</a>
                            <a href="<?=$thispagename?>&self_r" class="btn btn-success">檢視個人負責</a>
                            <a href="<?=$orderlink?>&order" class="btn btn-success btn-outline">按完成期限排序</a>
                          </form>
                            <!--<a href="inquirynew.php" class="btn btn-primary btn-xs" id="id3" data-toggle="tooltip" data-placement="right" title="fgfdg"><i class="glyphicon glyphicon-plus"></i> New Inquiry</a> -->
                        </div>
                    </div>
                    <!-- end ibox title -->

                    <div class="ibox-content">

                        <div class="proposal-list" style="padding-bottom:40px">

                            <?php if ( ! empty($pids)) include("incl/pager.php"); ?>

                            
                            <!-- main table -->
                            <?php foreach ($pids as $key => $pid): ?>
                              <?php $progress_icon = '<i class="fa fa-minus"></i>';?>
                              <?php if ($progress[$key] == 4) $progress_icon = '<i class="fa fa-circle-o"></i>';?>
                              <?php if ($progress[$key] == 2) $progress_icon = '<i class="fa fa-minus"></i>';?>
                              <?php if ($progress[$key] == 1) $progress_icon = '<i class="fa fa-chevron-up"></i>';?>
                              <?php if ($progress[$key] == 3) $progress_icon = '<i class="fa fa-chevron-down"></i>';?>
                            <table class="table table-bordered proposal-table" style="font-size:14px" data-pid="<?=$pid?>">
                              <tbody class="proposal-row">
                                <tr>
                                  <td class="text-center" style="width:10%">工程編號</td><td colspan="2">提案單位: <?=$proposers[$key]?></td><td class="text-center" style="width:10%">提案日</td><td class="text-center" style="width:15%">進度管制</td><td rowspan="9" style="width:1%;vertical-align:middle"><button type="button" class="btn btn-primary edit_btn">編輯提案</button><button type="button" class="btn btn-danger demonitor_btn">解除列管</button></td>
                                </tr>
                                <tr>
                                  <td class="text-center">序號</td><td colspan="2">主旨: <?=$subjects[$key]?></td><td class="text-center"><?=$pdates[$key]?></td><td rowspan="8" style="vertical-align: middle;text-align: center;font-size: 90px;color: rgb(202, 202, 202);"><?=$progress_icon?></td>
                                </tr>
                                <tr>
                                  <td class="text-center">總號</td><td colspan="2" rowspan="2"><div class="td-detail">說明: <BR><?=nl2br($details[$key])?></div></td><td class="text-center">決議日</td>
                                </tr>
                                <tr>
                                  <td rowspan="6" class="text-center" style="vertical-align:middle"><span class="text-border"><?=$wnums[$key]?></span><span class="text-border_twin_up"><?=($key+1)?></span><span class="text-border_twin_down"><?=$wpids[$key]?></span></td><td class="text-center"><?=$ddates[$key]?></td>
                                </tr>
                                <tr>
                                  <td colspan="2" rowspan="2"><div class="td-detail">決議內容: <BR><?=nl2br($decisions[$key])?></div></td>
                                  <td class="text-center">完成期限</td>
                                </tr>
                                <tr>
                                  <td class="text-center"><?=$exp_dates[$key]?></td>
                                </tr>
                                <tr>
                                  <td colspan="2" rowspan="2"><div class="td-detail">現況: <BR><?=nl2br($status[$key])?></div></td>
                                  <td class="text-center">完成日</td>
                                </tr>
                                <tr>
                                  <td class="text-center"><?=$cdates[$key]?></td>
                                </tr>
                                <tr>
                                  <td colspan="2">擔當者: <?=$r_names[$key]?></td>
                                  <td class="text-center"></td>
                                </tr>

                              </tbody>
                            </table>
                            <?php endforeach ?>
                            <!-- end main table -->

                            <?php if ( ! empty($pids)) include("incl/pager.php"); ?>

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
    location.href='<?=$thispagename?>&page='+newpage;
  });

  //edit btn
  $('.edit_btn').click(function() {
    var pid = $(this).closest('.proposal-table').data('pid');
    console.log(pid);
    location.href = "decisionedit.php?pid="+pid;
  });

  //del btn
  $('.demonitor_btn').click(function() {
    var pid = $(this).closest('.proposal-table').data('pid');
    console.log(pid);
    var tr = $(this).closest('.proposal-table');
   
    bootbox.confirm("確定要解除列管嗎?", function(result) {
      $('#mainbody').removeAttr( 'style' );
      if (result) { 
        console.log("ok");
        
        $.ajax({async: false, url: 'ajaxact.php?val=10&pid='+pid,
             success: function(output) {
                      location.href="monitors.php?msgnum=9";
                      //alert(output);
                      /*
                      console.log(output);
                      toastr.success("解除列管成功!");
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
