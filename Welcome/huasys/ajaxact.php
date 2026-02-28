<?php 
/*
q=4, 2
val=8
used in this system
*/
require_once("config/database.php");
require_once("incl/functions.php");
if (isset($_GET["q"])) {
	if ($_GET["q"] == 1) {
		$uri = $_GET["svalue"];
		$stm = $db->prepare(" 
			INSERT INTO videos (video_name, isdel)
			VALUES (:uri, 'yes')
		");
		$stm->bindParam(':uri', $uri);
		$stm->execute();	
	}
	if ($_GET["q"] == 2) {
		$id = $_GET["svalue"];
		$stm = $db->prepare(" 
			UPDATE sitepermission 
			SET isdel = 'yes'
			WHERE keyid = :id
		");
		$stm->bindParam(':id', $id);
		$stm->execute();	
	}
	if ($_GET["q"] == 3) {
		$id = $_GET["svalue"];
		$stm = $db->prepare(" 
			UPDATE courses 
			SET isdel = 'yes'
			WHERE course_id = :id
		");
		$stm->bindParam(':id', $id);
		$stm->execute();	
	}
	if ($_GET["q"] == 4) {
		$user = $_GET["svalue"];
		$stm1 = $db->prepare(" 
			UPDATE users 
			SET isdel = 'yes'
			WHERE user_name = :user
		");
		$stm1->bindParam(':user', $user);
		$stm1->execute();
	}
	if ($_GET["q"] == 5) {
		$uri = $_GET["svalue"];
		$stm = $db->prepare(" 
			UPDATE videos 
			SET course_id = ''
			WHERE video_name = :uri
		");
		$stm->bindParam(':uri', $uri);
		$stm->execute();	
	}
	if ($_GET["q"] == 6) {
		$uri = $_GET["svalue"];
		$stm = $db->prepare(" 
			UPDATE coursestudent 
			SET isdel = 'yes'
			WHERE keyid = :uri
		");
		$stm->bindParam(':uri', $uri);
		$stm->execute();	
	}
	if ($_GET["q"] == 7) {
		$uri = $_GET["svalue"];
		$stm = $db->prepare("DELETE FROM inclassvideo WHERE keyid = :uri");
		$stm->bindParam(':uri', $uri);
		$stm->execute();	
	}
	if ($_GET["q"] == 8) {
		$uri = $_GET["svalue"];
		$keyid = $_GET["keyid"];
		$pay = $_GET["payment"];
		$stm = $db->prepare(" 
			UPDATE payment 
			SET isdel = 'yes'
			WHERE keyid = :uri
		");
		$stm->bindParam(':uri', $uri);
		$stm->execute();
		$stms = $db->prepare("SELECT * FROM coursestudent WHERE keyid = :uri");
		$stms->bindParam(':uri', $keyid);
		$stms->execute();
		$stmt = $stms->fetch(PDO::FETCH_ASSOC);
		
		$pay_now = $stmt["pay_now"] - $pay;
		$pay_left = $stmt["pay_left"] + $pay;
		$pay_done = "";
		$pay_done_date ="";
		$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    	$db->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
    	
		$stm1 = $db->prepare(" 
			UPDATE coursestudent 
			SET pay_now = :pay_now, pay_left = :pay_left, pay_done = :pay_done, pay_done_date = :pay_done_date
			WHERE keyid = :uri
		");
		$stm1->bindParam(':uri', $keyid);
		$stm1->bindParam(':pay_now', $pay_now);
		$stm1->bindParam(':pay_left', $pay_left);
		$stm1->bindParam(':pay_done', $pay_done);
		$stm1->bindParam(':pay_done_date', $pay_done_date);
		$stm1->execute();
		echo $pay_now;	
	}
	if ($_GET["q"] == 9) {
		$id = $_GET["svalue"];
		$stm = $db->prepare(" 
			UPDATE inclassoff 
			SET isdel = 'yes'
			WHERE keyid = :id
		");
		$stm->bindParam(':id', $id);
		$stm->execute();
	}
	if ($_GET["q"] == 10) {
		$sid = $_GET["sid"];
		date_default_timezone_set("Asia/Taipei");
		$result2 = $db->prepare("
		  SELECT *
		  FROM inclasslog
		  WHERE sid = :sid
		  ORDER BY keyid DESC
		  ");
		$result2->bindParam(':sid', $sid);
		$result2->execute();
		$result2s = $result2->fetch(PDO::FETCH_ASSOC);
		$indate = $result2s["indate"];
		$intime = $result2s["intime"];

		$today = date("Y-m-d");
		$logintime = date('H:i');

		if ($indate != $today) {
		  	echo "logout";
		}
		if ($indate == $today) {
			$to_time = strtotime($logintime);
			$from_time = strtotime($intime);
			$diff = round(abs($to_time - $from_time) / 60,2);
			
			if ($diff>=240) {
				echo "logout";
			}  
		}
	}
	if ($_GET["q"] == 11) {
		$user = $_GET["username"];
		$stm = $db->prepare(" 
			UPDATE users 
			SET active = 'no'
			WHERE user_name = :id
		");
		$stm->bindParam(':id', $user);
		$stm->execute();
		$stme = $db->prepare(" 
			UPDATE students 
			SET active = 'no'
			WHERE user_name = :id
		");
		$stme->bindParam(':id', $user);
		$stme->execute();
	}
	if ($_GET["q"] == 12) {
		$user = $_GET["username"];
		$stm = $db->prepare(" 
			UPDATE users 
			SET active = 'yes'
			WHERE user_name = :id
		");
		$stm->bindParam(':id', $user);
		$stm->execute();
		$stme = $db->prepare(" 
			UPDATE students 
			SET active = 'yes'
			WHERE user_name = :id
		");
		$stme->bindParam(':id', $user);
		$stme->execute();
	}
	if ($_GET["q"] == 13) {
		$id = $_GET["svalue"];
		$stm = $db->prepare(" 
			UPDATE present 
			SET isdel = 'yes'
			WHERE keyid = :id
		");
		$stm->bindParam(':id', $id);
		$stm->execute();	
	}
}

if (isset($_GET["val"])) {
	if ($_GET["val"] == 1) {
		$uri = $_GET["svalue"];
		$stm = $db->prepare("SELECT * FROM courses WHERE course_id = :uri");
		$stm->bindParam(':uri', $uri);
		$stm->execute();
		$stmt = $stm->fetch(PDO::FETCH_ASSOC);
		echo $stmt["cprice"];
	}
	if ($_GET["val"] == 2) {
		$uri = $_GET["svalue"];
		$stm = $db->prepare("SELECT * FROM users WHERE user_name = :uri");
		$stm->bindParam(':uri', $uri);
		$stm->execute();
		$stmt = $stm->fetchAll(PDO::FETCH_ASSOC);
		if (count($stmt) > 0) {
			echo "0";
		} else {
			echo "1";
		}
	}
	if ($_GET["val"] == 3) {
		$uri = $_GET["svalue"];
		$s = $_GET["sid"];
		$stm = $db->prepare("SELECT * FROM coursestudent WHERE course_id = :uri AND sid = :s AND isdel != 'yes'");
		$stm->bindParam(':uri', $uri);
		$stm->bindParam(':s', $s);
		$stm->execute();
		$stmt = $stm->fetchAll(PDO::FETCH_ASSOC);
		if (count($stmt) > 0) {
			echo "0";
		} else {
			echo "1";
		}
	}
	if ($_GET["val"] == 4) {
		$uri = $_GET["svalue"];
		$s = strtoupper($_GET["seat"]);
		$stm = $db->prepare("SELECT * FROM coursestudent WHERE course_id = :uri AND seat = :s AND isdel != 'yes'");
		$stm->bindParam(':uri', $uri);
		$stm->bindParam(':s', $s);
		$stm->execute();
		$stmt = $stm->fetchAll(PDO::FETCH_ASSOC);
		if (count($stmt) > 0 && $s !="DVD") {
			echo "0";
		} else {
			echo "1";
		}
	}
	if ($_GET["val"] == 5) {
		$uri = $_GET["svalue"];
		$s = $_GET["seat"];
		$stm = $db->prepare("SELECT * FROM coursestudent WHERE course_id = :uri AND seat = :s AND isdel != 'yes'");
		$stm->bindParam(':uri', $uri);
		$stm->bindParam(':s', $s);
		$stm->execute();
		$stmt = $stm->fetchAll(PDO::FETCH_ASSOC);
		if (count($stmt) > 0) {
			echo $stmt[0]["sid"];
		} else {
			echo "none";
		}
	}
	if ($_GET["val"] == 6) {
	$selectvalue = $_GET["svalue"];
	  $result2 = $db->prepare("
	         SELECT *
	         FROM present
	         WHERE course_id = :num 
	         ");
	  $result2->bindParam(':num', $selectvalue);
	  $result2->execute();
	echo '<option value="">請選擇日期..</option>';

	  while($row = $result2->fetch(PDO::FETCH_ASSOC)) {
	  	echo '<option value="'.$row['pdate'].'">' . $row['pdate'] . "</option>";
	  }
	}
	if ($_GET["val"] == 7) {
		$uri = $_GET["svalue"];
		$s = $_GET["pdate"];
		$stm = $db->prepare("SELECT * FROM present WHERE course_id = :uri AND pdate = :sii AND isdel != 'yes'");
		$stm->bindParam(':uri', $uri);
		$stm->bindParam(':sii', $s);
		$stm->execute();
		$stmt = $stm->fetchAll(PDO::FETCH_ASSOC);

		if (count($stmt) > 0) {
			echo "0";
		} else {
			echo "1";
		}
	}
	if ($_GET["val"] == 8) {
		$s = $_GET["username"];
		$stm = $db->prepare("SELECT * FROM users WHERE user_name = :sii AND isdel != 'yes'");
		$stm->bindParam(':sii', $s);
		$stm->execute();
		$stmt = $stm->fetchAll(PDO::FETCH_ASSOC);
		
		if (count($stmt) > 0) {
			echo "0";
		} else {
			echo "1";
		}
	}
	if ($_GET["val"] == 9) {
		$pid = $_GET["pid"];
		$stm = $db->prepare(" 
			UPDATE proposals 
			SET isdel = 'yes'
			WHERE pid = :pid
		");
		$stm->bindParam(':pid', $pid);
		$stm->execute();	
		echo "OK AJAX";
	}
	if ($_GET["val"] == 10) {
		$pid = $_GET["pid"];
		$stm = $db->prepare(" 
			UPDATE proposals 
			SET active = 0
			WHERE pid = :pid
		");
		$stm->bindParam(':pid', $pid);
		$stm->execute();	
		echo "OK AJAX";
	}
}