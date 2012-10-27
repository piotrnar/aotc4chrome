var btn = document.createElement("INPUT");
btn.type = "button"
btn.tabIndex = 4
btn.onclick = sign_contract
btn.value="Sign the contract using #assets-otc browser extension..."
part2.insertBefore(btn, gpghint)


var d = document.createElement("DIV")
d.style.display='none';
d.appendChild(document.createElement("HR"));

var h = document.createElement("H2")
h.appendChild(document.createTextNode("Signed Transfer Request"))
d.appendChild(h);

var ta = document.createElement("TEXTAREA");
ta.id = "signedcontract";
ta.class="mono";
ta.onclick=ta_clicked
ta.rows=25
ta.readOnly=true;
ta.style.width="100%"
ta.style.backgroundColor="#eeeeee";
d.appendChild(ta);
part2.insertBefore(d, extrainfo)

gpghint.style.display='none'
extrainfo.style.display='none'


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
			d.style.display='none';
		} else {
			ta.value = r.data
			//ta.innerText=r.data
			d.style.display='block';
			ta.focus()
			ta.select()
			window.scrollTo(0, document.body.scrollHeight)
			/*var rr = document.execCommand('copy');
			alert("Signed contract has been copied into the clipboard " + rr)
			*/
		}
	} catch (e) {
		alert("Exception: " +  e.String())
		d.style.display='none';
	}
}

