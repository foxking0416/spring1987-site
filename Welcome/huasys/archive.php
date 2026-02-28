<?php

require_once("incl/requires.php");

$login = new Login();

// ... ask if we are logged in here:
if ($login->isUserLoggedIn() == true) {
    
    // the user is logged in, assign value to user and permission
    $user = $_SESSION["user_name"];
	$permission = $_SESSION["permission"];
	$uid = $_SESSION["uid"];
	
	// load main view
	if ($permission >= 7) {
		if (isset($_GET["done"])) {
			$pagetitle = "歷史解除列管提案列表";
			$thispagename = "archive.php?done";
			include("model/archivedone.php");
			
		} elseif (isset($_GET["none"])) {
			$pagetitle = "歷史免追蹤提案列表";
			$thispagename = "archive.php?none";
			include("model/archivenone.php");
		} else {
			$pagetitle = "所有歷史提案列表";
			$thispagename = "archive.php?all";
			include("model/archive.php");
		}
		include("incl/archivelistview.php");
	}

} else {
    // the user is not logged in, load another view
    include("views/login.php");
}