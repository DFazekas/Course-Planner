<?php
    $conn = connect(); 

    $sql = "SELECT * FROM PlaintextCourses";
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
        echo $sql." Results";
    }

    $conn->close();

    function connect() {
        $servername = "mysql6.000webhost.com";
        $username = "a4242065_name";
        $password = "Pillowchair23";
        $dbname = "a4242065_data";

        // $servername = "mysql9.000webhost.com";
        // $username = "a7958014_a";
        // $password = "pass1word";
        // $dbname = "a7958014_a";

        $conn = new mysqli($servername, $username, $password, $dbname);
        
        // Check connection
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        } 
        return $conn;
    }
?>
