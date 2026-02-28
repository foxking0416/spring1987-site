<?php

require_once("config/database.php");

$result1 = $db->prepare("
  SELECT *
  FROM worksites
  WHERE isdel !='yes'
  ");
$result1->execute();
$result1s = $result1->fetchAll(PDO::FETCH_ASSOC);

$count = count($result1s);
$i = 0;
while ($i < $count) {
  $wname[] = $result1s[$i]["wname"];
  $wkeyid[] = $result1s[$i]["wkeyid"];
  $i++;
}

?>