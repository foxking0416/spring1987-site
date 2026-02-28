<?php
if (!empty($_GET["msgnum"])) { $msgnum = $_GET["msgnum"]; 

function alertinfo($alertmsg, $alerttype) {
	echo '
	<script>
	   $(document).ready(function() {
	      toastr.options = {
	      "closeButton": true,
	      "debug": false,
	      "progressBar": true,
	      "positionClass": "toast-top-right",
	      "onclick": null,
	      "showDuration": "400",
	      "hideDuration": "1000",
	      "timeOut": "4000",
	      "extendedTimeOut": "1000",
	      "showEasing": "swing",
	      "hideEasing": "linear",
	      "showMethod": "fadeIn",
	      "hideMethod": "fadeOut"
	    }  
	      toastr.'.$alerttype.'("'.$alertmsg.'")  
	    });
	</script>
	';
} 


if ($msgnum == 1) {
	$alertmsg = "資料儲存成功!";
	$alerttype = "success";
	alertinfo($alertmsg, $alerttype);
}
if ($msgnum == 2) {
	$alertmsg = "資料重複!";
	$alerttype = "warning";
	alertinfo($alertmsg, $alerttype);
}
if ($msgnum == 3) {
	$alertmsg = "Answers Submitted!";
	$alerttype = "success";
	alertinfo($alertmsg, $alerttype);
}
if ($msgnum == 4) {
	$alertmsg = "使用者已經存在";
	$alerttype = "warning";
	alertinfo($alertmsg, $alerttype);
}
if ($msgnum == 5) {
	$alertmsg = "資料輸入錯誤(格式錯誤或重複資料)";
	$alerttype = "error";
	alertinfo($alertmsg, $alerttype);
}
if ($msgnum == 6) {
	$alertmsg = "新密碼兩次輸入不同";
	$alerttype = "error";
	alertinfo($alertmsg, $alerttype);
}
if ($msgnum == 7) {
	$alertmsg = "資料刪除成功!";
	$alerttype = "success";
	alertinfo($alertmsg, $alerttype);
}
if ($msgnum == 8) {
	$alertmsg = "使用者帳號已停用!";
	$alerttype = "success";
	alertinfo($alertmsg, $alerttype);
}
if ($msgnum == 9) {
	$alertmsg = "已成功解除列管!";
	$alerttype = "success";
	alertinfo($alertmsg, $alerttype);
}
if ($msgnum == 10) {
	$alertmsg = "";
	$alerttype = "error";
	alertinfo($alertmsg, $alerttype);
}
if ($msgnum == 11) {
	$alertmsg = "";
	$alerttype = "error";
	alertinfo($alertmsg, $alerttype);
}
if ($msgnum == 12) {
	$alertmsg = "";
	$alerttype = "error";
	alertinfo($alertmsg, $alerttype);
}
if ($msgnum == 13) {
	$alertmsg = "";
	$alerttype = "error";
	alertinfo($alertmsg, $alerttype);
}
if ($msgnum == 14) {
	$alertmsg = "";
	$alerttype = "success";
	alertinfo($alertmsg, $alerttype);
}


}

echo '
<script>
	   $(document).ready(function() {
	      toastr.options = {
	      "closeButton": true,
	      "debug": false,
	      "progressBar": true,
	      "positionClass": "toast-top-right",
	      "onclick": null,
	      "showDuration": "400",
	      "hideDuration": "1000",
	      "timeOut": "4000",
	      "extendedTimeOut": "1000",
	      "showEasing": "swing",
	      "hideEasing": "linear",
	      "showMethod": "fadeIn",
	      "hideMethod": "fadeOut"
	    }
	   });
</script>';

/****
echo '<script>location.href="studentlist.php?msgnum=2"</script>';
exit;
****/

?>