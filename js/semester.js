// This might not be the right place for this function.
$(document).on('click', '#hideAddingFuncs', function(){
    // alert("Hide");
    $('#mainTop').toggle();
    if(!$('#mainTop').is(':visible')) {
    	$('#mainTop').height('0');

   		$('.nav-tabs li.active').removeClass('active');
    } else {
    	// $('#mainTop').height('35%');
    }
});

$(document).on('click', '.addingFuncsOptions', function(){
	// alert("hello");
	$('#mainTop').show();
	$('#mainTop').height('35%');
});

//** Add Semester Buttons**************************//
// openAddSemModal()
$(document).on('click', '#addSemesterBtn', function(){
	$('#addSemScreen').modal('show');
	return;
});

// submitSemesterOpen()
$(document).on('click', '#addSemOpen', function(){
	addSelectedSemester();
	// tutorialStep(1, false);
	return;
});

// submitSemesterClose()
$(document).on('click', '#addSemSubmit', function(){ // depreciated
	$('#addSemScreen').modal('hide');
	addSelectedSemester();
	return;
});

// submitSemesterToEnd()
$(document).on('click', '#addFinalSem', function(){ // No longer used
	var year = 0;
	var term = 0;

	/* Get Final Semester */
	var numSemesters = SEMESTERS.length;
	if (numSemesters == 0) {
		year = 2016;
		term = 0;
	} else if (SEMESTERS[numSemesters - 1].term == 2) {
		term = 0;
		year = +SEMESTERS[numSemesters - 1].year + 1;
	} else {
		term = +SEMESTERS[numSemesters - 1].term + 1;
		year = SEMESTERS[numSemesters - 1].year;
	}

	/* Check for duplicates */
	for (var i = 0; i < numSemesters; i++) {
		if (SEMESTERS[i].year == year) {
			if (SEMESTERS[i].term == term) {
				bootbox.alert({message: "You Already Have This Semester.", backdrop: true, size: 'small'});
				return;
			}
		}
	}

	/* Add and Display */
	addSemesters(getSortedIndex(year, term), 0, new semConstruct(year, term))
	displayPlans();
	return;
});


$(document).on('click', '#incrementSemester', function() {
    var len = $("#selTerm option:selected").next().length;
    if (len == 0) {
    	$('#selTerm').find('option:eq(1)').prop('selected', true);
    	$("#selYear option:selected").next().prop("selected", true);
    } else {
    	$("#selTerm option:selected").next().prop("selected", true);
	}
	ableAddSemester();
    return;
});



//** Remove Semester Buttons**************************//
// removeSemester()
$(document).on('click', '#remSemBtn', function(evt){
	/* Confirm */
	if (warnNoSem()) {
		return;
	}

	bootbox.confirm({
	    message: 'Are you sure you want to remove this semester?\nThis CANNOT be undone.',
	    backdrop: true,
	    buttons: {
	        cancel: {
	            label: 'Cancel',
	            className: 'btn-default'
	        },
	        confirm: {
	            label: 'Delete Semester',
	            className: 'btn-danger'
	        }
	    },
	    callback: function (yesDelete) {
	    	if (yesDelete) {
	  	        /* Alert, Remove, and Display */
	  	        var deletedIndex = getSemesterIndex();
	  	        SUBJECTPICKED_PLZRM = 'NONE';
	  	       	showAlert('alert-danger', 'You Have Deleted A Semester. '+TERMS[SEMESTERS[deletedIndex].term]+' '+SEMESTERS[deletedIndex].year);
			    remSemesters(deletedIndex, 1); // Remove at index = semesterNum
			    displayPlans();
			}
			return;
	    }
	});

    return;
});

// clearAllSemesters()
$(document).on('click', '#clearAllSemBtn', function(){
	/* Confirm */
	if (warnNoSem()) {
		return;
	}

	bootbox.confirm({
	    message: 'ARE YOU ABSOLUTELY SURE YOU WANT TO CLEAR ALL SEMESTERS?\nThis CANNOT be undone.',
	    backdrop: true,
	    buttons: {
	        cancel: {
	            label: 'Cancel',
	            className: 'btn-default'
	        },
	        confirm: {
	            label: 'Delete All Semesters',
	            className: 'btn-danger'
	        }
	    },
	    callback: function (yesDelete) {
	    	if (yesDelete) {
	  	        /* Alert, Remove All, and Display */
	  	        SUBJECTPICKED_PLZRM = 'NONE';
			    remSemesters(0, SEMESTERS.length);
			    displayPlans();
			    showAlert('alert-danger', 'You Have Deleted ALL Your Semesters.');

			}
			return;
	    }
	});

	
    return;
});


function ableChevrons() {
	if (!SEMESTERS.length || getSemesterIndex() == 0) {
		$('#leftSemBTN').tooltip("hide");
		$('#leftSemBTN').prop('disabled', true);
	} else {
		$('#leftSemBTN').prop('disabled', false);
	}
	if (getSemesterIndex() == SEMESTERS.length - 1) {
		$('#rightSemBTN').tooltip("hide");
		$('#rightSemBTN').prop('disabled', true);
	} else {
		$('#rightSemBTN').prop('disabled', false);
	}
	return;
}




