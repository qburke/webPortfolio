var currentIndex = 1;

function initList(){
	// get number of items in the list
	var itemNoInput = document.getElementById("startingItemsIN");
	var itemNo = itemNoInput.value;
	
	// check if greater than or equal zero or empty string
	if(itemNoInput.checkValidity == false){
		document.getElementById("errorMsg").innerHTML = itemNoInput.validationMessage;
	} else{
		// JQuery testing
		/*var testButton = document.createElement("Button");
		testButton.innerHTML = "Test";
		testButton.setAttribute("id", "testButton");
		document.body.appendChild(testButton);*/
		
		// remove items in list psuedo-form
		document.getElementById("startingItemsIN").remove();
		document.getElementById("initButton").remove();
		document.getElementById("itemQuestion").remove();
		//document.getElementById("testAnchorID").remove();
		
		// test p used in development (For whatever reason I didn't use console log for a bit...)
		/*var testPar = document.createElement("p");
		testPar.setAttribute("id", "testPar");
		testPar.innerHTML = "Test Paragraph";
		document.getElementById("masterContainer").appendChild(testPar);*/
	
		// creating main div and appending
		var mainBody = document.createElement("div");
		mainBody.setAttribute("id", "mainBody");
		document.body.appendChild(mainBody);
		
		// creating ul
		var uList = document.getElementById("masterList");
		// creating the number of list items specified by the user
		for(i = 0; i<itemNo; i++){
			createListItem(i, uList);
		}
		mainBody.appendChild(uList);
		
		// creating add item button
		var addItemButton = document.createElement("Button");
		addItemButton.setAttribute("id", "addButton");
		addItemButton.innerHTML = "Add Item";
		addItemButton.onclick = function(){
			createListItem(currentIndex, uList);
		};
		mainBody.appendChild(addItemButton);
		
		/* var testAnchor = document.createElement("a");
		testAnchor.setAttribute("class", "testAnchor");
		testAnchor.innerHTML = "TEEEEEEEEEEEEEEEEEEEST";
		document.body.appendChild(testAnchor); */
	}
}

function createListItem(i, uList){
	// creating list item with id (based on order) and class
	var listItem = document.createElement("li");
	listItem.setAttribute("id", "listItem" + i);
	listItem.setAttribute("class", "listItems");

	// creating anchor to hold elements (for JQuery)
	var aContainer = document.createElement("a");
	aContainer.setAttribute("id", "anchor" + i);
	aContainer.setAttribute("class", "anchorLinks");
	
	// creating "Number: " text and specifying id, class and text
	var parItemNoPrompt = document.createElement("div");
	parItemNoPrompt.setAttribute("id", "itemNoPrompt" + i)
	parItemNoPrompt.setAttribute("class", "itemNoPrompts");
	parItemNoPrompt.innerHTML = "Number: ";
	
	// creating input text field with id, class, and attributes
	var numberField = document.createElement("input");
	numberField.setAttribute("id", "numberField" + i);
	numberField.setAttribute("class", "numberFields");
	numberField.type = "number";
	numberField.min = 1;
	numberField.required = true;
	
	// creating "Enter"/confirm button for the number entered by user and its onclick function
	var numberButton = document.createElement("Button");
	numberButton.setAttribute("id", "numberButton" + i);
	numberButton.setAttribute("class", "numberButtons");
	numberButton.innerHTML = "Enter";
	numberButton.onclick = function (){
		enterNumberValue(this.id);
	};
	
	// creating "Item: " text and specifying id, class, and text
	var parItemPrompt = document.createElement("div");
	parItemPrompt.setAttribute("id", "itemPrompt" + i)
	parItemPrompt.setAttribute("class", "itemPrompts");
	parItemPrompt.innerHTML = "Item: ";
	
	// creating input text field with id, class, and attributes
	var txtField = document.createElement("input");
	txtField.setAttribute("id", "txtField" + i);
	txtField.setAttribute("class", "txtFields");
	txtField.type = "text";
	txtField.required = true;
	
	// creating "Enter"/confirm button for the item entered by user and its onclick function
	var enterButton = document.createElement("Button");
	enterButton.setAttribute("id", "enterButton" + i);
	enterButton.setAttribute("class", "enterButtons");
	enterButton.innerHTML = "Enter";
	enterButton.onclick = function(){
		enterItemValue(this.id);
	};
	
	var deleteButton = document.createElement("Button");
	deleteButton.setAttribute("id", "deleteButton" + i);
	deleteButton.setAttribute("class", "deleteButtons");
	deleteButton.innerHTML = "Delete";
	deleteButton.onclick = function(){
		deleteListItem(this.id);
	};
	
	aContainer.appendChild(parItemNoPrompt);
	aContainer.appendChild(numberField);
	aContainer.appendChild(numberButton);
	aContainer.appendChild(parItemPrompt);
	aContainer.appendChild(txtField);
	aContainer.appendChild(enterButton);
	aContainer.appendChild(deleteButton);
	listItem.appendChild(aContainer);
	uList.appendChild(listItem);
	currentIndex++;
	
	// JQuery for buttons
	$("#listItem"+ i).hover(
	function(){ $("#deleteButton" + i).css("visibility", "visible");},
	function(){ $("#deleteButton" + i).css("visibility", "hidden");}
	);
	$("#listItem"+ i).hover(
	function(){ $("#enterButton" + i).css("visibility", "visible");},
	function(){ $("#enterButton" + i).css("visibility", "hidden");}
	);
	$("#listItem"+ i).hover(
	function(){ $("#numberButton" + i).css("visibility", "visible");},
	function(){ $("#numberButton" + i).css("visibility", "hidden");}
	);
}

