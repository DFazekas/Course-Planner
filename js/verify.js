/* Sums credits up to, but not including, selected term. */
function countCredits(subject, level, orAbove, semesterCap) { // countCredits('', 0000, false, 100) gives all
    // if (subject === '') return 0.0;
    // console.log(subject);
    var creditTotal = 0.00; // Credit sum up to, but not including, selected semester.
    for (var i = 0; i < SEMESTERS.length && i <= semesterCap; i++) {
        var numCourses = SEMESTERS[i].courses.length;
        for (var k = 0; k < numCourses; k++) {
            if (subject == '') {
            	var courseCredit = SEMESTERS[i].courses[k].details['credits'];
            	if (courseCredit != undefined) {
	                creditTotal += parseFloat(courseCredit.substring(1));// [1.23]
	            }
                continue;
            }
            var subjectCode = SEMESTERS[i].courses[k].details['accr'].split('*')[0];
            var subjectLevel = SEMESTERS[i].courses[k].details['accr'].split('*')[1];
            var subjectName = SEMESTERS[i].courses[k].details['subject'];
            var wrong = true;

            /* Check if correct subject */
            if (subject === subject.toUpperCase() && subject != '') { // is code
                if (findString(subject, subjectCode)) { // Right subject
                    wrong = false;
                }
            } else {
                if (subject === subjectName) { // Right subject
                    wrong = false;
                }
            }
            if (wrong) continue;

            /* Check if correct level */
            wrong = true; // Try check again
            if (orAbove) {
                if (subjectLevel[0] >= level[0]) {
                    wrong = false;
                }
            } else {
                if (subjectLevel[0] == level[0]) { // compare first digit
                    wrong = false;
                }
            }
            if (wrong) continue;

            creditTotal += parseFloat(SEMESTERS[i].courses[k].details['credits'].substring(1));// [1.23]


            // if (findString())
            // console.log()
            // if (subject != '') {
                // if (SEMESTERS[i].courses[k].details['subject'])
                // console.log(SEMESTERS[i].courses[k].details['subject']);
                // should be generalized to say trim []'s, for [1.0] if it exists
                // console.log(SEMESTERS[i].courses[k].details['accr'] + " = " + SEMESTERS[i].courses[k].details['credits'] + "-> " + creditTotal);

            // }
        }
    }
    return creditTotal;
}

