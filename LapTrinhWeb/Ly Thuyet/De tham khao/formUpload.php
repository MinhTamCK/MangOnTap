<form name='frmUpload' action='xlUpload.php' 
		method='post' 
		enctype="multipart/form-data"
		onsubmit="return KiemTra()" />
	<div>
		Image upload:
		<input type="file" name="fHinh" id="fHinh" />
	</div>
	<div>
		Description*:
		<input type="text" name="txtDes" id="txtDes" />
	</div>
	<div>
		<span id="mess"></span>
	</div>
	<div>
		<input type="submit" value="Upload file" />
		<input type="reset" value="Reset" />
	</div>
</form>

<script type="text/javascript">
	function KiemTra()
	{
		flag = true;
		var fHinh = document.getElementById('fHinh');
		var mess = document.getElementById('mess');
		var err = "";
		
		var ex = fHinh.value.split('.');
		var ex1 = ex[ex.length - 1];

		if(ex1 != "jpg" && ex1 != "png" && ex1 != "gif")
		{
			flag = false;
			err += "Hình upload chưa được chọn";
		}

		var des = document.getElementById('txtDes');
		if(des.value == "")
		{
			flag = false;
			err += "Description không được rỗng";
		}
		
		if(flag==true)
			mess.innerHTML = "";
		else
			mess.innerHTML = err;

		return	flag;
	}
</script>