<?php include('incl/header.php'); ?>
<?php require_once("incl/requires.php");?>
    <div class="row white-bg dashboard-header">
        <div class="wrapper wrapper-content animated fadeInRight">
            
                <div class="col-lg-12">
                    <div class="text-center m-t-lg">
                        <h1 style="margin-bottom:50px">
                            歡迎使用<?=SYSTEM_SHORT_NAME?>
							
                        </h1>
						
						<div style="display:inline-block">
                          <form class="form-inline" style="display:inline-block" >
                              <div class="form-group">
                                <select class="form-control" id="selectSites">
                                  <option value="0">請選擇工地</option>
                                  <?=show_option_sites($permission, $uid);?>
                                </select>
                              </div>
                              <button id= "btnChooseSite" type="button" class="btn btn-primary btn-outline"><i class="fa fa-check"></i> 選擇</button>
                          </form>
						   
                        </div>
						<input class="form-control" id="wname2" readonly="readonly">
                        <small>
                            
                        </small>
                    </div>
                </div>
        </div>
    </div>

<script>
$(document).ready(function(){

	document.getElementById("wname2").value = '123';
  //選擇按鈕
  /*$('#btnChooseSite').click(function(){
	var pid = $('#selectSites').val();
	document.getElementById("wname2").value = '111';
	window.sessionStorage.setItem('SiteSelection', '111');
  });*/
});
</script>


<?php include('incl/footer.php'); ?>     
<?php $e ="11"; ?>   
