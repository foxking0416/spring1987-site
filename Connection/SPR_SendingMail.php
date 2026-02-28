<?php
header("Content-Type:text/html;charset=utf-8");
ini_set("display_errors","On");
error_reporting(E_ALL);

$senderName        = $_POST['senderName'];		 // 使用者稱呼
$senderPhone       = $_POST['senderPhone'];		 // 使用者電話
$senderContactTime = $_POST['senderContactTime'];// 使用者聯絡時間
$senderEmail	   = $_POST['senderEmail'];	 	 // 使用者信箱
$from_email		   = $_POST['from_email'];	 	 // 寄信者信箱
$content           = $_POST['content'];          // 後台輸入的內容，POST
$eDataBase_Error   = $_POST['eDataBase_Error'];  // 秀出的錯誤資訊，POST
$ConnectEmail      = $_POST['connectEmail'];	 // 聯絡信箱，收件者，POST
$title      	   = $_POST['title'];			 // 寄件標題



// $senderName		   = '林曉鴻';
// $senderPhone	   = '0928825252';
// $senderContactTime = '09:00~12:00';
// $from_email		   = 'blacksugerteam0916@gmail.com';
// $content = '亞洲女子天團S.H.E在去年10月決定離開待了17年的華研之後，
// 各自成立了新公司，而Hebe的最新動向也受到不少粉絲注意，
// 終於在今（29）日她的「樂來樂好有限公司」大動作宣布，
// 將和唱片公司「何樂音樂」正式合作';
// $eDataBase_Error   = 'error email';
// $ConnectEmail	   = 'allenx850317@gmail.com';
// $title			   = '快樂國際航空公司-顧客回覆';
//$emailList		   = 's1032649@mail.ncyu.edu.tw';

sendCourseChangeMail( $senderName,
					  $senderPhone,
					  $senderContactTime,
					  $senderEmail,
					  $from_email,
					  $content,
					  $eDataBase_Error,
					  $ConnectEmail,
					  $title );
//驗證信件
function sanitize_my_email($field) {
    $field = filter_var($field, FILTER_SANITIZE_EMAIL);
    if (filter_var($field, FILTER_VALIDATE_EMAIL)) {
        return true;
    } else {
        return false;
    }
}

	//寄送信件	 
function sendEmail($to_email, $subject, $SendMessage, $headers){
	date_default_timezone_set('Asia/Taipei');
	mail($to_email, $subject, $SendMessage, $headers);
	// echo "寄信成功";
}	
function sendCourseChangeMail( $senderName,
							   $senderPhone,
							   $senderContactTime,
							   $senderEmail,
							   $from_email,
							   $content,
							   $eDataBase_Error,
							   $ConnectEmail,
							   $title )
{	
	$subject             = "=?UTF-8?B?".base64_encode("$title")."?=";  //信件標題，解決亂碼問題
	$from_name			 = "=?UTF-8?B?".base64_encode("$senderName")."?=";
	// $email_bcctest		 = 'gatlab603@gmail.com';
	$headers  = "MIME-Version: 1.0\r\n"; 
	$headers .= "Content-type: text/html; charset=UTF-8\r\n ; Content-Transfer-Encoding:8bit\r\n"; 
	$headers .= "From:".$from_name." <$from_email>\r\n"; 	// send email person
	// $headers .= "Cc: $emailList\r\n";
	// $headers .= "Bcc: $email_bcctest\r\n";
	$contentText = nl2br($content);
	$Course_message = "<html>
							<head>
							<title>HTML email</title>
								<style>
								p { 
									color: #000000;
									font-size: 20px;
								}
								hr.style-one {
									border: 2;
									height: 10px;
									background: #333;
									background-image: linear-gradient(to right, #ccc, #333, #ccc);
								}
								
								h1 {
									color: #000000;
								}
								h2 {
									color: black;
								}
								
								</style>
							</head>
								<body>
								<p align='left'><font color=#000000 face='微軟正黑體'>"."客戶名稱：$senderName"."</font>"."</p>
								<p align='left'><font color=#000000 face='微軟正黑體'>"."客戶聯絡電話：$senderPhone"."</font>"."</p>
								<p align='left'><font color=#000000 face='微軟正黑體'>"."客戶方便聯絡時間：$senderContactTime"."</font>"."</p>
								<p align='left'><font color=#000000 face='微軟正黑體'>"."客戶 Emil：$senderEmail"."</font>"."</p>
								<p align='left'><font color=#000000 face='微軟正黑體'>"."客戶需求：<br>$contentText"."</font>"."</p>
								<br>
								
								</body>
						</html>";
	$EmailType = $Course_message;
	$secure_check = sanitize_my_email($from_email);
	if ($secure_check == false) {
		print "Invalid input";
	} else { //send email 
		sendEmail($ConnectEmail, $subject, $EmailType, $headers);
	}			
}
?>




