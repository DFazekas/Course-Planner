$(document).on('click', '.help', function() {
	printSpecificHelp(parseInt(this.value));
});

$(document).on('click', '#courseColoring', function() {
	printSpecificHelp(2);
});

function displayCounter() {
	document.getElementById('mybox').style.display = "block";
}

function printSpecificHelp(helpNumber) {
	var string = 'There has been an error.';
	switch (helpNumber) {
		case 0: // Where Is Everything?
			$('.modal').modal('hide');
			setTimeout(function() {
				string = (function () {/*
					<div style="text-align:center;">
						<h2>Where Is Everything?</h2>
						<h3>Left Panel</h3>
						<img style="max-height:500px;max-width:400px;" src="images/leftPanel.png"><br><br>
					</div>
				*/}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1].replace(/(\r\n|\n|\r)/gm,"");
				bootbox.alert({closeButton: false, message: string, backdrop: true, size: 'large', callback: function(){
					setTimeout(function(){
						string = (function () {/*
							<div style="text-align:center;">
								<h2>Where Is Everything?</h2>
								<h3>Subjects and Filters Panel</h3>
								<img style="max-height:700px;max-width:600px;" src="images/firstMiddlePanel.png?lastMod=1"><br><br>
							</div>
						*/}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1].replace(/(\r\n|\n|\r)/gm,"");
						bootbox.alert({closeButton: false, message: string, backdrop: true, size: 'large', callback: function(){
							setTimeout(function() {
								string = (function () {/*
										<div style="text-align:center;">
											<h2>Where Is Everything?</h2>
											<h3>Viewing Panel</h3>
											<img style="max-height:700px;max-width:600px;" src="images/secondMiddlePanel.png"><br><br>
										</div>
								*/}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1].replace(/(\r\n|\n|\r)/gm,"");
								bootbox.alert({closeButton: false, message: string, backdrop: true, size: 'large', callback: function(){
									setTimeout(function() {
										string = (function () {/*
											<div style="text-align:center;">
												<h2>Where Is Everything?</h2>
												<h3>Other</h3>
					

												Open Overview: <img style="max-height:500px;max-width:400px;" src="images/openOverview.png">
												or Open Options: <img style="max-height:500px;max-width:400px;" src="images/openOptions.png"><br><br>
												<img style="max-height:500px;max-width:400px;" src="images/overview.png"><br><br>
												<img style="max-height:500px;max-width:400px;" src="images/options.png?lastmod=1"><br><br>
											</div>
										*/}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1].replace(/(\r\n|\n|\r)/gm,"");
										bootbox.alert({message: string, backdrop: true, size: 'large'}).off("shown.bs.modal");
									}, 600);
								}}).on("shown.bs.modal", function(e) {
									$(this).scrollTop(0);
								});
							}, 600);
						}}).on("shown.bs.modal", function(e) {
							$(this).scrollTop(0);
						});
					}, 600);
				}}).on("shown.bs.modal", function(e) {
					$(this).scrollTop(0);
				});
			}, 500);
			break;
		case 2: // Course Coloring
			string = (function () {/*
				<div style="text-align:center;">
					<h2>Course Coloring</h2>
					<img style="max-height:700px;max-width:600px;" src="images/coloring.png?lastMod=1"><br><br>
					To make it easier, we recommend you keep the filter the hide unavailible courses selected.<br><br>
				</div>
			*/}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1].replace(/(\r\n|\n|\r)/gm,"");
			bootbox.alert({message: string, backdrop: true, size: 'large'}).on("shown.bs.modal", function(e) {
				$(this).scrollTop(0);
			});
			break;
		case 5: // Printing & Saving
			string = (function () {/*
				<div style="text-align:center;">
					<h2>Printing & Saving</h2>
					<img style="max-height:300px;max-width:400px;" src="images/printing.png"><br><br>
					A simple printing feature is available in the overview pannel <img style="height:30px;margin-bottom:3px;" src="images/openOverview.png"> to save as pdf or print directly to a printer!<br>
					Please make sure you are printing in portrait mode. With this, there should be no problems fitting
					all your semesters on one page!
					<hr>
					Saving is done automatically!<br>
					Everything is saved locally to your browser whenever you make a change, so no need to worry!<br>
					To ensure this works correctly, please allow local storage in your browser and 
					make sure not to clear your history (cache).<br><br>
					You can also transfer and manually save your data. Navigate to options at the top right
					<span class="glyphicon glyphicon-option-vertical w3-theme" style="font-size:20px;"></span>
					<br>
					<b>Oh and we don't store anything on our end!</b>				
				</div>
			*/}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1].replace(/(\r\n|\n|\r)/gm,"");
			bootbox.alert({message: string, backdrop: true, size: 'large'}).on("shown.bs.modal", function(e) {
				$(this).scrollTop(0);
			});
			break;
		case 6:
			break;
		case 7:
			runTutorial();
			
			break;
		case 10:
		// No longer works due to server
		// <form class="contactForm" action="php/mail.php" method="POST">
		// 				<b>Subject</b><br>
		// 				<input disabled id="subjectText" type="text" name="subject" pattern=".{3,}" required title="3 Characters Minimum." size=40><br>
		// 				<br>
		// 				<b>Your Email</b><br>(Optional, so we can get back to you!)<br>
		// 				<input disabled  id="userEmail" type="text" name="userEmail" pattern=".{3,}" title="Please Enter a Valid Email." size=40><br>
		// 				<br>
		// 				<b>To Whom</b><br>
		// 				<input disabled  type="radio" name="emailWho" value="0" checked>Anyone!</input>
		// 				<input disabled type="radio" name="emailWho" value="1">Devon</input>
		// 				<input disabled type="radio" name="emailWho" value="2">Nawar</input><br>
		// 				<br>
		// 				<b>Message</b><br>
		// 				<textarea disabled  style="width:80%;" rows=10 name="message" minlength="15" required></textarea>
		// 				<p><input disabled class="btn btn-success" id="emailSubmitBtn" type="submit" value=" Send ">
		// 			</form>
		// 			<div id="mailResponse"></div>
		// 		</div>
		case 8: // Contact us
			string = (function () {/*
				<div style="text-align:center;">
					<h2>Contact / Feedback</h2>
					<h4>Thank you for you time.</h4>
					<h5>You can contact us about anything at 
					<a href="mailto:courseplannercontact@gmail.com?Subject=Inquiry" target="_blank">coursePlannerContact@gmail.com</a>
					</h5>
					<b>
					And hey, why not check out our quick 5 question <a href="https://www.surveymonkey.com/r/6YCQYRX">Survey</a>?
					Or for more information, check out our <a target="_blank" href="https://www.facebook.com/guelphcourseplanner/">Facebook Page</a>!
					</b>
					<br>
			*/}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1].replace(/(\r\n|\n|\r)/gm,"");
			bootbox.alert({message: string, backdrop: true, size: 'large'}).on("shown.bs.modal", function(e) {
				$('#subjectText').focus();
				$(this).scrollTop(0);
				$('.contactForm').submit(function () {
					e.preventDefault(); // avoid to execute the actual submit of the form.
					$('#mailResponse').html('');

					var values = $(this).serializeArray();
					$.ajax({ // add a cool down if you get spam
			            type:'POST',
			            url: 'php/mail.php',
			            data: {subject: values[0].value, userEmail: values[1].value, emailWho: values[2].value, message: values[3].value},
			            success:function(data){
			                console.log("Sending Success");
			                console.log(data);
			                if (findString(data, 'Thank you for your time')) { // prevent double sending
			                	$('#emailSubmitBtn').prop('disabled', 'true');
			                }
			                $('#mailResponse').html(data);
			                return false;
			            },
			            error: function(data) {
			                console.log("Sending Failure");
			                console.log(data);
			                $('#mailResponse').html(data);
			                return false;
			            }
			        });
				 return false;
				});
			});

			

			break;
		case 9: // Who are we
			string = (function () {/*
				<div style="text-align:center;">
					<h2>Who are we?</h2>
					<div style="width:80%;margin-left:10%;">
					We are <b>two students</b> who are passionate about programming and software design!<br>
					We started this project near the end of last winter, and we've been trying to perfect it ever since!<br>
					In this time, we've learned and accomplished so much, including programmically building our database,
					integrating our smooth design, and all the inner workings you see here!<br><br>

					Our goal was to help ease some of the burdens of school and reduce stress on students, hopefully you find that
					we've accomplished this goal. If not, we would love to hear from you. Remember,<br>
					<b>Our goal is to help!</b><br><br>
					<hr>
					<div class="w3-row">
						<div class="w3-container w3-half">
							<b>Nawar Ismail</b> as Lead Developper<br>
						</div>
						<div class="w3-container w3-half">
							<b>Devon Fazekas-Thomas</b> as Lead Designer
						</div>
					</div>
					</div>                         
				</div>
			*/}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1].replace(/(\r\n|\n|\r)/gm,"");
			bootbox.alert({message: string, backdrop: true, size: 'large'}).on("shown.bs.modal", function(e) {
				$(this).scrollTop(0);
			});
			break;

		case 11:
			string = (function () {/*
                1) <b> Use the cards panel to compare and choose courses.</b> Add courses that interest you into the 
					cards panel, then decide which semesters they go in from there. This will help you organize much more easily!<br>
                <br>2) <b> Can't find a course?</b> On the subjects page, click the CUSTOM 'subject'!<br>
                <br>3) <b>Upload your Transcript</b> and skip manually inputing!<br>
                <br>4) <b>Course Details Appear in Viewing Panel</b> (the second tab, on the right) after   clicking a course title.<br>
                <br>5) <b>Flag Cards by Clicking on Them</b> in the Viewing Panel you can , so you can keep track of them.<br>
                <br>6) <b>Put Courses in the Wrong Place?</b> Add it to the viewing panel, delete it and add it back to the right semester.
                This way, you don't have to find them again!<br>

                <br>
            */}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1].replace(/(\r\n|\n|\r)/gm,"");
            bootbox.alert({title: 'Tips', message: string, backdrop: true, size: 'large'}).on("shown.bs.modal", function(e) {
				$(this).scrollTop(0);
			});
			break;
		default:
			break;
	}
}


