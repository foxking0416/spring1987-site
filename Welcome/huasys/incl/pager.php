<!--Pager-->
<div style="float:right;margin-bottom:10px">
<form class="form-inline pagerbox-n" id="pager-form" name="pager" action="<?=$thispagename?>" method="post">
<?php if (isset($_GET['order'])) $thispagename .= "&order";?>
  <button type="button" class="btn btn-default btn-outline" style="padding:6px 10px" id="pre-page" alt="上一頁" onclick="javascript:location.href='<?=$thispagename?>&page=<?php echo $pre ?>'" ><</button>
  <div class="form-group">
    <select class="form-control pager" name="pager" style="border-color:#bababa">           
      <?php 
        $i = 1;
        $s = '';
        while ( $i < ($totalpage + 1)) {
          if ($i == $thispage) { $s="selected" ;} else { $s = "";}
          echo '<option value="'.$i.'" '.$s.'>第 '.$i.' 頁</option>'; 
          $i++;
        }
      ?>
    </select>
  </div>
  <button type="button" class="btn btn-default btn-outline" style="padding:6px 10px" alt="下一頁" onclick="javascript:location.href='<?=$thispagename?>&page=<?php echo $next ?>'" >></button>
</form>
</div>
<!--end pager-->