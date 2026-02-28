<?php

require_once("config/database.php");

$num = $_GET["num"];

$result = $db->prepare("
  SELECT *
  FROM users
  WHERE isdel !='yes' AND user_name = :num
  ");
$result->bindParam(':num', $num);
$result->execute();
$results = $result->fetch(PDO::FETCH_ASSOC);
$user_id = $results["user_id"];
$user_name = $results["user_name"];
$name = $results["name"];
$permission = $results["permission"];

($permission==9)?$sa="selected":$sa="";
($permission==7)?$sb="selected":$sb="";
($permission==3)?$sc="selected":$sc="";
?>
