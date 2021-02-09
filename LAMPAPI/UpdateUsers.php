<?php
	$inData = getRequestInfo();
	
	$password = $inData["password"];
	$userid = $inData["userid"];
	$userfirstname = $inData["userfirstname"];
	$userlastname = $inData["userlastname"];
	$login = $inData["login"];
	
	$conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331");

	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		if($password)
		{
			$sql = "UPDATE Users SET Password= '$password' WHERE ID= $userid";
		}
		else if($userfirstname)
		{
			$sql = "UPDATE Users SET FirstName= '$userfirstname' WHERE ID= $userid";
		}
		else if($userlastname)
		{
			$sql = "UPDATE Users SET LastName= '$userlastname' WHERE ID= $userid";
		}
		else if($login)
		{
			$sql = "UPDATE Users SET Login= '$login' WHERE ID= $userid";
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
