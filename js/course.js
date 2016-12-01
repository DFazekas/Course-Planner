//** Add Course Buttons**************************//
// openAddCourseModal()
$(document).on('click', '#addCourseBtn', function(){ // I think this was removed
	if (warnNoSem()) {
		return;
	}
	$('#addCourseScreen').modal('show');
	return;
});


// submitCourseClose()
$(document).on('click', '#submitCourseClose', function(){
	if (submitSelectedCourse()) {
		$('#addCourseScreen').modal('hide'); // This this was removed
	}
	return;
});

// submitCourseOpen()
$(document).on('click', '#submitCourseOpen', function(){
	submitSelectedCourse();
	return;
});





//** Remove Course Buttons**************************//
/* removeCourse() */
$(document).on('click', '.remCourseBTN', function(){
	/* Course Number */
	var courseNum = this.value;

	/* Remove and Display */
    SEMESTERS[getSemesterIndex()].courses.splice(courseNum, 1); // Remove at index = semesterNum
    displayPlans();
    return;
});


//** Course Click **********************************//
// onCourseClick()
$(document).on('click', '.courseClick', function() {
	var courseCode = this.value;
	var DBindex = -1;
	for (var i = 0; i < DATABASE.length; i++) {
		if (DATABASE[i].accr == courseCode) {
			DBindex = i;
			break;
		}
	}
	if (DBindex == -1) {
		alert("Could not find this course, sorry.");
		return;
	}
	for (var i = 0; i < VIEWING.length; i++) {
		if (VIEWING[i].entry.accr == courseCode) {
			VIEWING.splice(i, 1);
			//alert("You are already viewing this course.");
			// $('.TEMP').click(); // Goto 2nd panel
			displayPlans();
			return;
		}

	}

	/* Select 2nd tab */
	// $('.TEMP').click();
	VIEWING.push(new viewingContruct(DATABASE[DBindex]));
	displayPlans();
	return;
});







$(document).on('click', '.addSemCourseBTN', function(){
	var courseCode = this.value
	submitSelectedCourse(courseCode);
});

// returns if course addition was successful
function submitSelectedCourse() {
	var selectedCourse = $("#courseByAccr option:selected").text();
	var courseContent = getCourseContent(selectedCourse); // array
	if (courseContent === undefined) {
		alert("Course Not Found, Sorry.");
		return false;
	}

	var errorMsg = verifyCourse(courseContent);
	if (errorMsg === undefined || confirm(errorMsg + '\nWould you like to take this anyway?')) { // No error
		SEMESTERS[getSemesterIndex()].courses.push(new courseConstruct(selectedCourse, courseContent));
		displayPlans();
		return true;
	} else {
		// alert(errorMsg);
		return false;
	}
	
}

function submitSelectedCourse(code) {
	var selectedCourse = code;
	var courseContent = getCourseContent(selectedCourse); // array
	if (courseContent === undefined) {
		alert("Course Not Found, Sorry.");
		return false;
	}

	var errorMsg = verifyCourse(courseContent);
	if (errorMsg === undefined || confirm(errorMsg + '\nWould you like to take this anyway?')) { // if first is true, doesnt eval second
		SEMESTERS[getSemesterIndex()].courses.push(new courseConstruct(selectedCourse, courseContent));
		displayPlans();
		return true;
	} else {
		// alert(errorMsg);
		return false;
	}
	
}

function getCourseContent(course) {
	if (course == undefined) { // remove when database no longer has undefined at end
		return undefined;
	}
	for (var i = 0; i < DATABASE.length; i++) {
		if (DATABASE[i].accr == course) {
			// return array of details
			var array = [];
			for (var j = 0; j < DETAILS.length; j++) {
				array.push(DATABASE[i][DETAILS[j]]);
			}
			return array;
		}
	}
	return undefined;
}

