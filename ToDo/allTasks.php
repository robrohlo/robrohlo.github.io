<?php

    header('Content-type: application/xml');

    $db = new mysqli("localhost", "root", "student", "ToDo");

    $sql = "select * from visitors";

    $stmt = $db->prepare($sql);

    $stmt->bind_result($id, $name, $desc, $created);

    $stmt->execute();

    $visitors = "<visitors>";
    while($stmt->fetch()) {
        $visitor .= "<visitor>";
            $visitor .="<id>$id</id>";
            $visitor .="<name>$name</name>";
            $visitor .="<description>$desc</description>";
            $visitor .="<created>$created</created>";
        $visitor .= "</visitor>";
    }
    $visitors .="</visitors>";



    echo $visitors;
?>
