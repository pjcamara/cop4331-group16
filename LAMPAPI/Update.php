<?php
	$inData = getRequestInfo();
	
	// userfirstname : user first name
	// userlastname : user last name
	$password = $inData["password"];
	$userid = $inData["userid"];
	$userfirstname = $inData["userfirstname"];
	$userlastname = $inData["userlastname"];
	$login = $inData["login"];
	
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
			$sql = "UPDATE Users SET Password= '$password' WHERE ID= $userid";
			echo "password updated\n";
		}
		else if($userfirstname)
		{
			$sql = "UPDATE Users SET firstName= '$userfirstname' WHERE ID= $userid";
		}
		else if($userlastname)
		{
			$sql = "UPDATE Users SET lastName= '$userlastname' WHERE ID= $userid";
		}
		else if($login)
		{
			$sql = "UPDATE Users SET login= '$login' WHERE ID= $userid";
		}
		//$sql = "Update Users Set Password= '$password' WHERE ID = $userId";
		//$sql = "UPDATE Users SET Password='WeLoveCOP4331' WHERE ID=1";
		//$sql = "Update Users (UserId,Password) SET (" . $userId . ",'" . $password . "')";
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
