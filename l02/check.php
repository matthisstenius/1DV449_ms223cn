<?php
require_once("sec.php");

// check tha POST parameters
$u = htmlspecialchars($_POST['username']);
$p = htmlspecialchars($_POST['password']);

// Check if user is OK
if(isUser($u, $p)) {
	// set the session
	sec_session_start();
	$_SESSION['login_string'] = hash('sha512', "Come_On_You_Spurs" +$u); 
	$_SESSION['user'] = $u;
	header("Location: mess.php");
}
else {
	// To bad
	header('HTTP/1.1 401 Unauthorized');
}
