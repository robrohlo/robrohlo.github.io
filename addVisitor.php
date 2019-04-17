<?php
    $userName = "root";
    $password = "";
    $dbName = "personalsite";
    $server = "127.0.0.1";


    $db = new mysqli($server, $userName, $password, $dbName);

    $sql = "insert into visitors(name, description) values(?, ?)";

    $stmt = $db->prepare($sql);

    $defaultComplete = false;
    $stmt->bind_param("ss", $_REQUEST["name"], $_REQUEST["description"]);

    $stmt->execute();
    $newId = $db->insert_id;
    $db->close();

    $db = new mysqli($server, $userName, $password, $dbName);
    $sql = "select * from visitors where id=?";
    $selectVisitortmt = $db->prepare($sql);

    $selectVisitortmt->bind_param("i", $newId);
    $selectVisitortmt->bind_result($id, $name, $desc, $timestamp);
    $selectVisitortmt->execute();
    $selectVisitortmt->fetch();

    $visitor = array("id" =>$newId, "name"=>$name, "description"=>$desc,
                   "created"=>$timestamp);

    echo json_encode($visitor);


?>
