/********************************************************
 	Data Management Functions 
********************************************************/
var UPDATE_TIME = '2016-08-31' + 'T' + '14:30:00'; // military time, and leading zeros needed
function saveSemesters() {
	if (typeof(Storage) !== "undefined") {
		localStorage.setItem('Semesters', JSON.stringify(SEMESTERS));
		localStorage.setItem('Viewing', JSON.stringify(VIEWING));
	}
	return;
}

function loadSemesters() {
	/* Get Users Semesters */
	var retrievedObject = localStorage.getItem('Semesters');
	if (retrievedObject !== null) { // exists
		SEMESTERS = JSON.parse(retrievedObject);
	} else {
		alert("This must be your first time. Start by adding semesters, then courses. Mouse\
			 over things to see what they do! This 'Tutorial' will improve later");
	}

	/* Get Users Viewing */
	retrievedObject = localStorage.getItem('Viewing');
	if (retrievedObject !== null) { // exists
		VIEWING = JSON.parse(retrievedObject);
	}


	/* Get Database */
	// If !stored or !updated, pull from server, put into DATABASE & local storage
	// else (if updated) put into DATABASE 
	// Safe guard against disabled cookies

	var updateDay =  (new Date(UPDATE_TIME).getTime() + 14400000)/8.64e7; // convert to my timezone
	var database = localStorage.getItem('Database');
	var subjects = localStorage.getItem('Subjects');
	if ((database === null) || (subjects === null) || infoOutOfDate(updateDay)) { // doesnt exists, or (add out of date check)
		alert("We are retrieving the most recent data, this may take several seconds."+
				"You will be notified when this is finished. Thank you for your patience.");
		$.ajax({
	        type: "POST",
	        url: "php/getDatabase.php" ,
	        success : function(data) { 
	        	var rows = data.split('|%');
	        	rows.pop();
	        	for (var i = 0; i < rows.length; i++) {
	        		var entries = rows[i].split('|');
	        		DATABASE.push(new databaseConstruct(entries));

	        		var position = SUBJECTS.map(function(e) { return e.subject; }).indexOf(entries[0]);
	        		if (position < 0) {
	        			if (entries[0].length > 1) {
	        				var code = entries[1].split('*')[0];
	        				SUBJECTS.push(new subjectsConstruct(entries[0], code));
	        			}
	        		}
	        	}
	        	localStorage.setItem('Subjects', JSON.stringify(SUBJECTS));
	        	localStorage.setItem('Database', JSON.stringify(DATABASE));
				localStorage.setItem('LastUpdate', updateDay);
	        	assignDropdowns();
	        	displayPlans();
	        	alert("Success! You may now continue.");
	        },
	        error: function(data) {
	    		alert("Could Not Access Database, Try Refreshing the Page.");
	    	}
	    });
	} else {
		DATABASE = JSON.parse(database);
		SUBJECTS = JSON.parse(subjects);
		assignDropdowns();
		displayPlans();
	}
	return;
}


function infoOutOfDate(updateDay) {
	var currentDay = new Date().getTime()/8.64e7;
	var lastUpdated = localStorage.getItem('LastUpdate');
	if (lastUpdated === undefined) {
		console.log("No Last Updated Day :: Pulling information");
		return true;
	}
	if (updateDay == lastUpdated) {
		console.log("Last updated day is the same day as the update day :: Not Pulling information");
		return false;
	}
	if (currentDay > updateDay) {
		console.log("It is past the update day :: Pulling information");
		return true;
	}
	return false;
}






















