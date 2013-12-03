<?php

require_once("sec.php");

if (!session_id()) {
	sec_session_start();
}

// Removes the user session
if (isset($_SESSION['user'])) {
	unset($_SESSION['user']);
	header('Location: /');
}
