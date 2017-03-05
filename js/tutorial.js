/* Alot of this was removed because an interactive tutorial was deemed unhelpful */
$(document).on('click', '#startTutorial', function() {
	runTutorial();
	// TUTORIAL = 0;
	// tutorialStep(0, false);
	return;
});

$(document).on('click', '.TEMP', function() {
	// tutorialStep(5, false);
});


function runTutorial() {
	var numSteps = 2;
	$('.modal').modal('hide');
	numSteps--; // Account for 0
	
	setTimeout(function(){recusTutorial(0)}, 400);
	
	function recusTutorial(step) { // Yay! Recursion :D
		if (step > numSteps) {
			return;
		} else {
			var string = getStepString(step);
			bootbox.alert({closeButton: false, message: string, backdrop: true, size: 'large', callback: function() {
				setTimeout(function(){ // Must delay next modal. Otherwise, interference
					recusTutorial(++step);
					// animateProgressBar(step);
				}, 600);
			}}).on("shown.bs.modal", function(e) {
				$(this).scrollTop(0);
			});
			// , function(e) {
			// 	animateProgressBar(step);
			// });
		}
	}
}

function tutorialStep(step, overrideCheck) { // doing the same step might break things
	var string = '';
	if (!overrideCheck) {
		if (step != TUTORIAL) { // clicked the right thing, but not at the right tutorial point.
			return;
		}
	}
	// http://stackoverflow.com/questions/10007212/twitter-bootstrap-progress-bar-animation-on-page-load
	switch (step) {
		case 0:
			string = getStepString(step);
			bootbox.alert({message: string, backdrop: true, size: 'large'});
			break;
		case 1:
			string = getStepString(step);
			bootbox.alert({message: string, backdrop: true, size: 'large'});
			break;
		case 2:
			string = getStepString(step);
			bootbox.alert({message: string, backdrop: true, size: 'large'});
			break;
		case 3:
			string = getStepString(step);
			bootbox.alert({message: string, backdrop: true, size: 'large'});
			break;
		case 4:
		 	string = getStepString(step);
			bootbox.alert({message: string, backdrop: true, size: 'large'});
			break;
		case 5:
			string = getStepString(step);
			bootbox.alert({message: string, backdrop: true, size: 'large', callback: 
						function () {
							step++;
						    string = getStepString(step);
							bootbox.alert({message: string, backdrop: true, size: 'large'});
							animateProgressBar(step);
							TUTORIAL = 0;
						}
					});
			break;
			default:
				return; // Dont increment TUTORIAL	
	}

	animateProgressBar(step);

	TUTORIAL++;
	return;
}

function animateProgressBar(step) {
	var numSteps = 6.0
	var me = $('.tutorialProgress');
    var current_perc = 0;
    var progress = setInterval(function() {
        if (current_perc >= step / numSteps * 100) {
            clearInterval(progress);
        } else {
            current_perc += (step / numSteps * 100) / 20.0; // always have 20 steps length / 20 = segment
            me.css('width', (current_perc)+'%');
        }
        me.text(Math.round(current_perc)+'%');
    }, 100);

}


// Let's start by adding our first semester.<br>
// 					<img src="images/semesterManagement.png"><br><br>
// 					In the <b>Bottom Left</b>, you will find where you can <b>Add and Delete Semesters</b>.<br>
// 					The blue button will increment the semester for faster selecting!
// 					<hr>
// 					<b>Try to add the first semester you've taken or want to take.</b>
// 					<hr>
// 					<h3 style="display:inline;">Tutorial Progress</h3>
// 					<div class="progress progress-striped active">
// 			        	<div class="progress-bar progress-bar-success tutorialProgress" style="width:0%"></div>
// 			    	</div>



// Let's select our first subject!<br>
// 					<img style="max-height:500px;max-width:400px;" src="images/subjectSelector.png"><br><br>
// 					In the <b>Right Panel</b>, you will find where you can <b>Select a Subject</b>.<br>
// 					If you would rather pick a subject by it's name (instead of it's accronym), click on "Subject By Name"
// 					at the bottom.<br><br>
// 					<img style="max-height:500px;max-width:400px;" src="images/subByName.png"><br>
// 					<hr>
// 					<b>Try to select a subject.</b>
// 					<hr>
// 					<h3 style="display:inline;">Tutorial Progress</h3>
// 					<div class="progress progress-striped active">
// 			        	<div class="progress-bar progress-bar-success tutorialProgress" style="width:0%"></div>
// 			    	</div>

