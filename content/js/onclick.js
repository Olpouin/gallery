//Functions of onclicks to make code easier to read
function editCardOC(isTxt) { //Edit a card
	var text = (isTxt) ? document.getElementById('textEdit').value : document.getElementById('textEdit').innerHTML;
	API(
		'edit',
		{
			'type': value('cardsType'),
			'name': value('cardsName'),
			'text': text,
			'group': value('group'),
			'pass': value('pass'),
			'hide': document.getElementById('hide-card').checked
		},
		window.location.pathname.slice(0,-5)
	);
}

function addCardOC() { //Add a card
	API(
		'add',
		{
			'type': value('add-type'),
			'name': value('add-name'),
			'group': value('add-group'),
			'addPass': value('add-pass'),
			'pass': value('pass')
		},
		path+'/'+value('add-type')+'/'+value('add-name')
	);
}
function changeMainParam() { //Edit general config
	API(
		'admin-config',
		{
			'default_language': value('gene-lang'),
			'site_name': value('gene-sitename'),
			'box-default_image': value('gene-defimg'),
			'pass': value('pass')
		},
		window.location.pathname
	);
}
