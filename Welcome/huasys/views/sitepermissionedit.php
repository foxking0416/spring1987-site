<?php include('incl/header.php'); ?>

        <div class="row wrapper border-bottom white-bg page-heading">
            <div class="col-sm-12">
                <h2>可瀏覽 <?=$wname?>工地之使用者列表</h2>
            </div>
        </div>



     <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <div class="wrapper wrapper-content animated fadeInUp">

                <div class="ibox">
                    
                    <div class="ibox-title" style="height:55px;padding:10px 15px 7px">
                        <div style="display:inline-block">
                          <form class="form-inline" role="form" method="post" style="display:inline-block">
                              <div class="form-group">
                                <select class="form-control" name="uid">
                                    <option value="0">請選擇員工</option>
                                    <?=show_select_option_site_permission($wkeyid);?>
                                </select>
                              </div>
                              <input type="hidden" name="wkeyid" value="<?=$wkeyid?>">
                              <button type="submit" class="btn btn-primary"><i class="fa fa-plus"></i> 新增</button>
                          </form>
                        </div>

                    </div>
                    
                    <div class="ibox-content">

                        <div class="project-list clist">

                            <table class="table table-bordered dataTables-example">
                                <thead>
                                    <th>使用者帳號</th>
                                    <th>使用者姓名</th>
                                    <th>使用者權限</th>
                                    <th style="text-align:center;width:1%;min-width:50px">刪除</th>
                                </thead>
                                <tbody>

                                

                                <?php 
                                $i = 0;
                                while ($i < $count) {
                                echo '  <tr>
                                            <td><a href="useredit.php?num='.$username[$i].'">'.$username[$i].'</a></td>
                                            <td>'.$name[$i].'</td>
                                            <td class="project-title">'.$user_group[$i].'</td>
                                            <input type="hidden" class="id" value="'.$keyid[$i].'">
                                            <td><input type="button" class="btn btn-danger confirm-btn" style="padding:2px 12px;" value="刪除"></td>
                                        </tr>';

                                $i++;
                                }
                                ?>
                                
                                </tbody>
                            </table>
                        
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>






<?php include('incl/footer.php'); ?>        
<script>
  //hover del btn yellow
  $('.confirm-btn').hover(function() {
    $(this).closest('tr').css("background-color", "yellow");
    }, function(){
    $(this).closest('tr').css("background-color", "white");
  }); 


  $('.confirm-btn').click(function() {
    var delid = $(this).closest("tr").find(".id").val();
    console.log(delid);
   
    var tr = $(this).closest('tr');
    bootbox.confirm("確認執行此操作", function(result) {
      $('#mainbody').removeAttr( 'style' );
      if (result) { 
        console.log("ok");
        
        $.ajax({async: false, url: 'ajaxact.php?q=2&svalue='+delid,
             success: function(output) {
                      //alert(output);
                      console.log("ok");
                      toastr.error("資料刪除成功!");
                   },
             error: function (xhr, ajaxOptions, thrownError) {
                     alert(xhr.status + " "+ thrownError);
        }});
        tr.fadeOut(400, function(){
            tr.remove();
        });
      } else { console.log("no") }
    }); 
  });
</script>
