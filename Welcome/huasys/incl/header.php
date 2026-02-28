<!DOCTYPE html>
<html>

<?php header("Content-Type:text/html; charset=utf-8");date_default_timezone_set("Asia/Taipei")?>
<head>

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title><?=SYSTEM_MENU_SHORT_NAME?></title>

    <link href="css/bootstrap.min.css" rel="stylesheet">
    
    <link href="font-awesome/css/font-awesome.css" rel="stylesheet">
    <link href="css/plugins/toastr/toastr.min.css" rel="stylesheet">
    <link href="css/plugins/datapicker/datepicker3.css" rel="stylesheet">
    <link href="css/dataTables.responsive.css" rel="stylesheet">
    <link href="css/dataTables.bootstrap.css" rel="stylesheet">
    <link rel="stylesheet" href="fileupload/css/jquery.fileupload.css">
    <link href="//cdnjs.cloudflare.com/ajax/libs/x-editable/1.5.0/bootstrap3-editable/css/bootstrap-editable.css" rel="stylesheet"/>

    <link href="css/animate.css" rel="stylesheet">
    <link href="css/style.css" rel="stylesheet">

    



</head>

<body>

<div id="wrapper">

    <nav class="navbar-default navbar-static-side" role="navigation">
        <div class="sidebar-collapse">
            <ul class="nav" id="side-menu">
                <li class="nav-header">
                    <div class="dropdown profile-element">
                            <a data-toggle="dropdown" class="dropdown-toggle" href="#">
                            <span class="clear"> <span class="block m-t-xs"> <strong class="font-bold" style="font-size:16px"><?=SYSTEM_FULL_NAME?></strong>
                             </span> <span class="text-muted text-xs block"><?php echo $user ?><b class="caret"></b></span> </span> </a>
                            <ul class="dropdown-menu animated fadeInRight m-t-xs">
                                <li><a href="index.php?logout">登出</a></li>
                            </ul>
                    </div>
                    <div class="logo-element">
                        <?=SYSTEM_MENU_SHORT_NAME_ENGLISH?>
                    </div>
                </li>
                
                
				<li>
                    <a href="index.php"><i class="fa fa-book"></i> <span class="nav-label">選擇工地</span></a>
                </li>
                <li>
                    <a href="propose.php"><i class="fa fa-plus"></i> <span class="nav-label">新增提案</span></a>
                </li>
                <li>
                    <a href="proposals.php"><i class="fa fa-file-text-o"></i> <span class="nav-label">未決議提案列表</span></a>
                </li>
                <li>
                    <a href="monitors.php"><i class="fa fa-lock"></i> <span class="nav-label">列管中提案列表</span></a>
                </li>
                <li>
                    <a href="archive.php?done"><i class="fa fa-unlock"></i> <span class="nav-label">歷史解除列管提案</span></a>
                </li>
                <li>
                    <a href="archive.php?none"><i class="fa fa-file-archive-o"></i> <span class="nav-label">歷史免追蹤提案</span></a>
                </li>
                <li>
                    <a href="archive.php"><i class="fa fa-files-o"></i> <span class="nav-label">所有歷史提案</span></a>
                </li>
                
                
                <?php
                    if ($permission>=9) {
                        echo '
                            <li>
                                <a href="sitepermission.php"><i class="fa fa-shield"></i> <span class="nav-label">工地權限管理</span></a>
                            </li>  
                        ';
                        echo '
                             <li>
                                <a href="userlist.php"><i class="fa fa-user-plus"></i> <span class="nav-label">使用者管理</span></a>
                            </li>
                        ';
                    }
                ?>
            </ul>

        </div>
    </nav>

    <div id="page-wrapper" class="gray-bg">
        <div class="row border-bottom">
            <nav class="navbar navbar-static-top gray-bg" role="navigation" style="margin-bottom: 0">
                <div class="navbar-header">
                    <a class="navbar-minimalize minimalize-styl-2 btn btn-primary" id="mini-btn" href="#"><i class="fa fa-bars"></i> </a>
                    
                </div>
                <ul class="nav navbar-top-links navbar-right">
                    <!--
                    <li>
                        <a href="query.php">
                            <i class="fa fa-search"></i> 查詢
                        </a>
                    </li>
                    -->

                    <li>
                        <a href="index.php">
                            <i class="fa fa-home"></i> 首頁
                        </a>
                    </li>
                    <li>
                        <a href="index.php?logout">
                            <i class="fa fa-sign-out"></i> 登出
                        </a>
                    </li>
                </ul>

            </nav>
        </div>