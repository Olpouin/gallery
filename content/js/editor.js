/*Text edition
https://stackoverflow.com/questions/6637341/use-tab-to-indent-in-textarea*/
if (document.getElementById("textEdit")) {
var txtarea = document.getElementById("textEdit");

function cursorPos() {
	let sel = window.getSelection();
	range = sel.getRangeAt(0);
}
cursorPos();

txtarea.onclick = function(e) {
	cursorPos();
}
txtarea.onkeyup = function(e) {
	cursorPos();
}

//FORMATTING : https://codepen.io/chrisdavidmills/pen/gzYjag

function addFormat(format, param) {
	if ('prompt' in param) val = (typeof param.def !== "undefined") ? prompt("Valeur à envoyer ?", param.def) : "";
	val = (typeof param.def !== "undefined") ? param.def : "";

	document.execCommand(format, false, val);
}
document.execCommand('insertBrOnReturn');

function addText(format,cursorMove) { // Note to self : /!\ insertNode() might be broken in the future
	formatStart = format.substring(0, cursorMove);
	formatEnd = format.substring(cursorMove);

	let sel = window.getSelection();
	sel.removeAllRanges();

	/*if (format == "[quote][au][/au][/quote]") {
		oldData = range.cloneContents();
		range.deleteContents();
		var blockquote = newElement('blockquote',{});
		blockquote.append(newElement('span',{'txt':'[quote]','class':'hidden'}));
		blockquote.append(newElement('span',{'txt':oldData.textContent}));
		blockquote.append(newElement('span',{'txt':'[au]','class':'hidden'}));
		blockquote.append(newElement('cite',{'txt':'Auteur'}));
		blockquote.append(newElement('span',{'txt':'[/au][/quote]','class':'hidden'}));
		range.insertNode(blockquote);
	} else {*/
		formatStartID = "format-"+UUID();
		range.insertNode(newElement('span',{'txt':formatStart,'class':'format-txt','attr':{'id':formatStartID}}));
		range.collapse()
		formatEndID = "format-"+UUID();
		range.insertNode(newElement('span',{'txt':formatEnd,'class':'format-txt','attr':{'id':formatEndID}}));
		range.setStartBefore(document.getElementById(formatStartID));
		range.setEndAfter(document.getElementById(formatEndID));
	//}

	txtarea.focus();
	sel.addRange(range);
}

txtarea.onkeydown = function(e) {
	let select = window.getSelection();
	latestCursorPositionStart = select.anchorOffset;
	latestCursorPositionEnd = select.focusOffset;
	if((e.shiftKey || e.shiftKey) && ((e.keyCode==9 || e.which==9) || (e.keyCode==49 || e.which==49) || (e.keyCode==50 || e.which==50))){
		switch (e.keyCode) {
			case 49:
				var textAdd = "[ib]\r\n[h1][/h1]\r\n![]()\r\n[ibd]|[/ibd]\r\n[ibd]|[/ibd]\r\n[ibd]|[/ibd]\r\n[/ib]";
				var selectAdd = 9;
				break;
			case 50:
				var textAdd = "[ibd]|[/ibd]";
				var selectAdd = 5;
				break;
			default:
				var textAdd = "\t";
				var selectAdd = 1;
		}
		e.preventDefault();
		addText(textAdd, selectAdd);
	}
	if ((e.keyCode == 17 || e.which == 17) || e.ctrlKey) {
		var selectAdd = 3;
		switch (e.keyCode) {
			case 73:
				e.preventDefault();
				addFormat("italic",{});
				break;
			case 66:
				e.preventDefault();
				addFormat("bold",{});
				break;
			case 83:
				e.preventDefault();
				addFormat("strikeThrough",{});
				break;
			case 85:
				e.preventDefault();
				addFormat("underline",{});
				break;
			case 79:
				e.preventDefault();
				addFormat("foreColor",{"def":"#003399"});
				break;
		}
	}
}
}
