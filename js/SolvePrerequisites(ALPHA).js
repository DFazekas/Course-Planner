/*
* Call the SolvePrerequisite() function.
* Provide a string of prerequisites (separated by newline) as its parameter.
* Function returns 2D array of possibilities for those prerequisite.
*/

function Search(string, substring){
	return (string.search(substring) != -1);
}         // Searches for substring in string (returns boolean).
function SearchChar(string, char){
	return string.indexOf(char) != -1;
}          // Search for character in string (returns boolean).

function CleanData(lines){
	String.prototype.replaceAt = function (index, substring) {
		return this.substr(0, index) + substring + this.substr(index + substring.length);
	};    // Inserts substring at given index in string (returns string).
	function ConvertToAlphabet(string) {
		var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
		var char = alphabet.charAt(0);
		for (var index = 0, charIndex = 0, len = (string.length); index < len; index++) {
			if (string[index] === '@') {				// Detects symbol.
				string = string.replaceAt(index, char);	// Replace with letter.
				char = alphabet.charAt(++charIndex);	// Increment alphabet index.
			}
		}
		return string;
	}                           // Replaces all instances of the '@' symbol in string with a alphabetical letter (returns string).
	function TrimString(string){
		return string.trim();
	}                                   // Trims leading & trailing whitespaces (returns string).
	var alphaLines = [];

	for (var a = 0, len = (lines.length); a < len; a++) {
		alphaLines.push(ConvertToAlphabet(lines[a]));
	}                     // Replicate original data.
	for (var a = 0, len = (alphaLines.length); a < len; a++){
		var index;                                  // Arbitrary index.

		// Convert "# of" arguments to "#of".
		/*COMPLETE*/ while (Search(alphaLines[a], "\[1-3]\ of")){
			alphaLines[a] = alphaLines[a].replace(" of", "of");
		}

		// Trims leading & trailing whitespaces.
		/*COMPLETE*/ alphaLines[a] = TrimString(alphaLines[a]);

		// Remove trailing commas.
		/*COMPLETE*/ var end = (alphaLines[a].length) - 1;
		if (alphaLines[a][end] == ',')		alphaLines[a] = alphaLines[a].substring(0, end);

		// Removes leading whitespace adjacent to commas.
		/*COMPLETE*/ while (Search(alphaLines[a], " ,")){
			index = alphaLines[a].search(" ,");
			alphaLines[a] = (alphaLines[a].substring(0, index)) + (alphaLines[a].substring(index+1, alphaLines[a].length));
		}

		// Adds trailing whitespaces adjacent to commas.
		/*COMPLETE*/ if (Search(alphaLines[a], /,\w/) ){
			index = alphaLines[a].search(/,\w/) - 1;
			alphaLines[a] = alphaLines[a].replaceAt(index, ", ");
		}

		// Convert all "[]" to "()".
		/*COMPLETE*/ while (SearchChar(alphaLines[a], "[") || SearchChar(alphaLines[a], "]")){
			alphaLines[a] = alphaLines[a].replace("[", "(");
			alphaLines[a] = alphaLines[a].replace("]", ")");
		}

		// Encase prerequisite in artificial set.
		/*COMPLETE*/ alphaLines[a] = "("+alphaLines[a]+")";

		// Trims whitespaces adjacent to '()' & '[]'.
		/*COMPLETE*/ var str = alphaLines[a];
		while ((str.indexOf("( ") + 1) || (str.indexOf(" )") + 1)){
			if (index = (str.indexOf("( ") + 1))							// "( "
				str = (str.substr(0, index)) + (str.substr(index + 1));
			else if (index = (str.indexOf(" )") + 1))
				str = (str.substr(0, index - 1)) + (str.substr(index));		// " )"
		}
		alphaLines[a] = str;

		// Replaces all instances of ',' with '+'. Problematic outside of ALPHA data.
		while (alphaLines[a].indexOf(",") != -1){
			alphaLines[a] = alphaLines[a].replace(",", " +");
		}

		// Replaces all instances of "and" with '+'. Problematic outside of ALPHA data.
		while (alphaLines[a].indexOf("and") != -1){
			alphaLines[a] = alphaLines[a].replace("and", "+");
		}
	}                 // Cleans replicated data.
	return alphaLines;  // Returns array.
}                  // Replicates original data then cleans generic bugs (returns array).

