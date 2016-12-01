<!-- Middle panel -->
<div id="middlePanel"  style="height:100%;overflow-y:auto;background-color:#ccffff;">
	<ul class="nav nav-tabs" style="height:6.5%;">
		<li class="active" id="middlePanelNav1"  type="button" data-toggle="tooltip" data-placement="top" title="Subjects and Filters" style="width:50%;height:100%;">
            <a data-toggle="tab" href="#firstPanel" style="text-align:center;height:100%;">
                <i class="material-icons" style="font-size:25px">dashboard</i>
            </a>
        </li>
		<li id="middlePanelNav2" type="button" data-toggle="tooltip" data-placement="top" title="View Course Cards" style="width:50%;height:100%;">
            <a class="TEMP" data-toggle="tab" href="#secondPanel" style="text-align:center;height:100%;">
                <i class="material-icons" style="font-size:25px">equalizer</i>
            </a>
        </li>
	</ul>
	<div class="tab-content" style="height:88.5%;overflow-y:auto;">
		<!-- Overview tab -->
		<div id="firstPanel" class="tab-pane fade in active" style="height:100%;">
			<div class="w3-row" style="height:100%;">
				<div id="firstPanelFilters" class="w3-half" style="height:100%;display:none;">
					<table style="width:100%;height:100%;">
						<tr style="width:100%;"><td>FILTERS:</td></tr>
						<tr style="width:100%;height:20%;">
							<td style="height:20%;">
								<label for="fpHideUnavailable">Show Only Available Courses</label>
								<input id="fpHideUnavailable" class="fpFilter" type="checkbox">
							</td>
						</tr>
						<tr style="width:100%;height:20%;"><td style="height:20%;">
							Credits: 0.00, 0.50, ...</td></tr>
						<tr style="width:100%;height:20%;"><td style="height:20%;">
							Terms: F, W, S, U</td></tr>
						<tr style="width:100%;height:20%;"><td style="height:20%;">
							Terms: F, W, S, U</td></tr>
						<tr style="width:100%;height:20%;"><td style="height:20%;">
							Terms: F, W, S, U</td></tr>
					</table>
				</div>
				<div id="pickSubjectSubjectsCode" class="w3-rest" style="height:100%;">
				</div>
			</div>
		</div>
		<!-- /Overview tab -->
		<!-- Details tab -->
		<div id="secondPanel" class="tab-pane fade">
			<!-- <h2>Click a Course to See It's Details Here.</h2>  -->
			<div id="mainContent" style=""></div>
		</div>
		<!-- /Details tab -->
	</div>
	<div style="height:5%;display:none;" id="secondPanelOptions">
		<div class="w3-row" style="height:100%;">
			<div class="w3-quarter" style="height:100%;">
				<button value='general' class="btn btn-primary secondPanelOption" style="width:100%;height:100%;">
					View All General
				</button>
			</div>
			<div class="w3-quarter" style="height:100%;">
				<button value='details' class="btn btn-warning secondPanelOption" style="width:100%;height:100%;">
					View All Details
				</button>
			</div>
			<div class="w3-quarter" style="height:100%;">
				<button value='filter' class="btn btn-info secondPanelOption" style="width:100%;height:100%;">Only Show Takable Courses</button>
			</div>
			<div class="w3-quarter" style="height:100%;">
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
				<button id="leftPanelToggleFilters" class="btn btn-warning" style="width:100%;height:100%;">Toggle Filters</button>
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



