var bp = chrome.extension.getBackgroundPage()


function signerset(id)
{
	alert("Key ID " + id + " will be used for #assets-otc")
}


function save()
{
	var id = pk.options[pk.selectedIndex].value
	console.log("safing "+id)
	chrome.extension.sendRequest({"cmd": "setsigner", "data" : id}, signerset)
	console.log("msg sent")
}

function initpage()
{
	var sk = bp.plug.getPrivateKeyList()
	for (k in sk) {
		console.log("Keys", sk[k])
		var o=document.createElement("option")
		o.text = sk[k].name + " <" + sk[k].email + "> (" + sk[k].fingerprint + ")"
		o.value=k
		pk.add(o,null)
		if (k==bp.signer) {
			pk.selectedIndex=pk.options.length-1
		}
	}
	
	document.querySelector('#sav').addEventListener('click', function() {save()} )
}


document.addEventListener('DOMContentLoaded', initpage)
