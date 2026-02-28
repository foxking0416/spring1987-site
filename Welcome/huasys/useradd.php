<?php
/*
ini_set('display_errors',1);
ini_set('display_startup_errors',1);
error_reporting(-1);
*/
require_once("config/database.php");
require_once("incl/requires.php");

$user_name = $_POST["user_name"];
$user_group = $_POST["user_group"];
$name = $_POST["name"];
Permission(9);


if (isset($_POST["edit"])) {
	$keyid = $_POST["keyid"];
	$ousername = $_POST["ousername"];
	/* desctive account
	$stop = $_POST["stop"];
	if ($_POST["stop"] =="no") {
		$stm = $db->prepare(" UPDATE users
			SET active ='no'
			WHERE user_id = :uid 
			");
		$stm->bindParam(':uid', $keyid);
		$stm->execute();
		echo '<script>location.href="userlist.php?msgnum=8"</script>';
		exit;
	}
	*/
	$stmt = $db->prepare(" UPDATE users
	SET usergroup = :user_group, permission = :permission, user_name = :user, name = :name
	WHERE user_id = :uid
	");
	$stmt->bindParam(':uid', $keyid);
	$stmt->bindParam(':user', $user_name);
	$stmt->bindParam(':user_group', $user_group);
	$stmt->bindParam(':permission', $user_group);
	$stmt->bindParam(':name', $name);
	$stmt->execute();
	
	if (!empty($_POST["newpass"])) {
		$pass = $_POST["newpass"];
		$user_password_hash = password_hash($pass, PASSWORD_DEFAULT);
		$stm = $db->prepare(" UPDATE users
			SET user_password_hash = :user_password_hash
			WHERE user_id = :uid
			");
		$stm->bindParam(':uid', $keyid);
		$stm->bindParam(':user_password_hash', $user_password_hash);
		$stm->execute();
	}
	echo '<script>location.href="userlist.php?msgnum=1"</script>';
	exit;
}

if (isset($_POST["usernew"])) {
	$user_password = $_POST["user_password"];
	$user_password_hash = password_hash($user_password, PASSWORD_DEFAULT);
	$stm = $db->prepare(" INSERT INTO users (user_name, user_password_hash, usergroup, permission, name)
	VALUES (:user_name, :user_password_hash, :user_group, :permission, :name)
	");
	$stm->bindParam(':user_name', $user_name);
	$stm->bindParam(':user_password_hash', $user_password_hash);
	$stm->bindParam(':user_group', $user_group);
	$stm->bindParam(':permission', $user_group);
	$stm->bindParam(':name', $name);
	$stm->execute();
	echo '<script>location.href="userlist.php?msgnum=1"</script>';
	exit;
}
?>