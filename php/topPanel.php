
<div id="topPanel" class="container" style="margin:0;padding:0;background-color:#42f4a7;">
    <div id="addingFunctsContent" class="tab-content">
        <!-- +Semester tab .-->
        <div id="addSemester" class="tab-pane fade in active">
            <form class="form" role="form">
                <table style="width:100%;height:100%;" border='1'>
                    <tr style="width:100%;">
                        <td style="width:30%;">
                            <div class="form-group row" title="Select which Year to add this Semester to">
                                <label for="selYear" class="col-sm-2 col-form-label">Year:</label>
                                <div class="col-sm-10">
                                    <select id="selYear" class="form-control" required>
                                        <option disabled selected>Choose a Year</option>
                                    </select>
                                </div>
                            </div>
                        </td>
                        <td style="width:34%;">
                            <div class="form-group row" title="Select which Term to add this Semester to">
                                <label for="selTerm" class="col-sm-2 col-form-lable">Term:</label>
                                <div class="col-sm-10">
                                    <select id="selTerm" class="form-control" required>
                                        <option disabled>Choose a Term</option>
                                    </select>
                                </div>
                            </div>
                        </td>
                        <td style="width:30%;">
                            <button style="margin-left:50%;" id="addSemOpen" type="button" class="btn btn-success" title="Save Semester to your Plan">Add</button>
                        </td>
                    </tr>
                </table>
        </div>
        <div id="addCourse" class="tab-pane fade">
        </div>
    </div>

</div>
