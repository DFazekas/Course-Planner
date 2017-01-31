<?php
	$ua = getBrowser();
	$yourbrowser = "Your browser: " . $ua['name'] . " " . $ua['version'] . " on " .$ua['platform'] . " reports: <br >" . $ua['userAgent'];

	/* All form fields are automatically passed to the PHP script through the array $HTTP_POST_VARS. */
	$subject   = $_POST['subject'];
	$message   = $_POST['message'];
	$userEmail = $_POST['userEmail'];
	$whoTo     = $_POST['emailWho'];

	/* Determine who is involved in the email */
	$email = 'nismail@mail.uoguelph.ca'; // Default email to both (or can send twice).
	if ($whoTo == 1) {
		$email = 'nismail@mail.uoguelph.ca'; // Devons email
	} else if ($whoTo == 2) {
		$email = 'nismail@mail.uoguelph.ca'; // Nawars email
	}
	if ($userEmail == '') {
		$userEmail = 'nismail@mail.uoguelph.ca (default)'; // Default user email
	}


	// To send HTML mail, the Content-type header must be set
	$headers[] = 'MIME-Version: 1.0';
	$headers[] = 'Content-type: text/html; charset=iso-8859-1';
	$headers[] = 'From: Course Planner <nismail@mail.uoguelph.ca>';

	$finalMessage = "Subject: ".$subject."<br>To: ".$email."(".$whoTo.")<br>From: ".$userEmail."<hr>\n\nMessage:<br>".$message."<br><br><br><hr>".$yourbrowser;
	// echo $finalMessage;
	// elseif (mail($email,$subject, $finalMessage, implode("\r\n", $headers))) {
	// $finalMessage = "Subject: ".$subject."<hr>\n\nMessage: ".$message."\n\n<hr>".$yourbrowser;

	/* Check if emails are valid and subject is valid (maybe message size as well) */
	/* PHP form validation: the script checks that the Email field contains a valid email address and the Subject field isn't empty. preg_match performs a regular expression match. It's a very powerful PHP function to validate form fields and other strings - see PHP manual for details. */
	if (!preg_match("/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/", $userEmail)) {
	  echo "<h4>Invalid email address</h4>";
	  // echo "<a href='javascript:history.back(1);'>Back</a>";
	} elseif (!preg_match("/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/", $email)) { // just in case
	  echo "<h4>Invalid email address</h4>";
	  // echo "<a href='javascript:history.back(1);'>Back</a>";
	} elseif ($subject == "") {
	  echo "<h4>No subject</h4>";
	  // echo "<a href='javascript:history.back(1);'>Back</a>";
	}

	/* Sends the mail and outputs the "Thank you" string if the mail is successfully sent, or the error string otherwise. */
	elseif (mail($email,$subject, $finalMessage,  implode("\r\n", $headers))) {
	  echo "<h4>Thank you for your time, your email has been sent! Your feedback is appreciated!</h4>";
	} else {
	  echo "<h4>Can't send email. Sorry for any inconvience.</h4>";
	}


	// http://stackoverflow.com/questions/8754080/how-to-get-exact-browser-name-and-version
	function getBrowser() 
	{ 
	    $u_agent = $_SERVER['HTTP_USER_AGENT']; 
	    $bname = 'Unknown';
	    $platform = 'Unknown';
	    $version= "";

	    //First get the platform?
	    if (preg_match('/linux/i', $u_agent)) {
	        $platform = 'linux';
	    }
	    elseif (preg_match('/macintosh|mac os x/i', $u_agent)) {
	        $platform = 'mac';
	    }
	    elseif (preg_match('/windows|win32/i', $u_agent)) {
	        $platform = 'windows';
	    }

	    // Next get the name of the useragent yes seperately and for good reason
	    if(preg_match('/MSIE/i',$u_agent) && !preg_match('/Opera/i',$u_agent)) 
	    { 
	        $bname = 'Internet Explorer'; 
	        $ub = "MSIE"; 
	    } 
	    elseif(preg_match('/Firefox/i',$u_agent)) 
	    { 
	        $bname = 'Mozilla Firefox'; 
	        $ub = "Firefox"; 
	    }
	    elseif(preg_match('/OPR/i',$u_agent)) 
	    { 
	        $bname = 'Opera'; 
	        $ub = "Opera"; 
	    } 
	    elseif(preg_match('/Chrome/i',$u_agent)) 
	    { 
	        $bname = 'Google Chrome'; 
	        $ub = "Chrome"; 
	    } 
	    elseif(preg_match('/Safari/i',$u_agent)) 
	    { 
	        $bname = 'Apple Safari'; 
	        $ub = "Safari"; 
	    } 
	    elseif(preg_match('/Netscape/i',$u_agent)) 
	    { 
	        $bname = 'Netscape'; 
	        $ub = "Netscape"; 
	    } 


	    // see how many we have
	    $i = count($matches['browser']);
	    if ($i != 1) {
	        //we will have two since we are not using 'other' argument yet
	        //see if version is before or after the name
	        if (strripos($u_agent,"Version") < strripos($u_agent,$ub)){
	            $version= $matches['version'][0];
	        }
	        else {
	            $version= $matches['version'][1];
	        }
	    }
	    else {
	        $version= $matches['version'][0];
	    }

	    // check if we have a number
	    if ($version==null || $version=="") {$version="?";}

	    return array(
	        'userAgent' => $u_agent,
	        'name'      => $bname,
	        'version'   => $version,
	        'platform'  => $platform,
	        'pattern'    => $known
	    );
	} 


?>