function verifyCourse(details) {
	return main();

	function main() { // For scope management
		if (getSemesterIndex() == -1) {
			return "Please add a semester first.";
		}

		var errmsg = "";
		errmsg += dup();
		errmsg += term();
		errmsg += creds();
		errmsg += offering();
		// msg += prereq();
		errmsg += coreq();
		errmsg += equates();
		// msg += restric();

		if (errmsg == "") return undefined; // if no function returns an error, return the positive signal
		return errmsg;
	}
	

	function dup(courseCode) {
		var courseCode = details[1];
		for (var i = 0; i < SEMESTERS.length; i++) {
			for (var j = 0; j < SEMESTERS[i].courses.length; j++) {
				if (SEMESTERS[i].courses[j].courseCode == courseCode) {
					return "You have already taken this couse in semester: " + (i+1) + "\n";
				}
			}
		}
		return "";
	}

	function term() {
		var semTerm = TERMS[SEMESTERS[getSemesterIndex()].term];
		var courseTerms = details[3];
		
		if (findString(courseTerms, "P")) { // I dont know how to handle this. Fix me
			return "I don't know how to handle this, sorry.";
		}
		if (findString(courseTerms, "U")) { // I dont know how to handle this. Fix me
			return "";
		}
		if (!findString(courseTerms, semTerm)) {
			return "You cannot take this course in that semester.";
		}
		return "";
	}

	function creds() {
		// I'm not sure if there is a verification needed? Maybe if they have too many?
		return "";
	}

	function offering() {
		offerings = details[6];
		if (offerings == "") { // No entry
			return "";
		}

		/* Offered in even-numbered years. And may be offered in odd-numbered years. */ // user overrides.
		if (findString(offerings, "Winter semester offering in odd-numbered years.")) { // One off, must brute force
			if (TERMS[SEMESTERS[getSemesterIndex()].term] == 'W') {
				if ((SEMESTERS[getSemesterIndex()].year % 2) == 0) {
					return "In the winter semester, this course is only offered in odd-numbered years.";
				}
			}
		}

		if (findString(offerings, "odd")) {
			if ((SEMESTERS[getSemesterIndex()].year % 2) == 0) {
				return "This course is only offered in odd-numbered years.";
			}
		} else if (findString(offerings, "even")) {
			if ((SEMESTERS[getSemesterIndex()].year % 2) != 0) {
				return "This course is only offered in even-numbered years.";
			}
		}

		if (findString(offerings, "Distance")) {
			// Course can be taken also or exclusively DE, this doesnt affect verification.
		}

		var words = offerings.split(' ');
		for (var i = 0; i < words.length; i++) {
			if (findString(words[i], ' - ')) { // Should have bound checks
				var lastOrFirst = words[i - 2];
				var year = words[i + 2];
				var term = 0;
				switch(words[i + 1]) {
					 case 'Winter':
					 	term = 0;
					 	break;
					 case 'Summer':
					 	term = 1;
					 	break;
					 case 'Fall':
					 	term = 2;
					 	break;
					 default: 
					 	console.log(words[i + 2]);
					 	return "Error extracting term.";
				}
				if (lastOrFirst == 'Last') {
					var yearExpires = year;
					if (yearExpires < SEMESTERS[getSemesterIndex()].year) {
						return "(Y)Sorry, this course is not longer available as of " + TERMS[term] + yearExpires;
					} else if (yearExpires == SEMESTERS[getSemesterIndex()].year) {
						if (term < SEMESTERS[getSemesterIndex()].term) {
							return "(T)Sorry, this course is not longer available as of " + TERMS[term] + yearExpires;
						}
					}
					return "";
				} else {
					var yearStarts = year;
					if (yearStarts > SEMESTERS[getSemesterIndex()].year) {
						return "(Y)Sorry, this course is not yet available until " + TERMS[term] + yearExpires;
					} else if (yearStarts == SEMESTERS[getSemesterIndex()].year) {
						if (term > SEMESTERS[getSemesterIndex()].term) {
							return "(T)Sorry, this course is not yet available until " + TERMS[term] + yearExpires;
						}
					}
					return "";
				}
				break; // found '-'
			}
		}
		return "";
	}
	function prereq() {
		// This is from equates: "Pre-requisites may be taken as co-requisites"

	}

	function coreq() {
		if (details[8] == "") { // No coreqs
			return "";
		}
		if (findString(details[8], "All Phase")) { // FIX ME
			return "You need all Phase #" + details[8].split(" ")[3] + " Courses. I cannot check this yet, sorry.";
		}
		if (findString(details[8], "Psychology-COOP major")) { // need coreq if major is []. Untested.
			// if (major != Psychology-COOP) {
			return "";
			// }
		}

        var foundCoReq = false
		for (var j = 0; j < SEMESTERS[getSemesterIndex()].courses.length; j++) {
			if (findString(details[8], SEMESTERS[getSemesterIndex()].courses[j].courseCode)) {
				foundCoReq = true;
			}
		}
		if (!foundCoReq) {
			return "Sorry, you need the following co-requisites: " + details[8];
		}
		
		return "";
	}

	function equates() {
		if (details[9] == "") { // No equates
			return "";
		}
		// Check if they've taken any equivilant courses
		for (var i = 0; i < SEMESTERS.length; i++) {
			for (var j = 0; j < SEMESTERS[i].courses.length; j++) {
				if (findString(details[9], SEMESTERS[i].courses[j].courseCode)) {
					return "You already have an equivilant course " + SEMESTERS[i].courses[j].courseCode + " In semester: " + (i+1);
				}
			}
		}
		return "";
	}

	function restric() {

	}
}

