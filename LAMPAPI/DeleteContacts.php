<?php
	$inData = getRequestInfo();

	// connect
	$conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331");
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		$sql = "DELETE FROM Contacts WHERE UserID = " . $inData["UserID"] . " AND FirstName = '" . $inData["FirstName"] . "' OR UserID = " . $inData["UserID"] . " AND LastName = '" . $inData["LastName"] . "'";

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
