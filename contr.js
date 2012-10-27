var btn = document.createElement("INPUT");
btn.type = "button"
btn.tabIndex = 1
btn.onclick = sign_contract
btn.value="Sign the contract using #assets-otc browser extension..."

outform.insertBefore(btn, ta)


gpghint.style.display='none'


function sign_contract()
{
	chrome.extension.sendRequest({"cmd": "clearsign", "data" : contract.value}, signedcontractprovided)
}

function ta_clicked(t)
{
	ta.select();
}

function signedcontractprovided(r)
{
	try {
		if (r.error) {
			alert(r.error_string)
			ta.readOnly=false;
		} else {
			ta.value = r.data
			ta.style.backgroundColor="#ff8888";
			ta.readOnly=true;
		}
	} catch (e) {
		alert("Exception: " +  e.String())
		ta.readOnly=false;
	}
}

