<?php

require_once("config/database.php");

if ($_SERVER["REQUEST_METHOD"]=="POST") {
  $query = "%".$_POST["query"]."%";
  $result1 = $db->prepare("
    SELECT *
    FROM users
    WHERE isdel !='yes' AND name LIKE :user AND user_name !='admin'
    ");
  $result1->bindParam(':user', $query);
} else {
  $result1 = $db->prepare("
  SELECT *
  FROM users
  WHERE isdel !='yes' AND user_name !='admin'
  ");
}


$result1->execute();
$result1s = $result1->fetchAll(PDO::FETCH_ASSOC);

$count = count($result1s);
$active = array();
$i = 0;
while ($i < $count) {
  $username[] = $result1s[$i]["user_name"];
  $user_name[] = $result1s[$i]["name"];
  $user_active = $result1s[$i]["active"];
  ($user_active=="no")?$active[]="停用":$active[]="正常";
  $user_permission[] = $result1s[$i]["permission"];
  switch ($user_permission[$i]) {
    case '9':
      $usergroup[]="管理者";
      break;
    case '7':
      $usergroup[]="職員";
      break;
    
    default:
      $usergroup[]="NA";
      break;
  }
  $user_group[] = $user_permission[$i].", ".$usergroup[$i];
  
  $i++;
}

/*
$result1 = $db->prepare("
  SELECT *
  FROM courses
  WHERE isdel !='yes' AND end_date > :today
  ORDER BY course_id DESC
  ");
$result1->bindParam(':today', $today);
$result1->execute();
$result1s = $result1->fetchAll(PDO::FETCH_ASSOC);
$count = count($result1s);
$i = 0;
while ($i < $count) {
  echo $result1s[$i]["course_id"];

  $i++;
}
*/

?>
