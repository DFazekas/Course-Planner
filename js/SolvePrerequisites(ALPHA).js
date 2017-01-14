function main (string) {
    return cleanString(string);
}

function cleanString (string){
    /* FUNCTION LEGEND
    * 1. trimOuterWhiteSpaces():    trims leading & trailing whitespaces from string (returns string).
    * 2. trimTrailComma():          trims comma trailing string (returns string).
    * 3. trimSpaceLeadComma():      trims whitespaces leading commas (returns string).
    * 4. trimSpaceAdjParenth():     trims whitespaces adjacent parenthesis (returns string).
    * 5. alphabetize():             converts @ symbol to alphabetical symbols (returns string).
    * 6. n_of():                    converts "[1-3] of" patterns to "[1-3]of" patterns (returns string).
    * 7. parenthToBrace():          converts parentheses to braces (returns string).
    * 8. parenthEncaseStr():        encases string in parentheses (returns string).
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

    /* Cleaning string of errors. */
    string = trimOuterWhiteSpaces (string);
    string = trimTrailComma (string);
    string = trimSpaceLeadComma (string);
    string = trimSpaceAdjParenth (string);
    
    /* Converting string to proper form. */
    string = alphabetize (string);
    string = n_of (string);
    string = parenthToBrace (string);
    string = parenthEncaseStr (string);
    
    return string;
}
