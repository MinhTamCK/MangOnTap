<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<title>Upload File</title>
	<link rel="stylesheet" href="css/style.css" />
</head>
<body>
	<div id="container">
		<div id="header">
			Images Browser
		</div>
		<div id="menu">
			<div>
				<a href="index.php">Upload</a>
			</div>
			<div>
				<a href="web.php">Web</a>
			</div>
			<div>
				<a href="media.php">Media from Page</a>
			</div>
		</div>
		<div id="content">
			<?php include("formUpload.php"); ?>
		</div>
		<div id="footer">
			Copyright 2015
		</div>
	</div>
</body>
</html>