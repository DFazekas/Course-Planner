<!-- Left panel -->
<div id="course-semester-select" class="w3-theme-l5" style="padding:0;width:100%;height:100%;position:relative;">
    <div style="background-color:#ccffcc;">
        <!-- Course & Info Tab controls (small screens) -->
        <!-- <div id="miniTabs" class="w3-container w3-btn-bar">
            <button id="CourseTabBtn" class="w3-btn w3-hover-teal TabBtn" style="width:50%;">
                <i class="material-icons">dns</i>
                <span>Courses</span>
            </button>
            <button id="InfoTabBtn" class="w3-btn w3-hover-teal TabBtn" style="width:50%;">
                <i class="material-icons">description</i>
                <span>Info</span>
            </button>
        </div> -->
        <!-- /Course & Info Tab controls (small screens) -->

        <!-- Add button -->
       <!--  <div class="" style="text-align:center;">
            <button id="addPanelBtn" class="btn btn-success addCourseBtn" type="button" 
                data-toggle="tooltip" data-placement="top" title="Add Semesters & Courses!"
                style="width:95%;margin-top:5%;margin-bottom:3%">
            <span class="glyphicon glyphicon-plus">
            </span>
            </button>
        </div> -->
        <!-- /Add button -->

        <!-- Overview controls -->
        <div class="w3-row w3-btn-bar" style="margin:0;padding:3%;">
            <button id="leftSemBTN" class="w3-container w3-btn" type="button" data-toggle="tooltip" 
                data-placement="top" title="Previous" style="width:25%;height:30px;">
                <span class="glyphicon glyphicon-chevron-left"></span>
            </button>

            <div data-toggle="tooltip" data-placement="top" title="Overview/Printing">
                <button class="w3-container w3-btn w3-blue w3-hover-white" data-toggle="modal"
                     data-target="#overviewModal" style="width:50%;height:30px;" id="openOverviewButton">
                    <span class="glyphicon glyphicon-search" style="color:black"></span>
                    <span>
                        <h4 id="currentSem" style="display:inline;color:black;"></h4>
                    </span>
                </button>
            </div>

            <button id="rightSemBTN" class="w3-container w3-btn" type="button"
                 data-toggle="tooltip" data-placement="top" title="Next" style="width:25%;height:30px;">
                <span class="glyphicon glyphicon-chevron-right"></span>
            </button>
        </div>
        <hr style="margin:0 0 0 0;">
    </div>
    <!-- /Overview controls -->

    <!-- Course section-->
    <!-- Slide ONE -->
    <table style="width:100%;" id="courseTitleViewingRegion">
        <tr style="width:30%;display:inline-block;">
            <td style="display:block;text-align:right;">
                <label class="codeLabelName" value='false'>Name</label>
            </td>
        </tr>
        <tr style="width:39%;display:inline-block;">
            <td style="width:100%;display:block;">
                <div class="slideOne">  
                    <input type="checkbox" slider="true" value="None" id="leftPanelNameCodeButton" name="check" />
                    <label for="leftPanelNameCodeButton" data-toggle="tooltip" data-placement="top" title="View&nbsp;By: Name/Code"></label>
                </div>
            </td>
        </tr>
        <tr style="display:inline-block;">
            <td style="display:block;text-align:left;">
                <label class="codeLabelName" value='true'>Code</label>
            </td>
        </tr>
    </table>

    <div  style="width:90%;height:69%;margin-left:5%; margin-top:0px;
                                    padding:8px 0px 8px 8px;overflow-y:auto;overflow-x:hidden;">
        <span id="leftUserSemesterCourses"></span>
        <span id="leftSubjectSemesterCourses"></span>
    </div>
    
    <!-- /Course section -->

    <!-- Delete buttons -->
    <!-- <div style="position:relative;"> -->



    <div style="position:absolute;display:block-inline;bottom:0px;width:100%;background-color:#cdffcc;
        padding-bottom:2.5%;padding-top:2.5%;height:15%;">
        <table style="width:100%;height:100%;">
            <!-- <tr>
                <td>
                    <div>
                        <table style="width:100%;margin-bottom:2%;" border='1'>
                            <tr style="width:100%;">
                                <td style="width:50%;text-align:center;">
                                    <div id="leftPanelChooseSubject" class="btn btn-primary">Select a Subject</div>
                                </td>
                            </tr>
                        </table>
                    </div>
                </td>
            </tr> -->
            <tr style="padding:0;margin:0;">
                <td style="padding:0;margin:0;">
                    <!-- +Semester tab -->
                    <div id="addSemester">
                        <form>
                            <table style="width:100%;">
                                <tr style="width:100%;">
                                    <td style="width:10%;vertical-align:top">
                                        <button id="incrementSemester" type="button" class="btn btn-primary"
                                            data-toggle="tooltip" data-placement="top" title="Select Next Term">
                                        <span class="glyphicon glyphicon-share-alt"></span>
                                        </button>
                                    </td>
                                    <td style="width:35%;">
                                        <div class="form-group" style="width:100%;">
                                            <div style="width:100%;">
                                                <select id="selYear"class="form-control" required>
                                                    <option disabled selected>Choose a Year</option>
                                                </select>
                                            </div>
                                        </div>
                                    </td>
                                    <td style="width:35%;">
                                        <div class="form-group">
                                            <div style="width:100%;">
                                                <select id="selTerm" class="form-control" required>
                                                    <option disabled>Choose a Term</option>
                                                </select>
                                            </div>
                                        </div>
                                    </td>
                                    <td style="width:20%;vertical-align:top">
                                        <button id="addSemOpen" type="button" class="btn btn-success"
                                            data-toggle="tooltip" data-placement="top" title="Add This Semester">Add</button>
                                    </td>
                                </tr>
                            </table>
                        </form>
                    </div>
                </td>
            </tr>
            <tr id="deleteSemesterRegion">
                <td>
                    <table style="width:100%;">
                        <tr style="width:100%;">
                            <td style="width:2%;"></td>
                            <td style="width:46%;text-align:center;">
                                <button id="remSemBtn" type="button" class="btn btn-danger" 
                                    style="width:100%;"
                                    data-toggle="tooltip" data-placement="top" title="Delete THIS Semester?">
                                <i class="material-icons">delete</i>
                                </button>
                            </td>
                            <td style="width:2%;"></td>
                            <td style="width:46%;text-align:center;">
                                <button id="clearAllSemBtn" type="button" class="btn btn-danger" 
                                    style="width:100%;"
                                    data-toggle="tooltip" data-placement="top" title="Delete ALL Semesters?">
                                <i class="material-icons">delete_forever</i>
                                </button>
                            </td>
                            <td style="width:2%;"></td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </div>
    <!-- </div> -->
    <!-- <div style="position:absolute;bottom:20px;">
        <div class="w3-btn-bar" style="text-align:center;">
            <button id="remSemBtn" class="w3-btn" style="background-color:red;width:50%;" type="button" 
                data-toggle="tooltip" data-placement="top" title="Delete (THIS) Semester?">
                <i class="material-icons">delete</i>
            </button>

            <button id="clearAllSemBtn" class="w3-btn" style="background-color:red;width:50%;" type="button"
                 data-toggle="tooltip" data-placement="top" title="Delete (ALL) Semesters?">
                <i class="material-icons">delete_forever</i>
            </button>
        </div>
    </div> -->
    <!-- Delete buttons -->
</div>
<!-- /Left panel -->