function enterNumberValue(button_id){
	// getting the element's "number" in the list to reference certain ids
	var index = button_id.charAt(button_id.length-1);
	// checking number of items is not negative
	// Note: was going to use .checkValidity but did not work. Might be because it is an <input> not in a <form>
	var itemNumber = document.getElementById("numberField" + index).value;
	if(itemNumber < 0 || typeof(itemNumber) != int){ document.getElementById("numberField" + index).value = "" }
	else{
		// deleting psuedo-form
		document.getElementById("numberButton" + index).remove();
		document.getElementById("numberField" + index).remove();
		if(document.getElementById("itemPrompt" + index).innerHTML == "Item: "){
			// displaying the item inputted by user in the "Item: " text for now because they still have to enter the number
			document.getElementById("itemNoPrompt" + index).innerHTML = itemNumber;
		}
		else{
			// displaying the item and its amount in the "li"
			var itemName = document.getElementById("itemPrompt" + index).innerHTML;
			document.getElementById("itemNoPrompt" + index).remove();
			document.getElementById("itemPrompt" + index).remove();
			document.getElementById("anchor" + index).innerHTML = itemNumber + " " + itemName;
			
			// creating editButton
			var editButton = document.createElement("Button");
			editButton.setAttribute("id", "editButton" + index);
			editButton.innerHTML = "Edit";
			editButton.onclick = function(){
				editListItem(this.id);
			};
			document.getElementById("anchor" + index).appendChild(editButton);
			
			// creating deleteButton
			var deleteButton = document.createElement("Button");
			deleteButton.setAttribute("id", "deleteButton" + index);
			deleteButton.setAttribute("class", "deleteButtons");
			deleteButton.innerHTML = "Delete";
			deleteButton.onclick = function(){
				deleteListItem(this.id);
			};
			document.getElementById("anchor" + index).appendChild(deleteButton);
			
			// JQuery for buttons
			$("#listItem"+ i).hover(
			function(){ $("#editButton" + index).css("visibility", "visible");},
			function(){ $("#editButton" + index).css("visibility", "hidden");}
			);
			$("#listItem"+ i).hover(
			function(){ $("#deleteButton" + index).css("visibility", "visible");},
			function(){ $("#deleteButton" + index).css("visibility", "hidden");}
			);
		}
	}
}

