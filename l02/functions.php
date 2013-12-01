<?php
require_once("get.php");
require_once("add.php");
require_once("sec.php");
sec_session_start();

/*
* It's here all the ajax calls goes
*/ 
if(isset($_GET['function'])) {
	
	if($_GET['function'] == 'logout') {
		logout();
    } elseif($_GET['function'] == 'add') {
       
	  $name = htmlentities($_GET["name"]);
		$message = htmlentities($_GET["message"]);
		$pid = htmlentities($_GET["pid"]);
		
		addToDB($name, $message, $pid);
		echo "Det gick fint! Ladda om sidan för att se ditt meddelande!";
    }

    elseif($_GET['function'] == 'producers') {
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