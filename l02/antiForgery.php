<?php

/**
 * Prevents CSRF by compering requst token wih session token
 * @param  string $token
 * @return boolean
 */
function checkForgery($token) {
	var_dump($token);
	var_dump($_SESSION['antiForgeryToken']);
	if (isset($_SESSION['antiForgeryToken'])) {
		if ($token == $_SESSION['antiForgeryToken']) {
			return true;
		}
	}

	return false;
}
	