<!-- Top panel -->
<div id="topPanel" class="container" style="height:100%;background-color:#42f4a7;">
    
    <div id="addingFunctsContent" class="tab-content">
        <!-- +Semester tab a-->
        <div id="addSemester" class="tab-pane fade in active">
            <form id="" class="form" role="form">
                <!-- selectYear control -->
                <div class="form-group row" title="Select which Year to add this Semester to">
                    <label for="selYear" class="col-sm-2 col-form-label">Year:</label>
                    <div class="col-sm-10">
                        <select id="selYear" class="form-control" required>
                            <option disabled selected>Choose a Year</option>
                        </select>
                    </div>
                </div>
                <!-- /selectYear control -->

                <!-- selectTerm control -->
                <div class="form-group row" title="Select which Term to add this Semester to">
                    <label for="selTerm" class="col-sm-2 col-form-lable">Term:</label>
                    <div class="col-sm-10">
                        <select id="selTerm" class="form-control" required>
                            <option disabled>Choose a Term</option>
                        </select>
                    </div>
                </div>
                <!-- /selectTerm control -->

                <!-- Submitting controls -->
                <button id="addSemOpen" type="button" class="btn btn-success" title="Save Semester to your Plan">Add</button>
                <button type="button" class="btn btn-info" onclick="hideTopPanel()" title="Close window">Finish</button>
                <!-- /Submitting controls -->
            </form>
        </div>
        <!-- /+Semester tab -->

        <!-- +Course tab -->
        <div id="addCourse" class="tab-pane fade">
            <form class="form" role="form">
                <!-- Hide Unavailable Courses (HUC) control -->
                <div class="form-group w3-container" title="Toggle unavailable course visibility">
                    <div class="col-sm-1">
                        <input id="HUC_btn" class="form-control w3-disabled" type="checkbox" />
                    </div>
                    <label for="HUC_btn" class="col-sm-11 col-form-label">Hide unavailable courses.</label>
                </div>
                <!-- /Hide Unavailable Courses (HUC) control -->

                <!-- addToSemester control -->
                <div class="form-group row" title="Select which Semester to add to">
                    <label for="addToSemester_list" class="col-sm-2 col-form-label">Semester:</label>
                    <div class="col-sm-10">
                        <select id="addToSemester_list" class="form-control" data-live-search="true" required>
                            <option value="" selected>Choose an existing Semester</option>
                            <option value="2016F">temp</option>
                            <option value="2017W">2017 W</option>
                        </select>
                    </div>
                </div>
                <!-- /addToSemester control -->

                <!-- selectSubject control -->
                <div class="form-group">
                    <!-- Subject by Name -->
                    <table style="width:100%;"><tr style="width:100%;">
                    <td style="width:40%;">
                        <label for="subjectByName">Select Subject By:</label>
                        <div id="subjectListToggle" style="display:inline;">
                            <input id="subjectTitleButton" type="radio" name="subjectListType" value="Name" checked />
                            <label for="subjectTitleButto">Title or</label>

                            <input id="subjectAccrButton" type="radio" name="subjectListType" value="Accr" />
                            <label for="subjectAccrButton">Acronym</label>
                        </div>
                    </td>
                    <td style="width:60%;">
                        <div class="subjectByNameID" title="Narrow your search with a Subject">
                            <select id="subjectByName"  class="form-control subjectSelector">
                                <option value="" selected>Choose a Subject</option>
                            </select>
                        </div>
                        <!-- /Subject by Name -->

                        <!-- Subject by Acronym -->
                        <div class="subjectByCodeID" style="display:none;" title="Narrow your search with a Subject">
                            <select id="subjectByCode" class="form-control subjectSelector" data-live-search="true">
                                <option value="" selected>Choose a Subject</option>
                            </select>
                        </div>
                    </td>
                    </tr></table>
                    <!-- /Subject by Acronym -->

                    <!-- /Subject toggle -->
                </div>
                <!-- /selectSubject control -->

                <!-- selectCourse control-->
                <div class="form-group" title="Narrow your search with a Course">
                    <!-- Course toggle -->
                    <table style="width:100%;"><tr style="width:100%;">
                    <td style="width:40%;">
                        <label for="courseByName">Select Course By:</label>
                        <div id="courseListToggle" style="display:inline;">
                            <input id="courseList_title" type="radio" name="courseListType" value="Title" checked />
                            <label for="courseList_title">Title or</label>

                            <input id="courseList_acronym" type="radio" name="courseListType" value="Accr"/>
                            <label for="courseList_acronym">Acronym</label>
                        </div>
                        <!-- /Course toggle -->
                    </td>
                    
                    <td style="width:60%;">
                        <!-- Course by NAME -->
                        <div id="courseByNameID" style="width:100%;">
                            <select id="courseByName" class="form-control courseSelector">
                                <option value="" selected>Choose a Course</option>
                            </select>
                        </div>

                        <!-- Course by CODE -->
                        <div id="courseByAccrID" style="display:none">
                            <select id="courseByAccr" class="form-control courseSelector">
                                <option value="" selected>Choose a Course</option>
                            </select>
                        </div>
                    </td>
                    </tr></table>

                    

                    <!-- Filtered course results -->
                    <!-- <div id="numCourses"></div> -->
                    <!-- /Filtered course results -->
                </div>
                <!-- /selectCourse control-->

                <!-- Submitting controls -->
                <button class="btn btn-warning" type="button" data-toggle="tab" href="#filterTab" title="Narrow your search with Filters">Filters</button>
                <button id="submitCourseOpen" class="btn btn-success" type="button" title="Save chosen Course to selected Semester">Add</button>
                <button id="addCourseClose" class="btn btn-info" type="button" onclick="hideTopPanel()" title="Close window">Finish</button>
                <!-- /Submitting controls -->
            </form>
        </div>
        <!-- /+Course tab -->

        <!-- Filter tab -->
        <div id="filterTab" class="tab-pane fade">
            <h3>Filters</h3>
            <a class="btn btn-danger" type="button" data-toggle="tab" href="#addCourse">Close</a>
        </div>
        <!-- /Filter tab -->
    </div>
</div>
<!-- /Top panel -->
