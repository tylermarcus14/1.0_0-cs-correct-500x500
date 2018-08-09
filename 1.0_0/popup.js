function setDOMInfo(variants, baseDomain) {
	var table = document.getElementById('t01');
	
	table.innerHTML = `<tr>
		<th>Product Name</th>
		<th>Variant ID</th>
		<th>Quantity</th>
	</th>`;

	for (var i=0; i<variants.length; i++) {
		var row = table.insertRow(i+1)
		var cell0 = row.insertCell(0);
		var cell1 = row.insertCell(1);
		var cell2 = row.insertCell(2);
		cell0.innerHTML = variants[i]['title'];
		cell1.innerHTML = `<a target="_blank" href="${baseDomain}/cart/${variants[i].id}:1">${variants[i]['id']}</a>`;
		cell2.innerHTML = variants[i]['inventory_quantity'];
	}
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if(request.variants) {
		setDOMInfo(request.variants, request.baseDomain);
	}
});

chrome.runtime.sendMessage({getLastVariants: true}, savedStatus => {
	setDOMInfo(savedStatus.lastVariants, savedStatus.lastBaseDomain);
})