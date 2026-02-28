<?php include('incl/header.php'); ?>

        <div class="row wrapper border-bottom white-bg page-heading">
            <div class="col-sm-4">
                <h2><?=$pagetitle?></h2>
            </div>
        </div>

<!--proposals list -->

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
                            <?php if ($is_monitor[$key] == 1) {
                            		$proposer_string = "<td colspan='2'>擔當者: $r_names[$key]</td><td></td>";
                            		$complete_string = "完成日";
                                $button_raw = 7;
                                $number_raw = 4;
                            	  } else {
                            	  	$proposer_string = "";
                            	  	$complete_string = "-";
                                  $button_raw = 6;
                                  $number_raw = 3;
                            	  }
                            ?>	
                            <table class="table table-bordered proposal-table" style="font-size:14px" data-pid="<?=$pid?>">
                              <tbody class="proposal-row">
                                <tr>
                                  <td class="text-center" style="width:10%">工程編號</td><td colspan='2'>提案單位: <?=$proposers[$key]?></td><td class="text-center" style="width:10%">提案日</td><td rowspan="<?=$button_raw?>" style="width:1%;vertical-align:middle"><button type="button" class="btn btn-success view_btn">檢視</button></td>
                                </tr>
                                <tr>
                                  <td class="text-center">序號</td><td colspan="2">主旨: <?=$subjects[$key]?></td><td class="text-center"><?=$pdates[$key]?></td>
                                </tr>
                                <tr>
                                  <td class="text-center">總號</td><td colspan="2" rowspan="2"><div class="td-detail">說明: <BR><?=nl2br($details[$key])?></div></td><td class="text-center">決議日</td>
                                </tr>
                                <tr>
                                  <td rowspan="<?=$number_raw?>" class="text-center"><span class="text-border"><?=$wnums[$key]?></span><span class="text-border_twin_up"><?=($key+1)?></span><span class="text-border_twin_down"><?=$wpids[$key]?></span></td><td class="text-center"><?=$ddates[$key]?></td>
                                </tr>
                                <tr>
                                  <td colspan="2" rowspan="2"><div class="td-detail">決議內容: <BR><?=nl2br($decisions[$key])?></div></td>
                                  <td class="text-center"><?=$complete_string?></td>
                                </tr>
                                <tr>
                                  <td class="text-center"><?=$cdates[$key]?></td>
                                </tr>
                                <tr>
                                  <?=$proposer_string?>
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
<script>
$(document).ready(function(){
  //pager
  $('.pager').change(function() {
    var newpage = $(this).val();
    location.href='<?=$thispagename?>&page='+newpage;
  });

  //view btn
  $('.view_btn').click(function() {
    var pid = $(this).closest('.proposal-table').data('pid');
    console.log(pid);
    location.href = "archiveproposal.php?pid="+pid;
  });

});
</script>
