/* Copyright (c) 2017 Devon Fazekas-Thomas */
/* Computes all possible ways of satisfying a course's prerequisite - ALPHA set. */

function main (string) {
/* FUNCTION LEGEND
 * 1. genCombinations():            main function for computing combinations (returns string).
 * 2. result():                     translates resulting string to array of combinations (returns array).
*/
    function genCombinations (string) {
    /* FUNCTION LEGEND
     * 1. extractSubset():      searches for subset within string, returning subset, else false (returns either string or false).
     * 2. computeSolution():    computes the solution of the subset (returns array).
     * 3. solutionSwapSubset(): swaps subset with solution in string (returns string).
     */
        function extractSubset (string) {
            function innerSet (string) {
                var startPos = string.lastIndexOf('['), endPos = string.indexOf(']', startPos);
                var temp = (startPos >= 0 || endPos ? string.substring(startPos, endPos+1) : false);
                return temp;
            }
            function outerSet (string) {
                var startPos = string.lastIndexOf('('), endPos = string.indexOf(')', startPos);
                return (startPos >= 0 || endPos ? string.substring(startPos, endPos+1) : false);
            }

            var subset;
            if ((subset = innerSet(string)) != false){
                return subset;
            }
            else if ((subset = outerSet(string)) != false){
                return subset;
            }
            else
                return false;
        }
        function computeSolution (subset) {
        /* FUNCTION LEGEND
         * 1. detectCase():     detects type of subset to compute (returns string).
         * 2. interpretCase():  computes subset solution based on type (returns array).
         */
            function detectCase (subset) {
                if ((subset.search("of") >= 0) && subset.search(/\{/) >= 0)
                    return "nestedNOf";
                else if (subset.search("of") >= 0)
                    return "nOf";
                else if ((subset.search("or") >= 0) && (subset.search(/\,+(?![^{]*\})/)) >= 0)
                    return "orWithAnd";
                else if (subset.search('or') >= 0)
                    return "or";
                else if ((subset.search(/\,+(?![^{]*\})/)) >= 0 || (subset.search(/(\,|and)+(?![^{]*\})/)) >= 0)
                    return "and";
                else if (subset.length > 0 && (subset.split(' ')).length == 1)
                    return "single";
                else
                    return "unique";
            }
            function interpretCase (type, subset) {
            /* FUNCTION LEGEND
             * 1. nestedNOfCase():  computes combination that consists of a mixture of `nOf` and a nested solution (returns array).
             * 2. nOfCase():        computes combination that consists of `nOf` only (returns array).
             * 3. orWithAndCase():  computes combination that consists of a mixture of `or` and `,` (returns array).
             * 4. orCase():         computes combination that consists of `or` only (returns array).
             * 5. andCase():        computes combination that consists of `,` and 'and' only (returns array).
             * 6. singleCase():     computes single statement (returns array).
             */

                function nestedNOfCase (subset) {
                    var nestedElements = (subset.match(/([^{]*?)(?=\})/)[0]).split(',');
                    var solutions = [];
                    for (var a = 0; a < nestedElements.length; a++) {
                        token = nestedElements[a];
                        solutions.push(nOfCase(subset.replace(/\{([^}]+)\}/, '@'), token));
                    }
                    return (solutions.join().split(",")).reduce( function(a,b) {
                        if (a.indexOf(b) < 0)
                            a.push(b);
                        return a;
                    }, []);
                }
                function nOfCase (subset, token) {
                /* FUNCTION LEGEND
                 * 1. extractCourses():     creates an array of the courses within the subset (returns array).
                 * 2. allCombinations():    computes an array of all possible course combinations (returns array).
                 * 3. filterCombinations(): filters down feasible course combinations (returns array).
                 */
                    function extractCourses (subset) {
                        var temp = subset.split(' ');
                        var courses = (temp.filter (function (value) {
                            return (value.length > 0) && (value != 'or');
                        })).map (function (value) {
                            return value.replace(/\,|\(|\)/g, '');
                        });
                        courses.shift();
                        return courses;
                    }
                    function allCombinations (courses, delim) {
                        var result = [];
                        var f = function (prefix, courses, delim) {
                            for (var a = 0; a < courses.length; a++) {
                                result.push (prefix + courses[a]);
                                f ((prefix + courses[a] + delim), (courses.slice(a + 1)), delim);
                            }
                        };
                        f('', courses, delim);

                        return result;
                    }
                    function filterCombinations (solution, delim, numElements) {
                        var output = [];
                        for (var a = 0; a < solution.length; a++) {
                            var num = solution[a].split(delim).length;
                            if (num == numElements)
                                output.push (solution[a].replace('@', token));
                        }

                        return output;
                    }
                    var delim = '+';

                    return filterCombinations (allCombinations (extractCourses (subset), delim), delim, (subset.replace(/[\)\(\]\[]/g, ''))[0]);
                }
                function orWithAndCase (subset) {
                    var right = subset.substring(subset.search(/or/gi));
                    return subset;
                }
                function orCase (subset) {
                    return (subset.replace(/\s(or)|\{|}/g, "")).split(" ");
                }
                function andCase (subset) {
                /* FUNCTION LEGEND
                 * 1. breakdown():  separates multiple solutions into single statements (returns array).
                 * 2. combine():    concatenates multiple solutions into a single array (returns array).
                 */

                    function breakDown (subset) {
                        var array = subset.split(' ');
                        var broken = [];
                        for (var a = 0, len = array.length; a < len; a++)
                            broken[a] = (array[a].replace(/\{|}/g, '')).split(',');
                        return broken;
                    }
                    function combine (array) {
                        function c (part, index) {
                            array[index].forEach (function (a) {
                                var p = part.concat([a]);
                                if (p.length === array.length) {
                                    r.push (p.join('+'));
                                    return;
                                }
                                c (p, index + 1);
                            });
                        }
                        var r = [];
                        c ([], 0);
                        return r;
                    }
                    subset = subset.replace(/and/g, ', ');
                    var numNested = (subset.match(/\{/g) ? (subset.match(/\{/g)).length : 0);
                    if (numNested > 0) {
                        return combine (breakDown (subset.replace(/(\(|\))|\,+(?![^{]*\})/g, '')));
                    }   // Addition with nested solutions.
                    else {
                        return ((subset.split(',')).map (function (value){
                            return value.trim();
                        })).join('+');
                    }                 // Addition without nested solutions.
                }
                function singleCase (subset) {
                    return '{'+subset.replace(/\(|\)|\[|\]|\{|\}/g, '')+'}';
                }

                switch (type) {
                    case "nestedNOf":
                        return nestedNOfCase (subset);
                    case "nOf":
                        return nOfCase (subset);
                    case "orWithAnd":
                        return orWithAndCase (subset);
                    case "or":
                        return orCase (subset);
                    case "nestedAnd":
                        return nestedAndCase (subset);
                    case "and":
                        return andCase (subset);
                    case "single":
                        return singleCase (subset);
                    default:
                        return [];
                }
            }
            return interpretCase (detectCase (subset), subset);
        }
        function solutionSwapSubset (string, subset, solution) {
            if (Array.isArray(solution))
                solution = solution.join(',');
            var result = string.replace (subset, '{'+solution.replace (/\[|]|{|}|\)|\(/g, '')+'}');
            return result;
        }

        var subset = extractSubset (string);
        if (subset){
            var solution = computeSolution (subset);
            string = genCombinations (solutionSwapSubset (string, subset, solution));
        }

        return string;
    }     // String -> String.
    function result (string) {
        return (string.replace(/[\}\{]/g, "")).split(',');
    }              // String -> Array.

    return result (genCombinations (string));
}               // String -> Array.
