<?php
	$inData = getRequestInfo();
	
	$password = $inData["password"];
	$userId = $inData["userId"];
	/*
	$conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331");
	echo "hullo\n";
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		$sql = "Update Users Set Password= '$password' WHERE ID = $userId";
		//$sql = "UPDATE Users SET Password='WeLoveCOP4331' WHERE ID=1";
		//$sql = "Update Users (UserId,Password) SET (" . $userId . ",'" . $password . "')";
		if( $result = $conn->query($sql) != TRUE )
		{
			returnWithError( $conn->error );
		}
		$conn->close();
	}
	*/
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