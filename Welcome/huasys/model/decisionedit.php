<?php
require_once("config/database.php");

if ($_SERVER["REQUEST_METHOD"] == "POST") {

	$today = date("Y-m-d");
//	$decision = $_POST["decision"];
	$status = $_POST["status"];
	$exp_date = $_POST["exp_date"];
	$modify_uid = $uid;
	$pid = $_POST["pid"];
	$cdate = $_POST["cdate"];
	$progress = $_POST["progress"];
	$wkeyid = get_field("proposals","wkeyid","pid",$pid);

	if (is_site_permission($permission, $uid, $wkeyid)) {
		$stm = $db->prepare(" UPDATE proposals
		SET exp_date = :exp_date, modify_date = :modify_date, modify_uid = :modify_uid, cdate = :cdate, progress = :progress, status = :status
		WHERE pid = :pid
		");
//		$stm->bindParam(':decision', $decision);
		$stm->bindParam(':status', $status);
		$stm->bindParam(':exp_date', $exp_date);
		$stm->bindParam(':pid', $pid);
		$stm->bindParam(':modify_uid', $modify_uid);
		$stm->bindParam(':modify_date', $today);
		$stm->bindParam(':cdate', $cdate);
		$stm->bindParam(':progress', $progress);
		$stm->execute();
		echo '<script>location.href="monitors.php?msgnum=1"</script>';
		exit;
	}
}

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
	$decision = $results['decision'];
	$cdate = $results['cdate'];
	$progress = $results['progress'];
	$status = $results['status'];
	if ($progress != 4) $cdate = date("Y-m-d");

} else {
	return_home();
}