function CleanSpecialData(array){
	for (var a = 0, len = (array.length); a < len; a++){
		// Case: "1 or". 	Convert to "1of".
		while (Search(array[a], "1 or")) {
			array[a] = array[a].replace("1 or", "1of");
		}

		// Case: "+ or". 	Convert to "or".
		while (array[a].indexOf("+ or") != -1) {
			array[a] = array[a].replace("+ or", "or");
		}

		// Case: "1of or". 	Convert to "1of".
		while (Search(array[a], "of or")) {
			array[a] = array[a].replace("of or", "of");
		}

		// Case: "..#". 	Convert to "#".
		while (array[a].indexOf("..") != -1) {
			array[a] = array[a].replace("..", " ");
		}
	}
	return array;
}           // Cleans unique bugs in data (returns array).
function ComputePossibilities(string){
	function DetectCourse(string){
		var temp = string.split(' ');
		var courses = [];

		for (var a = 0, b = 0, len = (temp.length); a < len; a++){
			if ((temp[a] == '+')) continue;
			courses[b++] = temp[a];
		} // Creates list of courses from string.
		return courses;
	} 			// Detects & returns any remaining courses (returns array).
	function GetOr(string){
		var temp = string.split(' ');
		var courses = [];

		for (var a = 0, b = 0, len = (temp.length); a < len; a++){
			if ((temp[a] == "+") || (temp[a] == "or")) continue;
			courses[b++] = temp[a];		// Stores course.
		}  // Creates list of courses from string.
		return courses;
	} 				// Compute "or" argument possibilities.
	function GetAnd(courses){
		/* Combine multiple solutions. */
		function Combine(array) {
			function c(part, index) {
				array[index].forEach(function (a) {
					var p = part.concat([a]);
					if (p.length === array.length) {
						r.push(p.join('+'));
						return;
					}
					c(p, index + 1);
				});
			}
			var r = [];
			c([], 0);
			return r;
		}
		var temp = [];
		var solCount = 0;

		/* Counting solutions present. */
		for (var a = 0, len = (courses.length); a < len; a++){
			if (courses[a][0] == '{') solCount++;
		}
		if (solCount == 0) {
			for (var a = 0, len = (courses.length); a < len; a++) {
				if (a == 0) temp[0] = courses[a];
				else temp[0] = temp[0] + "+" + courses[a];
			}
		}
		else {
			/* Trim curly braces from courses. */
			for (var a = 0, len = (courses.length); a < len; a++) {
				while ((courses[a].indexOf("{") != -1) && (courses[a].indexOf("}") != -1)) {
					courses[a] = courses[a].replace("{", "");
					courses[a] = courses[a].replace("}", "");
				}
			}
			var tempCourses = [];
			for (var a = 0, len = (courses.length); a < len; a++) {
				tempCourses[a] = courses[a].split(',');
			}
			temp = Combine(tempCourses);
		}
		return temp;
	} 				// Compute "+" argument possibilities.
	function ComputeNOf(string){
		function Combinations(chars, delim){
			var result = [];
			var f = function(prefix, chars, delim){
				for (var i = 0, len = (chars.length); i < len; i++){
					chars[i] += delim;
					result.push(prefix + chars[i].slice(0, -1));
					f(prefix + chars[i], chars.slice(i + 1), delim);
				}
			}
			f('', chars, delim);
			return result;
		}   // Compute all combinations.

		var temp = string.split(' ');              // Holds original string split at spaces.
		var numElements = temp[0][0];              // Holds value representing the 'n' of "n Of".
		var courses = [];                          // Holds all courses.
		var token;                                 // Holds value of token, if any.

		if (temp.length < 2) return [];

		// Creates list of courses from string.
		for (var i = 1, a = 1, len = (temp.length); i < len; i++){
			if ((temp[i] == '+') || (temp[i] == "") || (temp[i] == "or")) continue;		// Skip non-courses.
			courses[a++ - 1] = temp[i];													// Filter for courses.
		}

		// Tokenize possibility subsets.
		for (var a = 0, len = (courses.length); a < len; a++){
			if (courses[a][0] == "@"){
				token = courses[a].slice(1);
				courses[a] = "@";
			}
		}

		// Generate all possible combinations of courses given delimiter.
		var delim = '+';
		var combs = Combinations(courses, delim);
		var output = [];

		// Filters all combinations, storing those with elements equal to 'n' elements.
		for (var i = 0, len = (combs.length); i < len; i++){
			var num = combs[i].split(delim).length;
			if (num == numElements)		output.push(combs[i]);
		}

		// Replaces token with value.
		for (var a = 0, len = (output.length); a < len; a++){
			output[a] = output[a].replace('@', token);
		}
		return output;
	} 			// Compute "#of" argument possibilities.
	function FindLeft(string, orIndex){
		var start, end; // Detect left element from "or".
		// Detect endIndex;
		for (var a = orIndex; a > 0; a--){
			if (string[a-1] == ' ') continue;
			end = a-1;
			break;
		}
		// Detect startIndex;
		for (var b = end; b > 0; b--){
			if 		((string[b-1] != ' ') && (b-1 != 0)) 	continue;
			else if (b-1 == 0) 								start = b-1;
			else 											start = b;
			break;
		}
		return start;		// Return leftElement.
	} 	// Finds left-element of "or" from multi-argument subset.
	function FindRight(string, orIndex){
		var start, end; // Detect left element from "or".
		// Detect startIndex;
		for (var a = (orIndex + 1), len = (string.length); a < len; a++){
			if (string[a+1] == ' ') continue;
			start = a+1;
			break;
		}
		// Detect startIndex;
		for (var b = start, len = (string.length); b < len; b++){
			if 		((string[b+1] != ' ') && (b+1 != (string.length-1))) 	continue;
			else if (b+1 == (string.length-1))								end = b+1;
			else 															end = b;
			break;
		}
		return end;		// Return leftElement.
	} 	// Finds right-element of "or" from multi-argument subset.

	// Determine type of argument.
	var result = [], test = [];
	if ((Search(string, "of")) && SearchChar(string, '{')){
		var start = string.indexOf('{');
		var end = string.indexOf('}');
		var substring = (string.substring(start + 1, end));
		var elements = substring.split(',');

		// Distributes argument to possibilities.
		var combs = [];
		for (var a = 0, len = (elements.length); a < len; a++){
			// Removes braces from sub-solution, and adds leading token for recognition.
			test[a] = (string.substring(0, start)) + "@"+elements[a]+ (string.substring(end + 1));
			combs[a] = ComputeNOf(test[a]);
		}

		// Combine possibility arrays.
		if ((combs.length) == 1) {
			result = combs[0];
		}   // IF < 2 arrays exist.
		else {
			for (var a = 0, len = (combs.length - 1); a < len; a++){
				result = combs[a].concat(combs[a+1]);
			}
		}                       // IF > 2 arrays exist.
	}      // Computes "nOf" with nested subsets.
	else if (string.search("of") != -1) {
		result = ComputeNOf(string);
	}                        // Computes "nOf" arguments.
	else if (Search(string, "or") && SearchChar(string, '+')){
		var orIndex = string.search("or"); // Detect position of "or".
		var leftIndex = FindLeft(string, orIndex);
		var rightIndex = FindRight(string, orIndex);
		var tempSet = string.substring(leftIndex, rightIndex + 1);

		tempSet = string.substring(0, leftIndex)+"{"+GetOr(tempSet)+"}"+string.substring(rightIndex + 1);
		result = GetAnd(DetectCourse(tempSet));
	}   // Computes "or" & "+" combination arguments.
	else if (string.indexOf('or', 0) != -1) {
		result = GetOr(string);
	}                    // Computes "or" arguments.
	else {
		var detectCourse = DetectCourse(string);
		result = GetAnd(detectCourse);
	}                                                       // Computes "+" arguments.
	return result;
}      // Compute all possibilities (returns array).
function CreateSolution(string, subSet){
	function DetectSets(string){
		var start, end;                         // Positions of subset.

		// Detects subset.
		for (var a = 0, len = (string.length); a < len; a++) {
			if (string[a] === '(')
				start = a;
			else if (string[a] == ')'){
				end = a;
				break;
			}
		}
		if (start || end)
			return string.substring((start + 1), end);
		else {
			return 0;
		}
	} // Detects & returns subset of string, if any (returns string).

	var tempPos = [];
	subSet = DetectSets(string);
	if (subSet){											 // If another subSet detected...
		tempPos = ComputePossibilities(subSet);				 // Compute possible solutions of subset.
		var start = (string.indexOf(subSet) - 1);			 // Starting position to remove from original string.
		var end = ((start + 1) + subSet.length + 1);	     // Ending position to remove from original string.
		var remove = (string.substring(start, end));		 // Portion of string to remove.
		string = (string.replace(remove, "{"+tempPos+"}"));	 // Overwrite string with replacement.
		string = CreateSolution(string, string);			 // Repeat.
	}
	return string;
}    // Creates solution string (returns string).
function DecryptSolution(string){
	while((string.indexOf("{") != -1) && (string.indexOf("}") != -1)){
		string = string.replace("{", "");
		string = string.replace("}", "");
	}  // Strip curly braces from string.
	var possibilities = string.split(',');
	var result = possibilities.reduce(function(a,b){
		if (a.indexOf(b) < 0 ) a.push(b);
		return a;
	},[]);  // Removes duplicates from cleaned data.
	return result;
}           // Decrypts solution string (returns array).
function SolvePrerequisite(string) {
	function LoadContent(array) {
		for (var a = 0, len = (array.length); a < len; a++) {
			solutionStr = CreateSolution(array[a], array[a]);
			possibilities[a] = DecryptSolution(solutionStr);
		}
		return possibilities;
	}     // Load content.

	// Get Input.
	var possibilities = [];				// Possible prerequisite combinations.
	var solutionStr;
	var array = string.split("\n");

	// Converting Possibilities into 2D array.
	for (var x = 0, len = (array.length); x < len; x++) possibilities[x] = [];

	// Replicate original data, then clean.
	array = CleanData(array);
	array = CleanSpecialData(array);
	possibilities = LoadContent(array);

	// Console logs.
	console.log(array);
	console.log(possibilities);

	return possibilities;
}