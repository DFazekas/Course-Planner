/* Copyright (c) 2017 Nawar Ismail */
/********************************************************
 	Display Functions 
********************************************************/
function displayPlans() {
	if (SEMESTERS.length > 0) { // Set add sem to last semester
		var termIndex = +SEMESTERS[SEMESTERS.length - 1].term + 1;
		var year = SEMESTERS[SEMESTERS.length - 1].year;
		$('#selYear').val(year);
		$('#selTerm').find('option:eq(' + termIndex + ')').prop('selected', true);
	}
	drawSemestersA();
	saveSemesters();
	return;
}

$(document).on('click', '.codeLabelName', function() {
	if ($(this).attr('value') == 'true') {
		$('#leftPanelNameCodeButton').prop('checked', true);
	} else {
		$('#leftPanelNameCodeButton').prop('checked', false);
	}
	displayPlans();
	return;
});


$(document).on('click', 'body', function(event) { // Better way? (jquery=async -> shouldnt hit performance)
	var disableFirstTime = true;
	// Show all tool tips if button clicked
	if (event.target.id == 'allToolTips') {
		$('[title]').each(function() {
	        $this = $(this);
	        if ($this.attr('data-toggle') == 'tooltip') {

	        	$this.tooltip('enable');
	        	$this.tooltip('show');
	        	
	        	// Initialize, should remove to seperate init func for efficiency
	        	if ($this.attr('works') == undefined) {
	        		$this.attr('works', disableFirstTime);
	        	}
	        	if ($this.attr('works') == 'false') {
	        		showAlert('alert-success', 'This Has Enabled All ToolTips.');
	        	}
        		$this.tooltip('enable');
        		$this.attr('works', true);

	        }
	    });
	} else {
	// else hide all tooltips
		$('[title]').each(function() {
	        $this = $(this);
	        if ($this.attr('data-toggle') == 'tooltip') {
	        	$this.tooltip('hide');
	        }
	    });
	}
   	return;
});

$(document).on('click', '#toggleToolTips', function(){
	var disableFirstTime = true;
	$('[title]').each(function() {
        $this = $(this);
        if ($this.attr('data-toggle') == 'tooltip') {
        	// Initialize, should remove to seperate init func for efficiency
        	if ($this.attr('works') == undefined) {
        		$this.attr('works', disableFirstTime);
        	}

        	if ($this.attr('works') == 'true') {
        		showAlert('alert-danger', 'You Have Disabled ToolTips');
        		$this.tooltip('disable');
        		$this.attr('works', false);
        	} else {
        		showAlert('alert-success', 'You Have Enabled ToolTips');
        		$this.tooltip('enable');
        		$this.attr('works', true);
        	}
	    }
    });
	return;
});

$(document).on('click', '#toggleAlerts', function(){
	if (this.value == 0 || this.value == 'false') {
     	this.value = true; // Don't disable before message sent
		showAlert('alert-success', 'You Have Enabled Messages');
	} else {	
		showAlert('alert-danger', 'You Have Disabled Messages');
		this.value = false; // Disable
	}
	return;
});


















/*****************************************************************
******************************************************************
******************************************************************
******************************************************************
******************************************************************
*/
function drawSemesterNavigation() {
	/* Display Year and Term */
	var len = SEMESTERS.length;
	$('#currentSem').html('Active Sem');
	if (len != 0) {
		for (var i = 0; i < len; i++) {
			if (SEMESTERS[i].show == true) {
				$('#currentSem').html(SEMESTERS[i].year + ' ' + TERMS[SEMESTERS[i].term]);
				return;
			}
		}
	}
	return;
}

function drawUserCourses() {
	/* Draw the Courses */
	var string = '';
	var semesterIndex = getSemesterIndex(); 
	if (semesterIndex === -1) { // no semester
		$('#leftUserSemesterCourses').html(''); // clear
		return;
	}
	var courses = SEMESTERS[semesterIndex].courses;
	var len = courses.length;
	for (var i = 0; i < len; i++) {
		string += ''+
				'<table style="width:100%;"><tr>'+
					'<td style="width:30px;"><button type="button" class="btn btn-danger remCourseBTN" style="border-top-right-radius:0;border-bottom-right-radius:0;" value="'+ i +'"><span class="glyphicon glyphicon-minus"></button></td>'+
					'<td><button type="button" section="upper" class="btn btn-default courseClick" value="';
		if ($("#leftPanelNameCodeButton").is(':checked')) {
			string += courses[i].courseCode + '" style="width:100%;border-top-left-radius:0;border-bottom-left-radius:0;">'+
						courses[i].courseCode;
		} else {
			string += courses[i].courseCode + '" style="width:100%;border-top-left-radius:0;border-bottom-left-radius:0;">'+
						courses[i].details['course'];
		}
		string += '</button></td>'+
				'</tr></table>';
	}
	$('#leftUserSemesterCourses').html(string);
}

