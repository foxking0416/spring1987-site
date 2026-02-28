<?php
require_once("config/database.php");

if (isset($_GET['pid'])) {
	$pid = $_GET['pid'];
	$result = $db->prepare("
	        SELECT ps.*, ws.wnum, ws.wname
		    FROM proposals ps INNER JOIN worksites ws USING (wkeyid) 
		    WHERE ps.isdel !='yes' AND pid = :pid 
	      ");
	$result->bindParam(':pid', $pid);
	$result->execute();
	$results = $result->fetch(PDO::FETCH_ASSOC);	
	 
	if( ! $results || ! is_site_permission($permission, $uid, $results['wkeyid'])) return_home();

	$detail = nl2br($results['detail']);
	$decision = nl2br($results['decision']);
	$wname = $results['wname'];
	$subject = $results['subject'];
	if ($results['p_uid'] == 0) {
	    $proposer = $results['p_name'];
	} else {
	    $proposer = get_field("users", "name", "user_id", $results['p_uid']);
	}
	$pdate = $results['pdate'];
	$urgency = $results['urgency'];
	$importance = $results['importance'];
	$wkeyid = $results['wkeyid'];
	$ddate = $results['ddate'];
	$exp_date = $results['exp_date'];
	$r_uid = $results['r_uid'];
	$r_name = get_field("users", "name", "user_id", $r_uid);
	$cdate = $results['cdate'];
	$is_monitor = $results['is_monitor'];
	if ($is_monitor == 1) {
		$titlename = "已解除列管提案";
	} else {
		$titlename = "免追蹤提案";
	}
} else {
	return_home();
}