function getStepString(step) {
	var string = ''
	switch (step) {
		case 0:
			string = (function () {/*
				<div style="text-align:center;">
					<h2 style="color:#79e50d;">Welcome!</h2>
					<h4>Let's streamline your course selection!</h4>
					If you've already taken courses, start off by <button class="openUploadTS">Uploading Your Transcript!</button>
						and skip manually inputting everything!<br>
					You can also manually add courses to your semesters:
					<table border='0' style="width:100%;">
						<tr><td></td><td>1. Start by adding a semester!<br>
								<img src="images/semesterManagement.png" style="max-height:400px;max-width:300px;"><br><br></td>
							<td></td><td>2. Pick a subject!<br>
								<img src="images/subjectSelector.png" style="max-height:400px;max-width:300px;"><br><br></td></tr>
						<tr><td></td><td>3. Add courses to your active semester.<br>
								<img src="images/add.png" style="max-height:400px;max-width:300px;"><br><br>
								 Unavailable courses are filtered by default. You can change this in the filters section.
								</td>
							<td></td><td>4. Click course titles to see course details.<br>
								The details appear in the second panel on the right.<br>
								Flip cards to see more details.<br>
								<img src="images/viewCards.png" style="max-height:400px;max-width:300px;"><br><br></td></tr>
						<tr><td></td><td>5. As you add more semesters, you can navigate through them at the top on the left.<br>
							<img src="images/nav.png" style="max-height:400px;max-width:300px;"><br><br></td>
							<td></td><td>6. Clicking on the active semester (blue) will open up an overview of all your courses.<br>
							<img src="images/overview.png" style="max-height:200px;max-width:300px;"><br><br></td></tr>
					</table>								
				</div>
			*/}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1].replace(/(\r\n|\n|\r)/gm,"");
			break;
		case 1:
			string = (function () {/*
				<div style="text-align:center;">
					<h2 style="color:#79e50d;">There's More!</h2>
					At the very top right is help:
					<span class="glyphicon glyphicon-question-sign  w3-theme" style="font-size:20px;"></span>
					and more options: <span class="glyphicon glyphicon-option-vertical w3-theme" style="font-size:20px;"></span><br>
					There you can find:<br>
					<br><h4 style="display:inline;">Upload Transcript!</h4><br> Avoid manually filling in semesters!<br>
					<br><h4 style="display:inline;">Get and Load Your Courses!</h4><br> For: Manual Saving, Transfering Browsers, and Sending to friends!<br>
					<br><h4 style="display:inline;">Can't Find a Course?!</h4><br> Add CUSTOM courses in the Subjects Panel!<br>
					<br><h4 style="display:inline;">Contact Us!</h4><br> We would love to hear from you!<br>
					<br><h3 style="color:#79e50d;">Reopen This Guide at the Top Right.</h3>
				</div>
			*/}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1].replace(/(\r\n|\n|\r)/gm,"");
			break;
		case 2:
			string = (function () {/*
				<div style="text-align:center;">
					If you see this, theres been an error.
					<h2 style="color:#79e50d;">Awesome! <span class="glyphicon glyphicon-star starIcon"></span></h2>
					<h4>Now we need to add courses we want to take.</h4>
					Let's add our first course!<br>
					<img style="max-height:500px;max-width:400px;" src="images/addCourse.png?lastmod=1"><br><br>
					In the <b>Left Panel</b>, you will find where you can <b>Add Courses</b> by pressing
					<button class="btn btn-success"><span class="glyphicon glyphicon-plus"></button>.<br>
					
					
					Can't find a course? <b>We've hidden courses you can't take</b> to make things easier!
					You'll find out how to change this later!

					<hr>
					<b>Try to add a course.</b>
					<hr>
					<h3 style="display:inline;">Tutorial Progress</h3>
					<div class="progress progress-striped active">
			        	<div class="progress-bar progress-bar-success tutorialProgress" style="width:0%"></div>
			    	</div>
				</div>
			*/}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1].replace(/(\r\n|\n|\r)/gm,"");
			break;
		case 3:
			string = (function () {/*
				<div style="text-align:center;">
					<h2 style="color:#79e50d;">Exactly! <span class="glyphicon glyphicon-star starIcon"></span></h2>
					<h4>But what if we want to find out information about a course?</h4>
					Easy! All we have to do is click on the course title<br>
					<img style="max-height:500px;max-width:400px;" src="images/courseTitle.png?lastmod=1"><br><br>

					In the <b>Left Panel</b>, you can <b>Select Courses for Viewing</b> by pressing on the title.<br><br>
					
					Courses with faded titles, are selected for viewing.<br>
					<img style="max-height:500px;max-width:400px;" src="images/viewing.png"><br><br>
					Courses with white backgrounds, have been added to your semesters.<br>
					<img style="max-height:500px;max-width:400px;" src="images/taking.png"><br><br>
					<hr>
						<b>Try Clicking a Course Title</b>
					<hr>
					<h3 style="display:inline;">Tutorial Progress</h3>
					<div class="progress progress-striped active">
			        	<div class="progress-bar progress-bar-success tutorialProgress" style="width:0%"></div>
			    	</div>
				</div>
			*/}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1].replace(/(\r\n|\n|\r)/gm,"");
			break;
		case 4:
		 	string = (function () {/*
				<div style="text-align:center;">
					<h2 style="color:#79e50d;">Great! <span class="glyphicon glyphicon-star starIcon"></span></h2>
					<h4>Now let's see which courses you've selected</h4>

					To see your list of viewing courses, click on this button at the top of the the middle panel.<br>
					<img style="max-height:500px;max-width:400px;" src="images/viewCards.png"><br><br>
					
					In the <b>Top of the Middle Panel</b>, you can <b>Switch Between Cards and Subjects</b><br>
					<hr>
						<b>Try to navigate to the viewing panel.</b>
					<hr>
					<h3 style="display:inline;">Tutorial Progress</h3>
					<div class="progress progress-striped active">
			        	<div class="progress-bar progress-bar-success tutorialProgress" style="width:0%"></div>
			    	</div>
				</div>
			*/}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1].replace(/(\r\n|\n|\r)/gm,"");
			break;
		case 5:
			string = (function () {/*
				<div style="text-align:center;">
					<h2 style="color:#79e50d;">Almost done! <span class="glyphicon glyphicon-star starIcon"></span></h2>
					<h4>Cards will be added here, and there are a few things you can do with them.</h4>
					<img style="display:none;max-height:500px;max-width:400px;" src="images/card.png"><br>

					<table style="display:none;"><tr>
						<td><img style="max-height:500px;max-width:400px;" src="images/leftSide.png"></td>	
						<td>
							On the Left:<br>
							You can add a course (green),<br>
							Flip the card to look at the courses details (yellow),<br>
							Remove it (red),<br>
							As well as add it and remove it at the same time (blue).<br>
							On the right, if you have multiple cards,<br>
							you can change their order of cards.
						</td>
						<br>
						<td>
							<img style="max-height:500px;max-width:400px;" src="images/rightSide.png"><br><br>
						</td>
					</tr></table>

					<img style="max-height:500px;max-width:400px;" src="images/cardOptions.png?lastmod=2"><br><br>

					Also, clicking on a card will 'flag' it, so you can keep track of it.<br>
					<img style="max-height:500px;max-width:400px;" src="images/flagged.png"><br><br>

					In the <b>Card Panel</b>, you can <b>View Details About Courses</b><br>
					<hr>
					And...
					<hr>
					<h3 style="display:inline;">Tutorial Progress</h3>
					<div class="progress progress-striped active">
			        	<div class="progress-bar progress-bar-success tutorialProgress" style="width:0%"></div>
			    	</div>
				</div>
			*/}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1].replace(/(\r\n|\n|\r)/gm,"");
			break;
		case 6:
			string = (function () {/*
				<div style="text-align:center;">
					<h2 style="color:#79e50d;">Congratulations! <span class="glyphicon glyphicon-star starIcon"></span> <span class="glyphicon glyphicon-star starIcon"></span> <span class="glyphicon glyphicon-star starIcon"></span></h2>
					<h4>You've finished the tutorial with flying colors! Just a few more things...</h4>
					<hr>
					<b>Filters:</b> Find courses faster.<br>
					<b>Overview:</b> See all your courses.<br>
					<b>Upload Transcript:</b> Skip the hassel.<br>
					<b>Printing:</b> Need a physical copy?<br>
					<b>Saving:</b> Comming back later?<br>
					<br>
					
					You can always <b>Reopen the Tutorial</b> or <b>Look at a Quick Written Guide</b>
					by navigating to help button 
					<span class="glyphicon glyphicon-question-sign  w3-theme" style="font-size:20px;"></span>
					 in the top right.<br>
					And if any of the above interests you, you'll find some of those features in the options
					<span class="glyphicon glyphicon-option-vertical w3-theme" style="font-size:20px;"></span><br>
					
					If you have any <b>Questions or Comments</b>, please let us know!<br><br>
					<hr>
						<b>Get Planning!</b>
					<hr>
					<h3 style="display:inline;">Tutorial Progress</h3>
					<div class="progress progress-striped active">
			        	<div class="progress-bar progress-bar-success tutorialProgress" style="width:0%"></div>
			    	</div>
				</div>
			*/}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1].replace(/(\r\n|\n|\r)/gm,"");
			break;
		default:
			return string;	
	}
	return string;
}

// If you think we've made a mistake, let us know,
// 					but don't worry you can always override us!<br>