// function() prereqs4NotUsedNow {
//         /* Get Input */
//         var input = $('#input').html();
//         var lines = input.split('\n');
//         lines.shift();

//         /* Process Input */
//         for (var i = 0; i < lines.length; i++) {
//             delegateInput(lines[i]);
//         }

//         $('#output').html('test'); // Might be a good idea to output as a table
//     });

//     function isCredit(word) {
//         if (word.length <= 0) return false;
//         if (findString(word, '000')) return false;
//         if (!isNaN(word)) return true; // is digit
//         return false;
//     }

//     function findString(string, toFind) {
//         return string.indexOf(toFind) > -1;
//     }

//     function toTitleCase(str) {
//         return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
//     }

//     /* Sums credits up to, but not including, selected term. */
//     /*connect to current Semester*/
//     function countCredits(subject, level, orAbove, semesterCap) { // countCredits('', 0000, false, 100) gives all
//         // if (subject === '') return 0.0;
//         // console.log(subject);
//         var creditTotal = 0.00; // Credit sum up to, but not including, selected semester.
//         for (var i = 0; i < SEMESTERS.length && i <= semesterCap; i++) {
//             var numCourses = SEMESTERS[i].courses.length;
//             for (var k = 0; k < numCourses; k++) {
//                 if (subject == '') {
//                     creditTotal += parseFloat(SEMESTERS[i].courses[k].details['credits'].substring(1));// [1.23]
//                     continue;
//                 }
//                 var subjectCode = SEMESTERS[i].courses[k].details['accr'].split('*')[0];
//                 var subjectLevel = SEMESTERS[i].courses[k].details['accr'].split('*')[1];
//                 var subjectName = SEMESTERS[i].courses[k].details['subject'];
//                 var wrong = true;

//                 /* Check if correct subject */
//                 if (subject === subject.toUpperCase() && subject != '') { // is code
//                     if (findString(subject, subjectCode)) { // Right subject
//                         wrong = false;
//                     }
//                 } else {
//                     if (subject === subjectName) { // Right subject
//                         wrong = false;
//                     }
//                 }
//                 if (wrong) continue;

//                 /* Check if correct level */
//                 wrong = true; // Try check again
//                 if (orAbove) {
//                     if (subjectLevel[0] >= level[0]) {
//                         wrong = false;
//                     }
//                 } else {
//                     if (subjectLevel[0] == level[0]) { // compare first digit
//                         wrong = false;
//                     }
//                 }
//                 if (wrong) continue;

//                 creditTotal += parseFloat(SEMESTERS[i].courses[k].details['credits'].substring(1));// [1.23]


//                 // if (findString())
//                 // console.log()
//                 // if (subject != '') {
//                     // if (SEMESTERS[i].courses[k].details['subject'])
//                     // console.log(SEMESTERS[i].courses[k].details['subject']);
//                     // should be generalized to say trim []'s, for [1.0] if it exists
//                     // console.log(SEMESTERS[i].courses[k].details['accr'] + " = " + SEMESTERS[i].courses[k].details['credits'] + "-> " + creditTotal);

//                 // }
//             }
//         }
//         return creditTotal;
//     }

//     function delegateInput(line) {
//         return;
//         var courses = ['A*', 'B*', 'C*', 'D*', 'E*', 'F*', 'G*', 'H*']
//         var counter = 0;
//         while (findString(line, '@')) {
//             line = line.replace('@', courses[counter % courses.length] + (+counter+1) + '0');
//             counter++;
//         }



//         // Courses, no credits, no long words
//         // Courses, no credits
//         // Courses
//         // else

