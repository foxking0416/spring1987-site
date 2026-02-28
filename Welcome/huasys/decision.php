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
		include("model/decision.php");
		include("views/decision.php");
	}

} else {
    // the user is not logged in, load another view
    include("views/login.php");
}