$(document).on('click', '#submitManualCode', function() {
	var retrievedObject = $('#manualCode').val(); // MUST PROTECT AGAINST INJECTION
	if (retrievedObject !== null && retrievedObject !== '') { // exists
		$('.modal.in').modal('hide');
		SEMESTERS = JSON.parse(retrievedObject);
		displayPlans();
		bootbox.alert({message: 'Success!', backdrop: true, size: 'large'}).on("shown.bs.modal", function(e) {
			$(this).scrollTop(0);
		});
	} else {
		bootbox.alert({message: "We couldn't find anything to upload, sorry.", backdrop: true, size: 'large'}).on("shown.bs.modal", function(e) {
			$(this).scrollTop(0);
		});
	}
});


$(document).on('click', '#transferData', function() {
	var string = (function () {/*
		<div style='text-align:center;'>
			<h4>You only need to do this to: 1) Backup your courses on your computer 
					2) Transfer your data between browsers 3) Load manually saved/obtained info.
			</h4>
			<h1 style="color:blue;">Getting Save Code</h1>
			<h3>Windows : Press CTRL+A then CTRL+C</h3>
			<h3>Mac : Press CMD+A then CMD+C</h3>
			<h5>Save Code:</h5>
		Save this code in a text document to have it for later as a backup.<br>
		Or to transfer data, paste it into the Loading the Code section in a different browser.
		<textarea id='saving' rows='2' style='width:100%;'>LOCALSTORAGE</textarea>
		<hr style="height:20px;">
		<div style='text-align:center;'>
			<h1 style="color:red;">Loading the Code</h1>
			<h3>Paste the code here, then Submit</h3>
		</div>
		<br>
		Loading the code will input all the courses from the save data you collected from above	.
		<textarea id="manualCode" rows='2' style='width:100%;'></textarea><br>
		<button id="submitManualCode" class="btn btn-success">Submit Code</button>
		</div>
	*/}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1].replace(/(\r\n|\n|\r)/gm,"");
	string = string.replace('LOCALSTORAGE', localStorage.getItem('Semesters'));
	setTimeout(function() {
		bootbox.alert({message: string, backdrop: true, size: 'large'}).on("shown.bs.modal", function(e) {
			$(this).scrollTop(0);
			$('#saving').focus();
		});
	}, 600);
});