//         var msg = '';
//         if (findString(line, '*')) { // If should contain dictionary.
//             // Alpha, Beta and Gamma sets
//         } else { // Delta set
//             if (findString(line, 'redit')) {
//                 if (line.trim().split(' ').length <= 3) { // make more robust, different browser might not work.
//                     var creditsNeeded = line.split(' ')[0];
//                     // if (userCredits >= /*float*/creditsNeeded) {
//                         // allow
//                     // } else disallow
//                     msg = 'Need ' + creditsNeeded + ' Credits';
//                 } else {
                    
//                     if (findString(line, 'ncluding')) {
                        
//                     } else if (findString(line, 'inimum')) {

//                     } else {
//                         /* Determine Subjects */
//                         line = line.toUpperCase();
//                         var name = [];
//                         var code = [];
//                         for (var i = 0; i < SUBJECTS.length; i++) {
//                             if (findString(line, ' ' + SUBJECTS[i].accr.toUpperCase())) {
//                                  if (findString(line, 'STATEMENT') && SUBJECTS[i].accr == 'STAT') continue;
//                                  // ^ Not foolproof if statement and 'stat' subject are found.
//                                 // There is a subtly here. 'FRENCH' appears, so ' Fren' is picked up. but
//                                 // 'FREN ' would not be
//                                 // Space needed to ignore codes being found in words.
//                                 code.push(SUBJECTS[i].accr);
//                             } else if (findString(line, SUBJECTS[i].subject.toUpperCase())) {
//                                 name.push(SUBJECTS[i].subject);
//                             }
//                         }
//                         /* If not found */
//                         if (!name && !code) {
//                             msg = line; // Half credit in ecology(<- not a subject) ambigous
//                         } else {
//                             /* Parse String */ // Double check these all have subjects
//                             /* Get Level */
//                             var level = ''
//                             if (findString(line, '1000')) level = '1000';
//                             else if (findString(line, '2000')) level = '2000';
//                             else if (findString(line, '3000')) level = '3000';
//                             else if (findString(line, '4000')) level = '4000';

//                             if (level != '') {
//                                 var subjects = code + name; // grab credits from these.
//                                 var subjCreds = '';
//                                 var levelCreds = '';
                                
//                                 var words = line.split(' ');
//                                 var credits = [];
//                                 for (var i = 0; i < words.length; i++) {
//                                     if (isCredit(words[i])) {
//                                         credits.unshift(words[i]);
//                                         if (credits.length == 1) {
//                                             subjCreds = words[i];
//                                         } else {
//                                             levelCreds = words[i];
//                                         }
//                                     }
//                                 }

//                                 if (levelCreds == '') {
//                                     levelCreds = subjCreds;
//                                     subjCreds = '';
//                                 }

//                                 if (findString(line, 'HIGHER') || findString(line, 'ABOVE')) {
//                                     level += '+++';
//                                 }

