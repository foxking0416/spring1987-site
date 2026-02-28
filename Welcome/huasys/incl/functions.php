<?php
/****Basic functions****/
function Permission_Required($required_permission) {
	if (session_status() == PHP_SESSION_NONE) {
    	session_start();
	}
	$permission =  $_SESSION["permission"];
	if ($permission >= $required_permission) {
		return true;
	} else {
		return false;
	}
}
function return_home($msg="") {
	if ($msg != "") {
		$m = "?msgnum=$msg";
		echo "<script>location.href='index.php".$m."';</script>";
	} else {
		echo "<script>location.href='index.php';</script>";
	}	
    exit;
}

function Permission($p) {
	if (session_status() == PHP_SESSION_NONE) {
    	session_start();
	}
  if ($_SESSION["permission"]<$p || !isset($_SESSION["permission"])) {
      echo "<script>location.href='index.php';</script>";
      exit;
  } 
}
function get_field($table, $col1, $col2, $v) {
	include("config/database.php");
	$sql = "SELECT $col1 FROM $table WHERE $col2 = :v";
	$result = $db->prepare($sql);
	$result->bindParam(':v', $v);
	$result->execute();
	$results = $result->fetch(PDO::FETCH_ASSOC);
	return $results[$col1];
}

//Customized functions 
function show_select_option_users($permission,$uid,$suid="") {
	//suid: selected uid, views/decisionedit.php
	include("config/database.php");
	if ($permission >= 9) {
		$result = $db->prepare("
		SELECT *
		FROM users
		WHERE isdel != 'yes' and active !='no'
		ORDER BY user_id DESC
		");
	} 
	else{
		$result = $db->prepare("
		SELECT *
		FROM users
		WHERE isdel != 'yes' and active !='no' and user_id = $uid
		ORDER BY user_id DESC
		");
	}
	$result->execute();
	$results = $result->fetchAll(PDO::FETCH_ASSOC);

	foreach ($results as $r) {
		$s = ($r['user_id'] == $suid)?"selected":"";
		echo '<option value="'.$r['user_id'].'" '.$s.'>'.$r['name'].'</option>';
	}
}

//Customized functions 
function show_select_option_users_wkeyid($permission,$uid,$wkeyid="",$suid="") {
	//suid: selected uid, views/decisionedit.php
	include("config/database.php");
	if ($permission >= 9) {
		$result = $db->prepare("
		SELECT *
		FROM users
		WHERE isdel != 'yes' and active !='no'
		ORDER BY user_id DESC
		");
		
		$result->execute();
		$results = $result->fetchAll(PDO::FETCH_ASSOC);

		foreach ($results as $r) {
			$s = ($r['user_id'] == $suid)?"selected":"";
			echo '<option value="'.$r['user_id'].'" '.$s.'>'.$r['name'].'</option>';
		}
	} else if($permission >= 7){
		$result = $db->prepare("
		SELECT *
		FROM sitepermission
		WHERE isdel != 'yes' and wkeyid = $wkeyid
		ORDER BY uid DESC
		");
		
		$result->execute();
		$results = $result->fetchAll(PDO::FETCH_ASSOC);

		foreach ($results as $r) {
			$temp = $r['uid'];
			$username = $db->prepare("
			SELECT name
			FROM users
			WHERE isdel != 'yes' and active !='no' and user_id = $temp
			");
			
			$username->execute();
			$username = $username->fetchColumn();
			$s = ($r['uid'] == $suid)?"selected":"";

			echo '<option value="'.$r['uid'].'" '.$s.'>'.$username.'</option>';
		}
	}
	else{
		$result = $db->prepare("
		SELECT *
		FROM users
		WHERE isdel != 'yes' and active !='no' and user_id = $uid
		ORDER BY user_id DESC
		");
		
		$result->execute();
		$results = $result->fetchAll(PDO::FETCH_ASSOC);

		foreach ($results as $r) {
			$s = ($r['user_id'] == $suid)?"selected":"";
			echo '<option value="'.$r['user_id'].'" '.$s.'>'.$r['name'].'</option>';
		}
	}
}

function show_select_option_users_wkeyname($permission,$uid,$wkeyname="",$suid="") {
	//suid: selected uid, views/decisionedit.php
	include("config/database.php");
	if ($permission >= 9) {
		$result = $db->prepare("
		SELECT *
		FROM users
		WHERE isdel != 'yes' and active !='no'
		ORDER BY user_id DESC
		");
		
		$result->execute();
		$results = $result->fetchAll(PDO::FETCH_ASSOC);

		foreach ($results as $r) {
			$s = ($r['user_id'] == $suid)?"selected":"";
			echo '<option value="'.$r['user_id'].'" '.$s.'>'.$r['name'].'</option>';
		}
	} else if($permission >= 7){
		
		$wid = $db->prepare("
		SELECT wkeyid
		FROM worksites
		WHERE isdel != 'yes' and wname = $wkeyname
		");
		
		$wid->execute();
		$wid = $wid->fetchColumn();
		
		
	
		$result = $db->prepare("
		SELECT *
		FROM sitepermission
		WHERE isdel != 'yes' and wkeyid = $wid
		ORDER BY uid DESC
		");
		
		$result->execute();
		$results = $result->fetchAll(PDO::FETCH_ASSOC);

		foreach ($results as $r) {
			$temp = $r['uid'];
			$username = $db->prepare("
			SELECT name
			FROM users
			WHERE isdel != 'yes' and active !='no' and user_id = $temp
			");
			
			$username->execute();
			$username = $username->fetchColumn();
			$s = ($r['uid'] == $suid)?"selected":"";

			echo '<option value="'.$r['uid'].'" '.$s.'>'.$username.'</option>';
		}
	}
	else{
		$result = $db->prepare("
		SELECT *
		FROM users
		WHERE isdel != 'yes' and active !='no' and user_id = $uid
		ORDER BY user_id DESC
		");
		
		$result->execute();
		$results = $result->fetchAll(PDO::FETCH_ASSOC);

		foreach ($results as $r) {
			$s = ($r['user_id'] == $suid)?"selected":"";
			echo '<option value="'.$r['user_id'].'" '.$s.'>'.$r['name'].'</option>';
		}
	}
}

function show_select_option_subjects() {
	include("config/database.php");
	$result = $db->prepare("
		SELECT *
		FROM subjects
		WHERE isdel != 'yes' 
		ORDER BY subject_id ASC
		");
	$result->execute();
	$results = $result->fetchAll(PDO::FETCH_ASSOC);

	foreach ($results as $r) {
		echo '<option value="'.$r['subject'].'">'.$r['subject'].'</option>';
	}
}
function show_option_sites($permission, $uid) {
	include("config/database.php");
	$wkeyids = array();
	if ($permission < 9) {
		$result1 = $db->prepare("
			SELECT *
			FROM sitepermission
			WHERE isdel != 'yes' AND uid = :uid 
			");
		$result1->bindParam(':uid', $uid);
		$result1->execute();
		$result1s = $result1->fetchAll(PDO::FETCH_ASSOC);
		$wkeyids = array();
		foreach ($result1s as $r) {
			$wkeyids[] = $r['wkeyid'];
			//echo "<option>".$r['wkeyid']."</option>";
		}
	} 
		
	$result = $db->prepare("
		SELECT *
		FROM worksites
		WHERE isdel != 'yes' 
		ORDER BY wkeyid ASC
		");
	$result->execute();
	$results = $result->fetchAll(PDO::FETCH_ASSOC);
	foreach ($results as $r) {
		if (in_array($r['wkeyid'], $wkeyids) || $permission >= 9)
		echo '<option value="'.$r['wkeyid'].'">'.$r['wname'].'</option>';
	}
	
}
function show_select_option_site_permission($wkeyid) {
	include("config/database.php");
	$result1 = $db->prepare("
		SELECT *
		FROM sitepermission
		WHERE isdel != 'yes' AND wkeyid = :wkeyid 
		ORDER BY wkeyid ASC
		");
	$result1->bindParam(':wkeyid', $wkeyid);
	$result1->execute();
	$result1s = $result1->fetchAll(PDO::FETCH_ASSOC);
	$uids = array();
	foreach ($result1s as $r) {
		$uids[] = $r['uid'];
	}

	$result = $db->prepare("
		SELECT *
		FROM users
		WHERE isdel != 'yes' AND permission < 9 
		");
	$result->execute();
	$results = $result->fetchAll(PDO::FETCH_ASSOC);

	foreach ($results as $r) {
		if ( ! in_array($r['user_id'], $uids))
			echo '<option value="'.$r['user_id'].'">'.$r['name'].' ('.$r['user_name'].')</option>';
	}
}
function is_site_permission ($permission, $uid, $wkeyid) {
	if ($permission >= 9) return TRUE;
	include("config/database.php");
	$result = $db->prepare("
		SELECT *
		FROM sitepermission
		WHERE isdel != 'yes' AND wkeyid = :wkeyid AND uid = :uid
		");
	$result->bindParam(':wkeyid', $wkeyid);
	$result->bindParam(':uid', $uid);
	$result->execute();
	$results = $result->fetchAll(PDO::FETCH_ASSOC);
	if (count($results) > 0) {
		return TRUE;
	} else {
		return FALSE;
	}
}
// end


function get_course_list($course_id="") {
	include("config/database.php");
	$result1 = $db->prepare("
	  SELECT *
	  FROM courses
	  WHERE isdel !='yes'
	  ");
	$result1->execute();
	$result1s = $result1->fetchAll(PDO::FETCH_ASSOC);
	$count = count($result1s);

	$i = 0;
	while ($i < $count) {
	  $course_ids[] = $result1s[$i]["course_id"];
	  $course_name[] = $result1s[$i]["name"];
	  $course_year[] = $result1s[$i]["year"];
	  $i++;
	}
	$k = 0;
	$options = "";
    while ($k < $count) {
       ($course_ids[$k] == $course_id)?$s="selected":$s="";	
       $options .= '<option value="'.$course_ids[$k].'" '.$s.'>'.$course_name[$k].' ('.$course_year[$k].')</option>'; 
      $k++;
    }
    echo $options;

}
function get_course_s($s) {
	include("config/database.php");
	$result1 = $db->prepare("
	  SELECT *
	  FROM coursestudent INNER JOIN courses USING (course_id)
	  WHERE coursestudent.isdel !='yes' AND coursestudent.sid = :s
	  ");
	$result1->bindParam(':s', $s);
	$result1->execute();
	$result1s = $result1->fetchAll(PDO::FETCH_ASSOC);
	$count = count($result1s);
	$i = 0;
	while ($i < $count) {
	  $course_ids[] = $result1s[$i]["course_id"];
	  $course_name[] = $result1s[$i]["name"];
	  $i++;
	}
	
	$k = 0;
	$options = "";
    while ($k < $count) {
       $options .= '<option value="'.$course_ids[$k].'">'.$course_name[$k].' </option>'; 
      $k++;
    }
    echo $options;
	
	/*
	$result1 = $db->prepare("
	  SELECT *
	  FROM coursestudent
	  WHERE isdel !='yes' AND sid = :s
	  ");
	$result1->bindParam(':s', $s);
	$result1->execute();
	$result1s = $result1->fetchAll(PDO::FETCH_ASSOC);
	$count = count($result1s);
	$result = $db->prepare("
	  SELECT *
	  FROM courses
	  WHERE isdel !='yes' AND course_id = :c
	  ");
	$i = 0;
	while ($i < $count) {
	  $course_ids[] = $result1s[$i]["course_id"];
	  $result->bindParam(':c', $course_ids[$i]);
	  $result->execute();
	  $results = $result->fetch(PDO::FETCH_ASSOC);
	  $course_name[] = $results["name"];
	  $i++;
	}
	
	$k = 0;
	$options = "";
    while ($k < $count) {
       $options .= '<option value="'.$course_ids[$k].'">'.$course_name[$k].' </option>'; 
      $k++;
    }
    echo $options;
	*/
}

function get_sid($p) {
	include("config/database.php");
	$result1 = $db->prepare("
	  SELECT *
	  FROM students
	  WHERE isdel !='yes' AND user_name = :num
	  ");
	$result1->bindParam(':num', $p);
	$result1->execute();
	$result1s = $result1->fetch(PDO::FETCH_ASSOC);
	$count = count($result1s);
	$sid = $result1s["keyid"];
	return $sid;
}

function video_courseid($v) {
	include("config/database.php");
	$result1 = $db->prepare("
	  SELECT *
	  FROM videos
	  WHERE isdel !='yes' AND video_name = :num
	  ");
	$result1->bindParam(':num', $v);
	$result1->execute();
	$result1s = $result1->fetch(PDO::FETCH_ASSOC);
	$count = count($result1s);
	$c = $result1s["course_id"];
	return $c;
}

function is_coursestudent($s, $c) {
	include("config/database.php");
	$result1 = $db->prepare("
	  SELECT *
	  FROM coursestudent
	  WHERE isdel !='yes' AND course_id = :num AND sid = :s
	  ");
	$result1->bindParam(':num', $c);
	$result1->bindParam(':s', $s);
	$result1->execute();
	$result1s = $result1->fetchAll(PDO::FETCH_ASSOC);
	$count = count($result1s);
	if ($count == 1) {
		return true;
	} else {
		return false;
	}

}

function course_videocloud($c) {
	include("config/database.php");
	$result1 = $db->prepare("
	  SELECT *
	  FROM courses
	  WHERE isdel !='yes' AND course_id = :num
	  ");
	$result1->bindParam(':num', $c);
	$result1->execute();
	$result1s = $result1->fetch(PDO::FETCH_ASSOC);
	$count = count($result1s);
	return $result1s["video_cloud"];
}

function course_videoinclass($c) {
	include("config/database.php");
	$result1 = $db->prepare("
	  SELECT *
	  FROM courses
	  WHERE isdel !='yes' AND course_id = :num
	  ");
	$result1->bindParam(':num', $c);
	$result1->execute();
	$result1s = $result1->fetch(PDO::FETCH_ASSOC);
	$count = count($result1s);
	return $result1s["video_inclass"];
}
 

function Video_Permission($p) {
	if (session_status() == PHP_SESSION_NONE) {
    	session_start();
	}
  if ($_SESSION["permission"]<7) {
    if ($p !== $_SESSION["usergroup"]) {
      echo "<script>location.href='index.php';</script>";
      exit;
    }
  }
}
function list_letter_row($p,$x) {
	$i=0;$s="";
	while ($i<$p) {
		$s.="<th style='text-align:center'>".chr(65+$i+$x)."</th>";
		$i++;
	}
	echo $s;
}
function video_cloud_count($s, $c) {
	include("config/database.php");
	$result1 = $db->prepare(" SELECT *
	  FROM coursestudent
	  WHERE isdel !='yes' AND course_id = :num AND sid = :s
	  ");
	$result1->bindParam(':num', $c);
	$result1->bindParam(':s', $s);
	$result1->execute();
	$result1s = $result1->fetch(PDO::FETCH_ASSOC);
	$count = $result1s["video_cloud"];
	if ($count < 1) {
		return_home("10");
		exit;
	}
	$new = $count - 1;
	$stmt = $db->prepare(" UPDATE coursestudent
	SET video_cloud = :num
	WHERE isdel !='yes' AND course_id = :c AND sid = :s
	");
	$stmt->bindParam(':num', $new);
	$stmt->bindParam(':c', $c);
	$stmt->bindParam(':s', $s);
	$stmt->execute();
}
function video_cloud_log($s, $v) {
	date_default_timezone_set("Asia/Taipei");
	include("config/database.php");
	$d = date('Y-m-d');
	$c = date('H:i:s');
	$result = $db->prepare("
	    INSERT INTO videocloudlog (sid, video_name, datec, timec)
	    VALUES (:s, :v, :d, :t)
	    ");
	  $result->bindParam(':s', $s);
	  $result->bindParam(':v', $v);
	  $result->bindParam(':d', $d);
	  $result->bindParam(':t', $c);
	  $result->execute();
}
function video_cloud_log_group($s, $vd, $vg) {
	date_default_timezone_set("Asia/Taipei");
	include("config/database.php");
	$d = date('Y-m-d');
	$c = date('H:i:s');
	$result = $db->prepare("
	    INSERT INTO videocloudlog (sid, vdate, vgroup, datec, timec)
	    VALUES (:s, :vd, :vg, :d, :t)
	    ");
	  $result->bindParam(':s', $s);
	  $result->bindParam(':vd', $vd);
	  $result->bindParam(':vg', $vg);
	  $result->bindParam(':d', $d);
	  $result->bindParam(':t', $c);
	  $result->execute();
}
function video_inclass_count($s, $c) {
	include("config/database.php");
	$result1 = $db->prepare(" SELECT *
	  FROM coursestudent
	  WHERE isdel !='yes' AND course_id = :num AND sid = :s
	  ");
	$result1->bindParam(':num', $c);
	$result1->bindParam(':s', $s);
	$result1->execute();
	$result1s = $result1->fetch(PDO::FETCH_ASSOC);
	$count = $result1s["video_inclass"];
	if ($count < 1) {
		return_home("10");
		exit;
	}
	$new = $count - 1;
	$stmt = $db->prepare(" UPDATE coursestudent
	SET video_inclass = :num
	WHERE isdel !='yes' AND course_id = :c AND sid = :s
	");
	$stmt->bindParam(':num', $new);
	$stmt->bindParam(':c', $c);
	$stmt->bindParam(':s', $s);
	$stmt->execute();
}
function is_allowtime_past($s, $uri) {
	date_default_timezone_set("Asia/Taipei");
	include("config/database.php");
	$a = date('Y-m-d H:i');
	$b = date('Y-m-d');
	$c = date('H:i:s');


	$result = $db->prepare("
	  SELECT * 
	  FROM videocloudlog
	  WHERE sid = :sid AND video_name = :uri
	  ORDER BY keyid DESC
	  ");
	$result->bindParam(':sid', $s);
	$result->bindParam(':uri', $uri);
	$result->execute();
	$results = $result->fetch(PDO::FETCH_ASSOC);
	$time = new Datetime($results["timec"]);
	$logdate = $results["datec"];
	$d = new Datetime($c);
	$m = new Dateinterval('PT3H');
	$x = date_diff($d, $time);
	$pastmin = ($x->h)*60+$x->i;

	if (($logdate == $b && $pastmin >120) || ($logdate!= $b)) {
	  	return true;
	} else {
		return false;
	}
}
function is_allowtime_past_group($s, $vd, $vg) {
	date_default_timezone_set("Asia/Taipei");
	include("config/database.php");
	$a = date('Y-m-d H:i');
	$b = date('Y-m-d');
	$c = date('H:i:s');


	$result = $db->prepare("
	  SELECT * 
	  FROM videocloudlog
	  WHERE sid = :sid AND vdate = :vd AND vgroup = :vg
	  ORDER BY keyid DESC
	  ");
	$result->bindParam(':sid', $s);
	$result->bindParam(':vd', $vd);
	$result->bindParam(':vg', $vg);
	$result->execute();
	$results = $result->fetch(PDO::FETCH_ASSOC);
	$time = new Datetime($results["timec"]);
	$logdate = $results["datec"];
	$d = new Datetime($c);
	$m = new Dateinterval('PT3H');
	$x = date_diff($d, $time);
	$pastmin = ($x->h)*60+$x->i;

	if (($logdate == $b && $pastmin >120) || ($logdate!= $b)) {
	  	return true;
	} else {
		return false;
	}
}
function get_inclass_section($d, $c) {
	$today = $d;
	$lastday = date('Y-m-d',strtotime($today . "+$i days"));
	$options = "";
	$i = 0;
	
	while ($i < $c) {
		$d = date('Y-m-d',strtotime($today . "+$i days"));
		$ss = $d."X"."1";
		$x = get_inclass_order($d, 1);
		$off = check_inclass_off($d, 1);
		if($off) {
		$sss = $d." (09:00~13:00) (已預約: ".$x."人)";
		($x >= 28)?$dis='disabled="disabled" style="color:red"':$dis="";
		$options .= '<option value="'.$ss.'" '.$dis.'>'.$sss.'</option>';
		}
		$ss = $d."X"."2";
		$x = get_inclass_order($d, 2);
		$off = check_inclass_off($d, 2);
		if($off) {
		$sss = $d." (13:00~17:00) (已預約: ".$x."人)";
		($x >= 28)?$dis='disabled="disabled"':$dis="";
		$options .= '<option value="'.$ss.'" '.$dis.'>'.$sss.'</option>';
		}
		$ss = $d."X"."3";
		$x = get_inclass_order($d, 3);
		$off = check_inclass_off($d, 3);
		if($off) {
		$sss = $d." (17:00~21:00) (已預約: ".$x."人)";
		($x >= 28)?$dis='disabled="disabled"':$dis="";
		$options .= '<option value="'.$ss.'" '.$dis.'>'.$sss.'</option>';
		}
		$i++;
	}
	echo $options;
}
function get_inclass_order($d, $s) {
	date_default_timezone_set("Asia/Taipei");
	include("config/database.php");
	$result = $db->prepare("
	  SELECT * 
	  FROM inclassvideo
	  WHERE indate = :d AND section = :s
	  ");
	$result->bindParam(':s', $s);
	$result->bindParam(':d', $d);
	$result->execute();
	$results = $result->fetchAll(PDO::FETCH_ASSOC);
	return count($results);
}
function check_inclass_off($d, $s) {
	date_default_timezone_set("Asia/Taipei");
	include("config/database.php");
	$result = $db->prepare("
	  SELECT * 
	  FROM inclassoff
	  WHERE indate = :d AND section = :s AND isdel != 'yes'
	  ");
	$result->bindParam(':s', $s);
	$result->bindParam(':d', $d);
	$result->execute();
	$results = $result->fetchAll(PDO::FETCH_ASSOC);
	if (count($results) < 1) {
		return true;
	} else {
		return false;
	}
}
function get_course_name($c) {
	include("config/database.php");
	$result = $db->prepare("
	  SELECT * 
	  FROM courses
	  WHERE course_id = :c
	  ");
	$result->bindParam(':c', $c);
	$result->execute();
	$results = $result->fetch(PDO::FETCH_ASSOC);
	return $results["name"];
}

function seat_check ($c, $s) {
	include("config/database.php");
	$result = $db->prepare("
		  SELECT *
		  FROM coursestudent
		  WHERE isdel !='yes' AND course_id = :num AND seat = :s
 		  ");
	$result->bindParam(':num', $c);
	$result->bindParam(':s', $s);
	$result->execute();
	if ($result->rowCount() < 1 || strtoupper($s) == "DVD") {
		return true;
	} else {
		return false;
	}
}
function sid_by_course_seat($c,$s) {
	include("config/database.php");
	$result = $db->prepare("
		  SELECT *
		  FROM coursestudent
		  WHERE isdel !='yes' AND course_id = :num AND seat = :sea
 		  ");
	$result->bindParam(':num', $c);
	$result->bindParam(':sea', $s);
	$result->execute();
	$results = $result->fetch(PDO::FETCH_ASSOC);
	return $results["sid"];
}
function get_seat($c, $s) {
	include("config/database.php");
	$result = $db->prepare("
		  SELECT *
		  FROM coursestudent
		  WHERE isdel !='yes' AND course_id = :num AND sid = :sea
 		  ");
	$result->bindParam(':num', $c);
	$result->bindParam(':sea', $s);
	$result->execute();
	$results = $result->fetch(PDO::FETCH_ASSOC);
	return $results["seat"];
}
?>