function getLeftPanelCourses() {
	var subjectCoursesName = [];
	var subjectCoursesCode = [];
	for (var i = 0; i < DATABASE.length; i++) {
		if (DATABASE[i].subject == SUBJECTPICKED_PLZRM) {
			subjectCoursesCode.push(DATABASE[i].accr);
			subjectCoursesName.push(DATABASE[i].course);
		}
	}
	return [subjectCoursesName, subjectCoursesCode];
}

function drawSubjectCourses(subjectCoursesName, subjectCoursesCode) {
	var string = '';
	var hideUnavailble = $('#fpHideUnavailable').prop('checked');

	/* Selected Credits */
	var selectedCredits = [];
	$('.fpCredits:checkbox:checked').each(function() {
       selectedCredits.push($(this).val());
     });

	/* Selected Terms */
	var selectedTerms = [];
	$('.fpTerms:checkbox:checked').each(function() {
       selectedTerms.push($(this).val());
     });

	/* Availability (Based on verifyCourse) */
	var available = [];
	for (var i = 0; i < subjectCoursesCode.length; i++) { // should be if'ed base on filters applied
		var selectedCourse = subjectCoursesCode[i];
		var courseContent = getCourseContent(selectedCourse); // array

		var credit = courseContent[5].replace(/[\[\]']+/g,''); // Remove []; // credits
		var terms = courseContent[3];

		if (courseContent === undefined) {
			console.log("Could not find " + selectedCourse + ".");
			continue;
		}

		var valid = false;
		/* Terms */ // Order matters
		if (findString(terms, 'P')) {
			valid = true;
		} else {
			for (var j = 0; j < selectedTerms.length; j++) { // Go through every selected term
				if (findString(terms, selectedTerms[j])) {
					valid = true;
					break;
				}
				// if (selectedTerms[j] 						 // Check if you find the selected term in the course term.
			}
		}

		/* Credits */
		if ($.inArray(credit, selectedCredits) === -1) { // Cant take
			valid = false;
		}

		/* Hide Unavailable */
		if (hideUnavailble) {
			if (verifyCourse(courseContent) !== undefined) { // Cant Take
			    valid = false;
			}
		}
		if (valid) {
			available.push(selectedCourse); // good
		}
	}
	
	/* Add Subject Courses */
	string += '<hr><div>';
	var showCode = $("#leftPanelNameCodeButton").is(':checked');
	for (var i = 0; (i < subjectCoursesName.length) && (SUBJECTPICKED_PLZRM !== 'NONE'); i++) {
		/* Check if unavailble courses should be hidden */
		// if (hideUnavailble) {
			if ($.inArray(subjectCoursesCode[i], available) === -1) { // If not in array => Not availble
				continue;
			}
		// }

		string += ''+
				'<table style="width:100%;"><tr>'+
					'<td style="width:30px;"><button type="button" class="btn btn-success addSemCourseBTN" style="border-top-right-radius:0;border-bottom-right-radius:0;" value="'+ subjectCoursesCode[i] +'"><span class="glyphicon glyphicon-plus"></button></td>'+
					'<td><button type="button" section="lower" class="btn btn-primary courseClick" value="';
		if (showCode) {
			string += subjectCoursesCode[i] + '" style="width:100%;border-top-left-radius:0;border-bottom-left-radius:0;">'+
						subjectCoursesCode[i];
		} else {
			string += subjectCoursesCode[i] + '" style="width:100%;border-top-left-radius:0;border-bottom-left-radius:0;">'+
						subjectCoursesName[i];
		}

		string += '</button></td>'+
				'</tr></table>';
	}

	if (SUBJECTPICKED_PLZRM !== 'NONE' && SEMESTERS.length > 0) {
		string += '<br><button id="jumpToFilters" class="btn btn-warning" style="width:100%;">See Applied Filters</button>';
		string += '<br><button id="courseColoring" class="btn btn-info" style="width:100%;">Explain Course Colors</button>';
	}
	document.getElementById("leftSubjectSemesterCourses").innerHTML = string + '</div>'; // ~1-5ms Speed improvement
	// $('#leftSubjectSemesterCourses').html(string + '</div>');
	return;
}

function colorLeftPanelCourses(subjectCoursesCode) {
	// INDICATOR SCHEME FOR BUTTONS, to optimize dont do (most of) this if filters applied 
	var coursesTaken = []; // Probably only need to find courses with subject in code (if faster)
	for (var i = 0; i < SEMESTERS.length; i++) {
		for (var j = 0; j < SEMESTERS[i].courses.length; j++) {
			coursesTaken.push(SEMESTERS[i].courses[j].courseCode);
		}
	}
    var viewingCourses = [];
	for (var i = 0; i < VIEWING.length; i++) {
		viewingCourses.push(VIEWING[i].entry.accr);
	}

	for (var i = 0; i < subjectCoursesCode.length; i++) { // Order of calls matters
		if (subjectCoursesCode[i] === undefined) continue;

		// Availability
		var selectedCourse = subjectCoursesCode[i];
		var courseContent = getCourseContent(selectedCourse); // array
		if (courseContent === undefined) {
			console.log("Could not find " + selectedCourse + ".");
			continue;
		} else if (verifyCourse(courseContent) !== undefined) { // Cant Take
			$('.addSemCourseBTN[value="' + subjectCoursesCode[i] + '"]').css('opacity', 0.5);
			// $('.courseClick[value="' + subjectCoursesCode[i] + '"]').css('opacity', 0.85); // Removed to avoid confusion
		}

		// Taken
		if ($.inArray(subjectCoursesCode[i], coursesTaken) != -1) { // I think verifyCourse covers this
			$('.courseClick[section="lower"][value="' + subjectCoursesCode[i] + '"]').removeClass('btn-primary');
			$('.courseClick[section="lower"][value="' + subjectCoursesCode[i] + '"]').addClass('btn-default');
		}
	}
	// Viewing
	for (var i = 0; i < viewingCourses.length; i++) {
		if ($.inArray(viewingCourses[i], coursesTaken) != -1) { // I think verifyCourse covers this
			$('.courseClick[value="' + viewingCourses[i] + '"]').css('opacity', 0.5);
		}
		if ($.inArray(viewingCourses[i], subjectCoursesCode) != -1) {
			$('.courseClick[value="' + viewingCourses[i] + '"]').css('opacity', 0.5);
		}
	}
	return;
}

function drawOverview() { // Draw Table
	$('#overviewContent').html(maxLengthOverviewLayout());
	/* Select the current semester */
	var semLen = SEMESTERS.length;
	for (var i = 0; i < semLen; i++) {
		if (SEMESTERS[i].show) {
			$('input[name=semester][value='+i+']').prop('checked', true);
		}
	}

	/* One Printing Style */
	function maxLengthOverviewLayout() {
		var firstPageIndex = getLastSemesterInFirstColunm();
		if (SEMESTERS.length == 0) {
			return "<h4 style='text-align:center;'>Come back when you add some courses!</h4>";
		}
		var string = "<h5 style='text-align:center;'>Here are all the semesters and courses you've added!</h5><div class='w3-row'>";
		string += '<table style="display: inline-block;width:50%;">';
		for (var i = 0; i < firstPageIndex; i++) {
			string += '<tr>' + drawOverviewSemester(i) + '</tr>';
		}
		string +='</div></table>';

		string += '<table style="float: right;width:50%;">';
		for (var i = firstPageIndex; i < SEMESTERS.length; i++) {
			string += '<tr>' + drawOverviewSemester(i) + '</tr>';
		}
		string +='</div></table>';
		string += "<br>Total Credits: " + countCredits('', 0000, false, 100) + "<br>Please note, if you've taken courses outside of Guelph, credits will be counted here. However, they won't count of your Guelph transcript.";


		return string;
		// No longer works for some reason.
		// Must be colums, otherwise printing doesnt work, is there a work around for phone display? yes, min-width
		string += '<table class="w3-container w3-col" style="width:50%;min-width:220px;"><tr><th>Semesters </th><th> Courses</th></tr>';
		for (var i = 0; i < firstPageIndex; i++) {
			string += '<tr>' + drawOverviewSemester(i) + '</tr>';
		}
		string +='</div></table>';

		if (firstPageIndex >= SEMESTERS.length) {
			return string; // Don't Draw second column
		}

		string += '<table class="w3-container w3-col" style="width:50%;min-width:220px;"><tr><th>Semesters </th><th> Courses</th></tr>';
		for (var i = firstPageIndex; i < SEMESTERS.length; i++) {
			string += '<tr>' + drawOverviewSemester(i) + '</tr>';
		}
		string += '</table></div>';
		return string;
	}

	/* Another Printing Style */
	function twoColumnOverviewLayout() {
		var string = '<div class="w3-row">';
		string += '<table class="w3-container w3-col" style="width:40%;"><tr><td>Semesters |</td><td> Courses</td></tr>';
		for (var i = 0; i < SEMESTERS.length; i+=2) {
			string += '<tr>' + drawOverviewSemester(i) + '</tr>';
		}
		string +='</table>'
		string += '<table class="w3-container w3-col" style="width:40%;"><tr><td>Semesters |</td><td> Courses</td></tr>';
		for (var i = 1; i < SEMESTERS.length; i+=2) {
			string += '<tr>' + drawOverviewSemester(i) + '</tr>';
		}
		string += '</table></div>';
		return string;
	}

	function drawOverviewSemester(i) {
		var string = '<td colspan="2">'+ 
				'<input type="radio" class="overview_sem" name="semester" value="' + i + '"></input>' + 
				'(' + (i+1) + ') ' + SEMESTERS[i].year + ' ' + TERMS[SEMESTERS[i].term] + ' ' + countCredits('', 0000, false, i).toFixed(2) + ' Credits</td><td></td></tr>';
		for (var j = 0; j < SEMESTERS[i].courses.length; j++) {
					string += '<tr style="width:100%;"><td style="width:30%;"></td><td>'+
					// '<input type="checkbox" class="overview_course" name="course" value="'+i+' '+j+'"></input>' +
					'('+ (j+1) + ') ' + SEMESTERS[i].courses[j].courseCode +'</td></tr>';
		}
		return string;
	}

	/* Get the semester that exceeds the page ~MaxLines lines*/
	function getLastSemesterInFirstColunm() {
		var numLines = 0;
		var maxLines = 40;
		var semLen = SEMESTERS.length;
		for (var i = 0; i < semLen; i++) {
			var courseLen = SEMESTERS[i].courses.length;
			numLines++;
			for (var j = 0; j < courseLen; j++) {
				numLines++;
				if (numLines > maxLines) {
					return i;
				}
			}
		}
		return SEMESTERS.length;
	}
	
	return;
}

function drawCards() {
	var string = "<div style='width:90%;margin-left:5%;text-align:center;'><h4>Come back after you've added some courses for viewing by clicking on it's title!</h4></div>";
	var size = 170;
	if (VIEWING.length != 0) {
		string = '';
	}
	for (var i = 0; i < VIEWING.length; i++) {
		if (VIEWING[i].generalView) {
			string += getTableFront(size, VIEWING[i], i);
		} else {
			string += getTableBack(size, VIEWING[i].entry, i);
		}
	}
	$('#mainContent').html(string);
	$('.cardBtn').tooltip();

	$('.shiftUpCard[value=0]').prop('disabled', true);
	$('.shiftDownCard[value=' + (VIEWING.length - 1) + ']').prop('disabled', true);

	if (VIEWING.length == 0) {
		$('.secondPanelOption').prop('disabled', true);
	} else {
		$('.secondPanelOption').prop('disabled', false);
	}
	return;
}

function colorCards() { // add the shift coloring here
	var availibleViewCourses = [];
	var len = VIEWING.length;
	for (var i = 0; i < len; i++) {
		var code = VIEWING[i].entry.accr;
		var courseContent = getCourseContent(code); // array
		if (courseContent === undefined) {
			console.log("Could not find " + code + ".");
			continue;
		}
		if (verifyCourse(courseContent) !== undefined) { // Cant take
			$('.addCard[value="' + i + '"]').css('opacity', 0.5);
			$('.moveCard[value="' + i + '"]').css('opacity', 0.5);
		}
	}
	return;
}

function drawSemestersA() { // If speed becomes an issue, checks should be done to see if regions need to update.
	/* ~Tutorial */
	if (SEMESTERS.length === 0) {
		// SUBJECTPICKED_PLZRM = false;
		$('#middlePanel').hide();
		$('#middleNoSemesters').show();
		$('#deleteSemesterRegion').hide(); // Hide delete options
		$('#courseTitleViewingRegion').hide();
	} else {
		if ((SUBJECTPICKED_PLZRM !== 'NONE') || (SEMESTERS[getSemesterIndex()].courses.length > 0)) {
			$('#courseTitleViewingRegion').show();
		} else {
			$('#courseTitleViewingRegion').hide();
		}
		$('#deleteSemesterRegion').show();
		$('#middleNoSemesters').hide();
		$('#middlePanel').show();
	}

	var leftPanelCourses = getLeftPanelCourses(); // subject courses*
	/* Draw Left Panel */
	drawSemesterNavigation();
	drawUserCourses();
	drawSubjectCourses(leftPanelCourses[0], leftPanelCourses[1]);
	colorLeftPanelCourses(leftPanelCourses[1]);

	/* Overview */
	drawOverview();

	/* Draw Middle Panel*/
	drawCards();
	colorCards();
	
	/* Disable Buttons */
	ableChevrons();
	ableAddSemester();
	return;
}





/*****************************************************************
******************************************************************
******************************************************************
******************************************************************
******************************************************************
*/


function getTableBack(size, details, index) { // DO NOT DELETE THIS v COMMENT IT IS USED AS CODE
	var backDetails = '';
	backDetails += "<table style='width:95%;margin-left:2.5%;' border='0'>";
	for (var i = 6; i < DETAILS.length - 1; i++) { // 6:specific details index, -1 ignore description
		if (details[DETAILS[i]].length > 0) {
			backDetails += '<tr style="height:25px;"><td style="width:100px;text-align:left;">' + DETAILS[i].properCase() + '</td>';
			backDetails +=     '<td style="text-align:left;">' + details[DETAILS[i]] + '</td>';
			backDetails += '</tr>';
		}
	}
	backDetails += '</table>';
	var string = (function () {/*
   		<div style="margin-left:5%;margin-top:8px;width:90%;height:DIVHEIGHTpx;"> 
		    <table border='1' style="boarder-width:5px;table-layout:fixed;width:100%;height:100%;padding:0;margin:0;background-color:rgba(66, 244, 161, 0.2);">
		        <tr style="width:100%;height:DIVHEIGHTpx;">
			        <td rowspan='2' style="width:3.5%;">
		        		<button value='VALUE' style="height:100%;width:100%;padding:0;" class="btn btn-info cardBtn moveCard"
		        		data-toggle="tooltip" data-placement="top" title="Add & Remove Card">
							<span class="glyphicon glyphicon-chevron-left"></span>
		        		</button>
		        	</td>
				    <td rowspan='2' style="width:7%;height:100%;">
		                <button value='VALUE' style="height:33%;width:100%;padding:0;border-bottom-left-radius:0;
		                                border-bottom-right-radius:0;" class="btn btn-success cardBtn addCard"
		                                data-toggle="tooltip" data-placement="top" title="Add Card">
		                    <span class="glyphicon glyphicon-plus"></span>
		                </button>
		                <button value='VALUE' style="height:34%;width:100%;padding:0;border-top-left-radius:0;
		                                border-top-right-radius:0;" class="btn btn-warning cardBtn flipCard"
		                                data-toggle="tooltip" data-placement="top" title="Flip Card">
		                    <span class="glyphicon glyphicon-refresh"></span>
		                </button>
		                <button value='VALUE' style="height:33%;width:100%;padding:0;border-top-left-radius:0;
		                                border-top-right-radius:0;" class="btn btn-danger cardBtn removeCard"
		                                data-toggle="tooltip" data-placement="top" title="Remove Card">
		                    <span class="glyphicon glyphicon-remove"></span>
		                </button>
		            </td>

		            <td class="cardBackground" value='VALUE' style="width:82.5;padding:0;vertical-align:top;background-color:COLOR">
		                <div style="height:50px;">
			                <h4 style="text-align:center;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;
			                            margin:0;">
			                    CODEOFCOURSE, NAMEOFCOURSE
			                    <!--<hr style="width:90%;border-color:black;margin:0 0 0 5%;">-->
			                </h4>
			                <table style="width:100%;">
			                    <tr style="text-align:center;">
			                        <td style="width:33%;">
			                            CREDITSOFCOURSE
			                        </td>
			                        <td style="width:34%;">
			                            TERMOFCOURSE
			                        </td>
			                        <td style="width:33%;">
			                            HOURSOFCOURSE
			                        </td>
			                    </tr>
			                </table>
		                </div>

		                <div style="height:CONTENTHEIGHTpx;overflow-y:auto;">
			                <p style="margin-left:2.5%;">
		     					BACKDETAILS
		  	               	</p>
	  	               	</div>
		            </td>

		            <td rowspan='2' style="width:7%;">
		                <button value='VALUE' style="height:50%;width:100%;padding:0;border-bottom-left-radius:0;
		                                border-bottom-right-radius:0;" class="btn btn-primary cardBtn shiftUpCard"
		                                data-toggle="tooltip" data-placement="top" title="Raise Card">
		                    <span class="glyphicon glyphicon-arrow-up"></span>
		                </button>
		                <button value='VALUE' style="height:50%;width:100%;padding:0;border-top-left-radius:0;
		                                border-top-right-radius:0;" class="btn btn-primary cardBtn shiftDownCard"
		                                data-toggle="tooltip" data-placement="top" title="Lower Card">
		                    <span class="glyphicon glyphicon-arrow-down"></span>
		                </button>
		            </td>
		        </tr>
		    </table>
		</div>
	*/}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1].replace(/(\r\n|\n|\r)/gm,"");

	string = string.replaceAll('DIVHEIGHT', String(size));
	string = string.replaceAll('ROWHEIGHT', String(size - 5));
	string = string.replaceAll('CONTENTHEIGHT', String(size - 50 - 5));

	string = string.replaceAll('BACKDETAILS', backDetails);
	string = string.replaceAll('NAMEOFCOURSE', details.course);
	string = string.replaceAll('CODEOFCOURSE', details.accr);
	string = string.replaceAll('CREDITSOFCOURSE', details.credits);
	string = string.replaceAll('HOURSOFCOURSE', details.hours);
	string = string.replaceAll('TERMOFCOURSE', '[' + details.term + ']');
	string = string.replaceAll('DESCRIPTIONOFCOURSE', details.description);
	string = string.replaceAll('VALUE', index);
	if (!VIEWING[index].flagged) {
		string = string.replaceAll('COLOR', 'rgba(66, 244, 161, 0.2)'); // Normal Color
	} else {
		string = string.replaceAll('COLOR', 'rgba(255, 255, 0, 0.5)');
	}
	return string;
}

function getTableFront(size, course, index) { // DO NOT DELETE THIS v COMMENT IT IS USED AS CODE
	var string = (function () {/*
   		<div style="margin-left:5%;margin-top:8px;width:90%;height:DIVHEIGHTpx;"> 
		    <table border='1' style="boarder-width:5px;table-layout:fixed;width:100%;height:100%;padding:0;margin:0;background-color:rgba(66, 244, 161, 0.2);">
		        <tr style="width:100%;height:ROWHEIGHTpx;">
		        	<td rowspan='2' style="width:3.5%;">
		        		<button value='VALUE' style="height:100%;width:100%;padding:0;" class="btn btn-info cardBtn moveCard"
		        						data-toggle="tooltip" data-placement="top" title="Add & Remove Card">
							<span class="glyphicon glyphicon-chevron-left"></span>
		        		</button>
		        	</td>
				    <td rowspan='2' style="width:7%;height:100%;">
		                <button value='VALUE' style="height:33%;width:100%;padding:0;border-bottom-left-radius:0;
		                                border-bottom-right-radius:0;" class="btn btn-success cardBtn addCard"
		                                data-toggle="tooltip" data-placement="top" title="Add Card">
		                    <span class="glyphicon glyphicon-plus"></span>
		                </button>
		                <button value='VALUE' style="height:34%;width:100%;padding:0;border-top-left-radius:0;
		                                border-top-right-radius:0;" class="btn btn-warning cardBtn flipCard"
		                                data-toggle="tooltip" data-placement="top" title="Flip Card">
		                    <span class="glyphicon glyphicon-refresh"></span>
		                </button>
		                <button value='VALUE' style="height:33%;width:100%;padding:0;border-top-left-radius:0;
		                                border-top-right-radius:0;" class="btn btn-danger cardBtn removeCard"
		                                data-toggle="tooltip" data-placement="top" title="Remove Card">
		                    <span class="glyphicon glyphicon-remove"></span>
		                </button>
		            </td>
		            <td class="cardBackground" value='VALUE' style="width:82.5%;padding:0;vertical-align:top;background-color:COLOR">
		            	<div style="height:50px;">
			                <h4 style="text-align:center;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;
			                            margin:0;">
			                    CODEOFCOURSE, NAMEOFCOURSE
			                    <!--<hr style="width:90%;border-color:black;margin:0 0 0 5%;">-->
			                </h4>
			                <table style="width:100%;">
			                    <tr style="text-align:center;">
			                        <td style="width:33%;">
			                            CREDITSOFCOURSE
			                        </td>
			                        <td style="width:34%;">
			                            TERMOFCOURSE
			                        </td>
			                        <td style="width:33%;">
			                            HOURSOFCOURSE
			                        </td>
			                    </tr>
			                </table>
		                </div>
		                <div style="height:CONTENTHEIGHTpx;overflow-y:auto;">
			                <p style="margin-left:2.5%;">
		     					DESCRIPTIONOFCOURSE
		  	               	</p>
	  	               	</div>
		            </td>
		            <td rowspan='2' style="width:7%;">
		                <button value='VALUE' style="height:50%;width:100%;padding:0;border-bottom-left-radius:0;
		                                border-bottom-right-radius:0;" class="btn btn-primary cardBtn shiftUpCard"
		                                data-toggle="tooltip" data-placement="top" title="Raise Card">
		                    <span class="glyphicon glyphicon-arrow-up"></span>
		                </button>
		                <button value='VALUE' style="height:50%;width:100%;padding:0;border-top-left-radius:0;
		                                border-top-right-radius:0;" class="btn btn-primary cardBtn shiftDownCard"
		                                data-toggle="tooltip" data-placement="top" title="Lower Card">
		                    <span class="glyphicon glyphicon-arrow-down"></span>
		                </button>
		            </td>
		        </tr>
		    </table>
		</div>
	*/}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1].replace(/(\r\n|\n|\r)/gm,"");

	string = string.replaceAll('DIVHEIGHT', String(size));
	string = string.replaceAll('ROWHEIGHT', String(size - 5));
	string = string.replaceAll('CONTENTHEIGHT', String(size - 50 - 5));
	string = string.replaceAll('NAMEOFCOURSE', course.entry.course);
	string = string.replaceAll('CODEOFCOURSE', course.entry.accr);
	string = string.replaceAll('TERMOFCOURSE', '[' + course.entry.term + ']');
	string = string.replaceAll('CREDITSOFCOURSE', course.entry.credits);
	string = string.replaceAll('HOURSOFCOURSE', course.entry.hours);
	string = string.replaceAll('DESCRIPTIONOFCOURSE', course.entry.description);
	string = string.replaceAll('VALUE', index);
	if (!VIEWING[index].flagged) {
		string = string.replaceAll('COLOR', 'rgba(66, 244, 161, 0.2)');
		
	} else {
		string = string.replaceAll('COLOR', 'rgba(255, 255, 0, 0.5)');
	}
	return string;
}


$(document).on('click', '.shiftDownCard', function(){
	if (this.value < VIEWING.length - 1) {
		VIEWING.move(this.value, +this.value + 1);
		displayPlans();
	}
	return;
});


$(document).on('click', '.shiftUpCard', function(){
	var index = this.value;
	if (index > 0) {
		VIEWING.move(this.value, +this.value - 1);
		displayPlans();
	}
	return;
});


$(document).on('click', '.removeCard', function() {
	var index = this.value
	VIEWING.splice(index, 1);
	displayPlans();
	return;
});

$(document).on('click', '.addCard', function() {
	var code = VIEWING[this.value].entry.accr;
	submitSelectedCourse(code)
	return;
});

$(document).on('click', '.flipCard', function(){
	var index = this.value;
	VIEWING[index].generalView ^= true; // toggle
	displayPlans();
	return;
});

$(document).on('click', '.moveCard', function(){
	var index = this.value;
	/* Add */
	var code = VIEWING[index].entry.accr;
	submitSelectedCourseViewing(code, index);// will remove card if succesful
	return;
});





function courseDetailText(code) {
	var html = '<table style="width:100%;">' +
			   		Details(code) + 
			   	'</table>';
	return html;

	function Details(code) {
		var html = '';
		for (var i = 0; i < SEMESTERS.length; i++) {
			for (var j = 0 ; j < SEMESTERS[i].courses.length; j++) {
				for (var k = 0; k < DETAILS.length; k++) {
					var detail = SEMESTERS[i].courses[j].details[DETAILS[k]];
					var header = DETAILS[k];
					html += '<tr>' + 
								'<td style="border:solid gray">' + 
									header + 
								'</td>' + 
								'<td style="border:solid gray">' + 
									detail + 
								'</td>' + 
							'</tr>';
				}
			}
		}
		return html
	}
}

$(document).on('click', '.cardBackground', function() {
	var index = $(this).attr('value');
	VIEWING[index].flagged ^= true;
	displayPlans();
	return;
});



function getDropDownValues(id) { // Not used
	var values = [];
	$(id + ' option').each(function() { 
    	values.push( $(this).attr('value') );
	});
	return values;
}

$(document).on('click', '.leftPanelSubjects', function(){
	if (this.value == undefined) return;
	if (this.value == 'CUSTOM') {
		bootbox.prompt({
			title: "Enter the Course Code of a Course You Couldn't Find. We'll add it for you!",
			size: 'small',
			backdrop: true,
			callback: function(result) {
				if (result != null) {
					var courseCode = result;
					SEMESTERS[getSemesterIndex()].courses.push(new courseConstruct('*'+courseCode+'*', [courseCode.split('*')[0], '*'+courseCode+'*', '*'+courseCode+'*', undefined]));
				}
				$('#pickSubjectScreen').modal('hide');
				displayPlans();
			}
		});
		return;
	}
	SUBJECTPICKED_PLZRM = this.value.replaceAll('_', ' ');
	$('#pickSubjectScreen').modal('hide');
	displayPlans();

	// tutorialStep(2, false);
	return;
});


/* Options */
$(document).on('click', '#middlePanelNav1', function(){
	$('#secondPanelOptions').hide(0);
	$('#firstPanelOptions').show(0);
	return
});

$(document).on('click', '#middlePanelNav2', function(){
	$('#secondPanelOptions').show(0);
	$('#firstPanelOptions').hide(0);
	return
});

$(document).on('click', '.secondPanelOption', function() {
	switch (this.value) {
		case 'general':
			for (var i = 0; i < VIEWING.length; i++) {
				VIEWING[i].generalView = true;
			}
			displayPlans();
			break;
		case 'details':
			for (var i = 0; i < VIEWING.length; i++) {
				VIEWING[i].generalView = false;
			}
			displayPlans();
			break;
		case 'filter':
			bootbox.alert({message: 'Filter Not Yet Supported', backdrop: true, size: 'small'});
			break;
		case 'deleteAll':
			bootbox.confirm({
			    message: 'Are you sure you want to remove all cards? This cannot be undone.',
			    backdrop: true,
			    buttons: {
			        confirm: {
			            label: 'Remove All Cards',
			            className: 'btn-danger'
			        },
			        cancel: {
			            label: 'Cancel',
			            className: 'btn-default'
			        }
			    },
			    callback: function (yesDelete) {
			        if (yesDelete) {
				        VIEWING.splice(0, VIEWING.length);
			    		displayPlans();
		    		}
		    		return;
			    }
			});
		    break;
		default:
			bootbox.alert({message: 'how did you click this?', backdrop: true, size: 'small'});
			break;
	}
	return;
});



/* ADD SEMESTER DISABLING */
$(document).on('change', '#selYear, #selTerm', function() {
	ableAddSemester();
	return;
});

function ableAddSemester() {
	var year = $("#selYear option:selected").text(); // selected value
	var term = $("#selTerm").prop('selectedIndex') - 1;
	
	/* Check for duplicates */
	for (var i = 0; i < SEMESTERS.length; i++) {
		if (SEMESTERS[i].year == year) {
			if (SEMESTERS[i].term == term) {
				$('#addSemOpen').prop('disabled', true);
				return;
			}
		}
	}
	$('#addSemOpen').prop('disabled', false);
	return;
}









































//******************************************** Expand Buttons**************************//
$(document).on('click', '#leftPanelToggleFilters', function(){
	$('#firstPanelFilters').toggle(800);
	return;
});


function resetSemesterCoursesDisplay(semester) {
	for (var i = 0; i < SEMESTERS[semester].courses.length; i++) {
		SEMESTERS[semester].courses[i].detailShown = 1;
		SEMESTERS[semester].courses[i].show = false;
	}
	return;
}

// expandAllSemesters() 
$(document).on('click', '#expandAllSemesters', function(){
	for (var i = 0; i < SEMESTERS.length; i++) {
		/* Change State */
		if (SEMESTERS[i].courses.length < 1) continue; // Nothing to Show
	    SEMESTERS[i].show = true;
	    resetSemesterCoursesDisplay(i);
	    
	    /* Perform Animation */
	    var targetId = 'coursesInfo_' + i;
		displayPlans();
		$("#" + targetId).hide(1);
		$("#" + targetId).show(20600);
	}
	return;
});

// collapseAllSemesters()
$(document).on('click', '#collapseAllSemesters', function(){
	for (var i = 0; i < SEMESTERS.length; i++) {
		/* Change State */
		if (SEMESTERS[i].courses.length < 1) continue; // Nothing to Show
	    SEMESTERS[i].show = false;
	    resetSemesterCoursesDisplay(i);
	    
	    /* Perform Animation */
	    var targetId = 'coursesInfo_' + i;
		displayPlans();
		// $("#" + targetId).show(0);
		$("#" + targetId).hide(600);
	}
	return;
});

// toggleSemester()
$(document).on('click', '.semesterToggle', function(){
	if (SEMESTERS.length < 1) return; // Nothing to show (dont think this can happen)

	/* Get Semester Num */
	var id = this.id;
	var semesterNum = id.split("_")[1];

	/* Toggle State */
	if (SEMESTERS[semesterNum].courses.length < 1) return; // Nothing to Show
    SEMESTERS[semesterNum].show = !SEMESTERS[semesterNum].show;

    /* Perform Animation */
    var targetId = 'coursesInfo_' + semesterNum;
	displayPlans();
	$("#" + targetId).toggle(0); // For the animation
	$("#" + targetId).toggle(600);
	resetSemesterCoursesDisplay(semesterNum);
	return;
});

// toggleCourse()
$(document).on('click', '.courseToggle', function(){
	if (SEMESTERS.length < 1) return; // shouldnt happen

	/* Get Semester and Course Number */
	var id = this.id;
	var semesterNum = id.split("_")[1];
	var courseNum = id.split("_")[2];

	/* Toggle State */
	if (SEMESTERS[semesterNum].courses.length < 1) return; // Nothing to Show (shouldnt happen)
    SEMESTERS[semesterNum].courses[courseNum].show = !SEMESTERS[semesterNum].courses[courseNum].show;
    
    /* Perform Animation */
    var targetId = 'courseDetailTable_' + semesterNum + '_' + courseNum;
	displayPlans();
	// $("#" + targetId).toggle(0); // Animation acts very strange :/
	// $("#" + targetId).toggle(400);
	return;
});

// selectCourseDetail()
$(document).on('click', '.courseDetails', function () {
	var id = this.id;
	var button    = id.split("_")[0];
	var semNum    = id.split("_")[1];
	var courseNum = id.split("_")[2];

	// Select Requester Detail and Display */
	SEMESTERS[semNum].courses[courseNum].detailShown = button;
	displayPlans();
	return;
});