//                                 /* Check if user matches credits */
//                                 var totalUserCreds = countCredits(subjects, '0000', true, 100);
//                                 var levelUserCreds = countCredits(subjects, level, findString(level, '+++'), 100);
//                                 var valid = true;
//                                 if (parseFloat(levelUserCreds) < parseFloat(levelCreds)) { // failed
//                                     valid = false;
//                                 }
//                                 if (subjCreds != '') {
//                                     if (parseFloat(totalUserCreds) < parseFloat(subjCreds)) { // failed
//                                         valid = false;
//                                     }
//                                 }
//                                 if (!valid || findString(line, 'PREVIOUS STUDY') ||
//                                                 findString(line, 'OR EQUIVALENT')) {
//                                     msg = line;
//                                 }   
//                             } else {
//                                 line = line.toUpperCase();
//                                 console.log('>> ' + line);
//                                 if (findString(line, 'ECOLOGY')) {
//                                     msg = line;
//                                     // Skip the rest
//                                 } else {
//                                     var sections = [];
//                                     for (var i = 0; i < 10; i++) { // only allows one ' OR #'
//                                         var tempLine = line.replace(' OR ' + i, ' OR ' + String(i) + String(i));
//                                         sections = tempLine.split(' OR ' + i);
//                                         if (sections.length > 1) break; // if found one split
//                                     }
                                    
                                    
//                                     var valid = false;
//                                     for (var i = 0; i < sections.length; i++) { // Split by 'OR'
//                                         section = sections[i];
//                                         // console.log('>'+sections[i]);
//                                         var name = [];
//                                         var code = [];
//                                         if (findString(section, 'ART HISTORY')) {
//                                             name.push('Art History');
//                                         } else {
//                                             for (var j = 0; j < SUBJECTS.length; j++) {
//                                                 if (findString(section, ' ' + SUBJECTS[j].accr.toUpperCase())) {
//                                                     code.push(SUBJECTS[j].accr);
//                                                 } else if (findString(section, SUBJECTS[j].subject.toUpperCase())) {
//                                                     name.push(SUBJECTS[j].subject);
//                                                 }
//                                             }
//                                         }
//                                         var subjects = code + name; // grab credits from these.
//                                         // console.log('>>>',subjects, code, name);
//                                         var words = section.split(' ');
//                                         var neededCreds = '999';
//                                         for (var j = 0; j < words.length; j++) {
//                                             if (isCredit(words[j])) {
//                                                 neededCreds = words[j];
//                                             }
//                                         }

//                                         // var totalUserCreds = countCredits('', '0000', true, 100); // in sub
//                                         var subjectUserCreds = 0.0;
//                                         subjectUserCreds += countCredits(subjects, '0000', true, 100);
//                                         // if (code.length > 0) 
//                                         //     subjectUserCreds += countCredits(code[0], '0000', true, 100);
//                                         // if (name.length > 0) 
//                                         //     subjectUserCreds += countCredits(name[0], '0000', true, 100);
//                                         // console.log(subjectUserCreds, neededCreds);
//                                         valid = valid || (subjectUserCreds >= neededCreds);
//                                         console.log(neededCreds, 'in', subjects, 'have:', subjectUserCreds);   
//                                     }
//                                 if (!valid) {
//                                     msg = line;
//                                 } else console.log('You Can Take');
//                                 console.log('-----------------');
//                                 }
//                             }   
//                         }
//                     }
//                 }
//             } else {
//                 if (findString(line, 'dmission')) {
//                     // Admission to the London Semester.  // Dont know how to handle. 
//                     msg = line; // only if they fail the condition msg=line;
//                 } else if (findString(line, 'hase')) { // phase
//                     var phases = [];
//                     for (var i = 0; i < line.length; i++) {
//                         if (!isNaN(line[i]) && line[i] != ' ') { // is digit
//                             phases.push(line[i]); // [1], [2], [3] or [1,2,3]
//                         }
//                     }
//                     msg = line; // Identifty phase n courses and verify they have them.
//                 } else {
//                     if (findString(line, 'ompletion') && findString(line, 'music core')) {
//                         // dont know what music core or if I can verify it.
//                         msg = line;
//                     } else if (findString(line, '2 courses at the 4000-level')) {
//                         // check # 4XXX courses in Studio Arts, min cumul avg >= 80 in SART and ARTH.
//                         msg = line;
//                     } else if (findString(line, 'Registration in semester 7 of BCOMM:HAFA:C.')) {
//                         // Check registration
//                         msg = line;
//                     } else if (findString(line, '70% average in all POLS courses.')) {
//                         // Check average, if <= 75 advise against.
//                         msg = line;
//                     } else {
//                         // Cant check these so well just return them to the user
//                         //Previous study related to the topic area (also see psychology core statement)
//                         //Will be indicated by the department when the course is offered.
//                         msg = line;
//                     }
//                 }
//             }
//         }
//         return;
// 	}
// }














