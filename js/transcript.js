/********************************************************
 	Transcript Upload Functions 
********************************************************/
$(document).on('change', '#fileInput', function(evt) { // Taken from somewhere
	alert('Upload Starting');
	/* Retrieve the first (and only!) File from the FileList object */
	var f = evt.target.files[0]; 

	/* Error Checking */
	if (!f) {
		alert("Failed to load file");
		return;
	} else if (!f.type.match('text.*')) {
		alert(f.name + " is not a valid text file.");
		return;
	}

	/* Read File */
	var r = new FileReader();
	r.onload = function(e) {  // asynchronous!
		var contents = e.target.result; // MUST SANATIZE SO AVOID INJECTION ATTACKS
		var lines = contents.split("\n");
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
								alert("Could Not Find " + courseCode + ". Sorry.");
								SEMESTERS[index].courses.push(new courseConstruct('*'+courseCode+'*', [courseCode.split('*')[0], '*'+courseCode+'*', '*'+courseCode+'*', undefined]));
								console.log(courseCode); // keep this line
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
	 	alert('Upload Successful');
	 	$('#optionsModal').modal('hide');
	 	return;
	}
  	r.readAsText(f);
  	return;
});
