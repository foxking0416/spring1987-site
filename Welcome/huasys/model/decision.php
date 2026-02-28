<?php
require_once("config/database.php");

if ($_SERVER["REQUEST_METHOD"] == "POST") {

	$ddate = $_POST["ddate"];
	$decision = $_POST["decision"];
	$r_uid = $_POST["r_uid"];
	$r_name = $_POST["r_name"];
	if ( ! empty($r_name)) $r_uid = 0;
	$exp_date = $_POST["exp_date"];
	$d_recorddate = $_POST["d_recorddate"];
	$pid = $_POST["pid"];
	$wkeyid = $_POST["wkeyid"];
	$decision_recorder = $_POST["decision_recorder"];
	$is_monitor = ($_POST['is_monitor'] == 'yes')?1:0;
	$active = ($_POST['is_monitor'] == 'yes')?1:0;

	if (is_site_permission($permission, $uid, $wkeyid)) {
		$stm = $db->prepare(" UPDATE proposals
		SET ddate = :ddate, decision = :decision, r_uid = :r_uid, r_name = :r_name, exp_date = :exp_date, d_recorddate = :d_recorddate, decision_recorder = :decision_recorder, is_decided = 1, is_monitor = :is_monitor, active = :active
		WHERE pid = :pid
		");
		$stm->bindParam(':ddate', $ddate);
		$stm->bindParam(':decision', $decision);
		$stm->bindParam(':r_uid', $r_uid);
		$stm->bindParam(':r_name', $r_name);
		$stm->bindParam(':exp_date', $exp_date);
		$stm->bindParam(':d_recorddate', $d_recorddate);
		$stm->bindParam(':pid', $pid);
		$stm->bindParam(':decision_recorder', $decision_recorder);
		$stm->bindParam(':is_monitor', $is_monitor);
		$stm->bindParam(':active', $active);
		$stm->execute();
		echo '<script>location.href="proposals.php?msgnum=1"</script>';
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

} else {
	return_home();
}

