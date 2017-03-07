/* Copyright (c) 2017 Nawar Ismail */
$(document).on('click', '.openUploadTS', function() {
	var string = (function () {/*
		<div style="text-align:center;">
			<h2>Upload Transcript</h2>
			A few steps, but it is <b>well worth it</b> if you've taken a lot of courses!

			<br>
			<b>1.</b> You need to log onto <a target="_blank" href="https://webadvisor.uoguelph.ca/WebAdvisor/WebAdvisor">WebAdvisor</a> and navigate to your Unofficial Transcript.<br>
			<img style="max-height:500px;max-width:400px;" src="images/unofficialTS.png"><br>
			<br>

			<span class="glyphicon glyphicon-chevron-down"></span>
			<br>
			<img style="max-height:500px;max-width:400px;" src="images/transcript.png"><br>
			<br>
			<b>2.</b> You must select then copy the ENTIRE page:<br>
				Windows: Press CTRL+A Then CTRL+C.<br>
				Mac:     Press CMD+A Then CMD+C.<br>
			<br>
			<b>3.a) </b> Paste the text in this box, and press submit.<br>
			<textarea style="width:80%;" rows="1" id="transcriptText"></textarea>
			<button id="transcriptUploadText" class="btn btn-primary" style="width:20%;">Upload Text</button><br><br>
			
			<b>3.b) </b> Or via a file: Paste and save it into a text file (.txt) and upload it! Note that you can "Save As" word documents as .txt<br>
			<div class="w3-row">
				<div class="w3-container w3-full"> 
		            <label for="fileInput" class="btn btn-primary" style="width:20%;height:100%;">
		                <i class="fa fa-cloud-upload"></i>
		                <div style="align-text:center;">Upload File</div>
		            </label>
		            <input style="display:none;" id="fileInput" type="file"/>
	            </div>
	            <div class="w3-container w3-half"> 
		            <label for="fileInputDeleteAll" class="btn btn-primary" style="width:80%;height:100%;display:none;">
		                <i class="fa fa-cloud-upload"></i>
		                <div style="align-text:center;">Clear Semesters & Upload Transcript</div>
		            </label>
		            <input style="display:none;" id="fileInputDeleteAll" type="file"/>
	            </div>
	        </div>
	        <hr>
	        <b>Please Note:</b> The information we collect is : Course Code, and Term.<br>
				We <b>DO NOT</b> store or collect any personal information (not even your grades!).
        </div>
	*/}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1].replace(/(\r\n|\n|\r)/gm,"");
	
	$('.modal.in').modal('hide');
	setTimeout(function() {
		bootbox.alert({message: string, backdrop: true, size: 'large'}).on("shown.bs.modal", function(e) {
			$(this).scrollTop(0);
		});
	}, 500);
	
});


/********************************************************
 	Transcript Upload Functions 
********************************************************/
$(document).on('click', '#transcriptUploadText', function() {
	var contents = $('#transcriptText').val();
	readTranscriptData(contents);
	return;
});

$(document).on('change', '#fileInputDeleteAll', function(evt) { // Taken from somewhere
	$('.modal.in').modal('hide');
	readTranscriptFile(evt, true);
  	return;
});

$(document).on('change', '#fileInput', function(evt) { // Taken from somewhere
	$('.modal.in').modal('hide');
	readTranscriptFile(evt, false);
  	return;
});

/* Modified from:
http://www.htmlgoodies.com/beyond/javascript/read-text-files-using-the-javascript-filereader.html#fbid=uOPUtDtkwq9 */
function readTranscriptFile(evt, deleteAll) {
	/* Retrieve the first (and only!) File from the FileList object */
	var f = evt.target.files[0]; 

	/* Error Checking */
	if (!f) {
		bootbox.alert({message: "Failed to load file", backdrop: true, size: 'small'});
		return;
	} else if (!f.type.match('text.*')) {
		bootbox.alert({message: f.name + " is not a valid text file.", backdrop: true, size: 'small'});
		return;
	}
	if (deleteAll) {
		SUBJECTPICKED_PLZRM = 'NONE';
		remSemesters(0, SEMESTERS.length);
	}
	bootbox.alert({message: "Upload Starting!", backdrop: true, size: 'small', callback: function () {
		    /* Read File */
			var r = new FileReader();
			r.onload = function(e) {  // asynchronous!
				var contents = e.target.result;
				readTranscriptData(contents);
			 	return;
			}
		  	r.readAsText(f);	
    	}
	}).on("shown.bs.modal", function(e) {
		$(this).scrollTop(0);
	});
	return;
}


function readTranscriptData(content) {
	var lines = content.split("\n");
	var correctRange = false;
	var readingCourse = false;
	var string = "";

	for (var i = 0; i < lines.length; i++) {
		$('body').css({'cursor':'wait'}); // UNTESTED

		/* Correct Range Check */
		if (!correctRange) {
			if (lines[i].indexOf('*') >= 0) {
				correctRange = true;
			}
		}
		if (correctRange) {
			/* End of Correct Range Check */
			if (lines[i].indexOf('Total Earned Credits') >= 0) {
				break;
			}

			/* In the Correct Range Below This Line */
			if (lines[i].indexOf('*') >= 0) { // Found Course (always preceds term)
				readingCourse = true;
				string += lines[i].split(' ')[0]; // Course Code is first word in line
				// String now contains course code
			} else {
				if (((lines[i].indexOf('F') >= 0)  ||
					 (lines[i].indexOf('W') >= 0)  ||
				 	 (lines[i].indexOf('S') >= 0)) &&
					 ((lines[i].replaceAll('\n', '').length == 4) || (lines[i].replaceAll('\n', '').length == 3)))  { // Found Term

					var term = lines[i][0]; // Lines[i] Ex: F15
					var year = "20" + lines[i][1] + lines[i][2];

					/* Add the Course */
					string += "||" + term + "||" + year; // String already contains course code
					var index = addGivenSemester(year, TERMS.indexOf(term));

					// Retrieve text from database and set courseDetails of course to it.
					var courseCode = string.split("||")[0];
					var courseContent = getCourseContent(courseCode); // array
					console.log(courseCode, term, year); // Testing
					/* Check for Duplicates in current semester */
					var duplicate = false;
					for (var j = 0; j < SEMESTERS[index].courses.length; j++) {
						if (findString(SEMESTERS[index].courses[j].courseCode, courseCode)) {
							console.log('You already took ' + courseCode + ' In this semester: ' + year+term);
							duplicate = true;
						}
					}

					/* Add Course */
					if (!duplicate) {
						if (courseContent === undefined) {
							bootbox.alert({message: "Could Not Find " + courseCode + ". Sorry.", backdrop: true, size: 'small'});
							SEMESTERS[index].courses.push(new courseConstruct('*'+courseCode+'*', [courseCode.split('*')[0], '*'+courseCode+'*', '*'+courseCode+'*', undefined]));
							console.log('Course Content Undefined For:', courseCode); // keep this line
						} else {
							SEMESTERS[index].courses.push(new courseConstruct(courseCode, courseContent));
						}
					}

					/* Reset */
					string = "";
					readingCourse = false;
				}
			}
		}
 	}
 	$('body').css({'cursor':'default'});
 	console.log("Finished Transcript Upload");
 	displayPlans();
 	bootbox.alert({message: "Upload Successful", backdrop: true, size: 'small'});
 	$('#optionsModal').modal('hide');
 	return;
}

