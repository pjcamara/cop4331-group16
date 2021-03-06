var urlBase = 'http://beautiful-day.tech/LAMPAPI';
var extension = 'php';

var userId = 0;
var firstName = "";
var lastName = "";

function doLogin()
{
	userId = 0;
	firstName = "";
	lastName = "";
	
	var login = document.getElementById("loginName").value;
	var password = document.getElementById("loginPassword").value;
//	var hash = md5( password );
	
	document.getElementById("loginResult").innerHTML = "";

//	var jsonPayload = '{"login" : "' + login + '", "password" : "' + hash + '"}';
	var jsonPayload = '{"login" : "' + login + '", "password" : "' + password + '"}';
	var url = urlBase + '/Login.' + extension;

	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, false);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.send(jsonPayload);
		
		var jsonObject = JSON.parse( xhr.responseText );
		
		userId = jsonObject.id;
		
		if( userId < 1 )
		{
			document.getElementById("loginResult").innerHTML = "User/Password combination incorrect";
			return;
		}
		
		firstName = jsonObject.firstName;
		lastName = jsonObject.lastName;

		saveCookie();
	
		window.location.href = "contactsBeautifulDay.html";
	}
	catch(err)
	{
		document.getElementById("loginResult").innerHTML = err.message;
	}

}

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

function addContact()
{
	var phoneNum = document.getElementById("phoneNum").value;
	var newFName = document.getElementById("firstName").value;
	var newLName = document.getElementById("lastName").value;

	document.getElementById("contactAddResult").innerHTML = "";
	
	var jsonPayload = '{"FirstName" : "' + newFName + '" , "LastName" : "' + 
	newLName + '" , "PhoneNumber" : "' + phoneNum + '" , "UserID" : ' + userId + '}';
	var url = urlBase + '/AddContacts.' + extension;
	
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				document.getElementById("contactAddResult").innerHTML = "Contact has been added";
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("contactAddResult").innerHTML = err.message;
	}
	
}

function searchContact()
{
	var srch = document.getElementById("searchText").value;
	document.getElementById("contactSearchResult").innerHTML = "";
	
	var contactList = "";
	var parent = document.getElementById("contactList");

	var jsonPayload = '{"Search" : "' + srch + '","UserID" : ' + userId + '}';
	var url = urlBase + '/SearchContacts.' + extension;
  

	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				//document.getElementById("contactSearchResult").innerHTML = "Contact(s) has been retrieved";
        
				var jsonObject = JSON.parse( xhr.responseText );
				console.log(jsonObject); //added console log 
        console.log(jsonObject.results); // added console log
				for( var i=0; i<jsonObject.results.length; i++ )
				{
					contactList += jsonObject.results[i];
          console.log(contactList); //added console log
					if( i < jsonObject.results.length - 1 )
					{
						contactList += "<br />\r\n";
                                       
					}
				}

				document.getElementsByTagName("p")[0].innerHTML = contactList;		
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("contactSearchResult").innerHTML = err.message;
	}
	
}

function deleteContact()
{
	var fName = document.getElementById("firstName").value;
	var lName = document.getElementById("lastName").value;
  var contID = document.getElementById("contactID").innerHTML;

	var jsonPayload = '{"FirstName" : "' + fName + '" , "LastName" : "' + 
	lName + '" , "UserID" : ' + contID + '}';
	var url = urlBase + '/DeleteContacts.' + extension;

	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				document.getElementById("contactUpdateResult").innerHTML = "Contact has been deleted";
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("contactDeleteResult").innerHTML = err.message;
	}

}

function updateContact()
{
	var phoneNum = document.getElementById("phoneNum").value;
	var newFName = document.getElementById("firstName").value;
	var newLName = document.getElementById("lastName").value;
  var contID = document.getElementById("contactID").innerHTML;
   

	var jsonPayload = '{"confirstname" : "' + newFName + '" , "conlastname" : "' + 
	newLName + '" , "phonenumber" : "' + phoneNum + '" , "userid" : ' + contID + '}';
	var url = urlBase + '/UpdateContacts.' + extension;

	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				document.getElementById("contactUpdateResult").innerHTML = "Contact has been updated";
			}
		};
    console.log(jsonPayload);//added console log
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("contactUpdateResult").innerHTML = err.message;
	}
}

function updateAllFields()
{
  var phoneNum = document.getElementById("phoneNum").value;
	var newFName = document.getElementById("firstName").value;
	var newLName = document.getElementById("lastName").value;
  var contID = document.getElementById("contactID").innerHTML;
  
  var jsonPayload = '{"confirstname" : "' + newFName + '" , "conlastname" : "' + 
	newLName + '" , "phonenumber" : "' + phoneNum + '" , "userid" : ' + contID + '}';
 
 var url1 = urlBase + '/UpdateFirst.' + extension;
 var url2 = urlBase + '/UpdateLast.' + extension;
 var url3 = urlBase + '/UpdatePhone.' + extension;
 
  var xhr1 = new XMLHttpRequest();
	xhr1.open("POST", url1, true);
	xhr1.setRequestHeader("Content-type", "application/json; charset=UTF-8");
 
 var xhr2 = new XMLHttpRequest();
	xhr2.open("POST", url2, true);
	xhr2.setRequestHeader("Content-type", "application/json; charset=UTF-8");
 
 var xhr3 = new XMLHttpRequest();
	xhr3.open("POST", url3, true);
	xhr3.setRequestHeader("Content-type", "application/json; charset=UTF-8");

  try
	{
		xhr1.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				document.getElementById("contactUpdateResult").innerHTML = "Contact has been updated";
			}
		};
    console.log(jsonPayload);//added console log
		xhr1.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("contactUpdateResult").innerHTML = err.message;
	}
 
 try
	{
		xhr2.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				document.getElementById("contactUpdateResult").innerHTML = "Contact has been updated";
			}
		};
    console.log(jsonPayload);//added console log
		xhr2.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("contactUpdateResult").innerHTML = err.message;
	}
 
 try
	{
		xhr3.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				document.getElementById("contactUpdateResult").innerHTML = "Contact has been updated";
			}
		};
    console.log(jsonPayload);//added console log
		xhr3.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("contactUpdateResult").innerHTML = err.message;
	}

}

function doRegister()
{
	var newFName = document.getElementById("registerFirstName").value;
	var newLName = document.getElementById("registerLastName").value;
	var login = document.getElementById("registerName").value;
	var password = document.getElementById("registerPassword").value;
 
 document.getElementById("registerResult").innerHTML = "";

	var jsonPayload = '{"FirstName" : "' + newFName + '" , "LastName" : "' + 
	newLName + '" , "Login" : "' + login + '" , "Password" : "' + password + '"}';
	var url = urlBase + '/AddUsers.' + extension;

	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				document.getElementById("registerResult").innerHTML = "Succesfully Registered!";
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("registerResult").innerHTML = err.message;
	}
}
function moveToUpdate()
{
  var id = document.getElementById('contactID').value,
        url = 'http://beautiful-day.tech/updateContact.html?contactID=' + encodeURIComponent(id);

    document.location.href = url;
}
function setID() 
{
    var url = document.location.href,
        params = url.split('?')[1].split('&'),
        data = {}, tmp;
    for (var i = 0, l = params.length; i < l; i++) 
    {
         tmp = params[i].split('=');
         data[tmp[0]] = tmp[1];
    }
    document.getElementById('contactID').innerHTML = data.contactID;
}