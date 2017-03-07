/******************** Subject Selection Functions *************************/
/* Subject List Toggle */
$(document).on('change','#subjectListToggle', function() {
	/* Toggle Visablity of Drop Downs */
	var code = SUBJECT_CODE.substring(1); // In order to get class
	var name = SUBJECT_NAME.substring(1);
	$("."+ code + "ID").toggle();
	$("."+ name + "ID").toggle();
	return;
});

/* Subject Selected */
$(document).on('change','.subjectSelector', function() {
	/* Assign Index of Opposite Drop Down */
	if ($(SUBJECT_CODE + "ID").is(":visible")) {// Now looking at code
		var index = $(SUBJECT_CODE).prop('selectedIndex');
		$("select" + SUBJECT_NAME).prop('selectedIndex', index);
	} else {
		var index = $(SUBJECT_NAME).prop('selectedIndex');
		$("select" + SUBJECT_CODE).prop('selectedIndex', index);
	}
	/* Get courses in subject */
	var nameDD = [];
	var codeDD = [];
	var subject = $(SUBJECT_NAME + ' option:selected').text();
	for (var i = 0; i < DATABASE.length; i++) {
		if (DATABASE[i].subject == subject) { // should after it passes subject region
			codeDD.push(DATABASE[i].accr);
			nameDD.push(DATABASE[i].course);
		}
	}

	var nameOptions = '<option value="default">Select a Course by Name</option>';
	var accrOptions = '<option value="default">Select a Course by Code</option>';
	removeOptions(COURSE_NAME);
	removeOptions(COURSE_CODE);
	for (var i = 0; i < nameDD.length; i++){
	   nameOptions += '<option value="'+ nameDD[i] + '">' + nameDD[i] + '</option>';
	   accrOptions += '<option value="'+ codeDD[i] + '">' + codeDD[i] + '</option>';
	}
	$(COURSE_NAME).append(nameOptions);
	$(COURSE_CODE).append(accrOptions);

	$(COURSE_NAME + " option:first").attr('disabled','disabled');
	$(COURSE_CODE + " option:first").attr('disabled','disabled');
	
	$('#numCourses').html("There are " + nameDD.length + " Courses.");

	displayPlans(); // get subject courses to pop up
	return;

});



/******************** Courses Selection Functions *************************/
/* Course Toggle */
$(document).on('change','#courseListToggle', function(){ // Note the lists are connected by default
	$(COURSE_NAME + "ID").toggle();
	$(COURSE_CODE + "ID").toggle();
	return;
});

/* Course Selected */
$(document).on('change','.courseSelector', function(){
	/* Assign Index of Opposite Drop Down */
	if ($(COURSE_CODE + "ID").is(":visible")) { // Now looking at code
		var index = $(COURSE_CODE).prop('selectedIndex');
		$("select" + COURSE_NAME).prop('selectedIndex', index);
	} else {
		var index = $(COURSE_NAME).prop('selectedIndex');
		$("select" + COURSE_CODE).prop('selectedIndex', index);
	}
	var course = $(COURSE_CODE + ' option:selected').text();
	var courseIndex = 0;
	for (var i = 0; i < DATABASE.length; i++) {
		if (DATABASE[i].accr == course) { // should after it passes subject region
			courseIndex = i;
			break;
		}
	}
	var finalString = "<table  border='1'><tr><td><h4>Detail</h4></td><td><h4>Entry</h4></td></tr>";
	for (var i = 0; i < DETAILS.length; i++) {
		finalString += "<tr><td style='text-transform: capitalize'>" + DETAILS[i] + " </td><td>" + DATABASE[courseIndex][DETAILS[i]] + " </td>";
		finalString += "</tr>";
	}
	finalString += "<tr><td style='text-transform: capitalize'>" + DETAILS[6] + " </td><td>" + DATABASE[courseIndex][DETAILS[6]] + " </td>";
	finalString += "</tr>";
	finalString += "</table>";
	$('#courseText').html(finalString);

	if (($(COURSE_CODE).prop('selectedIndex')) == 0) { // disables buttons if no course selected
		$('#submitCourseOpen').prop("disabled", true);
		$('#submitCourseClose').prop("disabled", true);
	} else {
		$('#submitCourseOpen').prop("disabled", false);
		$('#submitCourseClose').prop("disabled", false);
	}
	return;
});

/********************************* Assigning Details **************************************/
function assignCourseDetails(string) {
		var parsed = string.split("@");
		var finalString = "<table  border='1'><tr><td><h4>Detail</h4></td><td><h4>Entry</h4></td></tr>";
		var headings = ["Course Code", "Course Title", "Title Info", "Prereqs", 
						"Restrictions", "Offerings", "CoReqs", "Equivalents"];
		for (var i = 0; i < parsed.length - 1; i++) { // -1 for @ at end of string
			finalString += "<tr><td>" + headings[i] + " </td><td>" + parsed[i] + " </td>";
			finalString += "</tr>";
		}
		finalString += "</table>";
		$('#courseText').html(finalString);
		return;
	}

/*********************************** Worker Functions ********************************/
function getDropDownValues(id) {
	var values = [];
	$(id + ' option').each(function() { 
    	values.push( $(this).attr('value') );
	});
	return values;
}


$(document).on('change', '#leftPanelNameCodeButton', function() {
	displayPlans();
});
