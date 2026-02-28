<?php include('incl/header.php'); ?>

        <div class="row wrapper border-bottom white-bg page-heading">
            <div class="col-sm-4">
                <h2>工地列表</h2>
            </div>
        </div>



     <div class="row">
        <div class="col-md-6 col-md-offset-3">
            <div class="wrapper wrapper-content animated fadeInUp">

                <div class="ibox">
                    
                    
                    
                    <div class="ibox-content">

                        <div class="project-list clist">

                            <table class="table table-bordered dataTables-example">
                                <thead>
                                    <th>工地名稱</th>
                                    <th style="text-align:center;width:1%">編輯</th>
                                </thead>
                                <tbody>

                                

                                <?php 
                                $i = 0;
                                while ($i < $count) {
                                echo '  <tr>
                                            <td>'.$wname[$i].'</td>
                                            <td><a class="btn btn-primary" style="padding:2px 12px;" href="sitepermissionedit.php?wid='.$wkeyid[$i].'"> 編輯 </a></td>
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
    // table sorting
    $(document).ready(function() {
        $('.dataTables-example').dataTable({
            responsive: true,
            "dom": 'lptp',
            "order": [[ 1, "desc" ]],
            "lengthMenu": [20, 30, 40, 50],
            "columnDefs": [
                            { "orderable": false, "targets": 1 }
                          ]
        });
    });
</script>