//** View Buttons**************************//
$(document).on('click', '#leftSemBTN', function(){
	var selected = getSemesterIndex();
	if (selected > 0) {
		SEMESTERS[selected - 1].show = true;
		SEMESTERS[selected].show = false;
	}
	displayPlans();

	// if ($('#rightSemBTN').is(':disabled')) {
	// 	$('#rightSemBTN').prop('disabled', false);
	// }
	// if (getSemesterIndex() == 0) {
	// 	$('#leftSemBTN').tooltip("hide");
	// 	$('#leftSemBTN').prop('disabled', true);
	// }
	return;
});

$(document).on('click', '#rightSemBTN', function(){
	var selected = getSemesterIndex();
	if ((selected >= 0) && (selected < SEMESTERS.length - 1)) {
		SEMESTERS[selected + 1].show = true;
		SEMESTERS[selected].show = false;
	}

	
	displayPlans();
	// if ($('#leftSemBTN').is(':disabled')) {
	// 	$('#leftSemBTN').prop('disabled', false);
	// }
	// if (getSemesterIndex() == SEMESTERS.length - 1) {
	// 	$('#rightSemBTN').tooltip("hide");
	// 	$('#rightSemBTN').prop('disabled', true);
	// }


	// if (selected == 0) {
	// 	// $('#leftSemBTN').prop('disabled', true);
	// 	console.log('Selected is 0');
	// 	// $('#leftSemBTN').mouseover();
	// }
	return;
});

function getSemesterIndex() { // current
	var selected = -1;
	for (var i = 0; i < SEMESTERS.length; i++) {
		if (SEMESTERS[i].show) {
			selected = i;
			break;
		}
	}
	return selected;
}


function getSemesterIndexByDate(year, term) {
	var selected = -1;
	for (var i = 0; i < SEMESTERS.length; i++) {
		if (SEMESTERS[i].year == year && SEMESTERS[i].term == term) {
			selected = i;
			break;
		}
	}
	return selected;
}










function getSortedIndex(year, term) {
	/* Get Correct Index */
	var correctIndex = 0;
	var numSem = SEMESTERS.length;
	for (var i = 0; i < numSem; i++) {
		if (SEMESTERS[i].year == year) {       // Requested year is the same
			if (SEMESTERS[i].term < term) {
				correctIndex = i + 1;
				if (i < numSem - 1) { // Check the next semester
					if ((SEMESTERS[i + 1].term < term) && (SEMESTERS[i + 1].year == year)) {
						correctIndex = i + 2;
					}
				}
			} else {
				correctIndex = i;
			}
			break;
		} else if (SEMESTERS[i].year > year) { // Requested year is later
			correctIndex = i;
			break;
		} else if (i == numSem - 1) { // at end
			correctIndex = numSem;
			break;
		}
	}
	return correctIndex;
}

function addGivenSemester(year, term) { // Used by transcript
	/* Check for duplicates */
	for (var i = 0; i < SEMESTERS.length; i++) {
		if (SEMESTERS[i].year == year) {
			if (SEMESTERS[i].term == term) {
				return i;
			}
		}
	}

	addSemesters(getSortedIndex(year, term), 0, new semConstruct(year, term));
	displayPlans();
	return getSortedIndex(year, term);
}

function addSelectedSemester() { // Manual Select
	var year = $("#selYear option:selected").text(); // selected value
	var term = $("#selTerm").prop('selectedIndex') - 1;
	
	/* Check for duplicates */
	for (var i = 0; i < SEMESTERS.length; i++) {
		if (SEMESTERS[i].year == year) {
			if (SEMESTERS[i].term == term) {
				bootbox.alert({message: "You Already Have This Semester.", backdrop: true, size: 'small'});
				return;
			}
		}
	}
	addSemesters(getSortedIndex(year, term), 0, new semConstruct(year, term));
	displayPlans();
	showAlert('alert-success', "You've Added A New Semester! "+TERMS[term]+' '+year);
	var rate = 500;
	$("#openOverviewButton").fadeIn(rate).fadeOut(rate).fadeIn(rate).fadeOut(rate).fadeIn(rate);
	return;
}



function addSemesters(index, unknown, semester) { // Actually puts it in the semester
	SEMESTERS.splice(index, unknown, semester); // puts it in there
	for (var i = 0; i < SEMESTERS.length; i++) {
		SEMESTERS[i].show = false;
	}
	SEMESTERS[index].show = true;
	return;
}

function remSemesters(index, unknown) {
	SEMESTERS.splice(index, unknown);
	for (var i = 0; i < SEMESTERS.length; i++) {
		SEMESTERS[i].show = false;
	}
	if (index > 0) {
		SEMESTERS[index - 1].show = true;
	} else if (index < SEMESTERS.length) {
		SEMESTERS[index].show = true; 
	}
	return;
}

function warnNoSem() {
	if (getSemesterIndex() == -1) { // no sems
		bootbox.alert({message: "Try adding a semester first!", backdrop: true, size: 'small'});
		return true;
	}
	return false;
}













$(document).on('click', '#leftPanelChooseSubject', function(){
	$('#pickSubjectScreen').modal('show');
});














