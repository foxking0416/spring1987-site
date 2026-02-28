<?php

require_once("config/database.php");

if ($_SERVER["REQUEST_METHOD"]=="POST") {
	$wkeyid = $_POST["wkeyid"];
	$uid = $_POST["uid"];
	$stm = $db->prepare(" INSERT INTO sitepermission (uid, wkeyid)
	VALUES (:uid, :wid)
	");
	$stm->bindParam(':uid', $uid);
	$stm->bindParam(':wid', $wkeyid);
	$stm->execute();
	echo '<script>location.href="sitepermissionedit.php?msgnum=1&wid='.$wkeyid.'"</script>';
}

$wkeyid = $_GET["wid"];
$wname = get_field("worksites", "wname", "wkeyid", $wkeyid);

$result1 = $db->prepare("
SELECT *
FROM sitepermission sp INNER JOIN users u ON sp.uid = u.user_id
WHERE sp.isdel !='yes' AND wkeyid = :wid
");
$result1->bindParam(':wid', $wkeyid);
$result1->execute();
$result1s = $result1->fetchAll(PDO::FETCH_ASSOC);

$count = count($result1s);
$active = array();
$i = 0;
while ($i < $count) {
  $username[] = $result1s[$i]["user_name"];
  $name[] = $result1s[$i]["name"];
  $user_permission[] = $result1s[$i]["permission"];
  $keyid[] = $result1s[$i]["keyid"];
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
