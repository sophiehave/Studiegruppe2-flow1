<?php
require "./../.env";

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: OPTIONS,GET,POST,PUT,DELETE");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


$requestType = $_SERVER["REQUEST_METHOD"];


//Login info til MySQL
$servername = "localhost:3306";
$username = "root";
$password = getenv("PASSWORD");


//Forbindelse, så den logger på MySQL, og 'henter' data
$conn = new PDO("mysql:host=$servername;dbname=pipper", $username, $password);
  // set the PDO error mode to exception
  $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

  if($requestType == "GET"){
    try {
      //Henter pips fra datapasen
      $statement = $conn->query("select * from pips order by idpips desc");
        $result = $statement->fetchAll();
    
        echo json_encode($result);
    } catch(PDOException $e) {
      echo "Connection failed: " . $e->getMessage(); //fejlbesked hvis det ikke virker
    }
    } 
    elseif ($requestType == "POST"){
      // echo "You send a post";

      
      $input = (array) json_decode(file_get_contents('php://input'), TRUE);
      
      //Gør det lettere at skrive de forskellige 
      $idpips = $input["idpips"];
      $brugernavn = $input["Brugernavn"];
      $besked = $input["Besked"];
      
    
      echo print_r($input);
      //Poste dett til databasen
      $sql = "INSERT INTO pips VALUES (default, :Brugernavn, :Besked)";
      $statement = $conn->prepare($sql);
      $statement->execute(array('Brugernavn' => $brugernavn, 'Besked' => $besked));
    
      $id = $conn->lastInsertId();
      $data =(object) $input;
      $data->id=$id;
    
    }


?>
