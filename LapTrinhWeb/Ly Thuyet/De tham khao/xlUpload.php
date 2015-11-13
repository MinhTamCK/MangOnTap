<?php
	if(isset($_POST["txtDes"]))
	{
		$filePath = "./upload/".$_FILES["fHinh"]["name"];
		move_uploaded_file($_FILES["fHinh"]["tmp_name"], $filePath);
		if(file_exists($filePath))
		{
			$des = $_POST["txtDes"];
			//Lưu vào CSDL

			include("DataProvider.php");
			$sql = "INSERT INTO `FileUpload`(`FilePath`, `Description`) VALUES ('$filePath','$des')";
			DataProvider::ExecuteQuery($sql);
			echo "Upload thành công";

			//Xử lý lưu thông tin của hình được Upload thành công
			// về Cookies cho Client 
		}
		else
			echo "Lỗi upload";
	}
	else
		header("location: index.php");
?>
