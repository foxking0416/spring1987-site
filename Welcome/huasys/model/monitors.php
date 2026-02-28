<?php
$thispagename = "monitors.php?all";

//for order by 完成期限
if (isset($_GET)) {
	if (isset($_GET['self_p'])) {
		$orderlink = $thispagename."&self_p";
	} elseif (isset($_GET['self_r'])) {
		$orderlink = $thispagename."&self_r";
	} else {
		$orderlink = $thispagename;
	}
}

require_once("config/database.php");

include("incl/getproposals.php");

include("incl/pagermodel.php");

//proposals to show in this page
$pids = array_slice($pids, $itemstart, $itemthispage, TRUE);
?>