<?php
//pager
(isset($_GET["page"]))?$thispage = mysql_real_escape_string($_GET["page"]):$thispage = 1;
$itemperpage = ITEM_PER_PAGE;
$itemcount = count($results);
$totalpage = ceil(($itemcount/$itemperpage));
if ($totalpage == 0)
  $totalpage = 1;
if ($thispage > $totalpage) {
  $thispage = $totalpage;
}
if ($thispage < 1) {
  $thispage = 1;
}
($thispage-1>0)?$pre=$thispage-1:$pre=1;
($thispage+1>$totalpage)?$next=$totalpage:$next=$thispage+1;
$itemstart = ($thispage - 1) * $itemperpage; 
$itemend = $thispage * $itemperpage - 1;
$itemthispage = $itemcount - ($thispage -1)*$itemperpage;
if ($itemthispage > $itemperpage) 
  $itemthispage = $itemperpage;

//end pager