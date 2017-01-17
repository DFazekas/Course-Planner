function consolePrint (data, name, location) {
    console.log(name+" = |", data ,"| {"+typeof data, " ", data.length+"} -- "+location);
}
function main (string) {
/* FUNCTION LEGEND
    * 1. cleanString():             main function for cleaning and formating string (returns string).
    * 2. genCombinations():             main function for computing combinations (returns array).
*/

    consolePrint (string, "string", "main()");
    string = cleanString (string);
    consolePrint (string, "string", "cleanString()");
    var temp = genCombinations (string);

    return string;
}           // String -> String.
function cleanString (string) {
/* FUNCTION LEGEND
    * 1. primaryStrCleaning():     cleans commonly occuring errors in string (returns string).
    * 2. secondaryStrCleaning():   cleans unique errors in string (returns string).
    * 3. formatString():           formats string to proper syntax (returns string).
*/

    function primaryStrCleaning (string) {
    /* FUNCTION LEGEND
        * 1. trimOuterWhiteSpaces():    trims leading & trailing whitespaces from string (returns string).
        * 2. trimTrailComma():          trims comma trailing string (returns string).
        * 3. trimSpaceLeadComma():      trims whitespaces leading commas (returns string).
        * 4. trimSpaceAdjParenth():     trims whitespaces adjacent parenthesis (returns string).
     */
        function trimOuterWhiteSpaces (string){
            return string.trim();
        }                            // String -> String.
        function trimTrailComma (string) {
            return string.substr (0, ((string.endsWith(',')) ? (string.length - 1) : string.length));
        }                                 // String -> String.
        function trimSpaceLeadComma (string) {
            return string.replace((/\s,/g), ',');
        }                             // String -> String.
        function trimSpaceAdjParenth (string) {
            return (string.replace(/\s\)/g, ')')).replace(/\(\s/g, '(');
        }                            // String -> String.

        string = trimOuterWhiteSpaces (string);
        //consolePrint (string, "string", "trimOuterWhiteSpaces()");

        string = trimTrailComma (string);
        //consolePrint (string, "string", "trimTrailComma()");

        string = trimSpaceLeadComma (string);
        //consolePrint (string, "string", "trimSpaceLeadComma()");

        string = trimSpaceAdjParenth (string);
        //consolePrint (string, "string", "trimSpaceAdjParenth()");

        return string;
    }     // String -> String.
    function secondaryStrCleaning (string) {
    /* FUNCTION LEGEND
        * 1. case01():      converts "1 or" patterns to "1 of" (returns string).
        * 2. case02():      converts "+ or" patterns to "or" (returns string).
        * 3. case03():      converts either "[1-3] of or" or "[1-3]of or" patterns to "[1-3]of" (returns string).
        * 4. case04():      converts "..." patterns to "." (returns string).
    */

        function case01 (string) {
            return string.replace(/(1)\s(or)/g, "$1 of");
        }   // String -> String.
        function case02 (string) {
            return string.replace(/\+\s(or)/g, "or");
        }   // String -> String.
        function case03 (string) {
            return string.replace(/([1-3])(of|\sof)\s(or)/g, "$1$2");
        }   // String -> String.
        function case04 (string) {
            return string.replace(/\.\.+/g, '.');
        }   // String -> String.

        string = case01 (string);
        //consolePrint (string, "string", "case01()");

        string = case02 (string);
        //consolePrint (string, "string", "case02()");

        string = case03 (string);
        //consolePrint (string, "string", "case03()");

        string = case04 (string);
        //consolePrint (string, "string", "case04()");

        return string;
    }   // String -> String.
    function formatString (string) {
    /* FUNCTION LEGEND
        * 1. alphabetize():             converts @ symbol to alphabetical symbols (returns string).
        * 2. n_of():                    converts "[1-3] of" patterns to "[1-3]of" patterns (returns string).
        * 3. parenthToBrace():          converts parentheses to braces (returns string).
        * 4. parenthEncaseStr():        encases string in parentheses (returns string).
    */

        function alphabetize (string, arr = string.split(''), char = 65) {
            const result = arr => arr.reduce((a,b) => a.concat(b === '@' ? String.fromCharCode(char++) : b),[]);
            return result(arr).join('');
        } // String -> String.
        function n_of (string) {
            return string.replace(/([1-3])\s(of)/g, "$1$2");
        }                                           // String -> String.
        function parenthToBrace (string) {
            return (string.replace(/\(/g, '[')).replace(/\)/g, ']');
        }                                 // String -> String.
        function parenthEncaseStr (string) {
            return '('+string+')';
        }                               // String -> String.

        string = alphabetize (string);
        //consolePrint (string, "string", "alphabetize()");

        string = n_of (string);
        //consolePrint (string, "string", "n_of()");

        string = parenthToBrace (string);
        //consolePrint (string, "string", "parenthToBrace()");

        string = parenthEncaseStr (string);
        //consolePrint (string, "string", "parenthEncaseStr()");

        return string;
    }           // String -> String.

    string = primaryStrCleaning (string);
    string = secondaryStrCleaning (string);
    string = formatString (string);

    return string;
}    // String -> String.
function genCombinations (string) {
/* FUNCTION LEGEND
    * 1. extractSubset(): Searches for subset within string, returning subset, else false (returns either string or false).
    * 2. computeSolution(): Computes the solution of the subset (returns array).
    * 3. solutionSwapSubset(): Swaps subset with solution in string (returns string).
*/
    function extractSubset (string){
        var startPos = string.lastIndexOf('['), endPos = string.indexOf(']', startPos);
        return (startPos >= 0 || endPos ? string.substring(startPos + 1, endPos) : false);
    }
    function computeSolution (subset){
    /* FUNCTION LEGEND
        * 1. detectCase():  Detects type of subset to compute (returns string).
        * 2. interpretCase(): Computes subset solution based on type (returns array).
    */
        function detectCase (subset){
            if ((subset.search("of") != -1) && subset.search(/\{/) != -1)
                return "nestedNOf";
            else if (subset.search("of") != -1)
                return "nOf";
            else if ((subset.search("or") != -1) && (subset.search(/\+/) != -1))
                return "orWithAnd";
            else if (subset.search('or') != -1)
                return "or";
            else if (subset.search(/\,/) != -1)
                return "and";
            else
                return "unique";
        }
        function interpretCase (type, subset) {
        /* FUNCTION LEGEND
            * 1. nestedNOfCase():
            * 2. nOfCase(): Computes course combinations with "nOf" syntax (returns array).
            * 3. orWithAndCase():
            * 4. orCase():
            * 5. andCase(): Computes course combinations with "," syntax (returns array).
            * 6. uniqueCase():
        */
            function nestedNOfCase (subset) {}
            function nOfCase (subset) {
            /* FUNCTION LEGEND
                * 1. extractCourses():  Creates an array of the courses within the subset (returns array).
                * 2. allCombinations(): Computes an array of all possible course combinations (returns array).
                * 3. filterCombinations(): Filters down feasible course combinations (returns array).
            */
                function extractCourses (subset) {
                    var temp = subset.split(' ');
                    var courses = (temp.filter(function (value) {
                        return value.length > 0;
                    })).map(function (value) {
                        return value.replace(/\,/g, '');
                    });
                    courses.shift();
                    return courses;
                }
                function allCombinations (courses, delim){
                    var result = [];
                    var f = function (prefix, courses, delim){
                        for (var a = 0; a < courses.length; a++) {
                            result.push(prefix + courses[a]);
                            f ((prefix + courses[a] + delim), (courses.slice(a + 1)), delim);
                        }
                    };
                    f('', courses, delim);
                    return result;
                }
                function filterCombinations (solution, delim, numElements) {
                    var output = [];
                    for (var a = 0; a < solution.length; a++){
                        var num = solution[a].split(delim).length;
                        if (num == numElements)		output.push(solution[a]);
                    }
                    //consolePrint(output, "output", "filterCombinations");
                    return output;
                }
                var delim = '+';
                return filterCombinations (allCombinations(extractCourses(subset), delim), delim, subset[0]);
            }
            function orWithAndCase (subset) {}
            function orCase (subset) {}
            function andCase (subset) {
                var numNested = (subset.match(/\{/g) ? (subset.match(/\{/g)).length : 0);
                if (numNested > 0) {
                    var tempList = (subset.replace(/[{}]/g, '')).replace(/\,/g, ' +');
                    return ((tempList.split('+')).map(function(value){
                        return value.trim();
                    })).join('+');
                }   // Addition with nested solutions.
                else {
                    return ((subset.split(',')).map(function(value){
                        return value.trim();
                    })).join('+');
                }                 // Addition without nested solutions.
            }
            function uniqueCase (subset) {}

            switch (type){
                case "nestedNOf":
                    console.log("nestedNOf found");
                    return [];
                case "nOf":
                    console.log("nOf found");
                    return nOfCase (subset);
                case "orWithAnd":
                    console.log("orWithAnd found");
                    return [];
                case "or":
                    console.log("or found");
                    return [];
                case "and":
                    console.log("and found");
                    return andCase (subset);
                default:
                    console.log("unique case found");
                    return [];
            }
        }
        return interpretCase (detectCase(subset), subset);
    }
    function solutionSwapSubset (string, subset, solution) {
        return string.replace('['+subset+']', '{'+solution+'}');
    }
    
    var subset = extractSubset (string);
    if (subset){
        consolePrint (subset, "subset", "genCombinations()");
        var solution = computeSolution (subset);
        consolePrint (solution, "solution", "genCombinations()");
        string = solutionSwapSubset (string, subset, solution);
        consolePrint (string, "string", "genCombinations()");
        string = genCombinations (string);
    }

    return string;
}    // String -> Array.
