function consolePrint (data, name, location) {
    console.log(name+" = |", data ,"| {"+typeof data, " ", data.length+"} -- "+location);
}
function main (string) {
/* FUNCTION LEGEND
    * 1. cleanString():             main function for cleaning and formating string (returns string).
    * 2. computeComb():             main function for computing combinations (returns array).
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
        //consolePrint(string, "string", "extractSubset");
        console.log("start = ", startPos, "end = ", endPos);
        if (startPos >= 0 || endPos > 0)
            return string.substring(startPos + 1, endPos);

        return false;
    }
    function computeSolution (subset){
        var solution = [];
        return solution;
    }
    function solutionSwapSubset (string, subset, solution) {
        return string.replace('['+subset+']', solution);
    }
    
    var subset = extractSubset (string);
    if (subset){
        consolePrint (subset, "subset", "computeComb()");
        var solution = computeSolution (subset);
        string = solutionSwapSubset (string, subset, "{}");
        consolePrint (string, "string", "computeComb()");
        string = genCombinations (string);
    }

    return string;
}    // String -> Array.