function enterItemValue(button_id){
	// getting the element's "number" in the list to reference certain ids
	var index = button_id.charAt(button_id.length-1);
	// checking input isnt an empty string
	// Note: Was going to use .checkValidity() but did not work. Might be because the input is not part of a <form>
	if(document.getElementById("txtField" + index).value == ""){}
	else{
		// deleting psuedo-form
		document.getElementById("enterButton" + index).remove();
		var itemName = document.getElementById("txtField" + index).value;
		document.getElementById("txtField" + index).remove();
		if(document.getElementById("itemNoPrompt" + index).innerHTML == "Number: "){
			// displaying the item inputted by user in the "Item: " text for now because they still have to enter the number
			document.getElementById("itemPrompt" + index).innerHTML = itemName;
		}
		else{
			// displaying the item and its amount in the "li"
			var itemNumber = document.getElementById("itemNoPrompt" + index).innerHTML;
			document.getElementById("itemNoPrompt" + index).remove();
			document.getElementById("itemPrompt" + index).remove();
			document.getElementById("anchor" + index).innerHTML = itemNumber + " " + itemName;
			
			// creating editButton
			var editButton = document.createElement("Button");
			editButton.setAttribute("id", "editButton" + index);
			editButton.setAttribute("class", "editButtons");
			editButton.innerHTML = "Edit";
			editButton.onclick = function(){
				editListItem(this.id);
			};
			document.getElementById("anchor" + index).appendChild(editButton);
			
			// creating deleteButton
			var deleteButton = document.createElement("Button");
			deleteButton.setAttribute("id", "deleteButton" + index);
			deleteButton.setAttribute("class", "deleteButtons");
			deleteButton.innerHTML = "Delete";
			deleteButton.onclick = function(){
				deleteListItem(this.id);
			};
			document.getElementById("anchor" + index).appendChild(deleteButton);
			
			// JQuery for buttons
			$("#listItem"+ index).hover(
			function(){ $("#editButton" + index).css("visibility", "visible");},
			function(){ $("#editButton" + index).css("visibility", "hidden");}
			);
			$("#listItem"+ index).hover(
			function(){ $("#deleteButton" + index).css("visibility", "visible");},
			function(){ $("#deleteButton" + index).css("visibility", "hidden");}
			);
		}
	}
}

function deleteListItem(button_id){
	// getting the item's number in the list to reference certain ids
	var index = button_id.charAt(button_id.length-1);
	// removing the specific "li"
	document.getElementById("listItem" + index).remove();
}

function editListItem(button_id){
	// Creating input and button populated with the text to be edited
	var index = button_id.charAt(button_id.length-1);
	document.getElementById(button_id).remove();
	var eItem = document.getElementById("anchor" + index);
	document.getElementById("deleteButton" + index).remove();
	// Lukas' suggestion
	var idunnosomethingthatprobablymakessense = eItem.innerHTML;
	eItem.innerHTML = "";
	var editText = document.createElement("input");
	editText.setAttribute("id", "editText" + index);
	editText.setAttribute("class", "editInputs");
	editText.value = idunnosomethingthatprobablymakessense;
	eItem.appendChild(editText);
	
	// done Button
	var doneButton = document.createElement("Button");
	doneButton.setAttribute("id", "doneButton" + index);
	doneButton.setAttribute("class", "doneButtons");
	doneButton.innerHTML = "Done";
	doneButton.onclick = function(){
		doneEditing(this.id);
	};
	eItem.appendChild(editText);
	eItem.appendChild(doneButton);
}

function doneEditing(button_id){
	var index = button_id.charAt(button_id.length-1);
	editField = document.getElementById("editText" + index)
	var editedText = editField.value;
	editField.remove();
	document.getElementById(button_id).remove();
	document.getElementById("anchor" + index).innerHTML = editedText;
	
	//creating edit and delete buttons again
	var delButton = document.createElement("Button");
	delButton.setAttribute("id", "deleteButton" + index);
	delButton.setAttribute("class", "deleteButtons");
	delButton.innerHTML = "Delete";
	delButton.onclick = function(){
		deleteListItem(this.id);
	}
	
	var editButton = document.createElement("Button");
	editButton.setAttribute("id", "editButton" + index);
	editButton.setAttribute("class", "editButtons")
	editButton.innerHTML = "Edit";
	editButton.onclick = function(){
		editListItem(this.id);
	};
	document.getElementById("anchor" + index).appendChild(editButton);
	document.getElementById("anchor" + index).appendChild(delButton);
	
}

/*$("document").ready(function(){
	$(".testAnchor").hover(
	function(){ $(this).css("background-color", "pink");},
	function(){ $(this).css("background-color", "transparent");}
	);
});*/