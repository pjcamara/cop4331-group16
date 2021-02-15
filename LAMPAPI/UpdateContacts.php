<?php
	$inData = getRequestInfo();
	
	$phonenumber = $inData["phonenumber"];
	$userid = $inData["userid"];
	$confirstname = ' ' . $inData["confirstname"];
	$conlastname = ' ' . $inData["conlastname"];
	
 
	$conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331");

	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		if($phonenumber)
		{
			$sql = "UPDATE Contacts SET PhoneNumber = '$phonenumber' WHERE ID = $userid";
		}
	  else if($confirstname)
		{
			$sql = "UPDATE Contacts SET firstName= '$confirstname' WHERE ID= $userid";
		}
  	else if($conlastname)
		{
			$sql = "UPDATE Contacts SET lastName= '$conlastname' WHERE ID= $userid";
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