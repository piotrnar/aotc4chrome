var signer = localStorage.signer+""

var plug = null

function init()
{
    plug = document.getElementById('plugin0')
}


chrome.extension.onRequest.addListener(
	function(req, sender, sendResponse) {
		console.log("received msg " + req.cmd)
		switch (req.cmd) {
			case "login":
				sendResponse(plug.gpgSignText([signer], req.data, 0))
				break
			case "clearsign":
				sendResponse(plug.gpgSignText([signer], req.data, 2))
				break
		    case "setsigner":
		    	console.log("setsigner", req.data)
		    	localStorage.signer = req.data
		    	signer = req.data
				sendResponse(signer)
		    	break
		}
	}
)


window.addEventListener("load", init)
