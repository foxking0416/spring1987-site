
<?php
date_default_timezone_set("Asia/Taipei");
try {
	$db = new PDO('mysql:host=localhost;dbname=huaspring' ,"root","QQaazz11");
	$db->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
	$db->exec("SET NAMES 'utf8'");
} catch (Exception $e) {
	echo "Could not connect to the database.";
	exit;
}

?>