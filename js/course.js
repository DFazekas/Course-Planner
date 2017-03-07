//** Add Course Buttons**************************//
// openAddCourseModal()
$(document).on('click', '#addCourseBtn', function(){ // I think this was removed
	if (warnNoSem()) {
		return;
	}
	$('#addCourseScreen').modal('show');
	return;
});


// submitCourseClose() // submitSelectedCourse no longer returns a value, I believe these 2 funcs are residual.
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
		bootbox.alert({message: "Could not find this course, sorry.", backdrop: true, size: 'small'});
		return;
	}
	// tutorialStep(4, false);

	/* Unclick */
	for (var i = 0; i < VIEWING.length; i++) {
		if (VIEWING[i].entry.accr == courseCode) {
			VIEWING.splice(i, 1);
			showAlert('alert-danger', "You've Removed A Card From The Course Cards Panel. "+courseCode);
			// $('.TEMP').click(); // Goto 2nd panel
			displayPlans();
			return;
		}

	}

	/* Select 2nd tab */
	// $('.TEMP').click();

	VIEWING.push(new viewingContruct(DATABASE[DBindex]));
	displayPlans();
	showAlert('alert-success', 'You Added A Card To The Course Cards Panel. '+courseCode);
	return;
});







$(document).on('click', '.addSemCourseBTN', function(){
	var courseCode = this.value;
	submitSelectedCourse(courseCode);
	return;
});

// NO LONGER returns if course addition was successful
function submitSelectedCourse() {
	var selectedCourse = $("#courseByAccr option:selected").text();
	var courseContent = getCourseContent(selectedCourse); // array
	if (courseContent === undefined) {
		bootbox.alert({message: "Course Not Found, Sorry.", backdrop: true, size: 'small'});
		return false;
	}

	// if no error, add. If error prompt, if confirm add
	var errorMsg = verifyCourse(courseContent);
	if (errorMsg === undefined) {
		SEMESTERS[getSemesterIndex()].courses.push(new courseConstruct(selectedCourse, courseContent));
		displayPlans();
	} else { // there is an error message
		bootbox.confirm({
		    message: errorMsg + '\nWould you like to take this anyway?',
		    backdrop: true,
		    buttons: {
		        confirm: {
		            label: 'Yes',
		            className: 'btn-success'
		        },
		        cancel: {
		            label: 'No',
		            className: 'btn-danger'
		        }
		    },
		    callback: function (yesAdd) {
		    	if (yesAdd) {
		  	        SEMESTERS[getSemesterIndex()].courses.push(new courseConstruct(selectedCourse, courseContent));
					displayPlans();
				}
				return;
		    }
		});
	}
}

function submitSelectedCourse(code) {
	var selectedCourse = code;
	var courseContent = getCourseContent(selectedCourse); // array
	if (courseContent === undefined) {
		bootbox.alert({message: "Course Not Found, Sorry.", backdrop: true, size: 'small'});
		return false;
	}
	// if no error, add. If error prompt, if confirm add
	var errorMsg = verifyCourse(courseContent);
	if (errorMsg === undefined) {
		// tutorialStep(3, false);
		SEMESTERS[getSemesterIndex()].courses.push(new courseConstruct(selectedCourse, courseContent));
		displayPlans();
	} else { // there is an error message
		bootbox.confirm({
		    message: errorMsg + '\nWould you like to take this anyway?',
		    backdrop: true,
		    buttons: {
		        confirm: {
		            label: 'Yes',
		            className: 'btn-success'
		        },
		        cancel: {
		            label: 'No',
		            className: 'btn-danger'
		        }
		    },
		    callback: function (yesAdd) {
		    	if (yesAdd) {
		    		// tutorialStep(3, false);
		  	        SEMESTERS[getSemesterIndex()].courses.push(new courseConstruct(selectedCourse, courseContent));
					displayPlans();
				}
				return;
		    }
		});
	}
	
}

function submitSelectedCourseViewing(code, toRemoveViewingIndex) {
	console.log('ToRemove');
	var selectedCourse = code;
	var courseContent = getCourseContent(selectedCourse); // array
	if (courseContent === undefined) {
		bootbox.alert({message: "Course Not Found, Sorry.", backdrop: true, size: 'small'});
		return false;
	}

	// if no error, add. If error prompt, if confirm add
	var errorMsg = verifyCourse(courseContent);
	if (errorMsg === undefined) { // can add
		SEMESTERS[getSemesterIndex()].courses.push(new courseConstruct(selectedCourse, courseContent));
		/* Remove Viewing Course */
		VIEWING.splice(toRemoveViewingIndex, 1);
		displayPlans();
	} else { // there is an error message
		bootbox.confirm({
		    message: errorMsg + '\nWould you like to take this anyway?',
		    backdrop: true,
		    buttons: {
		        confirm: {
		            label: 'Yes',
		            className: 'btn-success'
		        },
		        cancel: {
		            label: 'No',
		            className: 'btn-danger'
		        }
		    },
		    callback: function (yesAdd) {
		    	if (yesAdd) {
		  	        SEMESTERS[getSemesterIndex()].courses.push(new courseConstruct(selectedCourse, courseContent));
		  	        VIEWING.splice(toRemoveViewingIndex, 1);
					displayPlans();
				}
				return;
		    }
		});
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

