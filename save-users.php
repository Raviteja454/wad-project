<?php

$file = fopen("users.json", "w");
fwrite($file, $_POST["users"]);
fclose($file);

echo json_encode(array("success" => true));

?>
