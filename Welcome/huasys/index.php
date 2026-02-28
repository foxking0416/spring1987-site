<?php
error_reporting(1);
require_once("incl/requires.php");

$login = new Login();

// ... ask if we are logged in here:
if ($login->isUserLoggedIn() == true) {
    $time = date("H:i:s");
    $date = date("Y-m-d");
    
    $result = $db->prepare("
	    INSERT INTO history (date, time, uid)
	    VALUE (:date, :time, :uid)
	    ");
    $result->bindParam(':uid', $_SESSION['uid']);	
    $result->bindParam(':date', $date);
    $result->bindParam(':time', $time);
	 $result->execute();

    // the user is logged in, assign value to user and permission
    $user = $_SESSION["user_name"];
	$permission = $_SESSION["permission"];
	$uid = $_SESSION["uid"];

	// load main view
	if ($permission >= 7) {
		include("views/main.php");
	}

} else {
    // the user is not logged in, load another view
    include("views/login.php");
}