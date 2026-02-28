<?php include('incl/header.php'); ?>

        <div class="row wrapper border-bottom white-bg page-heading">
            <div class="col-sm-4">
                <h2>歷史解除列管提案列表</h2>
            </div>
        </div>

<?php include("incl/archivelistview.php"); ?>



<?php include('incl/footer.php'); ?>
<script>
$(document).ready(function(){
  //pager
  $('.pager').change(function() {
    var newpage = $(this).val();
    location.href='<?=$thispagename?>?page='+newpage;
  });

  //view btn
  $('.view_btn').click(function() {
    var pid = $(this).closest('.proposal-table').data('pid');
    console.log(pid);
    location.href = "archiveproposal.php?pid="+pid;
  });

});
</script>
