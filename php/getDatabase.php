<?php
    $conn = connect(); 
    $sql = "SELECT * FROM `TABLE 1`";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $colunmNames = array();
        $row = $result->fetch_assoc();

        // Get column names
        foreach($row as $key => $value) {
            array_push($colunmNames, $key);
        }

        // Get table contents
        do {
            foreach($colunmNames as $i) {
                echo $row[$i].'|';
            }
            echo '%';
        } while ($row = $result->fetch_assoc());
    } else {
        echo $sql." Results (Error)";
    }

    $conn->close();

    function connect() {
        $servername = "localhost";
        $username = "planm779_access";
        $password = "Pillowchair12";
        $dbname = "planm779_GuelphCourses";

        $conn = new mysqli($servername, $username, $password, $dbname);
        
        // Check connection
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        } 
        return $conn;
    }
?>
