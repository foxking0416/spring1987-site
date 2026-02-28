<?php
require_once("config/database.php");


include("incl/getproposals.php");

include("incl/pagermodel.php");

//proposals to show in this page
$pids = array_slice($pids, $itemstart, $itemthispage, TRUE);
?>