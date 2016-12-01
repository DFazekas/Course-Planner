/********************************************************
 	Display Functions 
********************************************************/
var SUBJECTPICKED_PLZRM = false;

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
	return;
});


$(document).on('click', 'body', function(event) { // Better way? (jquery=async -> shouldnt hit performance)
	// Show all tool tips if button clicked
	if (event.target.id == 'allToolTips') {
		$('[title]').each(function() {
	        $this = $(this);
	        if ($this.attr('data-toggle') == 'tooltip') {
	        	$this.tooltip('enable');
	        	$this.tooltip('show');
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


// $(document).on('click', '#allToolTips', function() {
// 	$('[title]').each(function() {
//         $this = $(this);
//         if ($this.attr('data-toggle') == 'tooltip') {
//         	$this.tooltip('show');
//         }
//     });
//     return;
// });

$(document).on('click', '#toggleToolTips', function(){
	var disableFirstTime = true;
	$('[title]').each(function() {
        $this = $(this);
        if ($this.attr('data-toggle') == 'tooltip') {
        	// Initialize
        	if ($this.attr('works') == undefined) {
        		$this.attr('works', disableFirstTime);
        		
        	}

        	if ($this.attr('works') == 'true') {
        		$this.tooltip('disable');
        		$this.attr('works', false);
        	} else {
        		$this.tooltip('enable');
        		$this.attr('works', true);
        	}
	    }
    });
	return;
});

function drawSemestersA() { // add scoping fixes
	/* Display Year and Term */
	$('#currentSem').html('<span class="glyphicon glyphicon-search" aria-hidden="true"></span>');
	for (var i = 0; i < SEMESTERS.length; i++) {
		if (SEMESTERS[i].show == true) {
			$('#currentSem').html(SEMESTERS[i].year + ' ' + TERMS[SEMESTERS[i].term]);
			break;
		}
	}

	/* Left Panel Courses */
	//string = 'Accronyms<input style="margin:0 auto;display:relative" type="checkbox" checked data-toggle="toggle">Name';
	string = '';
	if (getSemesterIndex() != -1) { // Not sure if I need this 'if'
		for (var i = 0; i < SEMESTERS[getSemesterIndex()].courses.length; i++) {
			string += ''+
					'<table style="width:100%;"><tr>'+
						'<td style="width:30px;"><button type="button" class="btn btn-danger remCourseBTN" style="border-top-right-radius:0;border-bottom-right-radius:0;" value="'+ i +'"><span class="glyphicon glyphicon-minus"></button></td>'+
						'<td><button type="button" section="upper" class="btn btn-default courseClick" value="';
			if ($("#leftPanelNameCodeButton").is(':checked')) {
				string += SEMESTERS[getSemesterIndex()].courses[i].courseCode + '" style="width:100%;border-top-left-radius:0;border-bottom-left-radius:0;">'+
							SEMESTERS[getSemesterIndex()].courses[i].courseCode;
			} else {
				string += SEMESTERS[getSemesterIndex()].courses[i].courseCode + '" style="width:100%;border-top-left-radius:0;border-bottom-left-radius:0;">'+
							SEMESTERS[getSemesterIndex()].courses[i].details['course'];
			}
			
			string += '</button></td>'+
					'</tr></table>';
		}

	}


	/* Left Panel Subject Courses */
	subjectCoursesName = [];
	subjectCoursesCode = [];
	for (var i = 0; i < DATABASE.length; i++) {
		if (DATABASE[i].subject == SUBJECTPICKED_PLZRM) {
			subjectCoursesCode.push(DATABASE[i].accr);
			subjectCoursesName.push(DATABASE[i].course);
		}
	}

	// Availability
	var available = [];
	for (var i = 0; i < subjectCoursesCode.length; i++) {
		var selectedCourse = subjectCoursesCode[i];
		var courseContent = getCourseContent(selectedCourse); // array
		if (courseContent === undefined) {
			console.log("Could not find " + selectedCourse + ".");
			continue;
		}
		if (verifyCourse(courseContent) === undefined) { // Can Take
		    available.push(selectedCourse);
		}
	}
	
	/* Subject Courses */
	string += '<hr><div>';
	for (var i = 0; (i < subjectCoursesName.length) && SUBJECTPICKED_PLZRM; i++) {
		if ($('#fpHideUnavailable').prop('checked')) {
			if ($.inArray(subjectCoursesCode[i], available) === -1) { // Not availble
				continue;
			}
		}

		string += ''+
				'<table style="width:100%;"><tr>'+ // opacity:0.2;
					'<td style="width:30px;"><button type="button" class="btn btn-success addSemCourseBTN" style="border-top-right-radius:0;border-bottom-right-radius:0;" value="'+ subjectCoursesCode[i] +'"><span class="glyphicon glyphicon-plus"></button></td>'+
					'<td><button type="button" section="lower" class="btn btn-primary courseClick" value="';
		if ($("#leftPanelNameCodeButton").is(':checked')) {
			string += subjectCoursesCode[i] + '" style="width:100%;border-top-left-radius:0;border-bottom-left-radius:0;">'+
						subjectCoursesCode[i];
		} else {
			string += subjectCoursesCode[i] + '" style="width:100%;border-top-left-radius:0;border-bottom-left-radius:0;">'+
						subjectCoursesName[i];
		}

		string += '</button></td>'+
				'</tr></table>';
	}
	$('#semesterCourses').html(string + '</div>');

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
			$('.courseClick[value="' + subjectCoursesCode[i] + '"]').css('opacity', 0.85);
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
	if (VIEWING.length == 0) {
		$('.secondPanelOption').prop('disabled', true);
	} else {
		$('.secondPanelOption').prop('disabled', false);
	}

	













	

	/* Overview */
	string = '<table><tr><td>Semesters |</td><td> Courses</td></tr>';
	for (var i = 0; i < SEMESTERS.length; i++) {
		string += '<tr><td>'+ 
				'<input type="radio" class="overview_sem" name="semester" value="' + i + '"></input>' + 
				'(' + (i+1) + ') ' + SEMESTERS[i].year + ' ' + TERMS[SEMESTERS[i].term] +'</td><td></td></tr>';
		for (var j = 0; j < SEMESTERS[i].courses.length; j++) {
					string += '<tr><td></td><td>'+
					'<input type="checkbox" class="overview_course" name="course" value="'+i+' '+j+'"></input>' +
					'('+ (j+1) + ') ' + SEMESTERS[i].courses[j].courseCode +'</td></tr>';
		}
	}
	string += '</table>';
	$('#overviewContent').html(string);
	for (var i = 0; i < SEMESTERS.length; i++) {
		if (SEMESTERS[i].show) {
			$('input[name=semester][value='+i+']').prop('checked', true);
		}
	}


	/* Right Panel */
	string = '';
	var size = 170;
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



	return;
}

/*'offerings', 'prereqs',
				'coreqs', 'equates', 'restrictions', 'externalinfo',
				'departments'*/ 
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
				    <td rowspan='2' style="width:7%">
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

		            <td style="width:82.5;padding:0;vertical-align:top;">
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
	// if (index == 0) {
		// console.log(index);
	// } 
	// else if (index == VIEWING.length - 1) {
		// $('.shiftDownCard[value=' + VIEWING.length - 1 + ']').prop('disabled', true);
	// }
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
				    <td rowspan='2' style="width:7%">
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
		            <td style="width:82.5%;padding:0;vertical-align:top;">
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
	if (submitSelectedCourse(code)) {
		/* Remove */
		VIEWING.splice(index, 1);
		displayPlans();
	}
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




function getDropDownValues(id) { // Not used
	var values = [];
	$(id + ' option').each(function() { 
    	values.push( $(this).attr('value') );
	});
	return values;
}


$(document).on('click', '.leftPanelSubjects', function(){
	if (this.value == undefined) return;
	SUBJECTPICKED_PLZRM = this.value.replaceAll('_', ' ');
	$('#pickSubjectScreen').modal('hide');
	displayPlans();
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
			alert('Filter Not Yet Supported');
			break;
		case 'deleteAll':
		    if (confirm('Are you sure you want to remove all cards? This cannot be undone.')) {
		    	VIEWING.splice(0, VIEWING.length);
		    	displayPlans();
			}
		    break;
		default:
			alert('how did you click this?');
			break;
	}
	return;
});



































function drawSemesters() {
	return;
	var numSem = SEMESTERS.length;

	/* If No Semesters, Nothing to Display */
	if (numSem < 1) {
		$('#plan').html(headerHTML() + '<h4 style="text-align:center">Try Adding a Semester!</h4>');
		return;
	}

	/* Create and Display HTML */
	var html = headerHTML();
	for (var i = 0; i < numSem; i++) {
		html += semesterHeaderHTML(i);
		html += coursesText(i);
	}
	html += footerHTML();
	$('#plan').html(html);
	
	/* Display Folding Accordingly */
	for (var i = 0; i < numSem; i++) {
		if (!SEMESTERS[i].show) {
			var targetId = 'coursesInfo_' + i;
			$("#" + targetId).hide();
		}
		// Default is show so no need for else
	}
	return;

	function headerHTML() {
		return  '<div class="w3-row-padding" style="padding-top:6px">' +  // 6px = 3px * 2
					'<button class="btn btn-success w3-threequarter" id="addSemesterBtn" style="height:50px;">'+ // % no work
						'<span class="glyphicon glyphicon-plus"></span> Add Semester'+
					'</button>' + 

					'<div class="dropdown w3-quarter">' +
					  '<button class="btn btn btn-info dropdown-toggle" type="button"' + 
					  	 'data-toggle="dropdown" style="height:50px;width:100%">Other' +
					  '<span class="caret"></span></button>' +
					  '<ul class="dropdown-menu" style="background-color:orange;color:white;">' +
					    '<li>' + 
					    	'<a id="expandAllSemesters" style="color:white;">&nbsp<br>Expand All<br>&nbsp</a>' + 
					    '</li>' +
					    '<li style="border-top-style:solid;border-bottom-style:solid;">' +
					    	'<a id="collapseAllSemesters" style="color:white";>&nbsp<br>Collapse All<br>&nbsp</a></li>' +
					    '<li>'+
					    	'<a>' + 
					    	
								'<div class="fileinput fileinput-new" data-provides="fileinput">'+
								'<span style="color:white;"><br>Upload Your Transcript!</span>'+
							    	'<input type="file" id="fileInput" style="height:50px;color:transparent;"/>'+
							    '</div>' + 
				    		'</a>' +
				    	'</li>' +
					  '</ul>' +
					'</div>' +
				'</div>' + 
				'<hr style="margin:5px;">'+
				'';
	}

	function semesterHeaderHTML(i) {
		return  '<div style="width:100%;"' + 
					'<button style="width:90%;" class="btn btn-primary semesterToggle" id=' + "semesterToggle_" + i + '>' +
						"(" + String(i) + ") " + String(TERMS_LETTER[SEMESTERS[i].term]) + String(SEMESTERS[i].year)[2] +  String(SEMESTERS[i].year)[3] + 
						' ' + String(SEMESTERS[i].courses.length) +  ' Courses ' +
					"</button>" +
					'<button class="btn btn-danger removeSemesterBtn" id=' + "removeSemesterSemester_" + i + '>' + 
						'<span class="glyphicon glyphicon-trash"></span>' + // Make it look nice here
					"</button>" + 
					'<button class="btn btn-success addCourseBtn" id=' + "addCourseSemester_" + i + '>' +
						'<span class="glyphicon glyphicon-plus"></span>' + 
					"</button>" +  
				'</div>';
	}

	function footerHTML() {
		return  '<button class="btn btn-danger" id="clearAllSemBtn" style="width:100%">'+
					'<span class="glyphicon glyphicon-trash"></span> Clear All Semesters'+
				'</button>';
	}

}

function coursesText(semesterNum) {
	var numCourses = SEMESTERS[semesterNum].courses.length;
	html = '<div id=' + 'coursesInfo_' + semesterNum + '>';

	for (var i = 0; i < numCourses; i++) {
		var code = SEMESTERS[semesterNum].courses[i].courseCode;

		html += courseHeaderHTML(semesterNum, code);
		if (SEMESTERS[semesterNum].courses[i].show) {
			html += courseDetailText(semesterNum, i);
		}
	}

	html += '</div>';
	return html;


	function courseHeaderHTML(semesterNum, code) {
		return '<div style="position:relative;left:5%;"' + "coursesSemester_" + semesterNum + '>' +
					'<div style="width:90%;"' + 
						'<button class="btn btn-info courseToggle" id='+ "toggleCourseSemester_" + 
						 	+ semesterNum + "_" + i + '>'  + code + ' ' +
						'</button>' + 
						'<button class="btn btn-danger removeCourseBtn" id=' + "removeCourseSemester_" +
						 	semesterNum + "_" + i + '>' + 
							'<span class="glyphicon glyphicon-trash"></span>' + 
						"</button>" + 
					'</div>' + 
				"</div>";
	}
}




function courseDetailTextB(semNum, courseNum) {
	var selectedDetail = SEMESTERS[semNum].courses[courseNum].detailShown;
	var html = '<table id=' + "courseDetailTable_" + semNum + '_' + courseNum + 
					' style="position:relative;left:8%;width:84%;">' +
			   		'<tr>' + 
					   	'<td style="width:10%;" align="right">' + 
					   		 optionsHTML(semNum, courseNum) +
					   	'<td style="border:solid;width:90%;text-align:center;font-size:150%;">' +  
					   		SEMESTERS[semNum].courses[courseNum].details[selectedDetail] + 
				   		'</td>' + 
				   	'</tr>' + 
			   	'</table>';
	return html;


	function optionsHTML(semNum, courseNum) {
		return  '<div class="btn-group-vertical" role="group">' + 
				  '<button class="btn btn-warning courseDetails"' +
					  'id=' + "0_"+ semNum + '_' + courseNum + '>' + 
					  'Overview' + 
				  '</button>' + 
				  '<button class="btn btn-warning courseDetails"' + 
					  'id=' + "1_"+ semNum + '_' + courseNum + '>' + 
					  'Details' + 
				  '</button>' +
				  '<button class="btn btn-warning courseDetails"' + 
				  	   'id=' + "2_"+ semNum + '_' + courseNum + '>' + 
					   'Interactions' + 
				   '</button>' +  

				   	'<div class="btn-group">' +
					 '<button type="button" class="btn btn-warning dropdown-toggle"' +
						 'data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
						 'Other &nbsp<span class="caret"></span>' +
					 '</button>' +
					  '<ul class="dropdown-menu">' +
					    '<li>' +
						    '<a class="btn btn-warning courseDetails"' +
								'id=' + "3_"+ semNum + '_' + courseNum + '>' + 
								'Prereqs' + 
							'</a>' +
						'</li>' +
						'<li>' +
						'<a class="btn btn-warning courseDetails"' + 
							'id=' + "4_"+ semNum + '_' + courseNum + '>' + 
							'Restrictions' + 
						'</a>' +
						'</li>' +
						'<li>' +
						'<a class="btn btn-warning courseDetails"' + 
							'id=' + "5_"+ semNum + '_' + courseNum + '>' + 
							'Offerings' + 
						'</a>' +
						'</li>' +
						'<li>' +
						'<a class="btn btn-warning courseDetails"' + 
							'id=' + "6_"+ semNum + '_' + courseNum + '>' + 
							'CoReqs' + 
						'</a>' +
						'</li>' +
					  '</ul>' +
					'</div>' +
				'</div>' + 
		   	'</td>';
	}
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
