<?php
require_once("config/database.php");

if ($_SERVER["REQUEST_METHOD"] == "POST") {

	$wkeyid = $_POST["wkeyid"];

	//get lowest wpid
	$result = $db->prepare("
	    SELECT *
	    FROM proposals
	    WHERE isdel !='yes' AND wkeyid = $wkeyid ORDER BY wpid DESC
	    ");
	$result->execute();
	$results = $result->fetchAll(PDO::FETCH_ASSOC);

	if (count($results) < 1) {
		$wpid = 1;
	} else {
		$wpid = $results[0]["wpid"] + 1;
	}

	//insert new proposal into db  
	$subject = $_POST["subject"];
	$detail = $_POST["detail"];
	$p_uid = $_POST["p_uid"];
	$p_name = $_POST["p_name"];
	$pdate = $_POST["pdate"];
	$urgency = $_POST["urgency"];
	$importance = $_POST["importance"];
	$add_date = $_POST["add_date"];
	$stm = $db->prepare(" INSERT INTO proposals (wkeyid, wpid, subject, detail, p_uid, p_name, pdate, urgency, importance, add_date, active, is_decided, progress)
	VALUES (:wkeyid, :wpid, :subject, :detail, :p_uid, :p_name, :pdate, :urgency, :importance, :add_date, 1, 0, 2)
	");
	$stm->bindParam(':wkeyid', $wkeyid);
	$stm->bindParam(':wpid', $wpid);
	$stm->bindParam(':subject', $subject);
	$stm->bindParam(':detail', $detail);
	$stm->bindParam(':p_uid', $p_uid);
	$stm->bindParam(':p_name', $p_name);
	$stm->bindParam(':pdate', $pdate);
	$stm->bindParam(':urgency', $urgency);
	$stm->bindParam(':importance', $importance);
	$stm->bindParam(':add_date', $add_date);
	$stm->execute();

	echo '<script>location.href="proposals.php?msgnum=1"</script>';
	exit;
}