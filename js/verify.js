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