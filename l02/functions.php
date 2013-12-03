<?php
require_once("get.php");
require_once("add.php");
require_once("sec.php");
require_once("antiForgery.php");
sec_session_start();

/*
* It's here all the ajax calls goes
*/ 

if (isset($_POST['function'])) {
  if($_POST['function'] == 'add') {
       
      $name = htmlentities($_POST["name"]);
      $message = htmlentities($_POST["message"]);
      $pid = htmlentities($_POST["pid"]);
      
      // Check if request is valid
      if (checkForgery($_POST['antiForgeryToken'])) {
        addToDB($name, $message, $pid);
        echo(json_encode(['message' => $message, 'name' => $name]));  
      }
      
      else {
        header('HTTP/1.1 401 Unauthorized'); die(); // Yey!
      }   
    }
}

if(isset($_GET['function'])) {
	
    if ($_GET['function'] == 'producers') {
    	$pid = htmlentities($_GET["pid"]);
      $cleanProducers = getProducer($pid);

      foreach ($cleanProducers as $key => $value) {
        $cleanProducers[$key] = htmlspecialchars($cleanProducers[$key]);
      }
     
   		echo(json_encode($cleanProducers));
    }

    elseif($_GET['function'] == 'getIdsOfMessages') {
       	$pid = htmlentities($_GET["pid"]);
   	   	echo(json_encode(getMessageIdForProducer($pid)));
    } 

    elseif($_GET['function'] == 'getMessage') {
       	$serial = htmlentities($_GET["serial"]);
        $message = getMessage($serial);
        
        foreach ($message as $key => $value) {
          $message[$key] = htmlspecialchars($message[$key]);
        }

        //var_dump($message);
   	   	echo(json_encode($message));
    }  
}