/***************************************************
	Assigning Dropdowns
***************************************************/
function assignDropdowns() {
	var code = '<table style="border-collapse:collapse;border-spacing:0;width:100%;height:98%;table-layout:fixed;"><tr>' + drawLeftPanelSubjects(0, 'NONE', 'NONE');
	var name = '<table style="width:100%;height:100%;table-layout:fixed;"><tr>' + drawLeftPanelSubjects(-1, 'NONE', 'NONE');
	for (var i = 0; i < SUBJECTS.length; i++) {
		code += drawLeftPanelSubjects(i, SUBJECTS[i].accr, SUBJECTS[i].subject);
		name += drawLeftPanelSubjectsName(i, SUBJECTS[i].subject, SUBJECTS[i].subject);
	}

	$('#pickSubjectSubjectsCode').html(code + '</table>');
	$('#pickSubjectSubjectsName').html(name + '</table>');

	function drawLeftPanelSubjects(i, detail, subject) {
		var subjectDetail = '<b style="color:#cccccc;font-size:15px;">' + detail[0] + '</b>' + detail.substring(1);
		var button = '<td style="width:20%;padding:0;margin:0;"><button style="padding:0;margin:0;height:104%;width:100%;overflow:hidden;" class="btn btn-COLOR leftPanelSubjects" value=' +
						 subject.replaceAll(' ', '_') + '>' + subjectDetail +
		 	 			'</button></td>';
		if ((i+1) % 5 == 0) {
			button = '</tr><tr style="padding:0;margin:0;">' + button;
		}
		
		var color = 'primary';
		if (subject == 'NONE') color = 'danger';
		else if (subject[0] < 'F') color = 'warning';
		else if (subject[0] < 'L') color = 'success';
		else if (subject[0] < 'R') color = 'info';
		button = button.replaceAll('COLOR', color);
		return button;
	}


	function drawLeftPanelSubjectsName(i, detail, subject) {
		var subjectDetail = '<b style="color:#cccccc;font-size:15px;">' + detail[0] + '</b>' + detail.substring(1);
		var button = '<td style="width:20%;padding:0;margin:0;"><button style="padding:0;margin:0;height:106%;width:100%;overflow:hidden;" class="btn btn-COLOR leftPanelSubjects" value=' +
						 subject.replaceAll(' ', '_') + '>' + subjectDetail +
		 	 			'</button></td>';
		if ((i+1) % 5 == 0) {
			button = '</tr><tr style="padding:0;margin:0;">' + button;
		}
		
		var color = 'primary';
		if (subject == 'NONE') color = 'danger';
		else if (subject[0] < 'F') color = 'warning';
		else if (subject[0] < 'L') color = 'success';
		else if (subject[0] < 'R') color = 'info';
		button = button.replaceAll('COLOR', color);
		return button;
	}

	/* Initialize Subject Drop Downs */ // Most likely can be removed
	var nameOptions = '<option value="default">Select a Subject by Name</option>';
	var accrOptions = '<option value="default">Select a Subject by Code</option>';
	removeOptions('#subjectByName');
	removeOptions('#subjectByCode');
	for (var i = 0; i < SUBJECTS.length; i++){
	   nameOptions += '<option value="'+ SUBJECTS[i].subject + '">' + SUBJECTS[i].subject + '</option>';
	   accrOptions += '<option value="'+ SUBJECTS[i].accr    + '">' + SUBJECTS[i].accr    + '</option>';
	}
	$('#subjectByName').append(nameOptions);
	$('#subjectByCode').append(accrOptions);

	$("#subjectByCode option:first").attr('disabled','disabled');
	$("#subjectByName option:first").attr('disabled','disabled');

	/* Initialize Course Drop Downs */
	removeOptions(COURSE_CODE);
	removeOptions(COURSE_NAME);
	$(COURSE_CODE).append('<option value="default">Select a Course by Code</option>');
	$(COURSE_NAME).append('<option value="default">Select a Course by Name</option>');
	$(COURSE_CODE + " option:first").attr('disabled','disabled');
	$(COURSE_NAME + " option:first").attr('disabled','disabled');

	return;
}

function initSemDropDowns() {
	var offerings = ["Winter", "Summer", "Fall"]; 
	var currentYear = new Date().getFullYear();

	for (var i = 0; i < offerings.length; i++) {
		$('#selTerm').append(
			'<option>' + offerings[i] + '</option>'
		);
	}

	for (var i = (currentYear - 10); i < (currentYear + 15); i++) {
		$('#selYear').append(
			'<option>' + i + '</option>'
		);
	}

	$("#selYear")[0].selectedIndex = 10;
	$("#selTerm")[0].selectedIndex = 1;
	return;
}
















/********************************************************
 	On Page Load Functions 
********************************************************/
$(document).ready(function() {
	/* Default Settings */
	$('[data-toggle="tooltip"]').tooltip({trigger : 'hover'});

	/* Intialize */
	initSemDropDowns();

	/* Load Previous Data */
	if (typeof(Storage) === "undefined") {
	    alert("Please note, your browswer does not support storing your courses or any course information after your session."+
	    		"This will mean poor performance, please use an updated browswer and/or enable cookies.");
	    displayPlans();
	    // deal with this part later
	} else {
		loadSemesters();
	}

	//$(document).tooltip.temporarilyOff = false;

	

	return;
});

