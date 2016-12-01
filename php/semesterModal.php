<div class="modal fade" id="addSemScreen" role="dialog">
	<div class="modal-dialog">
		<!-- Modal content-->
		<div class="modal-content">
			<div class="modal-header modal-header-success">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<h4 class="modal-title">Add Semester</h4>
			</div>
			<div class="modal-body">
				<form class="form" role="form">  <!-- id="semForm" -->
					<div class="form-group">
						<label for="sel1">Year:</label>
						<select class="form-control" id="selYear" required></select>
					</div>
					<div class="form-group">
						<label for="sel1">Term:</label>
						<select class="form-control" id="selTerm" required></select>
					</div>
					<div class="modal-footer">
						<button type="button" id="addSemClose" class="btn btn-danger" data-dismiss="modal"
						style="float: left;">
							Close
						</button>

						<button type="button" id="addSemOpen" class="btn btn-info">
							<span class="glyphicon glyphicon-plus"></span>
							Add This and Another
						</button>

						<button type="button" id="addSemSubmit" class="btn btn-success">
							<span class="glyphicon glyphicon-ok"></span>
							Add This
						</button>

						<button type="button" id="addFinalSem" class="btn btn-success">
							<span class="glyphicon glyphicon-share-alt"></span>
							Add At End
						</button>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>
