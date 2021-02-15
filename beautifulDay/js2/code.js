// javacsript is thin layer of code behind presentation layer (html / css)
var urlBase = 'http://COP4331-5.com/LAMPAPI'; // global variable for url
var extension = 'php';

// global local variables
var userId = 0;
var firstName = "";
var lastName = "";

function doLogin() // called from index.html onclick="doLogin"
{
	userId = 0;
	firstName = "";
	lastName = "";

	// get data from the user interface
	var login = document.getElementById("loginName").value; // gets html object "loginName" value and stores in var login
		// from index.html id="loginName"
		// CASE SENSITIVE
	var password = document.getElementById("loginPassword").value; // gets html object "loginPassword" value and stores in password
		// from index.html id="loginPassword"
		// CASE SENSITIVE

	var hash = md5( password );

	document.getElementById("loginResult").innerHTML = ""; // initalize to know if there was an error

	var jsonPayload = '{"login" : "' + login + '", "password" : "' + hash + '"}'; // this uses the hash password value
//var jsonPayload = '{"login" : "' + login + '", "password" : "' + password + '"}'; // "same as above"
									// {"login" : "RickL", "password" : "COP4331" }
									// single quotes for the whole string ' '
									// json requires the double quotes " " within the string

	var url = urlBase + '/Login.' + extension; // create the url

	var xhr = new XMLHttpRequest(); // javacsript object
	xhr.open("POST", url, false); // request POST, COP4331-5com, false - do synchronously
		// POST means to send something to the sever
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8"); // tells us that we will be sending JSON data

	try // try catch block to catch errors
	{
		xhr.send(jsonPayload); // send request

		var jsonObject = JSON.parse( xhr.responseText ); // get object

		userId = jsonObject.id; // get ID from JSON object

		if( userId < 1 ) // less than 1: User not in database
		{
			document.getElementById("loginResult").innerHTML = "User/Password combination incorrect";
			return;
		}

		// get first and last name
		firstName = jsonObject.firstName;
		lastName = jsonObject.lastName;

		saveCookie();

		window.location.href = "color.html";
		// redirect to color.html where where we can search or add colors
	}
	catch(err)
	{
		document.getElementById("loginResult").innerHTML = err.message;
	}

}
//-------------------------------
function doRegister() // called from index.html onclick="doLogin"
{
	// get data from the user interface
	var login = document.getElementById("registerName").value; // gets html object "loginName" value and stores in var login
		// from index.html id="loginName"
		// CASE SENSITIVE
	var password = document.getElementById("registerPassword").value; // gets html object "loginPassword" value and stores in password
		// from index.html id="loginPassword"
		// CASE SENSITIVE
	var first = document.getElementById("registerFirstName").value; // gets html object "loginPassword" value and stores in password
	var last = document.getElementById("registerLastName").value; // gets html object "loginPassword" value and stores in password
	var hash = md5( password );

	document.getElementById("loginResult").innerHTML = ""; // initalize to know if there was an error

	var jsonPayload = '{"login" : "' + login + '", "password" : "' + hash + '", "first" : "' + firstName + '", "last" : "' + lastName +'"}'; // firstName and lastName have to be same in server
	//var jsonPayload = '{"login" : "' + login + '", "password" : "' + password + '"}'; // "same as above"

//var dat = {login:login, password:hash, first:firstName, last:lastName};
//var jsonPay = JSON.stringify(dat); // another way to do above jsonPayload

	//alert( jsonPayload ); // makes sure it works

	var url = urlBase + '/Register.' + extension; // create the url

	var xhr = new XMLHttpRequest(); // javacsript object
	xhr.open("POST", url, true); // request POST, COP4331-5com, false - do synchronously / true - asychronoulsy
		// POST means to send something to the sever
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8"); // tells us that we will be sending JSON data

	try // try catch block to catch errors
	{
		xhr.onreadystatechange = function()
		{
			if (this.readyState == 4 && this.status == 200)
			{
				window.location.href = "index.html";
			}
		};

		xhr.send(jsonPayload); // send request
	}
	catch(err)
	{
		document.getElementById("colorAddResult").innerHTML = err.message;
	}

}
//-----------
function saveCookie()
{
	var minutes = 20;
	var date = new Date();
	date.setTime(date.getTime()+(minutes*60*1000));
	document.cookie = "firstName=" + firstName + ",lastName=" + lastName + ",userId=" + userId + ";expires=" + date.toGMTString();
}

function readCookie()
{
	userId = -1;
	var data = document.cookie;
	var splits = data.split(",");
	for(var i = 0; i < splits.length; i++)
	{
		var thisOne = splits[i].trim();
		var tokens = thisOne.split("=");
		if( tokens[0] == "firstName" )
		{
			firstName = tokens[1];
		}
		else if( tokens[0] == "lastName" )
		{
			lastName = tokens[1];
		}
		else if( tokens[0] == "userId" )
		{
			userId = parseInt( tokens[1].trim() );
		}
	}

	if( userId < 0 )
	{
		window.location.href = "index.html";
	}
	else
	{
		document.getElementById("userName").innerHTML = "Logged in as " + firstName + " " + lastName;
	}
}

function doLogout()
{
	userId = 0;
	firstName = "";
	lastName = "";
	document.cookie = "firstName= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
	window.location.href = "index.html";
}

function addColor()
{
	var newColor = document.getElementById("colorText").value;
	document.getElementById("colorAddResult").innerHTML = "";

	var jsonPayload = '{"color" : "' + newColor + '", "userId" : ' + userId + '}';
	var url = urlBase + '/AddColor.' + extension;

	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function()
		{
			if (this.readyState == 4 && this.status == 200)
			{
				document.getElementById("colorAddResult").innerHTML = "Color has been added";
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("colorAddResult").innerHTML = err.message;
	}

}

function searchColor()
{
	var srch = document.getElementById("searchText").value;
	document.getElementById("colorSearchResult").innerHTML = "";

	var colorList = "";

	var jsonPayload = '{"search" : "' + srch + '","userId" : ' + userId + '}';
	var url = urlBase + '/SearchColors.' + extension;

	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function()
		{
			if (this.readyState == 4 && this.status == 200)
			{
				document.getElementById("colorSearchResult").innerHTML = "Color(s) has been retrieved";
				var jsonObject = JSON.parse( xhr.responseText );

				for( var i=0; i<jsonObject.results.length; i++ )
				{
					colorList += jsonObject.results[i];
					if( i < jsonObject.results.length - 1 )
					{
						colorList += "<br />\r\n";
					}
				}

				document.getElementsByTagName("p")[0].innerHTML = colorList;
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("colorSearchResult").innerHTML = err.message;
	}

}
