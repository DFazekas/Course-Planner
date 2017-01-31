<!-- Middle panel -->
<div id="middlePanel"  style="height:100%;overflow-y:auto;background-color:#ccffff;display:none;">
	<ul class="nav nav-tabs" style="height:6.5%;">
		<li class="active" id="middlePanelNav1"  type="button" data-toggle="tooltip" data-placement="top" title="Subjects and Filters" style="width:50%;height:100%;">
            <a data-toggle="tab" href="#firstPanel" style="text-align:center;height:100%;">
                <i class="material-icons" style="font-size:25px">dashboard</i>
            </a>
        </li>
		<li id="middlePanelNav2" type="button" data-toggle="tooltip" data-placement="top" title="View Course Cards" style="width:50%;height:100%;">
            <a class="TEMP" data-toggle="tab" href="#secondPanel" style="text-align:center;height:100%;">
                <i class="material-icons" style="font-size:25px">description</i>
            </a>
        </li>
	</ul>
	<style>
	.filterHeader {
		-moz-box-shadow: 0px 1px 0px 0px #1c1b18;
		-webkit-box-shadow: 0px 1px 0px 0px #1c1b18;
		box-shadow: 0px 1px 0px 0px #1c1b18;
		background:-webkit-gradient(linear, left top, left bottom, color-stop(0.05, #ffffff), color-stop(1, #d1d1d1));
		background:-moz-linear-gradient(top, #ffffff 5%, #d1d1d1 100%);
		background:-webkit-linear-gradient(top, #ffffff 5%, #d1d1d1 100%);
		background:-o-linear-gradient(top, #ffffff 5%, #d1d1d1 100%);
		background:-ms-linear-gradient(top, #ffffff 5%, #d1d1d1 100%);
		background:linear-gradient(to bottom, #ffffff 5%, #d1d1d1 100%);
		filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#ffffff', endColorstr='#d1d1d1',GradientType=0);
		background-color:#ffffff;
		-moz-border-radius:15px;
		-webkit-border-radius:15px;
		border-radius:15px;
		border:2px solid #333029;
		color:#505739;
		text-decoration:none;
		text-shadow:0px 1px 0px #ffffff;
	}


	.filterBody {
		/*http://www.bestcssbuttongenerator.com/#/12*/
		-moz-box-shadow:inset 0px 1px 0px 0px #54a3f7;
		-webkit-box-shadow:inset 0px 1px 0px 0px #54a3f7;
		box-shadow:inset 0px 1px 0px 0px #54a3f7;
		background:-webkit-gradient(linear, left top, left bottom, color-stop(0.05, #007dc1), color-stop(1, #0061a7));
		background:-moz-linear-gradient(top, #007dc1 5%, #0061a7 100%);
		background:-webkit-linear-gradient(top, #007dc1 5%, #0061a7 100%);
		background:-o-linear-gradient(top, #007dc1 5%, #0061a7 100%);
		background:-ms-linear-gradient(top, #007dc1 5%, #0061a7 100%);
		background:linear-gradient(to bottom, #007dc1 5%, #0061a7 100%);
		filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#007dc1', endColorstr='#0061a7',GradientType=0);
		background-color:#007dc1;
		-moz-border-radius:3px;
		-webkit-border-radius:3px;
		border-radius:3px;
		border:1px solid #124d77;
		/*display:inline-block;*/
		color:#ffffff;
		text-decoration:none;
		text-shadow:0px 1px 0px #154682;
	}
	   </style>
	<div class="tab-content" style="height:88.5%;overflow-y:auto;">
		<!-- Overview tab -->
		<div id="firstPanel" class="tab-pane fade in active" style="height:100%;">
			<div class="w3-row" style="height:100%;">
				<div id="firstPanelFilters" class="w3-half" style="height:100%;display:none;">
					<table style="width:95%;margin-left:2.5%;height:100%;text-align:center;">
						<tr style="width:100%;">
							<td style="height:20%;">
								<div for="fpHideUnavailable-nullified" class="filterHeader" style="width:100%;margin:0;border:1px solid black;border-radius:20px 20px 0 0;">
									<h3 style="width:100%;margin:0;border-top-left-radius:20px;border-top-right-radius:20px;">
										Show Only Available Courses
									</h3>
								</div>

								<div class="w3-row filterBody" style="border:1px solid black;border-radius:0 0 20px 20px;border-bottom-left-radius:20px;border-bottom-right-radius:20px;">
									<br>
									Please note, this filters does <b>not</b> take prerequisites or restrictions into account.
									However it does take co-requisites, watch out for courses with co-requisites for each other!<br>
									This will stack with other filters.<br>

		<div class="w3-container w3-full"><input id="fpHideUnavailable" class="fpFilter" type="checkbox" checked></div>
								</div>
							</td>
						</tr>
						<tr style="width:100%;height:20%;">
							<td style="height:20%;">
								<h3 class="filterHeader" style="width:100%;border:1px solid black;border-radius:20px 20px 0 0;margin:0;border-top-left-radius:20px;border-top-right-radius:20px;">Credits</h3>
								<div class="filterBody" style=";border:1px solid black;border-radius:0 0 20px 20px;">
								<div class="w3-row" id="filterCredits">
									If you see this, there has been an error. Please refresh or try a different browser.
									<!-- To be filled by jquery -->
								</div>
								
									<div class="w3-row" style="margin-left:10%;width:80%;">
										<button id="filtersAllCreds" class="btn btn-info fpFilter w3-container w3-half">All</button> 
										<button id="filtersNoCreds" class="btn btn-info fpFilter w3-container w3-half">None</button> 
									</div>
									<br>
								</div>
							</td>
						</tr>
						<tr style="width:100%;height:20%;">
							<td style="height:20%;">
								<h3 class="filterHeader" style="width:100%;border:1px solid black;border-radius:20px 20px 0 0;margin:0;border-top-left-radius:20px;border-top-right-radius:20px;">Terms</h3>
								<div class="w3-row filterBody" style="background-color:#33ccff;border:1px solid black;border-radius:0 0 20px 20px;">
									<br>
		<div class="w3-container w3-quarter"><label for="filtersTermOptions0"><h5 style="display:inline;">F &nbsp;</h5></label><input checked id="filtersTermOptions0" value="F" class="fpFilter fpTerms" type="checkbox"></div>
		<div class="w3-container w3-quarter"><label for="filtersTermOptions1"><h5 style="display:inline;">W &nbsp;</h5></label><input checked id="filtersTermOptions1" value="W" class="fpFilter fpTerms" type="checkbox"></div>
		<div class="w3-container w3-quarter"><label for="filtersTermOptions2"><h5 style="display:inline;">S &nbsp;</h5></label><input checked id="filtersTermOptions2" value="S" class="fpFilter fpTerms" type="checkbox"></div>
		<div class="w3-container w3-quarter"><label for="filtersTermOptions3"><h5 style="display:inline;">U &nbsp;</h5></label><input checked id="filtersTermOptions3" value="U" class="fpFilter fpTerms" type="checkbox"></div>
								</div>
							</td>
						</tr>
					</table>
				</div>
				<div id="pickSubjectSubjectsCode" class="w3-rest" style="height:100%;">
					If you see this, there has been an error. Please refresh or try a different browser.
				</div>
			</div>
		</div>
		<!-- /Overview tab -->
		<!-- Details tab -->
		<div id="secondPanel" class="tab-pane fade">
			<!-- <h2>Click a Course to See It's Details Here.</h2>  -->
			<div id="mainContent"></div>
		</div>
		<!-- /Details tab -->
	</div>
	<div style="height:5%;display:none;" id="secondPanelOptions">
		<div class="w3-row" style="height:100%;">
			<div class="w3-third" style="height:100%;">
				<button value='general' class="btn btn-primary secondPanelOption" style="width:100%;height:100%;">
					View All General
				</button>
			</div>
			<div class="w3-third" style="height:100%;">
				<button value='details' class="btn btn-warning secondPanelOption" style="width:100%;height:100%;">
					View All Details
				</button>
			</div>
			<!-- <div class="w3-quarter" style="height:100%;">
				<button value='filter' class="btn btn-info secondPanelOption" style="width:100%;height:100%;">Only Show Takable Courses</button>
			</div> -->
			<div class="w3-third" style="height:100%;">
				<button value='deleteAll' class="btn btn-danger secondPanelOption" style="width:100%;height:100%;">Remove All Cards</button>				
			</div>
		</div>
	</div>
	<div style="height:5%;" id="firstPanelOptions">
		<div class="w3-row" style="height:100%;">
			<!-- <div class="w3-quarter" style="height:100%;">
				<button class="btn btn-primary" style="width:100%;height:100%;"></button>
			</div>
			<div class="w3-quarter" style="height:100%;">
				<button class="btn btn-danger" style="width:100%;height:100%;"></button>
			</div>
			<div class="w3-quarter" style="height:100%;">
				<label for="fileInput" class="btn btn-warning" style="width:100%;height:100%;">
	                <i class="fa fa-cloud-upload"></i>
	                <div style="align-text:center;">Upload Transcript</div>
	            </label>
	            <input style="display:none;" id="fileInput" type="file"/>
			</div> -->
			<div class="w3-half" style="height:100%;">
				<button id="leftPanelToggleFilters" class="btn btn-warning" style="width:100%;height:100%;">Show/Hide Filters</button>
				<!-- <label for="fileInput" class="btn btn-warning" style="width:100%;height:100%;">
	                <i class="fa fa-cloud-upload"></i>
	                <div style="align-text:center;">Upload Transcript</div>
	            </label>
	            <input style="display:none;" id="fileInput" type="file"/> -->
			</div>
			<div class="w3-half" style="height:100%;">
				<button id="leftPanelChooseSubject" class="btn btn-info" style="width:100%;height:100%;">Subject By Name</button>
			</div>

		</div>
	</div>
</div>
<!-- /Middle panel -->


<style>
	#middlePanel, #filterTab, #topPanel{
		background-color: white;
		border: 1px red solid;
		width: 100%;
		height: auto;
	}
	#courseText, #offeringsContent, #unlocksContent, #miscContent{
		overflow: auto;
		max-height: 300px;
	}
	#leftPanel {
		background-color: white;
		border: 1px red solid;
		width: 30%;
		min-height: 100%;
		overflow: hidden;
		float: left;
		padding:0;
	}
	#addBtn{
		width: 100%;
	}
	select{
		display: inline;
	}
	.crsItem{
		border: 1px red solid;
	}
	.crsTitle{
		width: 80%;
		font-size: 16px;
		border: 1px red dashed;
		float:left;
	}
	.addCrsBtn{
		width: 20%;
		font-size: 18px;
		float:left;
	}
	.remCrsBtn{
		width: 10%;
		font-size: 18px;

	}
</style>
