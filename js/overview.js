$(document).on('click', ".overview_sem", function() {
	var sem = this.value;
	for (var i = 0; i < SEMESTERS.length; i++) {
		SEMESTERS[i].show = false;
	}
	SEMESTERS[sem].show = true;
	displayPlans();
	$(this).prop('checked', true);
	return;
});

$(document).on('click', ".overview_course", function() {
	var temp = this.value.split(' ');
	var sem = temp[0];
	var course = temp[1];
	console.log("This feature is disabled. we can only show one course at a time.");

	// alert(sem);
	// alert(course);
	return;
});