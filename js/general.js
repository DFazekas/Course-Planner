	/******************** Dropdown Functions *************************/
	// Converts a CSV string into a dropdown menu
	// Shift = 1 is to allow a default option (and not erase it when new list is made)
	function strDropDown(id, CSVstring, shift, delim) {
		var x = CSVstring;
		var options = x.split(delim);
		var select = document.getElementById(id);

		//for (a in select.options) { select.options.remove(shift); } // Clear dropdown
		removeOptions(id);
		for (var i = 0; i < (options.length); i++) {
			if (options[i].length <= 0) continue;
			select.options[i+shift] = new Option(options[i], options[i]);  //new Option("Text", "Value")   
		}
		return;
	}

	// Clear options from a menu
	function removeOptions(id) {
		$(id).empty();
		return;
	}

	function findString(string, toFind) {
		return string.indexOf(toFind) > -1;
	}