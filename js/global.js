/* Copyright (c) 2017 Nawar Ismail */
//** Globals ******************************//
const SUBJECT_NAME = '#subjectByName';
const SUBJECT_CODE = '#subjectByCode';
const COURSE_NAME  = '#courseByName';
const COURSE_CODE  = '#courseByAccr';
const ANIMATION_SPEED = 600;

var SUBJECTPICKED_PLZRM = 'NONE'; // Integrated, don't remove

var ELECTIVES = [];
var SEMESTERS = [];
// Used as: Semesters[SemesterNumber].{year/term/...}
//          Semesters[SemesterNumber].courses[CourseNumber].{courseCode/details/...}
// var TUTORIAL = false;
var DATABASE = [];
var SUBJECTS = [];
var VIEWING = []; // Courses in right panel being viewed.
const TERMS = ['W', 'S', 'F'];
const DETAILS = ['subject', 'accr', 'course', 'term',
				'hours', 'credits', 'offerings', 'prereqs',
				'coreqs', 'equates', 'restrictions', 'externalinfo',
				'departments', 'description'];

//** Constructors ******************************//
function viewingContruct(databaseEntry) {
	this.entry = databaseEntry;
	this.flagged = false;
	this.generalView = true;
	return;
}

function subjectsConstruct(subject, accr) {
	this.subject = subject;
	this.accr = accr;
	return;
}

function databaseConstruct(values) {
	for (var i = 0; i < DETAILS.length; i++) {
		this[DETAILS[i]] = values[i];
	}
	return;
}

function semConstruct(year, term) {
    this.year = year;
    this.term = term;
    this.courses = [];
    this.show = true;
    return;
}

function courseConstruct(code, content) {
	this.courseCode = code;
	this.details = new databaseConstruct(content); // untested
	this.detailShown = 1;
	this.show = false;
	return;
}

function getCode(name) {
	for (var i = 0; i < DATABASE.length; i++) {
		if (DATABASE[i].course == name) {
			return DATABASE[i].accr;
		}
	}
	return undefined;
}

Array.prototype.move = function (old_index, new_index) {
    if (new_index >= this.length) {
    	bootbox.alert({message: "Oops, something went wrong, when we tried to move things around", backdrop: true, size: 'small'});
        var k = new_index - this.length;
        while ((k--) + 1) {
            this.push(undefined);
        }
    }
    this.splice(new_index, 0, this.splice(old_index, 1)[0]);
    return this; // for testing purposes
};

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

String.prototype.properCase = function() {
    return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};





