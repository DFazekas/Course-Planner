<div class="modal modal-large fade " id="addCourseScreen" role="dialog">
	<div class="modal-admin">
		<!-- Modal content-->
		<div class="modal-content" style="width:90%;left:5%;">
			<div class="modal-header modal-header-success" id="addCrsModHead">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<h4 class="modal-title">Add Course</h4>
			</div>
			<div class="modal-body">
				<button type="button" class="btn btn-info" data-toggle="collapse" 
					data-target="#advSearch" id="filterToggle">
					<span class="glyphicon glyphicon-tasks"></span>
					Toggle Filters
				</button>
				<button class="btn btn-warning" type="button" id="clearFilters">
					<span class="glyphicon glyphicon-refresh"></span>
					Reset filters
				</button>
				
				<!-- Advanced search section -->
				<!-- <div id="advSearch" class="panel panel-warning collapse"> -->
					<div class="panel-body">
						<form class="form" id="filterForm">
							<span id="filters">
							<div class="form-group">
								<input id="hideUnavailable" type="checkbox" disabled/>
								<label for="hideUnavailable">Hide unavailable courses</label>
							</div>
							<div class="form-group">
								<label>Electives (For B.Sc):</label> (Does not fully work yet)
								<ul class="list-group offerings">
									<input id="anyElectives" type="radio" name="elect" value="N" checked>Any
									<input id="sciElectives" type="radio" name="elect" value="S">Science Electives
									<input id="artElectives" type="radio" name="elect" value="A">Arts Electives
								</ul>
								<label>Offerings:</label>
								<ul class="list-group offerings">
									<table><tr>
										<td><li class="list-group-item">
												<input id="FTermFilter"    type="checkbox" checked>Fall (F)
											</li>
										</td><td><li class="list-group-item">
												<input id="WTermFilter"  type="checkbox" checked>Winter (W)
											</li>
										</td><td><li class="list-group-item">
												<input id="STermFilter"  type="checkbox" checked>Summer (S)
											</li>
										</td><td><li class="list-group-item">
												<input id="UTermFilter" type="checkbox" checked>Unknown (U)
											</li>
										</td>
										<td><li class="list-group-item"><input id="" type="button" disabled value="ALL"></td></li>
										<td><li class="list-group-item"><input id="" type="button" disabled value="NONE"></td></li>
									</tr></table>
								</ul>
								<label>Credits:</label>
								<ul class="list-group Credits">
									<table><tr>
										<td><li class="list-group-item"><input id="creditFilter0-00"  type="checkbox" checked>0.00</li></td>
										<td><li class="list-group-item"><input id="creditFilter0-25"  type="checkbox" checked>0.25</td></li>
										<td><li class="list-group-item"><input id="creditFilter0-50"  type="checkbox" checked>0.50</td></li>
										<td><li class="list-group-item"><input id="creditFilter0-75"  type="checkbox" checked>0.75</td></li>
										<td><li class="list-group-item"><input id="creditFilter1-00"  type="checkbox" checked>1.00</td></li>
										<td><li class="list-group-item"><input id="creditFilter1-50"  type="checkbox" checked>1.50</td></li>
									</tr><tr>
										<td><li class="list-group-item"><input id="creditFilter1-75"  type="checkbox" checked>1.75</td></li>
										<td><li class="list-group-item"><input id="creditFilter2-00"  type="checkbox" checked>2.00</td></li>
										<td><li class="list-group-item"><input id="creditFilter2-50"  type="checkbox" checked>2.50</td></li>
										<td><li class="list-group-item"><input id="creditFilter2-75"  type="checkbox" checked>2.75</td></li>
										<td><li class="list-group-item"><input id="creditFilter3-25"  type="checkbox" checked>3.25</td></li>
										<td><li class="list-group-item"><input id="" type="button" disabled value="ALL"></td></li>
										<td><li class="list-group-item"><input id="" type="button" disabled value="NONE"></td></li>

									</tr></table>
								</ul>
							</div>
							</span>
						</form>
					</div>
				<!--</div> -->













				<form class="form" role="form">
					<!-- Subject -->
					<div class="form-group form-inline">
						<!-- Toggle -->
						<label for="subjectByName">Select Subject by:</label>
						<span id="subjectListToggle">
							<input type="radio" name="subjectListType" value="Name" checked> Name
						    <input type="radio" name="subjectListType" value="Accr"> Accronym<br>
						</span>
						<!-- Subject Selector by Name -->
						<span id="subjectByNameID">
							<select class="subjectSelector" id="subjectByName" data-live-search="true" style="width:100%;max-width: 340px;">
								<option>Error Could not Load</option> <!-- List is populated by php/js function else error-->
								<option>Physics</option>
								<option>Computer Information Science</option>
							</select>
						</span>
						<!-- Subject Selector by Code -->
						<span id="subjectByCodeID" style="display:none">
							<select class="subjectSelector" id="subjectByCode" data-live-search="true" style="width:100%;max-width:340px;">
								<option>Error Could not Load</option> <!-- List is populated by php/js function else error-->
								<option>PHYS</option>
								<option>CIS</option>
							</select>
						</span>	
					</div>

					<!-- Course -->
					<div class="form-group">
						<!-- Toggle -->
						<label for="CourseByName">Select Course by:</label>
						<span id="courseListToggle">
							<input type="radio" name="courseListType" value="Name" checked> Name
						    <input type="radio" name="courseListType" value="Accr"> Accronym<br>
						</span>
						<!-- Course Selector by Name -->
						<span id="courseByNameID">
							<select class="courseSelector" id="courseByName" data-live-search="true" style="width:100%;max-width:340px;" >
								<option>Error Could not Load</option> <!-- List is populated by php/js function else error-->
								<option>Physics</option>
								<option>Computer Information Science</option>
							</select>
						</span>
						<!-- Course Selector by Code -->
						<span id="courseByAccrID" style="display:none">
							<select class="courseSelector" id="courseByAccr" data-live-search="true" style="width:100%;max-width:340px;">
								<option>Error Could not Load</option> <!-- List is populated by php/js function else error-->
								<option>PHYS</option>
								<option>CIS</option>
							</select>
						</span>	
						<span id="numCourses"></span>
					</div>

					
					






					<!-- Submit -->
					<div class="modal-footer">
						<button type="button" id="addCourseClose" class="btn btn-danger" 
							data-dismiss="modal" style="float: left;">
							Close
						</button>
						<button type="button" class="btn btn-info" id="submitCourseOpen" disabled>
							<span class="glyphicon glyphicon-plus"></span>
							 Add This and Another
						</button>
						<button type="button" class="btn btn-success" id="submitCourseClose" disabled>
							<span class="glyphicon glyphicon-ok"></span>
							 Add This
						</button>
					</div>
					<div id="courseText">
						Please Select a Course
					</div>
				</form>
			</div>
			
		</div>
	</div>
</div>
