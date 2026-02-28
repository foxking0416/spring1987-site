<?php

require_once("incl/requires.php");

$login = new Login();

// ... ask if we are logged in here:
if ($login->isUserLoggedIn() == true) {
    // the user is logged in
    $user = $_SESSION["user_name"];
    $permission = $_SESSION["permission"];
    $uid = $_SESSION["uid"];
    if (Permission_Required(9)) {
	    include("model/useredit.php");
	    include("views/useredit.php");
	} else {
        echo "你沒有權限瀏覽此頁面";
        Permission(9);
	}

} else {
    // the user is not logged in.
    include("views/login.php");
}
?>