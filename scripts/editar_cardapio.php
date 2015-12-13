<?php
	include_once("conexao.php");

	// Fazendo uma consulta antes
	$id = $_POST["id"];
	$query = "SELECT * FROM tb_menu WHERE id = ". $id;
	$result = mysqli_query($conexao, $query) or die ("Falha ao consultar.");
	$row = mysqli_fetch_array($result, MYSQLI_ASSOC);

	$photo_address = $row["photo_address"];
	$uploadfile = "";

	$prod_name = $_POST["product_name"];
	$price = $_POST["price"];
	$price = str_replace(",", ".", $price);
	$desc = $_POST["description"];
	$active = 0;
	$photo_path_edit = $_POST["photo_path_edit"];

	if(isset($_POST["active"])){
		$active = 1;
	}


	$query = "UPDATE tb_menu SET active = ".$active.", product_name = '".$prod_name."', price = '".$price."', description = '".$desc."' WHERE id = ".$id;
	if ($photo_path_edit === $photo_address) {
		
	}else{
		unlink('../img/'.$photo_address);
		$uploaddir = "../img/";
		$uploadfile = $uploaddir . basename($_FILES['photo']['name']);
		move_uploaded_file($_FILES['photo']['tmp_name'], $uploadfile);
		$query = "UPDATE tb_menu SET active = ".$active.", product_name = '".$prod_name."', price = ".$price.", ";
		$query .= "description = '".$desc."', photo_address='".$_FILES['photo']['name']."' WHERE id = ".$id;

	}

	mysqli_query($conexao, $query) or die ("Erro ao atualizar.<br>".$query."<br>".mysqli_error($conexao));

	//echo isset($_POST["active"]);	
?>