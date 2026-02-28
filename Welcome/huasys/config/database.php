
<?php
date_default_timezone_set("Asia/Taipei");
try {
	$db = new PDO('mysql:host=localhost;dbname=vhost89800' ,"vhost89800","huachun1234");
	$db->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
	$db->exec("SET NAMES 'utf8'");
} catch (Exception $e) {
	echo "Could not connect to the database.";
	exit;
}

?>