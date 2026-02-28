<?php
// show potential errors / feedback (from login object)
$msg = "";
if (isset($login)) {
    if ($login->errors) {
        foreach ($login->errors as $error) {
            $msg = $msg . $error;
        }
    }
    if ($login->messages) {
        foreach ($login->messages as $message) {
            $msg = $msg . $message;
        }
    }
}
?>
<!DOCTYPE html>
<html>

<head>

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title><?=SYSTEM_SHORT_NAME?> | 登入</title>

    <link href="css/bootstrap.min.css" rel="stylesheet">
    <link href="font-awesome/css/font-awesome.css" rel="stylesheet">

    <link href="css/animate.css" rel="stylesheet">
    <link href="css/style.css" rel="stylesheet">

</head>

<body class="gray-bg">

    <div class="middle-box text-center loginscreen animated fadeInDown">
        <div>
            <div style="width:80px;display:inline-block;margin-left:-130px"><img style="width:80px;display:inline-block" src="img/logo.svg" /></div>
            <div style="width:180px;display:inline-block"><img style="width:300px;display:inline-block;" src="img/logotext.svg" /></div>
            <h2><?=SYSTEM_SHORT_NAME?></h2>
            <p style="color:red"> <?php echo $msg; ?>
            </p>
            <p></p>
            <form class="m-t" role="form" action="index.php" method="post" style="margin:40px auto;width:70%">
                <div class="form-group">
                    <input type="text" id="login_input_username" class="form-control" name="user_name" placeholder="帳號" required="">
                </div>
                <div class="form-group">
                    <input type="password" id="login_input_password" class="form-control" name="user_password" placeholder="密碼" autocomplete="off" required="">
                </div>
                <input type="hidden"  name="login" />
                <button type="submit" class="btn btn-primary block full-width m-b">登入</button>
                <!--
                <p><small>忘記密碼?</small></p>
                <p class="text-muted text-center"><small>請聯絡我們:</small></p>
                -->
            </form>
        
        </div>
    </div>

    <!-- Mainly scripts -->
    <script src="js/jquery-2.1.1.js"></script>
    <script src="js/bootstrap.min.js"></script>

</body>

</html>
