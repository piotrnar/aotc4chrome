var d = document.createElement("DIV");
var u = chrome.extension.getURL("options.html");
d.innerHTML = "<br><i>You are using #assets-otc browser \
extension that will help with the login process.<br>\
If you have more then one private key registered in your GnuPG envirionment,<br> \
you may need to select the one for #asset-otc in the extension's \
<a href=\""+u+"\">Options</a>.</i><br><br>";

outform.insertBefore(d, gpgsignedmsg)

gpghint.style.display='none'

function logindataprovided(r)
{
	try {
		if (r.error) {
			alert(r.error_string)
		} else {
			gpghint2.style.display='none'
			gpgsignedmsg.value = r.data
			captchainput.focus()
		}
	} catch (e) {
		alert("Exception: " +  e.String())
	}
}

chrome.extension.sendRequest({"cmd": "login", "data" : gpgchellange.value}, logindataprovided)
