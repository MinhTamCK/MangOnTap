<?php
	// Create a connection to database
	$host = "www.ts2015.com";
	$userName = "ts2015";
	$passWord = "ts2015";
	$cnn = mysql_connect($host,$userName,$passWord);
	if(!$cnn)
	{
		echo "Connection fail!";
		exit();
	}
	// Select database
	$dbName = "ts2015";
	$selectDB = mysql_select_database($cnn,$dbName);
	if(!$selectDB)
	{
		echo "Can not select database name!";
		exit();
	}
	// Get value field from form
	$imgPath = $_POST['imgFile'];
	$decription = $_POST['decription'];
	if(!isset($imgPath) || !isset($decription))
	{
		echo "Not data feld";
		exit();
	}
	// Create query
	$query = "INSERT INTO FileUpload VALUE($imgPath,$decription)";
	$result = mysql_query($query,$selectDB,$cnn);
	if($result)
	{
		echo "Add image success!";
	}else{
		echo "Add image fail!";
	}
	// Close connection
	mysql_close($cnn);
 ?>