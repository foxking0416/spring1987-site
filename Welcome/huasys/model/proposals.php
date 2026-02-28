<?php
$thispagename = "proposals.php?all";
require_once("config/database.php");

$admin_query = "";
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $query = $_POST["query"];
  if ($query != 0) {
    $admin_query = "AND wkeyid = ". $query;
    $e_query = "= ". $query;
  }
}

if ($permission >= 9) {
  //show del btn 
  $del_btn = '<button type="button" class="btn btn-danger del_btn"> 刪除 </button>';

  $result = $db->prepare("
    SELECT ps.*, ws.wnum, ws.wname
    FROM proposals ps INNER JOIN worksites ws USING (wkeyid) 
    WHERE ps.isdel !='yes' AND is_decided != 1 AND ps.active != 0 ".$admin_query."
    ");

  $result->execute();
  $results = $result->fetchAll(PDO::FETCH_ASSOC);
} else if ($permission <= 7) {
  //hide del btn
  $del_btn = "";

  //get all sites that the employee can view
  $result1 = $db->prepare("
      SELECT *
      FROM sitepermission
      WHERE isdel != 'yes' AND uid = :uid 
      ");
  $result1->bindParam(':uid', $uid);
  $result1->execute();
  $result1s = $result1->fetchAll(PDO::FETCH_ASSOC);
  //construct query string
  $qstring = "";
  if (count($result1s) > 0) {
    foreach ($result1s as $r) {
      $qstring .= ",".$r['wkeyid'];
    }
  }
  $qstring = substr($qstring, 1);
  $qstring = " IN (".$qstring.")";
  $employee_query = (isset($e_query) && ($e_query != ""))?$e_query:$qstring;
  //var_dump($employee_query);
  $result = $db->prepare("
    SELECT ps.*, ws.wnum, ws.wname
    FROM proposals ps INNER JOIN worksites ws USING (wkeyid)
    WHERE ps.isdel !='yes' AND is_decided != 1 AND ps.active != 0 AND wkeyid ".$employee_query."
    ");
  $result->execute();
  $results = $result->fetchAll(PDO::FETCH_ASSOC);
}
//var_dump($results);
$pids = array();
foreach ($results as $r) {
  $pids[] = $r['pid'];
  $wkeyids[] = $r['wkeyid'];
  $wpids[] = $r['wpid'];
  $wnames[] = $r['wname'];
  $wnums[] = $r['wnum'];
  $subjects[] = $r['subject'];
  $details[] = $r['detail'];
  $pdates[] = $r['pdate'];
  if ($r['p_uid'] == 0) {
    $proposers[] = $r['p_name'];
  } else {
    $proposers[] = get_field("users", "name", "user_id", $r['p_uid']);
  }
}
//var_dump($_SESSION);

//pager

(isset($_GET["page"]))?$thispage = $_GET["page"]:$thispage = 1;
$itemperpage = ITEM_PER_PAGE;
$itemcount = count($results);
$totalpage = ceil(($itemcount/$itemperpage));
if ($totalpage == 0)
  $totalpage = 1;
if ($thispage > $totalpage) {
  echo "<script>location.href='proposals.php?page=1';</script>";exit;
}
if ($thispage < 1) {
  echo "<script>location.href='proposals.php?page=1';</script>";exit;
}
($thispage-1>0)?$pre=$thispage-1:$pre=1;
($thispage+1>$totalpage)?$next=$totalpage:$next=$thispage+1;
$itemstart = ($thispage - 1) * $itemperpage; 
$itemend = $thispage * $itemperpage - 1;
$itemthispage = $itemcount - ($thispage -1)*$itemperpage;
if ($itemthispage > $itemperpage) 
  $itemthispage = $itemperpage;
if ($thispage > $totalpage) {
  echo "<script>location.href='proposals.php?page=1';</script>";exit;
}
if ($thispage < 1) {
  echo "<script>location.href='proposals.php?page=1';</script>";exit;
}
//end pager

//proposals to show in this page
$pids = array_slice($pids, $itemstart, $itemthispage, TRUE);
//$pids = array_slice($pids, 0, 3);
//var_dump($pids);
?>