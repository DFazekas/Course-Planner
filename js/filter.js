$(document).on('click', '.fpFilter', function(){
	displayPlans();
	return;
});
















// //** Filter Buttons**************************//
// // toggleFilters() 
// $(document).on('click', '#filterToggle', function(){
// 	$("#filters").toggle(400);
// 	return;
// });

// // resetFilters()
// $(document).on('click', '#clearFilters', function () {
// 	$('#filterForm').trigger("reset");
// 	return;
// });


// /******************** Filter Functions ***************************/
// /* Filter Changed */
// $(document).on('change','#filters', function(){ // #termOffering should be changed to a wrapper
// 	var subject = $(SUBJECT_CODE).find(":selected").text();
// 	// getSubjectCourses(subject, getFilteredStringB); // Set dropdowns
// 	return;
// });

// /* Get checkedTerms */
// function getCheckedTerms() {
// 	var checkedTerms = "";
// 	var possibleTerms = ['F', 'W', 'S', 'U'];
// 	for (var i = 0; i < possibleTerms.length; i++) {
// 		if ($('#' + possibleTerms[i] + 'TermFilter').is(':checked')) {
// 			checkedTerms += possibleTerms[i];
// 		}
// 	}
// 	return checkedTerms;
// }

// function getCheckedCredits() {
// 	var checkedCredits = "";
// 	var possibleCredits = ["0-00", "0-25", "0-50", "0-75", 
// 							"1-00", "1-50", "1-75", 
// 							"2-00", "2-50", "2-75", 
// 							"3-25"];
// 	for (var i = 0; i < possibleCredits.length; i++) {
// 		if ($('#creditFilter' + possibleCredits[i]).is(':checked')) {
// 			checkedCredits += possibleCredits[i].replaceAll("-", ".") + '|';
// 		}
// 	}
// 	return checkedCredits;
// }

// function checkTermFilter(courseDetails) {
// 	var checkedTerms = getCheckedTerms();
// 	var offerings    = courseDetails[2];         
// 	var terms        = offerings.split(";")[0]; // Results: F|W|S|U
	
// 	/* Perform Term Filter Check */
// 	for (var i = 0; i < checkedTerms.length; i++) {
// 		if (terms.indexOf(checkedTerms.charAt(i)) >= 0) {
// 			return true;
// 		}
// 	}
// 	return false;
	
// }

// function checkCreditFilter(courseDetails) {
// 	var checkedCredits = getCheckedCredits();
// 	var offerings    = courseDetails[2];         
// 	var credits      = offerings.split(";")[2]; // Results: [0.50]
// 	if (credits == undefined) {
// 		credits = offerings.split(";")[1]; // Vetm courses exception
// 		if (credits == undefined) {return true;} // Error handling unknown
// 	}

// 	if (checkedCredits.indexOf(credits.slice(1, -1)) >= 0) {
// 		return true;
// 	}
// 	return false;
// }

// function getNumberofNumbers(string) {
// 	var words = string.split(" ");
// 	var count = 0;
// 	for (var i = 0; i < words.length; i++) {
// 		if ($.isNumeric(words)) {
// 			count++;
// 		}
// 	}
// 	return count;
// }

// function checkElectiveFilter(courseDetails) {
// 	/* Parse ELECTIVES and compare to courseDetails to see if course is valid */
// 	var wantedType    = $('input[name="elect"]:checked').val();
// 	var wantedSubject = courseDetails[0].split('*')[0];
// 	var wantedNumber  = courseDetails[0].split('*')[1];
// 	if (wantedType == 'N') return true;
// 	for (var i = 0; i < ELECTIVES.length; i++) {
// 		var firstSplit  = ELECTIVES[i].split("}}}");
// 		var secondSplit = firstSplit[1].split("->");
		
// 		var type        = firstSplit[0];
// 		var subject     = secondSplit[0];
// 		var content     = secondSplit[1];
// 	 	// alert(ELECTIVES[i]);
// 	 	if (wantedSubject == subject) {
// 	 		if (wantedType == type) {
	 			
// 	 			// Parse Content
// 	 			/* Correct Content */
// 	 			if (content.includes("All")) {
// 	 				if (content.includes("All courses except")) {
// 	 					//alert(getNumberofNumbers(content));
// 	 					if (getNumberofNumbers(content) <= 4) { // wut lol?
// 	 						alert("here");
// 	 						return !content.includes(wantedNumber); // In list => cant take
// 	 					} else { // Special words
// 	 						if (content.includes("science electives")) {
// 	 							alert("This subjects electives filter is not yet supported.");
// 	 							return true; // FIX ME
// 	 						} else if (content.includes("determined")) {
// 	 							alert("Not fully supported. Speak to faculty advisor.");
// 	 							return !content.includes(wantedNumber);
// 	 						} else { // Fix me (determine course in brackets(?)) E determined by FA
// 	 							alert("This subjects electives filter is not yet supported.");
// 	 							return true;
// 	 						}
// 	 					}
// 	 				}
// 	 				else {
// 	 					return true; // All Courses
// 	 				}
// 	 			}
// 	 			else {
// 	 				// Not 'All'
// 	 				if (getNumberofNumbers(content) == 0) {
// 	 					// Straight up list
// 	 					return content.includes(wantedNumber);
// 	 				} else {
// 	 					// research is special
// 	 					alert("Not fully supported. Speak to faculty advisor.");
// 	 					return true;
// 	 				} 
// 	 			}
// 	 		}
// 	 	}
// 	}
// 	return false; // Not in list
// }

