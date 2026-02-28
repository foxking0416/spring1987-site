<?php
$orderby = "";
if ($thispagename == "archive.php?done") {
	$condition = " AND is_monitor = 1 AND ps.active = 0 ";
} elseif ($thispagename == "monitors.php?all") {
	$condition = " AND is_monitor = 1 AND ps.active = 1 ";
} elseif ($thispagename == "archive.php?none") {
	$condition = " AND is_monitor = 0 AND ps.active = 0 ";
} elseif ($thispagename == "archive.php?all") {
	$condition = " AND ps.active = 0 ";
}

$admin_query = "";
$addition_query = "";
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $query = $_POST["query"];
  if ($query != 0) {
    $admin_query = "AND wkeyid = ". $query;
    $e_query = " AND wkeyid = ". $query;
  }
}

if (isset($_GET)) {
  if (isset($_GET['self_p'])) {
    $admin_query = " AND p_uid = $uid";
    $e_query = " AND p_uid = $uid";
  }
  if (isset($_GET['self_r'])) {
    $admin_query = " AND r_uid = $uid";
    $e_query = " AND r_uid = $uid";
  }
  if (isset($_GET['order'])) {
    $orderby = " ORDER BY ps.exp_date DESC ";
  }

}

if ($permission >= 9) {
  //show del btn 
  $del_btn = '<button type="button" class="btn btn-danger del_btn"> 刪除 </button>';

  $result = $db->prepare("
    SELECT ps.*, ws.wnum, ws.wname
    FROM proposals ps INNER JOIN worksites ws USING (wkeyid) 
    WHERE ps.isdel !='yes' ". $condition . $admin_query . $orderby . "
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
  $qstring = " AND wkeyid IN (".$qstring.")";
  $employee_query = (isset($e_query) && ($e_query != ""))?$e_query:$qstring;
  //var_dump($employee_query);
  $result = $db->prepare("
    SELECT ps.*, ws.wnum, ws.wname
    FROM proposals ps INNER JOIN worksites ws USING (wkeyid)
    WHERE ps.isdel !='yes' ". $condition . $employee_query . $orderby . "
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
  $decisions[] = $r['decision'];
  $status[] = $r['status'];
  $pdates[] = $r['pdate'];
  $ddates[] = $r['ddate'];
  $exp_dates[] = $r['exp_date'];
  $is_monitor[] =  $r['is_monitor'];
  $progress[] = $r['progress'];
  $cdates[] = ($r['progress'] != 4)?"-":$r['cdate'];
  if ($r['p_uid'] == 0) {
    $proposers[] = $r['p_name'];
  } else {
    $proposers[] = get_field("users", "name", "user_id", $r['p_uid']);
  }
  $r_names[] = get_field("users", "name", "user_id", $r['r_uid']);
}