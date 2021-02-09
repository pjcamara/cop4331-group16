<?php
	$inData = getRequestInfo();
	
	// confirstname : contact first name
	// conlastname : contact last name
	$password = $inData["password"];
	$contactid = $inData["contactid"];
	$confirstname = $inData["confirstname"];
	$conlastname = $inData["conlastname"];
	//$login = $inData["login"];
	
	$conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331");
	//echo "hullo\n";
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		if($password)
		{
			$sql = "UPDATE Contact SET Password= '$password' WHERE ID= $contactid";
			//echo "password updated\n";
		}
		else if($confirstname)
		{
			$sql = "UPDATE Contact SET firstName= '$confirstname' WHERE ID= $contactid";
		}
		else if($conlastname)
		{
			$sql = "UPDATE Contact SET lastName= '$conlastname' WHERE ID= $contactid";
		}
		else if($login)
		{
			$sql = "UPDATE Contact SET login= '$login' WHERE ID= $contactid";
		}
		
		if( $result = $conn->query($sql) != TRUE )
		{
			returnWithError( $conn->error );
		}
		$conn->close();
	}
	
	returnWithError("");
	
	function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}

	function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		echo $obj;
	}
	
	function returnWithError( $err )
	{
		$retValue = '{"error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	
?>