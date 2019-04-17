<?php

    header('Content-type: application/xml');

    $db = new mysqli("127.0.0.1", "root", "", "personalsite");

    $sql = "select * from visitors";

    $stmt = $db->prepare($sql);

    $stmt->bind_result($id, $name, $desc, $created);

    $stmt->execute();

    $visitors = "<visitors>";
    while($stmt->fetch()) {
        $visitors .= "<visitor>";
            $visitors .="<id>$id</id>";
            $visitors .="<name>$name</name>";
            $visitors .="<description>$desc</description>";
            $visitors .="<created>$created</created>";
        $visitors .= "</visitor>";
    }
    $visitors .="</visitors>";

    echo $visitors;
?>
